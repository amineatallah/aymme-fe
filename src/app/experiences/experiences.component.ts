import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../shared/home.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  experiences$: Observable<any>;

  constructor(private service: HomeService,
    private store: Store<any>) { }

  ngOnInit() {

    this.experiences$ = this.service.getPortals();
  }

  deleteExperience(experienceName: string) {
    console.log('DELETE: ' + experienceName);
    return false;
  }

}
