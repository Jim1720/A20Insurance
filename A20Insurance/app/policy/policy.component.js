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
var customer_service_1 = require("../customer.service");
var router_1 = require("@angular/router");
var policy_service_1 = require("../policy.service");
var PolicyComponent = /** @class */ (function () {
    function PolicyComponent(customerService, policyService, router) {
        this.customerService = customerService;
        this.policyService = policyService;
        this.router = router;
        this.Message = "";
    }
    PolicyComponent.prototype.onReview = function () {
        this.router.navigate(["/review"]);
    };
    PolicyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // fill out list on screen
        this.policyService.listPolicies()
            .subscribe(function (policyList) { _this.Policies = policyList; }, function (Error) { _this.Message = Error.message; });
    };
    PolicyComponent.prototype.assignPolicy = function (event) {
        var _this = this;
        this.Customer = this.customerService.fetchCustomer();
        var policyName = event.target.outerText;
        var id = 0;
        var name = "";
        for (var _i = 0, _a = this.Policies; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.Name == policyName) {
                id = item.Id;
            }
        }
        this.Customer.PolicyName = policyName;
        this.Customer.PolicyID = id;
        this.customerService.updateCustomer(this.Customer)
            .subscribe(function (cust) {
            _this.customerService.passCustomer(_this.Customer);
            // success route to review
            _this.nav(_this.router);
        }, function (Error) {
            _this.Message = Error.message;
        });
    };
    PolicyComponent.prototype.updateStored = function (policy, policyName) {
        this.Customer.PolicyID = policy;
        this.Customer.PolicyName = policyName;
        this.customerService.holdCustomer = this.Customer;
    };
    PolicyComponent.prototype.nav = function (router) {
        router.navigate(["review"]);
    };
    PolicyComponent = __decorate([
        core_1.Component({
            templateUrl: 'policy.component.html',
            styleUrls: ['policy.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            policy_service_1.PolicyService,
            router_1.Router])
    ], PolicyComponent);
    return PolicyComponent;
}());
exports.PolicyComponent = PolicyComponent;
//# sourceMappingURL=policy.component.js.map