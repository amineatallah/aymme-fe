import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import * as fromServices from '../service/state';

//import * as fromServices from './state';
import * as servicesActions from "../service/state/services.actions";
import { Store, select } from "@ngrx/store";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly services$: Observable<any> = this.store.pipe(select(fromServices.getServices));

  deleteService$: Observable<any>;

  constructor(private store: Store<any>, private homeService: HomeService, private toastr: ToastrService) {}

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
}
