import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { Store } from '@ngrx/store';
import * as experiencesSelectors from '../state/experiences/experiences.selectors';
import * as experiencesActions from '../state/experiences/experiences.actions'
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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

  public options = new JsonEditorOptions;
  @ViewChildren(JsonEditorComponent) editor: QueryList<JsonEditorComponent>
  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private modalService: ModalService,
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

  editExperience() {
    this.modalService.experienceFormModal(this.selectedExperience);
  }
}
