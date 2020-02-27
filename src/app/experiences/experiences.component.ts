import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { take, takeUntil, tap } from 'rxjs/operators';
import { ModalService } from '../shared/modal.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ofType, Actions } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss']
})
export class ExperiencesComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  experiences$: Observable<any>;

  constructor(
    private store: Store<any>,
    private modalService: ModalService,
    private ngModalService: NgbModal,
    private actions$: Actions,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.store.dispatch(new experiencesActions.LoadExperiences());
    this.experiences$ = this.store.pipe(select(experiencesSelectors.getExperiences));

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.DELETE_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.error('Experience deleted successfully!', '');
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.success('Experience synced successfully!', '');
        this.destroyed$.next(true);
        this.destroyed$.complete();
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
