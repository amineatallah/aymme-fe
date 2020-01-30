import * as fromRoot from '..';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServicesState } from './services.reducers';
import { Endpoint } from '../../service/service.interface';

const getServicesFeatureState = createFeatureSelector<ServicesState>('services');

export const getServices = createSelector(getServicesFeatureState, state => state.services);

export const getSelectedEndpoint = createSelector(getServicesFeatureState, (state) : any => state.selectedEndpoint);
