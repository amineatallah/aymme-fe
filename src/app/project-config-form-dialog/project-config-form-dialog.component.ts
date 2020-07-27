import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as projectsActions from '../state/projects/projects.actions';
import * as servicesActions from '../state/services/services.actions';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'project-config-form-dialog',
  templateUrl: './project-config-form-dialog.component.html',
  styleUrls: ['./project-config-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectConfigFormDialogComponent implements OnInit, OnDestroy {
  configForm: FormGroup;
  projectData: any;
  destroyed$ = new Subject<boolean>();
  whitelist: string[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private actions$: Actions,
    private store: Store<any>,
  ) {

  }

  ngOnInit() {
    this.configForm = new FormGroup({
      username: new FormControl(this.projectData.username, [Validators.required]),
      password: new FormControl(this.projectData.password, [Validators.required]),
      host: new FormControl(this.projectData.host, [Validators.required]),
      loginUri: new FormControl(this.projectData.loginUri, [Validators.required]),
      identityLoginUrl: new FormControl(this.projectData.identityLoginUrl),
      useIdentity: new FormControl(this.projectData.useIdentity),
      grant_type: new FormControl(this.projectData.grant_type || 'password', [Validators.required]),
      client_id: new FormControl(this.projectData.client_id || 'bb-tooling-client', [Validators.required]),
      whitelist: new FormControl('')
    });

    this.actions$.pipe(
      ofType(servicesActions.ServicesActionTypes.UPDATE_PROJECT_CONFIG),
      takeUntil(this.destroyed$),
      tap(() => {
        this.activeModal.close(true);
      })
    ).subscribe();
    this.whitelist = [...this.projectData.whitelist_params];
  }

  updateConfig(){
    let data = {
      username: this.configForm.value.username,
      password: this.configForm.value.password,
      host: this.configForm.value.host,
      loginUri: this.configForm.value.loginUri,
      identityLoginUrl: this.configForm.value.identityLoginUrl,
      useIdentity: this.configForm.value.useIdentity,
      grant_type: this.configForm.value.grant_type,
      client_id: this.configForm.value.client_id,
      whitelist_params: this.whitelist,
      regex: ''
    };
    this.store.dispatch(new projectsActions.UpdateProjectConfig({projectName: this.projectData.projectName, data}));
  }

  dismissModal() {
    this.activeModal.dismiss(false);
    return false;
  }
  
  addParam() {
    let value: string = this.configForm.get('whitelist').value.trim();
    if(value !== '') {
      this.whitelist.unshift(value);
    }
  }

  removeParam(i) {
    this.whitelist.splice(i, 1);
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}