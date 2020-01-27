import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import * as servicesSelectors from '../service/state/services.selectors';

//import * as fromServices from './state';
import * as servicesActions from "../service/state/services.actions";
import { Store, select } from "@ngrx/store";
import { ToastrService } from 'ngx-toastr';
import { Service } from '../service/service.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly services$: Observable<any> = this.store.pipe(select(servicesSelectors.getServices));

  deleteService$: Observable<any>;

  constructor(
    private store: Store<any>,
    private homeService: HomeService,
    private toastr: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.store.dispatch(new servicesActions.LoadServices());
  }

  deleteService(serviceName: string) {
    this.deleteService$ = this.homeService.deleteService(serviceName).pipe(
      tap(() => {
        this.store.dispatch(new servicesActions.DeleteServiceSuccess(serviceName));

        this.toastr.success('Deleted successfully!', serviceName);
      }),
      catchError ((errorResponse) => {
        this.store.dispatch(new servicesActions.DeleteServiceFailure(errorResponse));
        this.toastr.error('Could not delete the service.', errorResponse );
        return errorResponse;
      })
    );
  }

  setSelectedService(service: Service) {
    this.store.dispatch(new servicesActions.SetSelectedService(service));
    this.router.navigate(['/services', service.serviceName]);
  }
}
