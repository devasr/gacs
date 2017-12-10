import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';

import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { VideoComponent } from './video/video.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpModule } from '@angular/http';
import {MatProgressBarModule } from '@angular/material';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
@NgModule({
  declarations: [AppComponent, HomepageComponent, VideoComponent, CarouselComponent, DashboardComponent, UpdateprofileComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    VgCoreModule,
    VgControlsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
