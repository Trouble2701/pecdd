import { Routes } from '@angular/router';
import { NewsComponent } from './component/news/news.component';
import { RegistComponent } from './component/regist/regist.component';
import { PwforgotComponent } from './component/pwforgot/pwforgot.component';
import { CalenderComponent } from './component/calender/calender.component';
import { GalerieComponent } from './component/galerie/galerie.component';
import { SaleComponent } from './component/sale/sale.component';
import { ShopsComponent } from './component/shops/shops.component';
import { EventsComponent } from './component/events/events.component';
import { LocationsComponent } from './component/locations/locations.component';
import { RegcodeComponent } from './component/regcode/regcode.component';
import { GamedayComponent } from './component/gameday/gameday.component';
import { ChangepwComponent } from './component/changepw/changepw.component';
import { StartComponent } from './component/start/start.component';
import { PncenterComponent } from './component/pncenter/pncenter.component';
import { ProfilComponent } from './component/profil/profil.component';
import { AdminbereichComponent } from './component/adminbereich/adminbereich.component';
import { LogoutComponent } from './component/logout/logout.component';

export const routes: Routes = [
    {path: '', component:StartComponent},
    {path: 'start', component:StartComponent},
    {path: 'regist', component:RegistComponent},
    {path: 'pwforgot', component:PwforgotComponent},
    {path: 'calender', component:CalenderComponent},
    {path: 'galery', component:GalerieComponent},
    {path: 'sale', component:SaleComponent},
    {path: 'news', component:NewsComponent},
    {path: 'shops', component:ShopsComponent},
    {path: 'events', component:EventsComponent},
    {path: 'locations', component:LocationsComponent},
    {path: 'registcode', component:RegcodeComponent},
    {path: 'changepw/:token', component:ChangepwComponent},
    {path: 'pncenter', component:PncenterComponent},
    {path: 'profil', component:ProfilComponent},
    {path: 'adminbereich', component:AdminbereichComponent},
    {path: 'loggedout', component:LogoutComponent}
];
