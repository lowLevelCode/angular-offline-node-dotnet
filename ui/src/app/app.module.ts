import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxIndexedDBModule, NgxIndexedDBService } from 'ngx-indexed-db';
import { dbConfig } from './data/db.config';
import { OfflineInteceptor } from './interceptors/offline.interceptor';
import { ConnectionServiceModule } from 'ngx-connection-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ConnectionServiceModule
  ],
  providers: [
    HttpClient, 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: OfflineInteceptor, 
      multi: true,
      deps: [NgxIndexedDBService]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }