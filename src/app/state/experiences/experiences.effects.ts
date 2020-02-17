import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as experiencesActions from "./experiences.actions";
import { concatMap, map, catchError, take, takeLast, tap } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../shared/home.service";

@Injectable()
export class ExperiencesEffects {
  constructor(private actions$: Actions, private homeService: HomeService) { }

  hasLoadedExperiences: boolean = false;

  @Effect()
  loadExperiences$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.LOAD_EXPERIENCES),
    concatMap((action: experiencesActions.LoadExperiences) => {
      if (this.hasLoadedExperiences) {
        return of();
      }
      return this.homeService.getPortals().pipe(
        map(
          (portals: any[]) => {
            this.hasLoadedExperiences = true;
            return new experiencesActions.LoadExperiencesSuccess(portals);
          }),
        catchError(err => of(new experiencesActions.LoadExperiencesFailure(err)))
      )
    })
  );

  @Effect()
  syncExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE),
    concatMap((action: experiencesActions.SyncExperience) =>
      this.homeService.syncModel(action.payload).pipe(
        map(
          (experience: any[]) => new experiencesActions.SyncExperienceSuccess(experience)
        ),
        catchError(err => of(new experiencesActions.SyncExperienceFailure(err)))
      )
    )
  );

  @Effect()
  updateExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.UPDATE_EXPERIENCE),
    concatMap((action: experiencesActions.UpdateExperience) =>

      this.homeService.updateModel(action.payload.experienceName, action.payload.data).pipe(
        map(
          (results: any[]) => new experiencesActions.UpdateExperienceSuccess(results)
        ),
        catchError(err => of(new experiencesActions.UpdateExperienceFailure(err)))
      )
    )
  );

  @Effect()
  deleteExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.DELETE_EXPERIENCE),
    concatMap((action: experiencesActions.DeleteExperience) =>
      this.homeService.deleteExperience(action.payload).pipe(
        map(
          (results: any[]) => new experiencesActions.DeleteExperienceSuccess(action.payload)
        ),
        catchError(err => of(new experiencesActions.DeleteExperienceFailure(err)))
      )
    )
  );
}
