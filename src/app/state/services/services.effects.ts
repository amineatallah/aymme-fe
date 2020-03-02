import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import * as servicesActions from "./services.actions";
import { concatMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { HomeService } from "../../shared/home.service";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ServicesEffects {
  constructor(private actions$: Actions, private homeService: HomeService, private toastr: ToastrService) { }

  @Effect()
  loadServices$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.LOAD_SERVICES),
    concatMap((action: servicesActions.LoadServices) =>
      this.homeService.getServices().pipe(
        map(
          (services: any[]) => {
            if (!action.initializing) {
              this.toastr.success('', 'Succesfully refreshed services!');
            }
            return new servicesActions.LoadServicesSuccess(services);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to load services!');
            return of(new servicesActions.LoadServicesFailure(err))
          }
        )
      )
    )
  );

  @Effect()
  loadSelectedEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.LOAD_SELECTED_ENDPOINT),
    concatMap((action: servicesActions.LoadSelectedEndpoint) =>
      this.homeService.getEndpoint(action.payload.id).pipe(
        map(
          (endpoint: any) => new servicesActions.LoadEndpointSuccess(endpoint)
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete service!');
            return of(new servicesActions.LoadEndpointFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  deleteService$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.DELETE_SERVICE),
    concatMap((action: servicesActions.DeleteService) =>
      this.homeService.deleteService(action.payload).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Service deleted successfully!');
            return new servicesActions.DeleteServiceSuccess(action.payload)
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete service!');
            return of(new servicesActions.DeleteServiceFailure(err))
          }
        )
      )
    )
  );

  @Effect()
  deleteEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.DELETE_ENDPOINT),
    concatMap((action: servicesActions.DeleteEndpoint) =>
      this.homeService.deleteEndpointById(action.payload).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Endpoint deleted successfully!');
            return new servicesActions.DeleteEndpointSuccess(action.payload);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete endpoint!');
            return of(new servicesActions.DeleteEndpointFailure(err))
          }
        )
      )
    )
  );

  @Effect()
  updateEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.UPDATE_ENDPOINT),
    concatMap((action: servicesActions.UpdateEndpoint) =>
      this.homeService.updateEndpoint(action.payload.id, action.payload).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Mocks updated successfully!');
            return new servicesActions.UpdateEndpointSuccess(result);
          }
        ),
        catchError(
          err => {
            console.log(err);
            this.toastr.error(err.error.message, 'Unable to update mocks!');
            return of(new servicesActions.UpdateEndpointFailure(err));
          })
      )
    )
  );

  @Effect()
  exportServices$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.IMPORT_SERVICES),
    concatMap((action: servicesActions.ImportServices) => {
      return this.homeService.importServices(action.payload).pipe(
        map(
          (result: any) => {
            this.toastr.success('Services imported successfully!', '');
            return new servicesActions.ImportServicesSuccess(result);
          }
        ),
        catchError(err => {
          this.toastr.error(err.error.message, 'Unable to import services!');
          return of(new servicesActions.ImportServicesFailure(err));
        })
      )
    })
  );
}
