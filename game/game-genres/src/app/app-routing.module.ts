import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GameListComponent} from "./game/game-list/game-list.component";
import {GameCreateComponent} from "./game/game-create/game-create.component";
import {GameEditComponent} from "./game/game-edit/game-edit.component";


const routes: Routes = [
  {path: '', component: GameListComponent},
  {path: 'create', component: GameCreateComponent},
  {path: 'edit/:id', component: GameEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
