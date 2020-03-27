import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsListComponent } from './terms/terms-list/terms-list.component';
import { TermDetailComponent } from './terms/term-detail/term-detail.component';
import { TermsCreateComponent } from './terms/terms-create/terms-create.component';

const routes: Routes = [
  { path: 'terms', component: TermsListComponent },
  { path: 'terms/create', component: TermsCreateComponent },
  { path: 'terms/detail/:id', component: TermDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
