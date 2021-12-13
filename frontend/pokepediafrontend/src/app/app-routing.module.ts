import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoadingComponent } from './component/loading/loading.component';
import { PokecameraComponent } from './component/pokecamera/pokecamera.component';
import { PokepediaComponent } from './component/pokepedia/pokepedia.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'pokepedia', component: PokepediaComponent },
  { path: 'pokecamera', component: PokecameraComponent },
];

@NgModule({
  // Declaration allow to use routerModule in other components
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
