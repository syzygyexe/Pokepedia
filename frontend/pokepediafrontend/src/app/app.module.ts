import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { WebcamModule } from 'ngx-webcam';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokepediaComponent } from './component/pokepedia/pokepedia.component';
import { PokecameraComponent } from './component/pokecamera/pokecamera.component';
import { LoadingComponent } from './component/loading/loading.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokepediaComponent,
    PokecameraComponent,
    LoadingComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Webcam
    WebcamModule,
    // Lazy Load
    LazyLoadImageModule,
    // Pagination
    NgxPaginationModule,
    // Modal
    ModalModule.forRoot(),
  ],
  providers: [],
  schemas: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
