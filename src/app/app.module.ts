import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { DryTableComponent } from '../components/dry-table/dry-table.component';
import { DryVisualComponent } from '../components/dry-visual/dry-visual.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceHolderDataService } from '../services/place-holder-data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
      AppComponent,
      DryTableComponent,
      DryVisualComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatSidenavModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatGridListModule,
    MatDividerModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
                HttpClientModule,
                PlaceHolderDataService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
