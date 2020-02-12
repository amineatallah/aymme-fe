import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as specificationsActions from "./specifications.actions";
import { concatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../shared/home.service";

@Injectable()
export class SpecificationsEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  @Effect()
  loadSpecifications$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.LoadSpecifications),
    concatMap((action: specificationsActions.LoadSpecifications) =>
      this.homeService.getSpecs().pipe(
        map(
          (specifications: any[]) => new specificationsActions.LoadSpecificationsSuccess(specifications)
        ),
        catchError(err => of(new specificationsActions.LoadSpecificationsFailure(err)))
      )
    )
  );

  @Effect()
  createSpecification$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.CreateSpecification),
    concatMap((action: specificationsActions.CreateSpecification) => 
      this.homeService.createSpec({name: action.payload.specName}).pipe(
        map(
          (specifications: any[]) => new specificationsActions.CreateSpecificationSuccess(specifications)
        ),
        catchError(err => of(new specificationsActions.CreateSpecificationFailure(err)))
      )
    )
  );

  @Effect()
  deleteSpecification$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.DeleteSpecification),
    concatMap((action: specificationsActions.DeleteSpecification) =>
      this.homeService.deleteSpecs(action.payload).pipe(
        map(
          (specifications: any) => new specificationsActions.DeleteSpecificationSuccess(action.payload)
        ),
        catchError(err => of(new specificationsActions.DeleteSpecificationFailure(err)))
      )
    )
  );

  @Effect()
  createExample$ = this.actions$.pipe(
    ofType(specificationsActions.SpecificationsActionTypes.CreateExample),
    concatMap((action: specificationsActions.CreateExample) =>
      this.homeService.uploadFile(action.payload.id, action.payload.filesToUpload).pipe(
        map(
          (specifications: any) => new specificationsActions.CreateExampleSuccess(specifications)
        ),
        catchError(err => of(new specificationsActions.CreateExampleFailure(err)))
      )
    )
  );
}
