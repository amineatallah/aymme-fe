import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as servicesActions from './services.actions';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HomeService } from '../../shared/home.service';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Injectable()
export class ServicesEffects {
  constructor(
    private actions$: Actions, 
    private homeService: HomeService, 
    private toastr: ToastrService,
    private store: Store<any>,
    ) { }

  @Effect()
  loadServices$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.LOAD_SERVICES),
    concatMap((action: servicesActions.LoadServices) => {

      return this.homeService.getServices(action.payload.projectName).pipe(
        map(
          (services: any[]) => {
            if (!action.payload.initializing) {
              this.toastr.success('', 'Succesfully refreshed services!');
            }
            return new servicesActions.LoadServicesSuccess(services);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to load services!');
            return of(new servicesActions.LoadServicesFailure(err));
          }
        )
      );
    }
    )
  );

  @Effect()
  loadSelectedEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.LOAD_SELECTED_ENDPOINT),
    concatMap((action: servicesActions.LoadSelectedEndpoint) =>
      this.homeService.getEndpoint(action.payload.projectName, action.payload.endpoint.id).pipe(
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
      this.homeService.deleteService(action.payload.projectName, action.payload.serviceName).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Service deleted successfully!');
            return new servicesActions.DeleteServiceSuccess(action.payload.serviceName);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete service!');
            return of(new servicesActions.DeleteServiceFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  deleteEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.DELETE_ENDPOINT),
    concatMap((action: servicesActions.DeleteEndpoint) =>
      this.homeService.deleteEndpointById(action.payload.projectName, action.payload.id).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Endpoint deleted successfully!');
            return new servicesActions.DeleteEndpointSuccess(action.payload.id);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to delete endpoint!');
            return of(new servicesActions.DeleteEndpointFailure(err));
          }
        )
      )
    )
  );

  @Effect()
  updateEndpoint$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.UPDATE_ENDPOINT),
    concatMap((action: servicesActions.UpdateEndpoint) =>
      this.homeService.updateEndpoint(action.payload.projectName, action.payload.data.id, action.payload.data).pipe(
        map(
          (result: any) => {
            this.toastr.success('', 'Mocks updated successfully!');
            if (action.payload.changedServiceName) {
              this.store.dispatch(new servicesActions.LoadServices({projectName: action.payload.projectName, initializing: true }));
            }

            //fetch updated data for the endpoint 
            this.store.dispatch(new servicesActions.LoadSelectedEndpoint({ projectName:action.payload.projectName, endpoint: action.payload.data }));
            return new servicesActions.UpdateEndpointSuccess(result);
          }
        ),
        catchError(
          err => {
            this.toastr.error(err.error.message, 'Unable to update mocks!');
            return of(new servicesActions.UpdateEndpointFailure(err));
          })
      )
    )
  );

  @Effect()
  exportServices$ = this.actions$.pipe(
    ofType(servicesActions.ServicesActionTypes.IMPORT_PROJECT),
    concatMap((action: servicesActions.ImportProject) => {
      return this.homeService.importProject(action.projectName, action.files).pipe(
        map(
          (result: any) => {
            this.toastr.success('Services imported successfully!', '');
            return new servicesActions.ImportProjectSuccess(result);
          }
        ),
        catchError(err => {
          this.toastr.error(err.error.message, 'Unable to import services!');
          return of(new servicesActions.ImportProjectFailure(err));
        })
      );
    })
  );
}
