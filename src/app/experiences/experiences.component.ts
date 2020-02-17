import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../shared/home.service';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  experiences$: Observable<any>;
  experienceForm: FormGroup;

  constructor(
    private store: Store<any>,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.experienceForm = new FormGroup({
      experienceName: new FormControl(''),
      experienceLoginUrl: new FormControl('http://<IP_ADDRESS>:8080/gateway/api/auth/login'),
      experienceModelUrl: new FormControl('http://<IP_ADDRESS>:8080/gateway/api/portals'),
    });

    this.store.dispatch(new experiencesActions.LoadExperiences());
    this.experiences$ = this.store.pipe(select(experiencesSelectors.getExperiences));
  }

  deleteExperience(experienceName: string, event) {
    if (confirm('Are you sure to delete')) {
      this.store.dispatch(new experiencesActions.DeleteExperience(experienceName));
    }
    event.stopPropagation();
    return false;
  }

  openAddExperienceModal(addExperienceFormContent) {
    this.modalService.open(addExperienceFormContent, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }

  addExperience() {
    let experienceFormValue = this.experienceForm.value;

    this.store.dispatch(new experiencesActions.SyncExperience({
      portalName: experienceFormValue.experienceName,
      loginUrl: experienceFormValue.experienceLoginUrl,
      portalUrl: experienceFormValue.experienceModelUrl,
    }));
  }
}
