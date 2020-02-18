import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HomeService } from '../shared/home.service';
import { ToastrService } from 'ngx-toastr';
import * as servicesSelectors from '../state/services/services.selectors';
import * as servicesActions from '../state/services/services.actions';
import { tap, take, takeUntil } from 'rxjs/operators';
import { Endpoint } from '../shared/service.interface';
import { collapseExpandAnimation } from '../shared/animation';
import { ModalService } from '../shared/modal.service';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  animations: [
    collapseExpandAnimation
  ]
})
export class ServicesListComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  isInitializing = true;
  allHidden = false;

  readonly services$: Observable<any> = this.store.pipe(
    select(servicesSelectors.getServices),
    tap(services => {
      if (!this.isInitializing || services.length <= 0) {
        return;
      }
      // Select the first service and first endpoint (For development of AYMME purpose)
      this.setSelectedEndpoint(services[0].endpoints[0]);
      this.isInitializing = false;
    })
  );
  readonly hasServices$: Observable<any> = this.store.pipe(
    select(servicesSelectors.hasServices)
  );
  readonly selectedEndpoint$: Observable<any> = this.store.pipe(
    select(servicesSelectors.getSelectedEndpoint)
  );

  constructor(
    private store: Store<any>,
    private toastr: ToastrService,
    private modalService: ModalService,
    private actions$: Actions,
  ) { }

  ngOnInit() {
    this.loadServices();

    this.actions$.pipe(
      ofType(servicesActions.ServicesActionTypes.DELETE_SERVICE),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.error('Service deleted successfully!', '')
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(servicesActions.ServicesActionTypes.DELETE_ENDPOINT_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.error('Endpoint deleted successfully!', '')
      )
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  loadServices() {
    this.store.dispatch(new servicesActions.LoadServices());
    this.allHidden = false;
    return false;
  }

  customFormat(endpoint: string, serviceName: string): string {
    return endpoint
      .replace('/gateway/api', '')
      .replace(serviceName + '/', '')
  }

  toggleAll(services: any[]) {
    this.allHidden = !this.allHidden;
    services.map(service => (service.hidden = this.allHidden));
    return false;
  }

  openConfirmDeleteService(service, event) {
    this.modalService.confirm(
      'Are you sure you want to delete the service?', 'Service', service.serviceName
    ).pipe(
      take(1)
    ).subscribe(result => {
      if (result === true) {
        this.deleteService(service._id);
      }
    });
    event.stopPropagation();
  }

  openConfirmDeleteEndpoint(endpoint) {
    this.modalService.confirm(
      'Are you sure you want to delete the endpoint?', 'Endpoint', endpoint.path
    ).pipe(
      take(1)
    ).subscribe(result => {
      if (result === true) {
        this.deleteEndpoint(endpoint.id);
      }
    });
  }

  deleteService(serviceName: string) {
    this.store.dispatch(new servicesActions.DeleteService(serviceName));
  }

  setSelectedEndpoint(endpoint: Endpoint) {
    this.store.dispatch(new servicesActions.LoadSelectedEndpoint(endpoint));
  }

  deleteEndpoint(endpointId: string) {
    this.store.dispatch(new servicesActions.DeleteEndpoint(endpointId));
  }

}
