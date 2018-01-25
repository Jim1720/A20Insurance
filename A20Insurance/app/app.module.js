"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var register_component_1 = require("../app/register/register.component");
var splash_component_1 = require("../app/splash/splash.component");
var forms_1 = require("@angular/forms");
var signin_component_1 = require("../app/review/signin.component");
var review_component_1 = require("../app/review/review.component");
var classic_component_1 = require("../app/splash/classic.component");
var http_1 = require("@angular/common/http");
var customer_service_1 = require("./customer.service");
var claim_service_1 = require("../app/claim.service");
var policy_component_1 = require("./policy/policy.component");
var claim_component_1 = require("./claim/claim.component");
var history_component_1 = require("./history/history.component");
var admin_service_1 = require("./admin.service");
var list_customer_component_1 = require("./admin/list.customer.component");
var admin_component_1 = require("./admin/admin.component");
var reset_component_1 = require("./admin/reset.component");
var policy_maint_component_1 = require("./policy/policy.maint.component");
var policy_service_1 = require("./policy.service");
var service_service_1 = require("./service.service");
var nav_menu_component_1 = require("./navmenu/nav.menu.component");
var nav_service_1 = require("./nav.service");
var about_component_1 = require("./about/about.component");
var appRoutes = [
    {
        path: 'splash',
        component: splash_component_1.SplashComponent
    },
    {
        path: 'classic',
        component: classic_component_1.ClassicComponent
    },
    {
        path: 'register',
        component: register_component_1.RegisterComponent
    },
    {
        path: 'signin',
        component: signin_component_1.SignInComponent
    },
    {
        path: 'review',
        component: review_component_1.ReviewComponent
    },
    {
        path: 'review/policy',
        component: policy_component_1.PolicyComponent
    },
    {
        path: 'review/claim',
        component: claim_component_1.ClaimComponent
    },
    {
        path: 'review/history',
        component: history_component_1.HistoryComponent
    },
    {
        path: 'listcustomer',
        component: list_customer_component_1.ListCustomerComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent
    },
    {
        path: 'reset',
        component: reset_component_1.ResetComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent
    },
    {
        path: 'maintainpolicies',
        component: policy_maint_component_1.PolicyMaintComponent
    },
    {
        path: 'about',
        component: about_component_1.AboutComponent
    },
    {
        path: '',
        redirectTo: '/splash',
        pathMatch: 'full'
    }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot(appRoutes, { enableTracing: true }),
                forms_1.FormsModule],
            declarations: [app_component_1.AppComponent,
                register_component_1.RegisterComponent,
                splash_component_1.SplashComponent,
                classic_component_1.ClassicComponent,
                signin_component_1.SignInComponent,
                review_component_1.ReviewComponent,
                policy_component_1.PolicyComponent,
                claim_component_1.ClaimComponent,
                history_component_1.HistoryComponent,
                admin_component_1.AdminComponent,
                reset_component_1.ResetComponent,
                list_customer_component_1.ListCustomerComponent,
                policy_maint_component_1.PolicyMaintComponent,
                nav_menu_component_1.NavMenuComponent,
                about_component_1.AboutComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [customer_service_1.CustomerService,
                claim_service_1.ClaimService,
                admin_service_1.AdminService,
                policy_service_1.PolicyService,
                service_service_1.ServiceService,
                nav_service_1.NavService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map