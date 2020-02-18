import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { FormGroup, FormControl } from '@angular/forms';
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
  experienceForm: FormGroup;
  formModalReference: any;

  constructor(
    private store: Store<any>,
    private modalService: ModalService,
    private ngModalService: NgbModal,
    private actions$: Actions,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.experienceForm = new FormGroup({
      experienceName: new FormControl(''),
      hostAddress: new FormControl(''),
      portNumber: new FormControl('8080'),
      experienceLoginUrl: new FormControl('/gateway/api/auth/login'),
      experienceModelUrl: new FormControl('/gateway/api/portals'),
    });

    this.store.dispatch(new experiencesActions.LoadExperiences());
    this.experiences$ = this.store.pipe(select(experiencesSelectors.getExperiences));

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.success('Experience synced successfully!', '');
        this.dismissFormModal();
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_FAILURE),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.error('Unable to sync Experience!', '');
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.DELETE_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.error('Experience deleted successfully!', '');
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

  openAddExperienceModal(addExperienceFormContent) {
    this.formModalReference = this.ngModalService.open(addExperienceFormContent, { backdrop: 'static', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => { }, (reason) => { });
  }

  addExperience() {
    let experienceFormValue = this.experienceForm.value;

    let baseUrl = `http://${experienceFormValue.hostAddress}${experienceFormValue.portNumber ? ':' + experienceFormValue.portNumber : ''}`

    this.store.dispatch(new experiencesActions.SyncExperience({
      portalName: experienceFormValue.experienceName,
      loginUrl: baseUrl + experienceFormValue.experienceLoginUrl,
      portalUrl: baseUrl + experienceFormValue.experienceModelUrl,
    }));
  }
}
