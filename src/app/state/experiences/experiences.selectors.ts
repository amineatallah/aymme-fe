import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperiencesState } from './experiences.reducers';

const getServicesFeatureState = createFeatureSelector<ExperiencesState>('experiences');

export const getServices = createSelector(getServicesFeatureState, state => state.experiences);

export const hasServices = createSelector(getServicesFeatureState, state => state.experiences.length > 0);

export const getSelectedPortal = createSelector(getServicesFeatureState, (state) : any => state.selectedExperience);
