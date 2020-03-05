import { ExperiencesActions, ExperiencesActionTypes } from './experiences.actions';

export interface ExperiencesState {
  experiences: any;
  isSyncingExperience: boolean;
  isUpdatingExperience: boolean;
  error: string;
}

export const initialState: ExperiencesState = {
  experiences: [],
  isSyncingExperience: false,
  isUpdatingExperience: false,
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
    case ExperiencesActionTypes.SYNC_EXPERIENCE:
      return {
        ...state,
        isSyncingExperience: true,
      };
    case ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: processNewExperienceState(state.experiences, action.payload),
        isSyncingExperience: false,
        error: '',
      };

    case ExperiencesActionTypes.SYNC_EXPERIENCE_FAILURE:
      return {
        ...state,
        isSyncingExperience: false,
        error: '',
      };
    case ExperiencesActionTypes.DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: state.experiences.filter(experience => experience.name !== action.payload),
        error: '',
      };
    case ExperiencesActionTypes.SET_ACTIVE_PAGE:
      return {
        ...state,
        experiences: [...state.experiences.map((experience) => {
          let newExperienceState = experience;
          if (experience.name === action.payload.selectedExperienceName) {
            newExperienceState = {
              ...experience,
              activePage: action.payload.newActivePage
            }
          }
          return newExperienceState;
        })],
        error: '',
      };
    case ExperiencesActionTypes.UPDATE_EXPERIENCE:
      return {
        ...state,
        isUpdatingExperience: true,
        error: '',
      };
    case ExperiencesActionTypes.UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: processNewExperienceState(state.experiences, action.payload),
        isUpdatingExperience: false,
        error: '',
      };

    case ExperiencesActionTypes.UPDATE_EXPERIENCE_FAILURE:
      return {
        ...state,
        isUpdatingExperience: false,
        error: '',
      };
    default:
      return state;
  }
}

function processNewExperienceState(oldExperiences, updatedExperience) {
  if (oldExperiences.some(experience => experience.name === updatedExperience.name)) {
    return oldExperiences.map((experience) => {
      let newExperienceState = experience;

      if (experience.name === updatedExperience.name) {
        newExperienceState = {
          ...updatedExperience,
        }
      }

      return newExperienceState;
    });
  }
  else {
    return [...oldExperiences, { ...updatedExperience }]
  }
}