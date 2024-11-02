import { Routes } from '@angular/router';
import { HomeComponent } from '../Comopnents/home/home.component';
import { NotFoundComponent } from '../Comopnents/not-found/not-found.component';

import { CategoryComponent } from '../Comopnents/category/category.component';
import { ProductComponent } from '../Comopnents/product/product.component';
import { OrderComponent } from '../Comopnents/order/order.component';
import { OrderitemsComponent } from '../Comopnents/orderitems/orderitems.component';
import { ShepmentsComponent } from '../Comopnents/shepments/shepments.component';
import { SignInOrRegisterComponent } from '../Comopnents/Account/sign-in-or-register/sign-in-or-register.component';
import { LogoutComponent } from '../Comopnents/Account/logout/logout.component';
import { LoginComponent } from '../Comopnents/Account/login/login.component';
import { RegisterComponent } from '../Comopnents/Account/register/register.component';
import { MainComponent } from '../Comopnents/main/main.component';
import { DeatailscatogiryComponent } from '../Comopnents/deatailscatogiry/deatailscatogiry.component';
import { SupcatdeatialsComponent } from '../Comopnents/supcatdeatials/supcatdeatials.component';

export const routes: Routes = [

  {path:'' , component: MainComponent,children:[

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'categryditals', component: DeatailscatogiryComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: 'order', component: OrderComponent },
    { path: 'orderitems', component: OrderitemsComponent },
    { path: 'shepments', component: ShepmentsComponent },
    { path: 'supcatogiarydeatails', component: SupcatdeatialsComponent },
  ]},

  { path: 'logout', component: LogoutComponent },
  { path: 'SignOrRegister', component: SignInOrRegisterComponent },
  { path: 'Login/:Email', component: LoginComponent },
  { path: 'Register/:Email', component: RegisterComponent },

  // Wild Path Component
  { path: "**", component: NotFoundComponent }


];
