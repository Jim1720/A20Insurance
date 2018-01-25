"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var customer_service_1 = require("../customer.service");
var nav_service_1 = require("../nav.service");
var SignInComponent = /** @class */ (function () {
    function SignInComponent(route, router, customerService, navService) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.navService = navService;
        this.submitted = false;
        this.CustomerID = "";
        this.Password = "";
        this.Message = "";
    }
    SignInComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.CustomerID == "" || this.Password == "") {
            this.Message = "Must fill in both customerID and Password.";
            return;
        }
        ;
        this.Message = "";
        this.customerService.readCustomer(this.CustomerID)
            .subscribe(function (cust) {
            if (cust.CustomerID.substring(0, 1) == "*") {
                _this.Message = cust.CustomerID; // show error message 'etest'
            }
            // edits 
            if (cust.CustomerID == "Not Found") {
                _this.Message = "Customer not found";
            }
            if (_this.Message == "") {
                _this.checkPassword(cust.Password);
            }
            if (_this.Message == "") {
                _this.customerService.passCustomer(cust);
                _this.navService.enableNavMenu(cust.FirstName, cust.LastName);
                _this.router.navigate(["review"]);
            }
        }, function (Error) {
            _this.Message = Error.message;
        });
    };
    SignInComponent.prototype.checkPassword = function (Password) {
        // according to stack overflow response .subscribe runs in a different frame
        // call here to access value of this.password.
        if (Password != this.Password) {
            this.Message = "Invalid password";
        }
    };
    SignInComponent = __decorate([
        core_1.Component({
            templateUrl: 'signin.component.html',
            styleUrls: ['signin.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            customer_service_1.CustomerService,
            nav_service_1.NavService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map