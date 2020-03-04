import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { Store } from '@ngrx/store';
import * as projectActions from '../state/projects/projects.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [] | undefined;

  constructor(
    private modalService: ModalService, 
    private store: Store<any>,
    ) {}

  ngOnInit(): void {
  }

  openCreateProjectModal() {
    this.modalService.projectFormModal();
  }


  openConfirmDeleteProject(projectName: string, event) {  
    this.modalService.confirm(
      'Are you sure you want to delete the project?', 'Delete Project', projectName
    ).pipe(
      take(1)
    ).subscribe(result => {
      if (result === true) {
        console.log(projectName);
        this.store.dispatch(new projectActions.DeleteProject(projectName));
      }
    });
    event.stopPropagation();
    return false;
  }
}
