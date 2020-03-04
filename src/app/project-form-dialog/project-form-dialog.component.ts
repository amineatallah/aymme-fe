import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import * as projectsActions from '../state/projects/projects.actions';

@Component({
  selector: 'app-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss']
})
export class ProjectFormDialogComponent implements OnInit {

  projectForm: FormGroup;
  
  constructor(
    public activeModal: NgbActiveModal,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      projectName: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  }

  dismissModal() {
    this.activeModal.dismiss(false);
    return false;
  }

  createProject() {
    this.store.dispatch(new projectsActions.CreateProject(this.projectForm.value));
    // this.projectsService.createProject(this.projectForm.value).subscribe(val => {
    // });
  }
}
