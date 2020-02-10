import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Observable, of } from 'rxjs';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { tap, filter, map, shareReplay, switchMap, throwIfEmpty } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as servicesSelectors from '../state/services/services.selectors';
import * as specificationsSelectors from '../state/specifications/specifications.selectors';
import * as specificationsActions from '../state/specifications/specifications.actions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  endpoint$: Observable<any>;
  endpointData: any;
  specs$: Observable<any>;
  responseCodes: string[] = ['200', '401', '404', '500'];
  form: FormGroup;
  mocksVisible: boolean = false;
  filesToUpload: Array<File>;
  activeId: string;
  public selectedStatus: string;
  public options = new JsonEditorOptions();
  private editorHolder: ElementRef;
  mockId: string;
  response: any;
  specForm: FormGroup;
  filterText$: Observable<string> = of('');
  defaultFilterText: string;
  headers: FormArray;
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>;

  constructor(
    private store: Store<any>,
    private window: Window,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: HomeService
  ) { }

  ngOnInit() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;

    this.form = this.formBuilder.group({
      delay: 0,
      statusCode: '',
      noData: false,
      forward: false,
      headers: this.formBuilder.array([this.createHeadersInput()])
    });

    this.endpoint$ = this.store.pipe(
      select(servicesSelectors.getSelectedEndpoint),
      tap(val => {
        if (!val) {
          return;
        }
        this.mockId = val.path.substring(val.path.lastIndexOf('/') + 1);
        this.form.get('statusCode').setValue(val.statusCode);
        this.form.get('delay').setValue(val.delay);
        this.form.get('noData').setValue(val.emptyArray);
        this.response = val;
        this.endpointData = val.response[val.statusCode].data.body;

        this.headers = this.form.get('headers') as FormArray;
        this.headers.clear();

        if (val.customHeaders) {
          for (let [key, value] of Object.entries(val.customHeaders)) {
            this.addHeader(key, value as string);
          }
        }
      })
    );

    this.specForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    this.store.dispatch(new specificationsActions.LoadSpecifications());
    this.specs$ = this.store.pipe(select(specificationsSelectors.getSpecifications));

    this.filterText$ = this.specForm.get('name').valueChanges;

  }

  createHeadersInput(headerName: string = '', headerValue: string = ''): FormGroup {
    return this.formBuilder.group({
      name: headerName,
      value: headerValue
    });
  }

  addHeader(headerName: string = '', headerValue: string = ''): boolean {
    this.headers = this.form.get('headers') as FormArray;
    this.headers.push(this.createHeadersInput(headerName, headerValue));
    return false;
  }

  removeHeader(header: FormArray): boolean {
    this.headers.removeAt(this.headers.value.findIndex(_header => _header === header));
    return false;
  }

  updateEndpoint(endpointId: string) {
    let data = {
      statusCode: this.form.get('statusCode').value,
      delay: parseInt(this.form.get('delay').value, 10),
      emptyArray: this.form.get('noData').value,
      forward: this.form.get('forward').value,
      response: this.editor.first.get(),
      customHeaders: this.arrayToObject(this.form.value.headers)
    };

    this.service.updateEndpoint(endpointId, data).subscribe(data => {
      this.response.response[
        this.form.get('statusCode').value
      ].data.body = this.editor.first.get();
    });
  }

  arrayToObject(array) {
    return array.reduce((obj, item) => {
      if (item.name !== '' && item.value !== '') {
        obj[item.name] = item.value;
      }
      return obj;
    }, {});
  }

  // findMocks() {
  //   this.service.findMocks(this.mockId).subscribe(val => {
  //     this.endpointData = val[0].response;
  //   });
  // }

  changeStatusCode(event) {
    this.endpointData = this.response.response[
      this.form.get('statusCode').value
    ].data.body;
  }

  useMocks(data) {
    this.endpointData = data;
    return false;
  }

  toggleMocks() {
    this.mocksVisible = !this.mocksVisible;



    this.specForm.patchValue({
      name: this.response.serviceName
    });

    return false;
  }

  createSpec() {
    this.store.dispatch(new specificationsActions.CreateSpecification(this.specForm.value));    
  }

  createExamples(id) {
    this.specs$ = this.service.uploadFile(id, this.filesToUpload).pipe(
      switchMap(() => this.service.getSpecs()),
      tap(() => (this.activeId = id))
    );
  }

  onFileChange(event) {
    this.filesToUpload = event.target.files;
  }

  deleteSpecs(id: string) {
    this.store.dispatch(new specificationsActions.DeleteSpecification(id));    
    return false;
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
