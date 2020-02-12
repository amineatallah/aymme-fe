import { Action } from '@ngrx/store';
import { Service, Endpoint } from '../../shared/service.interface';

export enum ServicesActionTypes {
  LoadServices = '[Services] Load',
  LoadServicesSuccess = '[Services] Load Success',
  LoadServicesFailure = '[Services] Load Failure',
  DeleteService = '[Services] Delete Service',
  DeleteServiceSuccess = '[Services] Delete Service Success',
  DeleteServiceFailure = '[Services] Delete Service Failure',
  LoadSelectedEndpoint = '[Services] Set Selected Endpoint',
  LoadEndpointSuccess = '[Services] Load Endpoint Success',
  LoadEndpointFailure = '[Services] Load Endpoint Failure'
}

export class LoadServices implements Action {
  readonly type = ServicesActionTypes.LoadServices;
}

export class LoadServicesSuccess implements Action {
  readonly type = ServicesActionTypes.LoadServicesSuccess;

  constructor(public payload: any[]) {}
}

export class LoadServicesFailure implements Action {
  readonly type = ServicesActionTypes.LoadServicesFailure;
  constructor(public payload: string) {}
}

export class DeleteService implements Action {
  readonly type = ServicesActionTypes.DeleteService;
  constructor(public payload: string) {}
}

export class DeleteServiceSuccess implements Action {
  readonly type = ServicesActionTypes.DeleteServiceSuccess;

  constructor(public payload: string) {}
}

export class DeleteServiceFailure implements Action {
  readonly type = ServicesActionTypes.DeleteServiceFailure;

  constructor(public payload: string) {}
}

export class LoadSelectedEndpoint implements Action {
  readonly type = ServicesActionTypes.LoadSelectedEndpoint;

  constructor(public payload: Endpoint) {}
}

export class LoadEndpointSuccess implements Action {
  readonly type = ServicesActionTypes.LoadEndpointSuccess;

  constructor(public payload: any[]) {}
}

export class LoadEndpointFailure implements Action {
  readonly type = ServicesActionTypes.LoadEndpointFailure;

  constructor(public payload: string) {}
}

export type ServicesActions =
  | LoadServices
  | LoadServicesSuccess
  | LoadServicesFailure
  | DeleteService
  | DeleteServiceSuccess
  | DeleteServiceFailure
  | LoadSelectedEndpoint
  | LoadEndpointSuccess
  | LoadEndpointFailure;
