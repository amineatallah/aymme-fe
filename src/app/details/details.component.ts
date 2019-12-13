import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../home/home.service';
import { Observable, of } from 'rxjs';
import { JsonEditorOptions, JsonEditorComponent } from 'ang-jsoneditor';
import { tap, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  endpoint$: Observable<any>;
  mocks$: Observable<any>;
  specs$: Observable<any>;
  // selectedMock$: Observable<any>;
  selectedMock$: any;
  test$: any;
  responseCodes: string[] = ["200", "401", "404", "500"];
  delay: number = 0;
  form: FormGroup;
  mocksForm: FormGroup;
  mocksVisible: boolean = false;
  body: any;
  specForm: FormGroup;
  filesToUpload: Array<File>;
  activeId: string;
  public selectedStatus: string;
  public options = new JsonEditorOptions;
  private editorHolder: ElementRef;
  mockId: string;
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>;

  constructor(private window: Window, private activeRoute: ActivatedRoute, private service: HomeService) { }

  ngOnInit() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = false;

    this.form = new FormGroup({
      delay: new FormControl(0),
      statusCode: new FormControl(''),
      noData: new FormControl(false),
      forward: new FormControl(false)
    })

    this.specForm = new FormGroup({
      name: new FormControl(''),
    })
    


    this.mocksForm = new FormGroup({
      mockId: new FormControl('')
    })

    this.endpoint$ = this.activeRoute.paramMap.pipe(
      switchMap(params => {
        // this.selectedId = +params.get('id');
        return this.service.getEndpoint(this.activeRoute.snapshot.params.id).pipe(
          tap((val:any) => {
            this.mockId = val.path.substring(val.path.lastIndexOf('/') + 1);
            this.selectedStatus = val.statusCode;
            this.form.get('statusCode').setValue(val.statusCode);
            this.form.get('delay').setValue(val.delay);
            this.form.get('noData').setValue(val.emptyArray);
          })
        );
      })
    );

    this.test$ = this.endpoint$;

  }

  updateData() {
    console.log('editor', this.editor.first.get());
    let data = {
      statusCode: this.form.get('statusCode').value,
      delay: parseInt(this.form.get('delay').value, 10),
      emptyArray: this.form.get('noData').value,
      forward: this.form.get('forward').value,
      response: this.editor.first.get()
    }
    this.service.updateData(this.activeRoute.snapshot.params.id, data).subscribe(data => {
      this.endpoint$ = of(data);
    })
  }


  selectMock(data) {
    console.log(data);
    let data2 = {
      statusCode: this.form.get('statusCode').value,
      delay: parseInt(this.form.get('delay').value, 10),
      emptyArray: this.form.get('noData').value,
      response: data
      // response: {
      //   [this.form.get('statusCode').value]: {
      //     data: {
      //       body: data
      //     }
      //   }
      // }
    }
    console.log('data2', data2);
    this.test$ = of(data2);
  }

  findMocks() {
    console.log('this.mockId', this.mockId)
    this.service.findMocks(this.mockId).subscribe(val => {
      console.log('hereee', val);
      this.selectMock(val[0].response);
    })
  }

  toggleMocks() {
    this.mocksVisible = !this.mocksVisible;
    this.specs$ = this.service.getSpecs().pipe(
      shareReplay(),
    );
  }

   useMocks(data){
    console.log('data', data);
    this.test$ = this.endpoint$.pipe(
      map(val => {
        val.response[this.form.get('statusCode').value].data.body = data;
        return val;
      })
    )
  }

  createSpec() {
    this.specs$ = this.service.createSpec(this.specForm.value).pipe(
      switchMap(() => this.service.getSpecs())
    )
  }
  
  createExamples(id) {

    this.specs$ = this.service.uploadFile(id, this.filesToUpload).pipe(
      switchMap(() => this.service.getSpecs()),
      tap(() => this.activeId = id)
    )
  }

  onFileChange(event) {
    this.filesToUpload = event.target.files;
  }

  deleteSpecs(id: string) {
   this.specs$ = this.service.deleteSpecs(id).pipe(
     switchMap(() => this.service.getSpecs())
   );
  }
}
