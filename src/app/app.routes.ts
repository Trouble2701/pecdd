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

export const routes: Routes = [
    {path: '', component:NewsComponent},
    {path: 'start', component:NewsComponent},
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
];
