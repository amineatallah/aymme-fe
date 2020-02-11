import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../shared/home.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-portals',
  templateUrl: './portals.component.html',
  styleUrls: ['./portals.component.scss']
})
export class PortalsComponent implements OnInit {
  portals$: Observable<any>

  constructor(private service: HomeService) { }

  ngOnInit() {

    this.portals$ = this.service.getPortals().pipe(
      tap(console.log)
    );
  }

}
