import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderNavComponent } from './header-nav/header-nav.component';
import { HomeComponent } from './home/home.component';
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermEnglishDetailComponent } from './terms/term-detail/term-detail.component';
import { TermsCreateComponent } from './terms/terms-create/terms-create.component';
import { ExistingTermValidator } from './shared/existing-term-validator.directive';
import { DefinitionEditComponent } from './definitions/definition-edit/definition-edit.component';
import { TermOtherDetailComponent } from './terms/term-detail/term-other-detail.component';
import { DefinitionOtherEditComponent } from './definitions/definition-edit/definition-other-edit.component';
import { AddTranslationComponent } from './translation/add-translation/add-translation.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    HomeComponent,
    TermsListComponent,
    TermEnglishDetailComponent,
    TermsCreateComponent,
    ExistingTermValidator,
    DefinitionEditComponent,
    TermOtherDetailComponent,
    DefinitionOtherEditComponent,
    AddTranslationComponent,
    AboutComponent,
    ContactComponent,
    NotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
