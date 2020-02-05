import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as servicesSelectors from '../state/services/services.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"]
})
export class ServiceComponent implements OnInit {
  endpoints$: Observable<any>;

  selectedService$: Observable<any>;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private service: HomeService,
    private store: Store<any>
  ) {}

  ngOnInit() {}

  deleteEndpoint(id: string) {
    // this.endpoints$ = this.service.deleteEndpointById(id).pipe(
    //   switchMap(() => this.service.getServiceEndpoints(this.activeRoute.snapshot.params.service)),
    //   tap(this.navigate.bind(this))
    // );
  }
}
