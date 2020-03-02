import { Action } from '@ngrx/store';
import { Service, Endpoint } from '../../shared/service.interface';

export enum ServicesActionTypes {
  LOAD_SERVICES = '[Services] Load',
  LOAD_SERVICES_SUCCESS = '[Services] Load Success',
  LOAD_SERVICES_FAILURE = '[Services] Load Failure',
  DELETE_SERVICE = '[Services] Delete Service',
  DELETE_SERVICE_SUCCESS = '[Services] Delete Service Success',
  DELETE_SERVICE_FAILURE = '[Services] Delete Service Failure',
  DELETE_ENDPOINT = '[Services] Delete Endpoint',
  DELETE_ENDPOINT_SUCCESS = '[Services] Delete Endpoint Success',
  DELETE_ENDPOINT_FAILURE = '[Services] Delete Endpoint Failure',
  LOAD_SELECTED_ENDPOINT = '[Services] Set Selected Endpoint',
  LOAD_SELECTED_ENDPOINT_SUCCESS = '[Services] Load Endpoint Success',
  LOAD_SELECTED_ENDPOINT_FAILURE = '[Services] Load Endpoint Failure',
  UPDATE_ENDPOINT = '[Services] Update Endpoint',
  UPDATE_ENDPOINT_SUCCESS = '[Services] Update Endpoint Success',
  UPDATE_ENDPOINT_FAILURE = '[Services] Update Endpoint Failure',
  IMPORT_SERVICES = '[Services] Import Services',
  IMPORT_SERVICES_SUCCESS = '[Services] Import Services Success',
  IMPORT_SERVICES_FAILURE = '[Services] Import Services Failure',
}

export class LoadServices implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES;
  constructor(public initializing: boolean) { }
}

export class LoadServicesSuccess implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadServicesFailure implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_FAILURE;
  constructor(public payload: string) { }
}

export class DeleteService implements Action {
  readonly type = ServicesActionTypes.DELETE_SERVICE;
  constructor(public payload: string) { }
}

export class DeleteServiceSuccess implements Action {
  readonly type = ServicesActionTypes.DELETE_SERVICE_SUCCESS;

  constructor(public payload: string) { }
}

export class DeleteServiceFailure implements Action {
  readonly type = ServicesActionTypes.DELETE_SERVICE_FAILURE;

  constructor(public payload: string) { }
}

export class DeleteEndpoint implements Action {
  readonly type = ServicesActionTypes.DELETE_ENDPOINT;
  constructor(public payload: string) { }
}

export class DeleteEndpointSuccess implements Action {
  readonly type = ServicesActionTypes.DELETE_ENDPOINT_SUCCESS;

  constructor(public payload: string) { }
}

export class DeleteEndpointFailure implements Action {
  readonly type = ServicesActionTypes.DELETE_ENDPOINT_FAILURE;

  constructor(public payload: string) { }
}

export class LoadSelectedEndpoint implements Action {
  readonly type = ServicesActionTypes.LOAD_SELECTED_ENDPOINT;

  constructor(public payload: Endpoint) { }
}

export class LoadEndpointSuccess implements Action {
  readonly type = ServicesActionTypes.LOAD_SELECTED_ENDPOINT_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadEndpointFailure implements Action {
  readonly type = ServicesActionTypes.LOAD_SELECTED_ENDPOINT_FAILURE;

  constructor(public payload: string) { }
}

export class UpdateEndpoint implements Action {
  readonly type = ServicesActionTypes.UPDATE_ENDPOINT;
  constructor(public payload: any) { }
}

export class UpdateEndpointSuccess implements Action {
  readonly type = ServicesActionTypes.UPDATE_ENDPOINT_SUCCESS;

  constructor(public payload: string) { }
}

export class UpdateEndpointFailure implements Action {
  readonly type = ServicesActionTypes.UPDATE_ENDPOINT_FAILURE;

  constructor(public payload: string) { }
}

export class ImportServices implements Action {
  readonly type = ServicesActionTypes.IMPORT_SERVICES;
  constructor(public payload: File) { }
}

export class ImportServicesSuccess implements Action {
  readonly type = ServicesActionTypes.IMPORT_SERVICES_SUCCESS;

  constructor(public payload: any) { }
}

export class ImportServicesFailure implements Action {
  readonly type = ServicesActionTypes.IMPORT_SERVICES_FAILURE;

  constructor(public payload: string) { }
}



export type ServicesActions =
  | LoadServices
  | LoadServicesSuccess
  | LoadServicesFailure
  | DeleteService
  | DeleteServiceSuccess
  | DeleteServiceFailure
  | DeleteEndpoint
  | DeleteEndpointSuccess
  | DeleteEndpointFailure
  | LoadSelectedEndpoint
  | LoadEndpointSuccess
  | LoadEndpointFailure
  | UpdateEndpoint
  | UpdateEndpointSuccess
  | UpdateEndpointFailure
  | ImportServices
  | ImportServicesSuccess
  | ImportServicesFailure;
