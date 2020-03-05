import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as projectsActions from '../state/projects/projects.actions';
import * as projectsSelectors from '../state/projects/projects.selectors';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-projects-wrapper',
  templateUrl: './projects-wrapper.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsWrapperComponent implements OnInit {

  projects$: Observable<any>;
  isLoading$: Observable<any>;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch(new projectsActions.LoadProjects());
    this.projects$ = this.store.pipe(select(projectsSelectors.getProjects));
    this.isLoading$ = this.store.pipe(select(projectsSelectors.isLoadingProjects));
  }

}
