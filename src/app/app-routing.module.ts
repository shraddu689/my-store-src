import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyCalcComponent } from './my-calc/my-calc.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ReviewsComponent } from './product/reviews/reviews.component';
import { ProfileComponent } from './profile/profile.component';

//route for each component is part of Routes array
//while define the routes, sequence should be:
//1. static paths
//2. dynamic paths
//3. empty path
//4. wild card paths
const routes: Routes = [    
  {path: 'home',component:HomeComponent, title: 'MyStore | Home'},
  {path: 'products', loadChildren: 
                () => import('./product/product.module')
                      .then(m => m.ProductModule)},
  {path: 'profile',component:ProfileComponent, title: 'MyStore | Profile'},
  {path: 'calc', component: MyCalcComponent, title: 'MyStore | Calculator'},
  {path: '', redirectTo:'/home', pathMatch:'full'},
  // {path: '**', component:PageNotFoundComponent}
  // {path: "**", redirectTo:'home'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
