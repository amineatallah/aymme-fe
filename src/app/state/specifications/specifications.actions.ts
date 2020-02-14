import { Action } from "@ngrx/store";

export enum SpecificationsActionTypes {
    LoadSpecifications = "[Specifications] Load",
    LoadSpecificationsSuccess = "[Specifications] Load Success",
    LoadSpecificationsFailure = "[Specifications] Load Failure",
    CreateSpecification = "[Specifications] Create",
    CreateSpecificationSuccess = "[Specifications] Create Specification Success",
    CreateSpecificationFailure = "[Specifications] Create Specification Failure",
    DeleteSpecification = "[Specifications] Delete",
    DeleteSpecificationSuccess = "[Specifications] Delete Specification Success",
    DeleteSpecificationFailure = "[Specifications] Delete Specification Failure",
    CreateExample = "[Specifications] Create Example",
    CreateExampleSuccess = "[Specifications] Create Example Success",
    CreateExampleFailure = "[Specifications] Create Example Failure",
}

export class LoadSpecifications implements Action {
    readonly type = SpecificationsActionTypes.LoadSpecifications;
}

export class LoadSpecificationsSuccess implements Action {
    readonly type = SpecificationsActionTypes.LoadSpecificationsSuccess;

    constructor(public payload: any[]) { }
}

export class LoadSpecificationsFailure implements Action {
    readonly type = SpecificationsActionTypes.LoadSpecificationsFailure;

    constructor(public payload: string) { }
}

export class CreateSpecification implements Action {
    readonly type = SpecificationsActionTypes.CreateSpecification;
    constructor(public payload: any) { }
}

export class CreateSpecificationSuccess implements Action {
    readonly type = SpecificationsActionTypes.CreateSpecificationSuccess;

    constructor(public payload: any) { }
}

export class CreateSpecificationFailure implements Action {
    readonly type = SpecificationsActionTypes.CreateSpecificationFailure;

    constructor(public payload: string) { }
}

export class DeleteSpecification implements Action {
    readonly type = SpecificationsActionTypes.DeleteSpecification;

    constructor(public payload: string) { }
}

export class DeleteSpecificationSuccess implements Action {
    readonly type = SpecificationsActionTypes.DeleteSpecificationSuccess;

    constructor(public payload: string) { }
}

export class DeleteSpecificationFailure implements Action {
    readonly type = SpecificationsActionTypes.DeleteSpecificationFailure;

    constructor(public payload: string) { }
}

export class CreateExample implements Action {
    readonly type = SpecificationsActionTypes.CreateExample;

    constructor(public payload: any) { }
}

export class CreateExampleSuccess implements Action {
    readonly type = SpecificationsActionTypes.CreateExampleSuccess;

    constructor(public payload: any) { }
}

export class CreateExampleFailure implements Action {
    readonly type = SpecificationsActionTypes.CreateExampleFailure;

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