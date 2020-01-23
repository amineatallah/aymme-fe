import { ServicesActions, ServicesActionTypes } from './services.actions';
import { Service } from '../service.interface';

export interface ServicesState {
  services: Service[];
  error: string;
}

export const initialState: ServicesState = {
  services: [],
  error: '',
};

export function reducer(state = initialState, action: ServicesActions): ServicesState {
  switch (action.type) {
    case ServicesActionTypes.LoadServicesSuccess:
      return {
        ...state,
        services: [...action.payload],
        error: '',
      };
    case ServicesActionTypes.LoadServicesFailure:
      return {
        ...state,
        services: [],
        error: action.payload,
      };
    case ServicesActionTypes.DeleteServiceSuccess:
      return {
        services: state.services.filter(service => service.serviceName !==  action.payload),
        error: '',
      };
    case ServicesActionTypes.DeleteServiceFailure:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
