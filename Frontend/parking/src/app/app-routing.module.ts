import { ResolveService } from './shared/services/resolve.service';
import { MainPageComponent } from './components/main-page/main-page.component';
import {NgModule} from '@angular/core';
import {RouterModule,Routes,PreloadAllModules } from '@angular/router';
import {CustomPreloading} from './shared/classes/custom-preloading';
import {AdminComponent} from './components/admin/admin.component'
import { AuthGuard } from './shared/classes/auth.guard';
import { OfferComponent } from './components/offer/offer.component';


const routes:Routes=[
  {path:'',component:MainPageComponent,pathMatch:'full'},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard] },
  {path:'offer',component:OfferComponent,canActivate:[AuthGuard] }

]
// loadChildren:()=>import('./components/admin/admin.module').then(m=>m.AdminModule) рядок для прелоудінга
@NgModule({
    imports:[
        RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
    ],
    exports:[
        RouterModule
    ],
    providers:[CustomPreloading,ResolveService]
})
export class AppRoutingModule{

}
