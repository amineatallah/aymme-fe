import { Action } from '@ngrx/store';
import { Service, Endpoint } from '../../shared/service.interface';
import { UpdateProjectConfig } from '../projects/projects.actions';

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
  SYNC_ENDPOINT = '[Services] Sync Endpoint',
  SYNC_ENDPOINT_SUCCESS = '[Services] Sync Endpoint Success',
  SYNC_ENDPOINT_FAILURE = '[Services] Sync Endpoint Failure',
  IMPORT_PROJECT = '[Services] Import Project',
  IMPORT_PROJECT_SUCCESS = '[Services] Import Project Success',
  IMPORT_PROJECT_FAILURE = '[Services] Import Project Failure',
  UPDATE_PROJECT_CONFIG = '[Services] Update Project Config',
}

export class LoadServices implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES;
  constructor( public payload: any) { }
}

export class LoadServicesSuccess implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_SUCCESS;
  constructor(public payload: any) { }
}

export class UpdateProjectConfigFromServices implements Action {
  readonly type =  ServicesActionTypes.UPDATE_PROJECT_CONFIG;
  constructor(public payload: any) { }
}

export class LoadServicesFailure implements Action {
  readonly type = ServicesActionTypes.LOAD_SERVICES_FAILURE;
  constructor(public payload: string) { }
}

export class DeleteService implements Action {
  readonly type = ServicesActionTypes.DELETE_SERVICE;
  constructor(public payload: any) { }
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
  constructor(public payload: any) { }
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

  constructor(public payload: any) { }
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

export class SyncEndpoint implements Action {
  readonly type = ServicesActionTypes.SYNC_ENDPOINT;
  constructor(public payload: any) { }
}

export class SyncEndpointSuccess implements Action {
  readonly type = ServicesActionTypes.SYNC_ENDPOINT_SUCCESS;
  constructor(public payload: any) { }
}
export class SyncEndpointFailure implements Action {
  readonly type = ServicesActionTypes.SYNC_ENDPOINT_FAILURE;
  constructor(public payload: any) { }
}

export class ImportProject implements Action {
  readonly type = ServicesActionTypes.IMPORT_PROJECT;
  constructor(public projectName, public files: File) { }
}

export class ImportProjectSuccess implements Action {
  readonly type = ServicesActionTypes.IMPORT_PROJECT_SUCCESS;
  constructor(public payload: any) { }
}

export class ImportProjectFailure implements Action {
  readonly type = ServicesActionTypes.IMPORT_PROJECT_FAILURE;
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
  | SyncEndpoint
  | SyncEndpointSuccess
  | SyncEndpointFailure
  | ImportProject
  | ImportProjectSuccess
  | ImportProjectFailure
  | UpdateProjectConfigFromServices;
