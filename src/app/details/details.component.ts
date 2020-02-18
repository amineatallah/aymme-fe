import { Component, OnInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { tap, takeUntil, take } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as servicesSelectors from '../state/services/services.selectors';
import * as specificationsSelectors from '../state/specifications/specifications.selectors';
import * as specificationsActions from '../state/specifications/specifications.actions';
import { SpecNameValidator } from './specNameValidator';
import { collapseExpandAnimation, slideInOutAnimation, fadeInStaggerAnimation } from '../shared/animation';
import { ToastrService } from 'ngx-toastr';
import * as ServicesActions from '../state/services/services.actions';
import { Actions, ofType } from '@ngrx/effects';
import { ModalService } from '../shared/modal.service';

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
  responseCodes: string[] = ['200', '401', '404', '500'];
  form: FormGroup;
  mocksVisible: boolean = false;
  filesToUpload: Array<File>;
  activeId: string;
  listStaggerAnimation: boolean = false;
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
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>;

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private specNameValidator: SpecNameValidator,
    private toastr: ToastrService,
    private actions$: Actions,
    private modalService: ModalService
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

        this.listStaggerAnimation = false;
        setTimeout(() => {
          this.listStaggerAnimation = true;
        })

      })
    );


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

    this.actions$.pipe(
      ofType(ServicesActions.ServicesActionTypes.UPDATE_ENDPOINT_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Mocks updated successfully!', '', { 'progressBar': false, 'easing': 'ease-in-out' })
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(specificationsActions.SpecificationsActionTypes.CREATE_SPECIFICATION_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Specification created successfully!', '', { 'progressBar': false, 'easing': 'ease-in-out' })
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(specificationsActions.SpecificationsActionTypes.DELETE_SPECIFICATION_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.error('Specification deleted successfully!', '', { 'progressBar': false, 'easing': 'ease-in-out' })
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(specificationsActions.SpecificationsActionTypes.CREATE_EXAMPLE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Examples uploaded successfully!', '', { 'progressBar': false, 'easing': 'ease-in-out' })
      )
    ).subscribe();

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
    const data = {
      id: endpointId,
      statusCode: this.form.get('statusCode').value,
      delay: parseInt(this.form.get('delay').value, 10),
      emptyArray: this.form.get('noData').value,
      forward: this.form.get('forward').value,
      response: this.editor.first.get(),
      customHeaders: this.arrayToObject(this.form.value.headers)
    };

    this.store.dispatch(new ServicesActions.UpdateEndpoint(data));
  }

  arrayToObject(array) {
    return array.reduce((obj, item) => {
      if (item.name !== '' && item.value !== '') {
        obj[item.name] = item.value;
      }
      return obj;
    }, {});
  }

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
      specName: this.response.serviceName
    });

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

  showSuccess() {
    this.toastr.success('Mocks updated successfully!', '', { 'progressBar': false, 'easing': 'ease-in-out' });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
