import { ProjectsActions, ProjectsActionTypes } from './projects.actions';
import { isNgTemplate } from '@angular/compiler';
import { SetActiveExperience } from '../experiences/experiences.actions';

export interface ProjectsState {
  projects: any;
  isLoadingProjects: boolean;
  isCreatingProject: boolean;
  error: string;
}

export const initialState: ProjectsState = {
  projects: [],
  isLoadingProjects: true,
  isCreatingProject: false,
  error: '',
};

export function reducer(state = initialState, action: ProjectsActions): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.LOAD_PROJECTS:
      return {
        ...state,
        isLoadingProjects: true,
      };
    case ProjectsActionTypes.LOAD_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        isLoadingProjects: false,
        error: '',
      };

    case ProjectsActionTypes.LOAD_PROJECTS_FAILURE:
        return {
          ...state,
          isLoadingProjects: false,
          error: action.payload,
        };
    case ProjectsActionTypes.CREATE_PROJECT:
      return {
        ...state,
        isCreatingProject: true,
      };
    case ProjectsActionTypes.CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projects: [...state.projects, action.payload].filter((project, index, array) => {
          return array.indexOf(array.find(item => item.name === project.name)) === index;
        }),
        isCreatingProject: false,
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
