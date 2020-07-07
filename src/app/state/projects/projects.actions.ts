import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
  LOAD_PROJECTS = '[Projects] Load',
  LOAD_PROJECTS_SUCCESS = '[Projects] Load Success',
  LOAD_PROJECTS_FAILURE = '[Projects] Load Failure',

  CREATE_PROJECT = '[Projects] Create',
  CREATE_PROJECT_SUCCESS = '[Projects] Create Success',
  CREATE_PROJECT_FAILURE = '[Projects] Create Failure',

  DELETE_PROJECT = '[Projects] Delete',
  DELETE_PROJECT_SUCCESS = '[Projects] Delete Success',
  DELETE_PROJECT_FAILURE = '[Projects] Delete Failure',

  UPDATE_PROJECT_CONFIG = '[Projects] Update Config',
  UPDATE_PROJECT_CONFIG_SUCCESS = '[Projects] Update Config Success',
  UPDATE_PROJECT_CONFIG_FAILURE = '[Projects] Update Config Failure',
}


export class UpdateProjectConfig implements Action {
  readonly type = ProjectsActionTypes.UPDATE_PROJECT_CONFIG;
  constructor(public payload: any){}
}

export class UpdateProjectConfigSuccess implements Action {
  readonly type = ProjectsActionTypes.UPDATE_PROJECT_CONFIG_SUCCESS;
  constructor(public payload: any){}
}

export class UpdateProjectConfigFailure implements Action {
  readonly type = ProjectsActionTypes.UPDATE_PROJECT_CONFIG_FAILURE;
  constructor(public payload: any){}
}

export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LOAD_PROJECTS;
}

export class LoadProjectsSuccess implements Action {
  readonly type = ProjectsActionTypes.LOAD_PROJECTS_SUCCESS;
  constructor(public payload: any[]) { }
}

export class LoadProjectsFailure implements Action {
  readonly type = ProjectsActionTypes.LOAD_PROJECTS_FAILURE;
  constructor(public payload: string) { }
}

export class CreateProject implements Action {
  readonly type = ProjectsActionTypes.CREATE_PROJECT;
  constructor(public payload: any) { }
}

export class CreateProjectSuccess implements Action {
  readonly type = ProjectsActionTypes.CREATE_PROJECT_SUCCESS;

  constructor(public payload: any) { }
}

export class CreateProjectFailure implements Action {
  readonly type = ProjectsActionTypes.CREATE_PROJECT_FAILURE;
  constructor(public payload: string) { }
}

export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DELETE_PROJECT;
  constructor(public payload: string) { }
}

export class DeleteProjectSuccess implements Action {
  readonly type = ProjectsActionTypes.DELETE_PROJECT_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteProjectFailure implements Action {
  readonly type = ProjectsActionTypes.DELETE_PROJECT_FAILURE;
  constructor(public payload: string) { }
}


export type ProjectsActions =
  | LoadProjects
  | LoadProjectsSuccess
  | LoadProjectsFailure
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFailure
  | DeleteProject
  | DeleteProjectSuccess
  | DeleteProjectFailure
  | UpdateProjectConfig
  | UpdateProjectConfigSuccess
  | UpdateProjectConfigFailure
