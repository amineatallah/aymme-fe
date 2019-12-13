import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../home/home.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-mocks',
  templateUrl: './mocks.component.html',
  styleUrls: ['./mocks.component.scss']
})
export class MocksComponent implements OnInit {
  filesToUpload: Array<File>;
  specForm: FormGroup;
  specs$: Observable<any>;


  constructor(private homeService: HomeService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.specForm = new FormGroup({
      name: new FormControl(''),
    })
    
    this.load();
   
  }

  load(){
    this.specs$ = this.homeService.getSpecs().pipe(
      shareReplay(),
    );
  }

  createSpec() {
    this.homeService.createSpec(this.specForm.value).subscribe((createdSpec:any) => {
      this.specs$ = this.specs$.pipe(
        map(specs => {
          let newSpecs = [...createdSpec, ...specs];
          return newSpecs;
        })
      )
    });
  }
  
  createExamples(id) {
    this.homeService.uploadFile(id, this.filesToUpload).subscribe(data => {
      this.load();
    });
  }

  onFileChange(event) {
    this.filesToUpload = event.target.files;
  }

}
