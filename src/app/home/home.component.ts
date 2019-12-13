import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  services$: Observable<any>;

  constructor(private homeService: HomeService, ) { }

  ngOnInit() {
    this.services$ = this.homeService.getServices()
  }

  deleteService(serviceName: string) {
    this.services$ = this.homeService.deleteService(serviceName).pipe(
      switchMap(() => this.homeService.getServices())
    )
  }
}
