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
var admin_service_1 = require("../admin.service");
var ResetComponent = /** @class */ (function () {
    function ResetComponent(route, router, customerService, adminService) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.adminService = adminService;
        // developer note: observer logic must be stairstepped that is each time a success in 
        // observer return functions preform the next one. 
        // during testing they did not keep in sync when performed one after the other in open code.
        // also had to pass customer directly and not use this.resetcustomer scope
        // upgrade: see current pw when cust id entered.
        this.CustomerID = "";
        this.Password = "";
        this.Message = "";
        this.hideNavMenu = true;
        this.NewPass = "";
        this.customerFound = false;
    }
    ResetComponent.prototype.onCustEntered = function () {
        var _this = this;
        // as soon as cust entered show old password 
        this.Message = "";
        this.customerService.readCustomer(this.CustomerID)
            .subscribe(function (cust) {
            if (cust.Password != null) {
                _this.Message = "Current password for customer is " + cust.Password;
            }
            else {
                _this.Message = "";
            }
        }, function (ERROR) { _this.Message = ERROR.message; });
    };
    ResetComponent.prototype.onSubmit = function () {
        var _this = this;
        // we need to check the password first.
        this.adminService.verifyAdminPasswordForResetAction(this.Password)
            .subscribe(function (result) {
            if (result != 'Valid') {
                _this.Message = "Invalid Password for reset operation.";
                return;
            }
            else {
                _this.readAndUpdateCustomer(_this.NewPass); // must be called to keep in sync! not inline.
            }
        }, function (Error) { _this.Message = Error.message; return; });
    };
    ResetComponent.prototype.readAndUpdateCustomer = function (NewPass) {
        // Verify Customer Exists
        var _this = this;
        this.customerService.readCustomer(this.CustomerID)
            .subscribe(function (customer) {
            _this.resetPassword(customer, NewPass); // must be called not inline to preserve sync!
        }, function (ERROR) { _this.Message = ERROR.message; });
        // if resetcustomer null we did not find customer.
        if (this.ResetCustomer == null) {
            this.Message = "Customer Not Found";
        }
    };
    ResetComponent.prototype.resetPassword = function (customer, NewPass) {
        var _this = this;
        customer.Password = NewPass;
        this.customerService.updateCustomer(customer)
            .subscribe(function (cust) { _this.Message = "Customer Password Changed"; }, function (ERROR) { _this.Message = ERROR.message; });
    };
    ResetComponent = __decorate([
        core_1.Component({
            templateUrl: 'reset.component.html',
            styleUrls: ['reset.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            customer_service_1.CustomerService,
            admin_service_1.AdminService])
    ], ResetComponent);
    return ResetComponent;
}());
exports.ResetComponent = ResetComponent;
//# sourceMappingURL=reset.component.js.map