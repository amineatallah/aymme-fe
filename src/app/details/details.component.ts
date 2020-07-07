import { Component, OnInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { tap, take, debounceTime, distinctUntilChanged, map, takeUntil, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as servicesSelectors from '../state/services/services.selectors';
import * as specificationsSelectors from '../state/specifications/specifications.selectors';
import * as specificationsActions from '../state/specifications/specifications.actions';
import { SpecNameValidator } from './specNameValidator';
import { collapseExpandAnimation, slideInOutAnimation, fadeInStaggerAnimation } from '../shared/animation';
import * as ServicesActions from '../state/services/services.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ModalService } from '../shared/modal.service';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../shared/home.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  animations: [
    fadeInStaggerAnimation,
    slideInOutAnimation,
    collapseExpandAnimation,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  endpoint$: Observable<any>;
  endpointData: any;
  specs$: Observable<any>;
  servicesNameList: Array<string> = [];
  servicesNameList$: Observable<any>;
  statusCodes: string[] = ['200', '401', '404', '500'];
  responseCodes: string[] = [...this.statusCodes, '666'];
  form: FormGroup;
  mocksVisible = false;
  filesToUpload: Array<File>;
  activeId: string;
  listStaggerAnimation = false;
  public selectedStatus: string;
  public options = new JsonEditorOptions();
  private editorHolder: ElementRef;
  mockId: string;
  response: any;
  specForm: FormGroup;
  filterText$: Observable<string> = of('');
  defaultFilterText: string;
  headers: FormArray;
  showHeaders: boolean;
  projectName: string;
  showMoreOptions: boolean = false;

  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>;

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private specNameValidator: SpecNameValidator,
    private modalService: ModalService,
    private activeRoute: ActivatedRoute,
    private actions$: Actions,
    private dataService: HomeService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;

    this.projectName = this.activeRoute.snapshot.params.projectName;

    this.form = new FormGroup({
      delay: new FormControl(0, [Validators.required]),
      statusCode: new FormControl('', [Validators.required]),
      responseCode: new FormControl('', [Validators.required]),
      serviceName: new FormControl('', Validators.required),
      noData: new FormControl(false),
      forward: new FormControl(false),
      headers: new FormArray([this.createHeadersInput()]),
      match: new FormGroup({
        name: new FormControl(''),
        value: new FormControl('')
      })
    });

    this.servicesNameList$ = this.store.pipe(select(servicesSelectors.getServicesList), tap((servicesList) => {
      this.servicesNameList = servicesList;
    }));

    this.endpoint$ = this.store.pipe(
      select(servicesSelectors.getSelectedEndpoint),
      filter(val => val),
      tap(val => {
        this.mockId = val.path.substring(val.path.lastIndexOf('/') + 1);
        this.form.get('statusCode').setValue(val.statusCode);
        this.form.get('responseCode').setValue(val.statusCode);
        this.form.get('delay').setValue(val.delay);
        this.form.get('serviceName').setValue(val.serviceName);
        this.form.get('noData').setValue(val.emptyArray);
        this.form.get('match.name').setValue(val.match && val.match.name);
        this.form.get('match.value').setValue(val.match && val.match.value);
        this.response = val;
        // this.endpointData = val.response[val.statusCode].data.body;
        this.endpointData = val.response[val.statusCode];

        this.headers = this.form.get('headers') as FormArray;
        this.headers.clear();

        if (val.customHeaders) {
          for (const [key, value] of Object.entries(val.customHeaders)) {
            this.addHeader(key, value as string);
          }
        }

        this.listStaggerAnimation = false;
        setTimeout(() => {
          this.listStaggerAnimation = true;
        });
      })
    );

    this.actions$.pipe(
      ofType(ServicesActions.ServicesActionTypes.UPDATE_ENDPOINT_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.form.markAsPristine();
      })
    ).subscribe();

    this.specForm = this.formBuilder.group({
      specName: [null,
        {
          validators: [Validators.required],
          asyncValidators: [this.specNameValidator.existingSpecNameValidator()]
        }]
    });

    this.store.dispatch(new specificationsActions.LoadSpecifications());
    this.specs$ = this.store.pipe(select(specificationsSelectors.getSpecifications)).pipe(tap(_ => this.specName.updateValueAndValidity()));

    this.filterText$ = this.specForm.get('specName').valueChanges;
  }

  ngOnDestroy() { 
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get specName() {
    return this.specForm.get('specName');
  }

  createHeadersInput(headerName: string = '', headerValue: string = ''): FormGroup {
    return this.formBuilder.group({
      name: headerName,
      value: headerValue
    });
  }

  serviceNameSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(120),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.servicesNameList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  addHeader(headerName: string = '', headerValue: string = '', $event: Event = null): boolean {
    if ($event) {
      $event.stopPropagation();
    }

    this.headers = this.form.get('headers') as FormArray;
    this.headers.push(this.createHeadersInput(headerName, headerValue));
    return false;
  }

  removeHeader(header: FormArray): boolean {
    this.headers.removeAt(this.headers.value.findIndex((item: FormArray) => item === header));
    return false;
  }

  syncEndpoint(){
    this.dataService.syncEndpoint(this.projectName, encodeURIComponent(this.response.path)).subscribe(val => {
      this.endpointData = val;
      this.toastr.success('Data Fetched Successfully');
    }, error => {
      this.toastr.error(error.error.message);
    })
  }

  updateEndpoint(endpointId: string) {

    const changedServiceName = this.form.get('serviceName').dirty;

    const data = {
      id: endpointId,
      statusCode: this.form.get('statusCode').value,
      delay: parseInt(this.form.get('delay').value, 10),
      serviceName: this.form.get('serviceName').value,
      emptyArray: this.form.get('noData').value,
      forward: this.form.get('forward').value,
      match: this.form.get('match').value,
      response: Object.assign({}, this.response.response, { [this.form.get('responseCode').value]: this.editor.first.get() }),
      customHeaders: this.arrayToObject(this.form.value.headers)
    };
    this.store.dispatch(new ServicesActions.UpdateEndpoint({ projectName: this.projectName, data, changedServiceName }));
  }

  arrayToObject(array) {
    return array.reduce((obj, item) => {
      if (item.name !== '' && item.value !== '') {
        obj[item.name] = item.value;
      }
      return obj;
    }, {});
  }

  changeResponseCode(event) {
    this.endpointData = this.response.response[event];
  }

  changeStatusCode(event) {
    this.changeResponseCode(event);
    this.form.get('responseCode').setValue(event);
  }

  useMocks(data) {
    this.endpointData = data;
    return false;
  }

  toggleMocks() {
    this.mocksVisible = !this.mocksVisible;

    // this.specForm.patchValue({
    //   specName: this.response.serviceName
    // });

    return false;
  }

  createSpec() {
    this.store.dispatch(new specificationsActions.CreateSpecification(this.specForm.value));
  }

  createExamples(id): void {
    this.store.dispatch(new specificationsActions.CreateExample({ id, filesToUpload: this.filesToUpload }));
    this.filesToUpload = null;
  }

  onFileChange(event): void {
    this.filesToUpload = event.target.files;
  }

  getFileNames(): string {
    const retVal = [];
    for (let i = 0; i <= this.filesToUpload?.length - 1; i++) {
      retVal.push(this.filesToUpload[i].name);
    }
    return retVal.join(', ');
  }

  openConfirmDeleteSpecs(spec, event) {
    this.modalService.confirm(
      'Are you sure you want to delete the specification?', 'Specification', spec.name
    ).pipe(
      take(1)
    ).subscribe(result => {
      if (result === true) {
        this.deleteSpecs(spec._id);
      }
    });
    event.stopPropagation();
    return false;
  }

  deleteSpecs(id: string) {
    this.store.dispatch(new specificationsActions.DeleteSpecification(id));
    return false;
  }

  toggleOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }
}
