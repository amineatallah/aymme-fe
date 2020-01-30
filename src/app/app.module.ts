import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

import { FlexLayoutModule } from '@angular/flex-layout';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { MocksComponent } from './mocks/mocks.component';
import { ServiceComponent } from './service/service.component';
import { ModelComponent } from './model/model.component';
import { PortalsComponent } from './portals/portals.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers as rootReducers, CustomSerializer } from './state';
import { reducer as servicesReducer } from './state/services/services.reducers';
import { ServicesEffects } from './state/services/services.effects';
import { ToastrModule } from 'ngx-toastr';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ServicesListComponent } from './services-list/services-list.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    MocksComponent,
    ServiceComponent,
    ModelComponent,
    PortalsComponent,
    ServicesListComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatExpansionModule,
    NgJsonEditorModule,
    // MatButtonModule,
    // MatSelectModule,
    // MatToolbarModule,
    // MatInputModule,
    // MatCheckboxModule,
    // MatIconModule,
    // MatSidenavModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,

    StoreModule.forRoot(rootReducers, {}),
    StoreRouterConnectingModule.forRoot({serializer: CustomSerializer}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('services', servicesReducer),
    EffectsModule.forFeature([ServicesEffects]),
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
