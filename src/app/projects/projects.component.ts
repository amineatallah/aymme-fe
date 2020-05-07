import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../shared/modal.service';
import { Store, select } from '@ngrx/store';
import * as projectActions from '../state/projects/projects.actions';
import * as projectsSelectors from '../state/projects/projects.selectors';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  @Input() projects: [] | undefined;

  errorLoadingProjects$: Observable<any>;

  constructor(
    private modalService: ModalService,
    private store: Store<any>,
    ) {}

  ngOnInit(): void {
    this.errorLoadingProjects$ = this.store.pipe(select(projectsSelectors.errorLoadingProjects));
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
        this.store.dispatch(new projectActions.DeleteProject(projectName));
      }
    });
    event.stopPropagation();
    return false;
  }
}
