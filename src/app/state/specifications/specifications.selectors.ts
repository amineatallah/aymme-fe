import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpecificationsState } from './specifications.reducers';

const getSpecificationsFeatureState = createFeatureSelector<SpecificationsState>('specifications');

export const getSpecifications = createSelector(getSpecificationsFeatureState, state => state.specifications);
