import { Action } from '@ngrx/store';

export enum SpecificationsActionTypes {
    LOAD_SPECIFICATIONS = '[Specifications] Load',
    LOAD_SPECIFICATIONS_SUCCESS = '[Specifications] Load Success',
    LOAD_SPECIFICATIONS_FAILURE = '[Specifications] Load Failure',
    CREATE_SPECIFICATION = '[Specifications] Create',
    CREATE_SPECIFICATION_SUCCESS = '[Specifications] Create Specification Success',
    CREATE_SPECIFICATION_FAILURE = '[Specifications] Create Specification Failure',
    DELETE_SPECIFICATION = '[Specifications] Delete',
    DELETE_SPECIFICATION_SUCCESS = '[Specifications] Delete Specification Success',
    DELETE_SPECIFICATION_FAILURE = '[Specifications] Delete Specification Failure',
    CREATE_EXAMPLE = '[Specifications] Create Example',
    CREATE_EXAMPLE_SUCCESS = '[Specifications] Create Example Success',
    CREATE_EXAMPLE_FAILURE = '[Specifications] Create Example Failure',
}

export class LoadSpecifications implements Action {
    readonly type = SpecificationsActionTypes.LOAD_SPECIFICATIONS;
}

export class LoadSpecificationsSuccess implements Action {
    readonly type = SpecificationsActionTypes.LOAD_SPECIFICATIONS_SUCCESS;

    constructor(public payload: any[]) { }
}

export class LoadSpecificationsFailure implements Action {
    readonly type = SpecificationsActionTypes.LOAD_SPECIFICATIONS_FAILURE;

    constructor(public payload: string) { }
}

export class CreateSpecification implements Action {
    readonly type = SpecificationsActionTypes.CREATE_SPECIFICATION;
    constructor(public payload: any) { }
}

export class CreateSpecificationSuccess implements Action {
    readonly type = SpecificationsActionTypes.CREATE_SPECIFICATION_SUCCESS;

    constructor(public payload: any) { }
}

export class CreateSpecificationFailure implements Action {
    readonly type = SpecificationsActionTypes.CREATE_SPECIFICATION_FAILURE;

    constructor(public payload: string) { }
}

export class DeleteSpecification implements Action {
    readonly type = SpecificationsActionTypes.DELETE_SPECIFICATION;

    constructor(public payload: string) { }
}

export class DeleteSpecificationSuccess implements Action {
    readonly type = SpecificationsActionTypes.DELETE_SPECIFICATION_SUCCESS;

    constructor(public payload: string) { }
}

export class DeleteSpecificationFailure implements Action {
    readonly type = SpecificationsActionTypes.DELETE_SPECIFICATION_FAILURE;

    constructor(public payload: string) { }
}

export class CreateExample implements Action {
    readonly type = SpecificationsActionTypes.CREATE_EXAMPLE;

    constructor(public payload: any) { }
}

export class CreateExampleSuccess implements Action {
    readonly type = SpecificationsActionTypes.CREATE_EXAMPLE_SUCCESS;

    constructor(public payload: any) { }
}

export class CreateExampleFailure implements Action {
    readonly type = SpecificationsActionTypes.CREATE_EXAMPLE_FAILURE;

    constructor(public payload: string) { }
}

export type SpecificationsActions =
    | LoadSpecifications
    | LoadSpecificationsSuccess
    | LoadSpecificationsFailure
    | CreateSpecification
    | CreateSpecificationSuccess
    | CreateSpecificationFailure
    | DeleteSpecification
    | DeleteSpecificationSuccess
    | DeleteSpecificationFailure
    | CreateExample
    | CreateExampleSuccess
    | CreateExampleFailure;
