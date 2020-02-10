import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as specificationsActions from "./specifications.actions";
import { concatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../home/home.service";

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
      this.homeService.createSpec(action.payload).pipe(
        map(
          (specifications: any[]) => new specificationsActions.CreateSpecificationSuccess(specifications)
        ),
        catchError(err => of(new specificationsActions.CreateSpecificationFailure(err)))
      )
    )
  );

  @Effect()
  deleteSpecifications$ = this.actions$.pipe(
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
}
