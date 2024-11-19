import { Routes } from '@angular/router';
import { HomeComponent } from '../Comopnents/home/home.component';
import { NotFoundComponent } from '../Comopnents/not-found/not-found.component';
import { CategoryComponent } from '../Comopnents/category/category.component';
import { ProductComponent } from '../Comopnents/product/product.component';
import { OrderComponent } from '../Comopnents/order/order.component';
import { OrderitemsComponent } from '../Comopnents/orderitems/orderitems.component';
import { AllProductComponent } from '../Comopnents/all-product/all-product.component';
import { SignInOrRegisterComponent } from '../Comopnents/Account/sign-in-or-register/sign-in-or-register.component';
import { LogoutComponent } from '../Comopnents/Account/logout/logout.component';
import { LoginComponent } from '../Comopnents/Account/login/login.component';
import { RegisterComponent } from '../Comopnents/Account/register/register.component';
import { MainComponent } from '../Comopnents/main/main.component';
import { DeatailscatogiryComponent } from '../Comopnents/deatailscatogiry/deatailscatogiry.component';
import { SupcatdeatialsComponent } from '../Comopnents/supcatdeatials/supcatdeatials.component';
import { AccountComponent } from '../Comopnents/Account/account/account.component';
import { authGuard } from '../Services/guard/auth.guard';
import { ShapMentViewComponent } from '../Comopnents/shap-ment-view/shap-ment-view.component';
import { OrderviewComponent } from '../Comopnents/orderview/orderview.component';
import { AddressessComponent } from '../Comopnents/Account/account/Component/addressess/addressess.component';
import { ContactInfoComponent } from '../Comopnents/Account/account/Component/contact-info/contact-info.component';
import { LanguageComponent } from '../Comopnents/Account/account/Component/language/language.component';
import { PurchaseComponent } from '../Comopnents/Account/account/Component/purchase/purchase.component';
import { AccountHomeComponent } from '../Comopnents/Account/account/Component/account-home/account-home.component';
import { DeliveryComponent } from '../Comopnents/delivery/delivery.component';
import { MyItemsComponent } from '../Comopnents/my-items/my-items.component';
import { ReorderComponent } from '../Comopnents/my-items/reorder/reorder.component';
import { ListsComponent } from '../Comopnents/my-items/lists/lists.component';
import { ProductsSearchComponent } from '../Comopnents/products-search/products-search.component';

export const routes: Routes = [

  {
    path: '', component: MainComponent, children: [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'allproduct/:id', component: AllProductComponent},
  { path: 'SearchProduct/:searchname', component: ProductsSearchComponent},
  { path: 'product/:id', component: ProductComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderitems', canActivate:[authGuard],component: OrderitemsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categryditals/:id', component: DeatailscatogiryComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'orderitems', component: OrderitemsComponent },
  { path: 'Delivery', component: DeliveryComponent },
  { path: 'supcatogiarydeatails/:id', component: SupcatdeatialsComponent },

  { path: 'items', component: MyItemsComponent , children:[
    { path: 'reorder', component: ReorderComponent },
    { path: 'lists', component: ListsComponent },
  ] },
  { path: 'account',canActivate:[authGuard] ,  component: AccountComponent , children:[


      { path: 'Acchome', component: AccountHomeComponent },
      { path: 'Addresses', component: AddressessComponent },
      { path: 'ContactInfo', component: ContactInfoComponent },
      { path: 'LanguageSetting', component: LanguageComponent },
      { path: 'purechase', component: PurchaseComponent },


    ] },
  ]},

  { path: 'logout', component: LogoutComponent },
  { path: 'SignOrRegister', component: SignInOrRegisterComponent },
  { path: 'Login/:Email', component: LoginComponent },
  { path: 'Register/:Email', component: RegisterComponent },
  { path: 'shap-ment-view',canActivate:[authGuard], component: ShapMentViewComponent },
  { path: 'orderview/:CusId/:shipID', canActivate:[authGuard],component: OrderviewComponent },


  // Wild Path Component
  { path: "**", component: NotFoundComponent }


];
