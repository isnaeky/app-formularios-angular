import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { TemplateComponent } from './pages/template/template.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'reactive', component: ReactiveComponent },
    { path: 'template', component: TemplateComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
