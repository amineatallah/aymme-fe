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
  isEditing: boolean = false;
  isSyncingExperience$: Observable<boolean>;

  constructor(
    public activeModal: NgbActiveModal,
    private actions$: Actions,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.isSyncingExperience$ = this.store.pipe(select(experiencesSelectors.isSyncingExperience));
    let experienceFormData = this.destructureExperienceDetail(this.experienceData);

    if (this.experienceData.name) {
      this.isEditing = true;
    }

    this.experienceForm = new FormGroup({
      experienceName: new FormControl({ value: this.experienceData.name, disabled: this.isEditing }, [Validators.required]),
      hostAddress: new FormControl(experienceFormData.hostAddress, [Validators.required]),
      portNumber: new FormControl(experienceFormData.portNumber),
      experienceLoginUrl: new FormControl(experienceFormData.experienceLoginUrl, [Validators.required]),
      experienceModelUrl: new FormControl(experienceFormData.experienceModelUrl, [Validators.required]),
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
    let experienceFormData = {
      hostAddress: '',
      portNumber: '8080',
      experienceLoginUrl: '/gateway/api/auth/login',
      experienceModelUrl: '/gateway/api/portals'
    }

    let loginUrlRegexWithPort = /http?:\/\/?([-a-zA-Z0-9@:%._\+~#=]{1,256}):(\d*)(\/.*)/g;
    let modelUrlRegexWithPort = /http?:\/\/?([-a-zA-Z0-9@:%._\+~#=]{1,256}):(\d*)(\/.*)/g;
    let loginUrlRegexWithoutPort = /http?:\/\/?([-a-zA-Z0-9@:%._\+~#=]{1,256})(\/.*)/g;
    let modelUrlRegexWithoutPort = /http?:\/\/?([-a-zA-Z0-9@:%._\+~#=]{1,256})(\/.*)/g;

    if (this.experienceData.loginUrl) {

      let loginMatch = loginUrlRegexWithPort.exec(experienceData.loginUrl);

      if (loginMatch) {
        experienceFormData.hostAddress = loginMatch[1];
        experienceFormData.portNumber = loginMatch[2]
        experienceFormData.experienceLoginUrl = loginMatch[3]

        let modelMatch = modelUrlRegexWithPort.exec(experienceData.host);
        experienceFormData.experienceModelUrl = modelMatch[3];
      }
      else {
        let loginWithoutPortMatch = loginUrlRegexWithoutPort.exec(experienceData.loginUrl);

        if (loginWithoutPortMatch) {
          experienceFormData.hostAddress = loginMatch[1];
          experienceFormData.experienceLoginUrl = loginMatch[2]

          let modelMatch = modelUrlRegexWithoutPort.exec(experienceData.host);
          experienceFormData.experienceModelUrl = modelMatch[2];
        }
      }

    }

    return experienceFormData;
  }

  dismissModal() {
    this.activeModal.dismiss(false);
    return false;
  }

  addExperience() {
    let experienceFormValue = this.experienceForm.getRawValue();
    let baseUrl = `http://${experienceFormValue.hostAddress}${experienceFormValue.portNumber ? ':' + experienceFormValue.portNumber : ''}`

    this.store.dispatch(new experiencesActions.SyncExperience({
      portalName: experienceFormValue.experienceName,
      loginUrl: baseUrl + experienceFormValue.experienceLoginUrl,
      portalUrl: baseUrl + experienceFormValue.experienceModelUrl,
    }));
  }
}
