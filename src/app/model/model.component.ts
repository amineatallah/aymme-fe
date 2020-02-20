import { Component, OnInit, ViewChildren, ElementRef, QueryList, OnDestroy } from '@angular/core';
import { HomeService } from '../shared/home.service';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions'
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, OnDestroy {
  body: any;
  data: any;
  portals: any;
  selectedExperience$: any;
  selectedExperience: any;
  selectedExperienceName$: Observable<any>;
  destroyed$ = new Subject<boolean>();

  public options = new JsonEditorOptions;
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>
  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private actions$: Actions,
    private toastr: ToastrService,
    ) { }
    

  ngOnInit() {
    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = true;

    this.selectedExperienceName$ = this.route.params.pipe(
      tap((params: any) => {
        this.store.dispatch(new experiencesActions.LoadExperiences);

        this.selectedExperience$ = this.store.select(experiencesSelectors.getExperienceByName, { name: params.experienceName }).pipe(tap((selectedExperience) => {
          if (!selectedExperience) {
            return;
          }

          this.selectedExperience = selectedExperience;

          this.body = selectedExperience.pages.find(page => page.name === selectedExperience.activePage);
        }))
      })
    );

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_SUCCESS),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Experience synced successfully!', '')
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.SYNC_EXPERIENCE_FAILURE),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.error('Unable to sync Experience!', '');
      })
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.UPDATE_EXPERIENCE),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Experience updated successfully!', '')
      )
    ).subscribe();

    this.actions$.pipe(
      ofType(experiencesActions.ExperiencesActionTypes.UPDATE_EXPERIENCE_FAILURE),
      takeUntil(this.destroyed$),
      tap(() => {
        this.toastr.error('Unable to update Experience!', '');
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  selectPage(selectedActivePage) {
    this.store.dispatch(new experiencesActions.SetActiveExperience({ selectedExperienceName: this.selectedExperience.name, newActivePage: selectedActivePage.name }));
  }

  syncModel() {
    this.store.dispatch(new experiencesActions.SyncExperience({
      portalName: this.selectedExperience.name,
      loginUrl: this.selectedExperience.loginUrl,
      portalUrl: this.selectedExperience.host,
    }));
  }

  updateModel() {
    let editorData: any = this.editor.first.get();
    let pages = this.selectedExperience.pages.map(page => {
      if (page.name === editorData.name) {
        return editorData;
      } else {
        return page;
      }
    });
    
    this.store.dispatch(new experiencesActions.UpdateExperience({
      experienceName: this.selectedExperience.name,
      data: {
        activePage: this.selectedExperience.activePage,
        pages: pages,
      }
    })
    );
  }
}
