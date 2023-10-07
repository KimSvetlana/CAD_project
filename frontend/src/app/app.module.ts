import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';

import { FormsModule } from '@angular/forms';
import { FormComponentComponent } from './form-component/form-component.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule }   from '@angular/forms';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    FormComponentComponent,
    AppComponent,
    TestComponentComponent,
  ],
  exports: [
  ],
  providers: [ ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
