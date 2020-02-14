import { ExperiencesActions, ExperiencesActionTypes } from './experiences.actions';

export interface ExperiencesState {
  experiences: any;
  selectedExperience: any | undefined;
  error: string;
}

export const initialState: ExperiencesState = {
  experiences: [],
  selectedExperience: undefined,
  error: '',
};

export function reducer(state = initialState, action: ExperiencesActions): ExperiencesState {
  switch (action.type) {
    case ExperiencesActionTypes.LOAD_EXPERIENCES_SUCCESS:
      return {
        ...state,
        experiences: [...action.payload],
        error: '',
      };
    case ExperiencesActionTypes.LOAD_EXPERIENCES_FAILURE:
      return {
        ...state,
        experiences: [],
        error: action.payload,
      };
    case ExperiencesActionTypes.ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
        error: '',
      };
    case ExperiencesActionTypes.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        error: '',
      };
    case ExperiencesActionTypes.SELECT_EXPERIENCE:
      return {
        ...state,
        selectedExperience: action.payload,
        error: '',
      };
    default:
      return state;
  }
}
