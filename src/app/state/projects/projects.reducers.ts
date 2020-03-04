import { ProjectsActions, ProjectsActionTypes } from './projects.actions';
import { isNgTemplate } from '@angular/compiler';

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
        projects: action.payload,
        error: '',
      };
    case ProjectsActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload].filter((project, index, array) => {
          return array.indexOf(array.find(item => item.name === project.name)) === index;
        }),
        error: '',
      };
    case ProjectsActionTypes.DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: state.projects.filter(project => project.name !== action.payload),
        error: '',
      };
    default:
      return state;
  }
}