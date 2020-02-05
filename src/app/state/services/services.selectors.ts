import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServicesState } from './services.reducers';

const getServicesFeatureState = createFeatureSelector<ServicesState>('services');

export const getServices = createSelector(getServicesFeatureState, state => state.services);

export const hasServices = createSelector(getServicesFeatureState, state => state.services.length > 0);

export const getSelectedEndpoint = createSelector(getServicesFeatureState, (state) : any => state.selectedEndpoint);
