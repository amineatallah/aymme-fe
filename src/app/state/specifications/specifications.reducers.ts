import { SpecificationsActions, SpecificationsActionTypes, DeleteSpecification } from './specifications.actions';

export interface SpecificationsState {
    specifications: any[];
    error: string
}

export const initialState: SpecificationsState = {
    specifications: [],
    error: ''
};

export function reducer(state = initialState, action: SpecificationsActions): SpecificationsState {
    switch (action.type) {
        case SpecificationsActionTypes.LoadSpecificationsSuccess:
            return {
                ...state,
                specifications: [...action.payload],
            };
        case SpecificationsActionTypes.LoadSpecificationsFailure:
            return {
                ...state,
                specifications: [],
                error: action.payload,
            };

        case SpecificationsActionTypes.CreateSpecificationSuccess:
            return {
                ...state,
                specifications: [...state.specifications, ...action.payload],
                error: '',
            };
        case SpecificationsActionTypes.CreateSpecificationFailure:
            return {
                ...state,
                error: action.payload,
            };

        case SpecificationsActionTypes.DeleteSpecificationSuccess:
            return {
                ...state,
                specifications: state.specifications.filter(specification => specification._id !== action.payload),
                error: '',
            };
        case SpecificationsActionTypes.DeleteSpecificationFailure:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
