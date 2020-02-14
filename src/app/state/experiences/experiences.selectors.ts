import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperiencesState } from './experiences.reducers';

const getServicesFeatureState = createFeatureSelector<ExperiencesState>('experiences');

export const getExperiences = createSelector(getServicesFeatureState, state => state.experiences);

export const hasExperiences = createSelector(getServicesFeatureState, state => state.experiences.length > 0);

export const getSelectedExperience = createSelector(getServicesFeatureState, (state) : any => state.selectedExperience);
