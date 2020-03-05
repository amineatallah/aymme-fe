import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperiencesState } from './experiences.reducers';

const getExperiencesFeatureState = createFeatureSelector<ExperiencesState>('experiences');

export const getExperiences = createSelector(getExperiencesFeatureState, state => state.experiences);

export const hasExperiences = createSelector(getExperiencesFeatureState, state => state.experiences.length > 0);

export const getExperienceByName = createSelector(getExperiencesFeatureState, (state, prop) : any => state.experiences.find((experience) => experience.name === prop.name));

export const isSyncingExperience = createSelector(getExperiencesFeatureState, state => state.isSyncingExperience);

export const isUpdatingExperience = createSelector(getExperiencesFeatureState, state => state.isUpdatingExperience);
