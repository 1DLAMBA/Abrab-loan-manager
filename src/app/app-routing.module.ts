import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { LandingComponent } from './demo/landing/landing.component';
import { GuestLoginComponent } from './demo/guest-login/guest-login.component';
import { GuestSignupComponent } from './demo/guest-signup/guest-signup.component';
import { GuestLoanApplicationComponent } from './demo/guest-loan-application/guest-loan-application.component';
import { GuestDashboardComponent } from './demo/guest-dashboard/guest-dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/dashboard.component'),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./demo/ui-elements/ui-basic/ui-basic.module').then(
            (m) => m.UiBasicModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./demo/pages/form-elements/form-elements.module').then(
            (m) => m.FormElementsModule,
          ),
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./demo/pages/tables/tables.module').then(
            (m) => m.TablesModule,
          ),
      },
      {
        path: 'apexchart',
        loadComponent: () =>
          import('./demo/chart/apex-chart/apex-chart.component'),
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./demo/extra/sample-page/sample-page.component'),
      },
    ],
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule,
          ),
      },
      {
        path: 'landing',
        component: LandingComponent
        },
        {
          path: 'guest-login',
          component: GuestLoginComponent
          },
        {
          path: 'guest-signup',
          component: GuestSignupComponent
          },
          {
            path: 'guest-loan/:id',
            component: GuestLoanApplicationComponent
            },
            {
              path: 'guest-dashboard',
              component: GuestDashboardComponent
              },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
