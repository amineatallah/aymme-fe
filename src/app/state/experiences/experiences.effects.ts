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
  loadExperiences$ = this.actions$.pipe(
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

  @Effect()
  addExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.ADD_EXPERIENCE),
    concatMap((action: experiencesActions.AddExperience) =>
      this.homeService.syncModel(action.payload).pipe(
        map(
          (experience: any[]) => new experiencesActions.AddExperienceSuccess(experience)
        ),
        catchError(err => of(new experiencesActions.AddExperienceFailure(err)))
      )
    )
  );

  // @Effect()
  // deleteExperience$ = this.actions$.pipe(
  //   ofType(experiencesActions.ExperiencesActionTypes.DELETE_EXPERIENCE),
  //   concatMap((action: experiencesActions.DeleteExperience) =>
  //     this.homeService.deleteExperience(action.payload).pipe(
  //       map(
  //         (results: any[]) => new experiencesActions.DeleteExperienceSuccess(action.payload)
  //       ),
  //       catchError(err => of(new experiencesActions.DeleteExperienceFailure(err)))
  //     )
  //   )
  // );
}
