import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isScrollingDown = false;
  scroll$: Observable<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.scroll$ = fromEvent(window, 'scroll').pipe(
      map(() => window.pageYOffset)
    );

    this.scroll$.subscribe(res => {
      this.isScrollingDown = res >= 80 ? true : false;
    });
  }

}
