import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermDetailComponent } from './terms/term-detail/term-detail.component';
import { TermsCreateComponent } from './terms/terms-create/terms-create.component';
import { DefinitionEditComponent } from './definitions/definition-edit/definition-edit.component';

const routes: Routes = [
  { path: 'terms', component: TermsListComponent },
  { path: 'terms/create', component: TermsCreateComponent },
  { path: 'terms/detail/:id', component: TermDetailComponent },
  { path: 'terms/detail/:id/edit-definition', component: DefinitionEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
