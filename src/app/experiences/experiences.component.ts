import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { take } from 'rxjs/operators';
import { ModalService } from '../shared/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit {
  destroyed$ = new Subject<boolean>();
  experiences$: Observable<any>;

  constructor(
    private store: Store<any>,
    private modalService: ModalService,
    private ngModalService: NgbModal,
  ) { }

  ngOnInit() {
    this.store.dispatch(new experiencesActions.LoadExperiences());
    this.experiences$ = this.store.pipe(select(experiencesSelectors.getExperiences));
  }

  dismissFormModal() {
    this.ngModalService.dismissAll();
    return false;
  }

  openConfirmDeleteExperience(experience, event) {
    this.modalService.confirm(
      'Are you sure you want to delete the experience?', 'Experience', experience.name
    ).pipe(
      take(1)
    ).subscribe(result => {
      if (result === true) {
        this.deleteExperience(experience.name);
      }
    });
    event.stopPropagation();
    return false;
  }

  deleteExperience(experienceName: string) {
    this.store.dispatch(new experiencesActions.DeleteExperience(experienceName));
  }

  openAddExperienceModal() {
    this.modalService.experienceFormModal();
  }
}
