import { ExperiencesActions, ExperiencesActionTypes } from './experiences.actions';

export interface ExperiencesState {
  experiences: any;
  error: string;
}

export const initialState: ExperiencesState = {
  experiences: [],
  error: '',
};

export function reducer(state = initialState, action: ExperiencesActions): ExperiencesState {
  switch (action.type) {
    case ExperiencesActionTypes.LOAD_EXPERIENCES_SUCCESS:
      return {
        ...state,
        experiences: [...action.payload.map((experience) => {
          experience.activePage = getActivePageByExperience(experience);
          return experience;
        }
        )],
        error: '',
      };
    case ExperiencesActionTypes.LOAD_EXPERIENCES_FAILURE:
      return {
        ...state,
        experiences: [],
        error: action.payload,
      };
    case ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: processNewExperienceState(state.experiences, action.payload),
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
    case ExperiencesActionTypes.UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        experiences: processNewExperienceState(state.experiences, action.payload),
        error: '',
      };
    default:
      return state;
  }
}

function getActivePageByExperience(experience: any) {
  if (experience.activePage) {
    return experience.activePage;
  }

  if (experience.pages.length === 0) {
    return;
  }

  return experience.pages.find(page => page.name === 'index').name || experience.pages[0].name;
}

function processNewExperienceState(oldExperiences, updatedExperience) {
  if (oldExperiences.some(experience => experience.name === updatedExperience.name)) {    
    return oldExperiences.map((experience) => {
      let newExperienceState = experience;

      if (experience.name === updatedExperience.name) {
        newExperienceState = {
          ...updatedExperience,
          activePage: getActivePageByExperience(updatedExperience)
        }
      }

      return newExperienceState;
    });
  }
  else {
    return[...oldExperiences, updatedExperience]
  }
}