import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ExperienceFormDialogComponent } from '../experience-form-dialog/experience-form-dialog.component';
import { ProjectFormDialogComponent } from '../project-form-dialog/project-form-dialog.component';
import { ProjectConfigFormDialogComponent } from '../project-config-form-dialog/project-config-form-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModal: NgbModal) { }

  confirm(
    prompt = 'Are you sure?', title = 'Confirm', details = ''
  ): Observable<boolean> {
    const modal = this.ngbModal.open(
      ConfirmDialogComponent, { backdrop: 'static' });

    modal.componentInstance.prompt = prompt;
    modal.componentInstance.title = title;
    modal.componentInstance.details = details;

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }

  experienceFormModal(
    experienceData = {}
  ): Observable<boolean> {
    const modal = this.ngbModal.open(
      ExperienceFormDialogComponent, { backdrop: 'static' });

    modal.componentInstance.experienceData = experienceData;

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }

  projectConfigFormModal(
    projectData = {}
  ): Observable<boolean> {
    const modal = this.ngbModal.open(
      ProjectConfigFormDialogComponent, { backdrop: 'static' });

    modal.componentInstance.projectData = projectData;

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }

  projectFormModal(
  ): Observable<boolean> {
    const modal = this.ngbModal.open(
      ProjectFormDialogComponent, { backdrop: 'static' });

    return from(modal.result).pipe(
      catchError(error => {
        console.warn(error);
        return of(undefined);
      })
    );
  }
}
