import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes}  from '@angular/router';
import { AppComponent }  from './app.component';
import { RegisterComponent } from '../app/register/register.component';
import { SplashComponent } from '../app/splash/splash.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from '../app/review/signin.component';
import { ReviewComponent } from '../app/review/review.component'; 
import { ClassicComponent } from '../app/splash/classic.component'; 
import { HttpClientModule } from '@angular/common/http'; 
import { CustomerService } from './customer.service';
import { ClaimService } from '../app/claim.service';
import { PolicyComponent } from './policy/policy.component';
import { ClaimComponent } from './claim/claim.component';
import { HistoryComponent } from './history/history.component';
import { AdminService } from './admin.service';
import { ListCustomerComponent } from './admin/list.customer.component';
import { AdminComponent } from './admin/admin.component';
import { ResetComponent } from './admin/reset.component'; 
import { PolicyMaintComponent } from './policy/policy.maint.component';
import { PolicyService } from './policy.service';
import { ServiceService } from './service.service'; 
import { NavMenuComponent } from './navmenu/nav.menu.component';
import { NavService } from './nav.service';
import { AboutComponent } from './about/about.component';

const appRoutes = [

    {
        path: 'splash',
        component: SplashComponent 
    },
    {
        path: 'classic',
        component: ClassicComponent
    },
    {
        path: 'register',
        component: RegisterComponent 
    },
    {
        path: 'signin',
        component: SignInComponent
    },
    {
        path: 'review',
        component: ReviewComponent
    },
    {
        path: 'review/policy',
        component: PolicyComponent
    },
    {
        path: 'review/claim',
        component: ClaimComponent
    },
    {
        path: 'review/history',
        component: HistoryComponent
    },
    {
        path: 'listcustomer',
        component: ListCustomerComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'reset',
        component: ResetComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },  
    {
        path: 'maintainpolicies',
        component: PolicyMaintComponent
    },  
    {
        path: 'about',
        component: AboutComponent
    },  
    {
        path: '',
        redirectTo: '/splash',
        pathMatch : 'full'
    }

]

@NgModule({
    imports: [BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { enableTracing: true }),
        FormsModule],
    declarations: [AppComponent,
        RegisterComponent,
        SplashComponent,
        ClassicComponent,
        SignInComponent,
        ReviewComponent,
        PolicyComponent,
        ClaimComponent,
        HistoryComponent,
        AdminComponent,
        ResetComponent,
        ListCustomerComponent,
        PolicyMaintComponent,
        NavMenuComponent,
        AboutComponent],
    bootstrap: [AppComponent],
    providers: [CustomerService,
               ClaimService,
               AdminService,
               PolicyService,
               ServiceService,
               NavService] 
})
export class AppModule { }

 
