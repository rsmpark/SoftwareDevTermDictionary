import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HomeComponent } from './home/home.component';
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermDetailComponent } from './terms/term-detail/term-detail.component';
import { TermsCreateComponent } from './terms/terms-create/terms-create.component';
import { ExistingTermValidator } from './terms/terms-create/existing-term-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    HomeComponent,
    TermsListComponent,
    TermDetailComponent,
    TermsCreateComponent,
    ExistingTermValidator
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
