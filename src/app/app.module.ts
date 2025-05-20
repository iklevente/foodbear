import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddPartnerComponent } from './components/add-partner/add-partner.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PartnerDetailsComponent } from './components/partner-details/partner-details.component';
import { FoodTableComponent } from './components/food-table/food-table.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { AddFoodComponent } from './components/add-food/add-food.component';
import { AddCourierComponent } from './components/add-courier/add-courier.component';
import { ListFoodsComponent } from './components/list-foods/list-foods.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { ListCouriersComponent } from './components/list-couriers/list-couriers.component';
import { CourierTableComponent } from './components/courier-table/courier-table.component';
import { CourierDetailsComponent } from './components/courier-details/courier-details.component';
import { MakeOrderComponent } from './components/make-order/make-order.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { DescriptionSizePipe } from './pipes/description-size.pipe';
import { ListByDateComponent } from './components/list-by-date/list-by-date.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginpageComponent,
    UserProfileComponent,
    ListUsersComponent,
    MainPageComponent,
    AddUserComponent,
    AddPartnerComponent,
    PartnerComponent,
    PartnerDetailsComponent,
    FoodTableComponent,
    OrderTableComponent,
    PartnerListComponent,
    AddFoodComponent,
    AddCourierComponent,
    ListFoodsComponent,
    FoodDetailsComponent,
    ListCouriersComponent,
    CourierTableComponent,
    CourierDetailsComponent,
    MakeOrderComponent,
    ListOrdersComponent,
    OrderDetailsComponent,
    DescriptionSizePipe,
    ListByDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
