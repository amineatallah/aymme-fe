import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as experiencesActions from "./experiences.actions";
import { concatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../shared/home.service";

@Injectable()
export class ExperiencesEffects {
  constructor(private actions$: Actions, private homeService: HomeService) { }

  @Effect()
  loadPortals$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.LOAD_EXPERIENCES),
    concatMap((action: experiencesActions.LoadExperiences) =>
      this.homeService.getPortals().pipe(
        map(
          (portals: any[]) => new experiencesActions.LoadExperiencesSuccess(portals)
        ),
        catchError(err => of(new experiencesActions.LoadExperiencesFailure(err)))
      )
    )
  );
}
