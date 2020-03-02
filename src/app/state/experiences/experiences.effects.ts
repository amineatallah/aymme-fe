import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as experiencesActions from "./experiences.actions";
import { concatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../shared/home.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions$: Actions,
    private homeService: HomeService,
    private toastr: ToastrService,
  ) { }

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
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to load Experiences!');
            return of(new experiencesActions.LoadExperiencesFailure(err))
          }
        )
      )
    })
  );

  @Effect()
  syncExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE),
    concatMap((action: experiencesActions.SyncExperience) =>
      this.homeService.syncModel(action.payload).pipe(
        map(
          (experience: any[]) => {
            this.toastr.success('Experience synced successfully!', '')
            return new experiencesActions.SyncExperienceSuccess(experience);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to sync Experience!');
            return of(new experiencesActions.SyncExperienceFailure(err))
          }
        )
      )
    )
  );

  @Effect()
  updateExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.UPDATE_EXPERIENCE),
    concatMap((action: experiencesActions.UpdateExperience) =>

      this.homeService.updateModel(action.payload.experienceName, action.payload.data).pipe(
        map(
          (results: any[]) => {
            this.toastr.success('', 'Experience updated successfully!');
            new experiencesActions.UpdateExperienceSuccess(results);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to update Experience!');
            return of(new experiencesActions.UpdateExperienceFailure(err))
          }
        )
      )
    )
  );

  @Effect()
  deleteExperience$ = this.actions$.pipe(
    ofType(experiencesActions.ExperiencesActionTypes.DELETE_EXPERIENCE),
    concatMap((action: experiencesActions.DeleteExperience) =>
      this.homeService.deleteExperience(action.payload).pipe(
        map(
          (results: any[]) => {
            this.toastr.success('', 'Experience deleted successfully!');
            return new experiencesActions.DeleteExperienceSuccess(action.payload);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete Experience!');
            return of(new experiencesActions.DeleteExperienceFailure(err))
          }
        )
      )
    )
  );
}
