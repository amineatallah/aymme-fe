import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as servicesActions from "./services.actions";
import { concatMap, map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../home.service";

@Injectable()
export class ServicesEffects {
  constructor(private actions$: Actions, private homeService: HomeService) {}

  @Effect()
  loadServices$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.LoadServices),
    concatMap((action: servicesActions.LoadServices) =>
      this.homeService.getServices().pipe(
        map(
          (services: any[]) => new servicesActions.LoadServicesSuccess(services)
        ),
        catchError(err => of(new servicesActions.LoadServicesFailure(err)))
      )
    )
  );
}
