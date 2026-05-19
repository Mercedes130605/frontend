import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SeatSelectorComponent } from './components/seat-selector/seat-selector.component';
import { BarComponent } from './components/bar/bar.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminMoviesComponent } from './components/admin-movies/admin-movies.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminSchedulesComponent } from './components/admin-schedules/admin-schedules.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyReservationsComponent } from './components/my-reservations/my-reservations.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { PublicGuard } from './guards/public.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },
    { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
    { path: 'movie/:id', component: MovieDetailComponent, canActivate: [AuthGuard] },
    { path: 'seats/:horarioId', component: SeatSelectorComponent, canActivate: [AuthGuard] },
    { path: 'bar', component: BarComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
    { path: 'ticket/:codigo', component: TicketComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'my-reservations', component: MyReservationsComponent, canActivate: [AuthGuard] },
    { 
        path: 'admin', 
        component: AdminPanelComponent, 
        canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: '', redirectTo: 'movies', pathMatch: 'full' },
            { path: 'movies', component: AdminMoviesComponent },
            { path: 'products', component: AdminProductsComponent },
            { path: 'schedules', component: AdminSchedulesComponent }
        ]
    },
    { path: '', redirectTo: '/movies', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent }
];