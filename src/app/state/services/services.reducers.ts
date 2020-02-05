import { ServicesActions, ServicesActionTypes } from './services.actions';
import { Service, Endpoint } from '../../service/service.interface';

export interface ServicesState {
  services: Service[];
  selectedEndpoint: any | undefined;
  error: string;
}

export const initialState: ServicesState = {
  services: [],
  selectedEndpoint: undefined,
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
        ...state,
        services: state.services.filter(service => service.serviceName !==  action.payload),
        error: '',
      };
    case ServicesActionTypes.DeleteServiceFailure:
      return {
        ...state,
        error: action.payload,
      };
      case ServicesActionTypes.LoadEndpointSuccess:
        return {
          ...state,
          selectedEndpoint: action.payload,
          error: '',
        };
      case ServicesActionTypes.LoadEndpointFailure:
        return {
          ...state,
          services: [],
          error: action.payload,
        };
    default:
      return state;
  }
}
