import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermEnglishDetailComponent } from './terms/term-detail/term-detail.component';
import { TermsCreateComponent } from './terms/terms-create/terms-create.component';
import { DefinitionEditComponent } from './definitions/definition-edit/definition-edit.component';
import { TermOtherDetailComponent } from './terms/term-detail/term-other-detail.component';
import { DefinitionOtherEditComponent } from './definitions/definition-edit/definition-other-edit.component';
import { AddTranslationComponent } from './translation/add-translation/add-translation.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'termsEnglish', component: TermsListComponent },
  { path: 'termsEnglish/create', component: TermsCreateComponent },
  { path: 'termsEnglish/detail/:id', component: TermEnglishDetailComponent },
  { path: 'termsEnglish/detail/:id/edit-definition', component: DefinitionEditComponent },
  { path: 'termsOther/create/:id', component: AddTranslationComponent },
  { path: 'termsOther/detail/:id', component: TermOtherDetailComponent },
  { path: 'termsOther/detail/:id/edit-definition', component: DefinitionOtherEditComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
