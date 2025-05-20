import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourierComponent } from './components/add-courier/add-courier.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AddPartnerComponent } from './components/add-partner/add-partner.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CourierDetailsComponent } from './components/courier-details/courier-details.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { ListCouriersComponent } from './components/list-couriers/list-couriers.component';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PartnerDetailsComponent } from './components/partner-details/partner-details.component';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { ListByDateComponent } from './components/list-by-date/list-by-date.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainpage/makeorder', pathMatch: 'full'},
  { path: 'login', component: LoginpageComponent},
  { path: 'mainpage',component: MainPageComponent, canActivate: [AuthGuard], children: [
    { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'adduser', component: AddUserComponent, canActivate: [AdminGuard]},
    { path: 'listusers', component: ListUsersComponent, canActivate: [AdminGuard] },
    { path: 'addpartner', component: AddPartnerComponent, canActivate: [AdminGuard] },
    { path: 'partner/:id', component: PartnerDetailsComponent, canActivate: [AuthGuard] },
    { path: 'partners', component: PartnerListComponent, canActivate:[AuthGuard]},
    { path: 'addfood', component: AddFoodComponent, canActivate: [AdminGuard]},
    { path: 'addcourier', component: AddCourierComponent, canActivate: [AdminGuard]},
    { path: 'listfoods', component: ListFoodsComponent, canActivate: [AuthGuard]},
    { path: 'food/:id', component: FoodDetailsComponent, canActivate: [AuthGuard]},
    { path: 'listcouriers', component: ListCouriersComponent, canActivate: [AuthGuard]},
    { path: 'courier/:id', component: CourierDetailsComponent, canActivate: [AuthGuard]},
    { path: 'listorders', component: ListOrdersComponent, canActivate: [AuthGuard]},
    { path: 'order/:id', component: OrderDetailsComponent, canActivate: [AuthGuard]},
    { path: 'makeorder', component: MakeOrderComponent, canActivate: [AuthGuard]},
    { path: 'listbydate', component: ListByDateComponent, canActivate: [AuthGuard]}
  ] },

  { path: '**', redirectTo: '/mainpage/makeorder'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
