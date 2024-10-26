import { Routes } from '@angular/router';
import { HomeComponent } from '../Comopnents/home/home.component';
import { NotFoundComponent } from '../Comopnents/not-found/not-found.component';
import { LoginComponent } from '../Comopnents/login/login.component';
import { LogoutComponent } from '../Comopnents/logout/logout.component';
import { CategoryComponent } from '../Comopnents/category/category.component';
import { ProductComponent } from '../Comopnents/product/product.component';
import { OrderComponent } from '../Comopnents/order/order.component';
import { OrderitemsComponent } from '../Comopnents/orderitems/orderitems.component';
import { ShepmentsComponent } from '../Comopnents/shepments/shepments.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderitems', component: OrderitemsComponent },
  { path: 'shepments', component: ShepmentsComponent },

  // Wild Path Component
  { path: "**", component: NotFoundComponent }


];
