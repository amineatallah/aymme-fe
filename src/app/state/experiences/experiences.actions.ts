import { Action } from '@ngrx/store';

export enum ExperiencesActionTypes {
  LOAD_EXPERIENCES = '[Experiences] Load',
  LOAD_EXPERIENCES_SUCCESS = '[Experiences] Load Success',
  LOAD_EXPERIENCES_FAILURE = '[Experiences] Load Failure',

  ADD_EXPERIENCE = '[Experiences] Add',
  ADD_EXPERIENCE_SUCCESS = '[Experiences] Add Success',
  ADD_EXPERIENCE_FAILURE = '[Experiences] Add Failure',

  DELETE_EXPERIENCE = '[Experiences] Delete',
  DELETE_EXPERIENCE_SUCCESS = '[Experiences] Delete Success',
  DELETE_EXPERIENCE_FAILURE = '[Experiences] Delete Failure',

  SELECT_EXPERIENCE = '[Experiences] Select Experience',
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

export class AddExperience implements Action {
  readonly type = ExperiencesActionTypes.ADD_EXPERIENCE;
  constructor(public payload: any) { }
}

export class AddExperienceSuccess implements Action {
  readonly type = ExperiencesActionTypes.ADD_EXPERIENCE_SUCCESS;

  constructor(public payload: any) { }
}

export class AddExperienceFailure implements Action {
  readonly type = ExperiencesActionTypes.ADD_EXPERIENCE_FAILURE;
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

export class SelectExperience implements Action {
  readonly type = ExperiencesActionTypes.SELECT_EXPERIENCE;
  constructor(public payload: any) { }
}

export type ExperiencesActions =
  | LoadExperiences
  | LoadExperiencesSuccess
  | LoadExperiencesFailure
  | AddExperience
  | AddExperienceSuccess
  | AddExperienceFailure
  | DeleteExperience
  | DeleteExperienceSuccess
  | DeleteExperienceFailure
  | SelectExperience;
