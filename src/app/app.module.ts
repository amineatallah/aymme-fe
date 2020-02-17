import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ModelComponent } from './model/model.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { DropdownComponent } from './dropdown/dropdown.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers as rootReducers, CustomSerializer } from './state';

import { reducer as servicesReducer } from './state/services/services.reducers';
import { ServicesEffects } from './state/services/services.effects';

import { reducer as specificationsReducer } from './state/specifications/specifications.reducers';
import { SpecificationsEffects } from './state/specifications/specifications.effects';

import { reducer as experiencesReducers } from './state/experiences/experiences.reducers';
import { ExperiencesEffects } from './state/experiences/experiences.effects';

import { ToastrModule } from 'ngx-toastr';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ServicesListComponent } from './services-list/services-list.component';
import { HeaderComponent } from './header/header.component';
import { HowToComponent } from './how-to/how-to.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    ModelComponent,
    ExperiencesComponent,
    ServicesListComponent,
    HeaderComponent,
    DropdownComponent,
    HowToComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    NgJsonEditorModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    StoreModule.forRoot(rootReducers, {}),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
    EffectsModule.forRoot([]),

    StoreModule.forFeature('services', servicesReducer),
    EffectsModule.forFeature([ServicesEffects]),

    StoreModule.forFeature('specifications', specificationsReducer),
    EffectsModule.forFeature([SpecificationsEffects]),

    StoreModule.forFeature('experiences', experiencesReducers),
    EffectsModule.forFeature([ExperiencesEffects]),

    ToastrModule.forRoot({ progressBar: true }),
    StoreDevtoolsModule.instrument( {
      name: 'AYMME App',
      maxAge: 25,
      logOnly: environment.production
    }),
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
