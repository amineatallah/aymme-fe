import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs/operators';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-experience-form-dialog',
  templateUrl: './experience-form-dialog.component.html',
  styleUrls: ['./experience-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceFormDialogComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();
  experienceData: any;
  experienceForm: FormGroup;
  isEditing = false;
  isSyncingExperience$: Observable<boolean>;

  constructor(
    public activeModal: NgbActiveModal,
    private actions$: Actions,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.isSyncingExperience$ = this.store.pipe(select(experiencesSelectors.isSyncingExperience));
    const experienceFormData = this.destructureExperienceDetail(this.experienceData);

    if (this.experienceData.name) {
      this.isEditing = true;
    }

    this.experienceForm = new FormGroup({
      username: new FormControl(experienceFormData.username, [Validators.required]),
      password: new FormControl(experienceFormData.password, [Validators.required]),
      experienceName: new FormControl({ value: this.experienceData.name, disabled: this.isEditing }, [Validators.required]),
      host: new FormControl(experienceFormData.host, [Validators.required]),
      loginUrl: new FormControl(experienceFormData.loginUrl, [Validators.required]),
      identityLoginUrl: new FormControl(experienceFormData.identityLoginUrl),
      useIdentity: new FormControl(experienceFormData.useIdentity),
      modelUrl: new FormControl(experienceFormData.modelUrl, [Validators.required]),
      grant_type: new FormControl(experienceFormData.grant_type, [Validators.required]),
      client_id: new FormControl(experienceFormData.client_id, [Validators.required])
    });

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => {
        this.activeModal.close(true);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  destructureExperienceDetail(experienceData) {
    const experienceFormData = {
      host: '',
      username: '',
      password: '',
      loginUrl: '/api/auth/login',
      identityLoginUrl: 'https://<HOST_and_PORT>/auth/realms/<REALM_NAME>/protocol/openid-connect/token',
      modelUrl: '/api/portal/portals',
      useIdentity: false,
      grant_type: 'password',
      client_id: 'bb-tooling-client'
    };

    return {...experienceFormData, ...experienceData};
  }

  dismissModal() {
    this.activeModal.dismiss(false);
    return false;
  }

  addExperience() {
    const experienceFormValue = this.experienceForm.getRawValue();
    this.store.dispatch(new experiencesActions.SyncExperience(experienceFormValue))
  }
}
