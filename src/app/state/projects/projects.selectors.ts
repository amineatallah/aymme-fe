import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectsState } from './projects.reducers';

const getProjectsFeatureState = createFeatureSelector<ProjectsState>('projects');

export const getProjects = createSelector(getProjectsFeatureState, state => state.projects);

export const hasProjects = createSelector(getProjectsFeatureState, state => state.projects.length > 0);
