import { Action } from '@ngrx/store';

export enum ExperiencesActionTypes {
  LOAD_EXPERIENCES = '[Experiences] Load',
  LOAD_EXPERIENCES_SUCCESS = '[Experiences] Load Success',
  LOAD_EXPERIENCES_FAILURE = '[Experiences] Load Failure',

  SYNC_EXPERIENCE = '[Experiences] Sync',
  SYNC_EXPERIENCE_SUCCESS = '[Experiences] Sync Success',
  SYNC_EXPERIENCE_FAILURE = '[Experiences] Sync Failure',

  UPDATE_EXPERIENCE = '[Experiences] Update',
  UPDATE_EXPERIENCE_SUCCESS = '[Experiences] Update Success',
  UPDATE_EXPERIENCE_FAILURE = '[Experiences] Update Failure',

  DELETE_EXPERIENCE = '[Experiences] Delete',
  DELETE_EXPERIENCE_SUCCESS = '[Experiences] Delete Success',
  DELETE_EXPERIENCE_FAILURE = '[Experiences] Delete Failure',

  SET_ACTIVE_PAGE = '[Experiences] Set Active Page',
}

export class LoadExperiences implements Action {
  readonly type = ExperiencesActionTypes.LOAD_EXPERIENCES;
}

export class LoadExperiencesSuccess implements Action {
  readonly type = ExperiencesActionTypes.LOAD_EXPERIENCES_SUCCESS;

  constructor(public payload: any[]) { }
}

export class LoadExperiencesFailure implements Action {
  readonly type = ExperiencesActionTypes.LOAD_EXPERIENCES_FAILURE;
  constructor(public payload: string) { }
}

export class SyncExperience implements Action {
  readonly type = ExperiencesActionTypes.SYNC_EXPERIENCE;
  constructor(public payload: any) { }
}

export class SyncExperienceSuccess implements Action {
  readonly type = ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS;

  constructor(public payload: any) { }
}

export class SyncExperienceFailure implements Action {
  readonly type = ExperiencesActionTypes.SYNC_EXPERIENCE_FAILURE;
  constructor(public payload: string) { }
}

export class UpdateExperience implements Action {
  readonly type = ExperiencesActionTypes.UPDATE_EXPERIENCE;
  constructor(public payload: any) { }
}

export class UpdateExperienceSuccess implements Action {
  readonly type = ExperiencesActionTypes.UPDATE_EXPERIENCE_SUCCESS;

  constructor(public payload: any) { }
}

export class UpdateExperienceFailure implements Action {
  readonly type = ExperiencesActionTypes.UPDATE_EXPERIENCE_FAILURE;
  constructor(public payload: string) { }
}

export class DeleteExperience implements Action {
  readonly type = ExperiencesActionTypes.DELETE_EXPERIENCE;
  constructor(public payload: string) { }
}

export class DeleteExperienceSuccess implements Action {
  readonly type = ExperiencesActionTypes.DELETE_EXPERIENCE_SUCCESS;

  constructor(public payload: string) { }
}

export class DeleteExperienceFailure implements Action {
  readonly type = ExperiencesActionTypes.DELETE_EXPERIENCE_FAILURE;
  constructor(public payload: string) { }
}

export class SetActiveExperience implements Action {
  readonly type = ExperiencesActionTypes.SET_ACTIVE_PAGE;
  constructor(public payload: any) { }
}

export type ExperiencesActions =
  | LoadExperiences
  | LoadExperiencesSuccess
  | LoadExperiencesFailure
  | SyncExperience
  | SyncExperienceSuccess
  | SyncExperienceFailure
  | UpdateExperience
  | UpdateExperienceSuccess
  | UpdateExperienceFailure
  | DeleteExperience
  | DeleteExperienceSuccess
  | DeleteExperienceFailure
  | SetActiveExperience;
