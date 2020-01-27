import { Action } from '@ngrx/store';
import { Service } from '../service.interface';

export enum ServicesActionTypes {
  LoadServices = '[Services] Load',
  LoadServicesSuccess = '[Services] Load Success',
  LoadServicesFailure = '[Services] Load Failure',
  DeleteServiceSuccess = '[Services] Delete Service Success',
  DeleteServiceFailure = '[Services] Delete Service Failure',
  SetSelectedService = '[Services] Set Selected Service'
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

export class DeleteServiceSuccess implements Action {
  readonly type = ServicesActionTypes.DeleteServiceSuccess;

  constructor(public payload: string) {}
}

export class DeleteServiceFailure implements Action {
  readonly type = ServicesActionTypes.DeleteServiceFailure;

  constructor(public payload: string) {}
}

export class SetSelectedService implements Action {
  readonly type = ServicesActionTypes.SetSelectedService;

  constructor(public payload: Service) {}
}

export type ServicesActions = LoadServices | LoadServicesSuccess | LoadServicesFailure | DeleteServiceSuccess | DeleteServiceFailure | SetSelectedService;
