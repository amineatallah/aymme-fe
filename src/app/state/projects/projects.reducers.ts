import { ProjectsActions, ProjectsActionTypes } from './projects.actions';

export interface ProjectsState {
  projects: any;
  error: string;
}

export const initialState: ProjectsState = {
  projects: [],
  error: '',
};

export function reducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: [...action.payload],
        error: '',
      };
    case ProjectsActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload],
        error: '',
      };
    case ProjectsActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [state.projects.filter(project => project.name !== action.payload)],
        error: '',
      };
    default:
      return state;
  }
}