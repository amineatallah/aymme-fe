import { SpecificationsActions, SpecificationsActionTypes } from './specifications.actions';

export interface SpecificationsState {
    specifications: any[];
    error: string;
}

export const initialState: SpecificationsState = {
    specifications: [],
    error: ''
};

export function reducer(state = initialState, action: SpecificationsActions): SpecificationsState {
    switch (action.type) {
        case SpecificationsActionTypes.LOAD_SPECIFICATIONS_SUCCESS:
            return {
                ...state,
                specifications: [...action.payload],
            };
        case SpecificationsActionTypes.LOAD_SPECIFICATIONS_FAILURE:
            return {
                ...state,
                specifications: [],
                error: action.payload,
            };

        case SpecificationsActionTypes.CREATE_SPECIFICATION_SUCCESS:
            return {
                ...state,
                specifications: [...state.specifications, ...action.payload],
                error: '',
            };
        case SpecificationsActionTypes.CREATE_SPECIFICATION_SUCCESS:
            return {
                ...state,
                error: action.payload,
            };
        case SpecificationsActionTypes.DELETE_SPECIFICATION_SUCCESS:
            return {
                ...state,
                specifications: state.specifications.filter(specification => specification._id !== action.payload),
                error: '',
            };
        case SpecificationsActionTypes.DELETE_SPECIFICATION_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case SpecificationsActionTypes.CREATE_EXAMPLE_SUCCESS:
            return {
                ...state,
                specifications: [...state.specifications.map((specification) => {
                    if (specification._id === action.payload._id) {
                        const updatedSpec = action.payload;
                        updatedSpec.isOpen = true;
                        return updatedSpec;
                    }
                    return specification;
                }
                )],
                error: '',
            };
        case SpecificationsActionTypes.CREATE_EXAMPLE_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
}
