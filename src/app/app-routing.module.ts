import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { OrderComponent } from './pages/order/order.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'restaurants',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'restaurants/:id',
    loadChildren: './pages/restaurants/restaurants.module#RestaurantsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'gallery',
    loadChildren: './pages/photo-gallery/photo-gallery.module#PhotoGalleryModule',
    canActivate: [AuthGuardService]
  },
  {
    path: 'blog',
    loadChildren: './pages/blogs/blogs.module#BlogsModule',
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
