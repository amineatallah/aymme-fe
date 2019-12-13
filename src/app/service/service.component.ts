import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  endpoints$: Observable<any>
  constructor(private activeRoute:ActivatedRoute, private router: Router, private service: HomeService) { }

  ngOnInit() {
    this.endpoints$ = this.service.getServiceEndpoints(this.activeRoute.snapshot.params.service).pipe(
      tap(this.navigate.bind(this))
    );
  }

  deleteEndpoint(id: string) {
    this.endpoints$ = this.service.deleteEndpointById(id).pipe(
      switchMap(() => this.service.getServiceEndpoints(this.activeRoute.snapshot.params.service)),
      tap(this.navigate.bind(this))
    );
  }

  navigate(data){
    this.router.navigate([ data[0]._id], {relativeTo: this.activeRoute})
  }
}
