import * as fromRoot from '../../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ServicesState } from './services.reducers';
import { Service } from '../service.interface';

const getServicesFeatureState = createFeatureSelector<ServicesState>('services');

export const getServices = createSelector(getServicesFeatureState, state => state.services);

export const getSelectedService = createSelector(getServices, fromRoot.getRouterState, (services, router) : Service => {
  return router.state && services.find(service => service.serviceName == router.state.params.service);
});

export const getEndpointsFromSelectedService = createSelector(getSelectedService, selectedService => {
  if (!selectedService) {
    return [];
  }
  return selectedService.endpoints;
});
