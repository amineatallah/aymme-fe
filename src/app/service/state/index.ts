import * as fromRoot from '../../state/app.state';
import { ServicesState } from './services.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  services: ServicesState;
}

const getServicesFeatureState = createFeatureSelector<ServicesState>('services');

export const getServices = createSelector(getServicesFeatureState, state => state.services);
