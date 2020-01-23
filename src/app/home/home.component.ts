import { Component, OnInit } from "@angular/core";
import { HomeService } from "./home.service";
import { Observable, of } from "rxjs";
import { pluck, tap } from "rxjs/operators";

//import * as fromServices from './state';
import * as servicesActions from "./state/services.actions";
import { Store, select } from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly services$: Observable<any> = this.store.pipe(
    select("services"),
    pluck("services")
  );

  deleteService$: Observable<any>;

  constructor(private store: Store<any>, private homeService: HomeService) {}

  ngOnInit() {
    this.store.dispatch(new servicesActions.LoadServices());
  }

  deleteService(serviceName: string) {
    this.deleteService$ = this.homeService.deleteService(serviceName).pipe(
      tap(() => {
        this.store.dispatch(new servicesActions.DeleteServiceSuccess(serviceName));
      }),
      tap ((errorResponse) => {
        this.store.dispatch(new servicesActions.DeleteServiceFailure(errorResponse));
      })
    );
  }
}
