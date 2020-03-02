import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { HomeService } from '../shared/home.service';
import * as servicesSelectors from '../state/services/services.selectors';
import * as servicesActions from '../state/services/services.actions';
import { tap, take } from 'rxjs/operators';
import { Endpoint } from '../shared/service.interface';
import { collapseExpandAnimation } from '../shared/animation';
import { ModalService } from '../shared/modal.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss'],
  animations: [
    collapseExpandAnimation
  ]
})
export class ServicesListComponent implements OnInit {
  isInitializing = true;
  allHidden = false;
  importServicesForm : FormGroup;

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
    private modalService: ModalService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.importServicesForm = this.formBuilder.group({
      importFiles: new FormControl(''),
    });
    this.loadServices(true);
  }

  loadServices(initializing : boolean) {
    this.store.dispatch(new servicesActions.LoadServices(initializing));
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
      'Are you sure you want to delete this service, all its endpoints and mocked data?', 'Service', service.serviceName
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
      'Are you sure you want to delete the endpoint with its mocked data?', 'Endpoint', endpoint.path
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

  onFileChange(event): void {
    this.store.dispatch(new servicesActions.ImportServices(event.target.files[0]));
    this.importServicesForm.reset();
  }
  
  exportServices() {
    const currentDate = new Date().toISOString();
    const fileName = `services-${currentDate}.json`;

    this.homeService.exportServices(fileName);
  }

}
