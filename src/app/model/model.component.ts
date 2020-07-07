import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Store, select } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions';
import { ActivatedRoute } from '@angular/router';
import { tap, delayWhen } from 'rxjs/operators';
import { Observable, of, interval } from 'rxjs';
import { ModalService } from '../shared/modal.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  body: any;
  data: any;
  portals: any;
  selectedExperience$: any;
  selectedExperience: any;
  selectedExperienceName$: Observable<any>;
  isSyncingExperience$: Observable<any>;
  isUpdatingExperience$: Observable<any>;

  public options = new JsonEditorOptions();

  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private modalService: ModalService,
  ) { }


  ngOnInit() {
    this.isSyncingExperience$ = this.store.pipe(select(experiencesSelectors.isSyncingExperience));
    this.isUpdatingExperience$ = this.store.pipe(
      select(experiencesSelectors.isUpdatingExperience),
      delayWhen(isLoading => isLoading ? of(undefined) : interval(500))
    );

    this.options.mode = 'code';
    this.options.modes = ['code', 'text', 'tree', 'view'];
    this.options.statusBar = true;

    this.selectedExperienceName$ = this.route.params.pipe(
      tap((params: any) => {
        this.store.dispatch(new experiencesActions.LoadExperiences());

        this.selectedExperience$ = this.store.select(experiencesSelectors.getExperienceByName, { name: params.experienceName })
          .pipe(tap((selectedExperience) => {
            if (!selectedExperience) {
              return;
            }

            this.selectedExperience = selectedExperience;
            this.body = selectedExperience.pages.find(page => page.name === selectedExperience.activePage);
            console.log(this.selectedExperience);
        }));
      })
    );

  }

  selectPage(selectedActivePage) {
    this.store.dispatch(new experiencesActions.SetActiveExperience({
      selectedExperienceName: this.selectedExperience.name,
      newActivePage: selectedActivePage.name
    }));
  }

  syncModel() {
    this.store.dispatch(new experiencesActions.SyncExperience({
      host: this.selectedExperience.host,
      username: this.selectedExperience.username,
      password: this.selectedExperience.password,
      loginUrl: this.selectedExperience.loginUrl,
      identityLoginUrl: this.selectedExperience.identityLoginUrl,
      modelUrl: this.selectedExperience.modelUrl,
      useIdentity: this.selectedExperience.useIdentity,
      experienceName: this.selectedExperience.name
    }));
  }

  updateModel() {
    const editorData: any = this.editor.first.get();
    const pages = this.selectedExperience.pages.map(page => {
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
        pages,
      }
    })
    );
  }

  editExperience() {
    this.modalService.experienceFormModal(this.selectedExperience);
  }
}
