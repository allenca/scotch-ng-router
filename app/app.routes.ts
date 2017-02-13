// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { dogRoutes }    from './dogs/dog.routes';
import { catRoutes }    from './cats/cat.routes';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dogs',
    pathMatch: 'full'
  },
  ...catRoutes,
  ...dogRoutes
];

// read http://bit.ly/ellipsis-ng2routers for information about the ellipsis.

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
