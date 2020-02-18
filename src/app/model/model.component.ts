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
  pagesForm: FormGroup;
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

    this.pagesForm = new FormGroup({
      activePage: new FormControl('')
    });

    this.selectedExperienceName$ = this.route.params.pipe(
      tap((params: any) => {
        this.store.dispatch(new experiencesActions.LoadExperiences);

        this.selectedExperience$ = this.store.select(experiencesSelectors.getExperienceByName, { name: params.experienceName }).pipe(tap((selectedExperience) => {
          if (!selectedExperience) {
            return;
          }

          this.selectedExperience = selectedExperience;

          this.body = selectedExperience.pages.find(page => page.name === selectedExperience.activePage)
          this.pagesForm.get('activePage').setValue(selectedExperience.activePage);
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
      ofType(experiencesActions.ExperiencesActionTypes.UPDATE_EXPERIENCE),
      takeUntil(this.destroyed$),
      tap(() => this.toastr.success('Experience updated successfully!', '')
      )
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  changePage($event) {
    this.store.dispatch(new experiencesActions.SetActiveExperience({ selectedExperienceName: this.selectedExperience.name, newActivePage: this.pagesForm.get('activePage').value }));
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
      if (page.id === editorData.id) {
        return editorData;
      } else {
        return page;
      }
    });

    this.store.dispatch(new experiencesActions.UpdateExperience({
      experienceName: this.selectedExperience.name,
      data: {
        activePage: this.pagesForm.get('activePage').value,
        pages: JSON.stringify(pages),
      }
    })
    );
  }
}
