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
var ListCustomerComponent = /** @class */ (function () {
    function ListCustomerComponent(route, router, customerService) {
        this.route = route;
        this.router = router;
        this.customerService = customerService;
        this.FirstName = "";
        this.LastName = "";
        this.hideNavMenu = true;
    }
    ListCustomerComponent.prototype.onSubmit = function () {
        var _this = this;
        // search customers.
        this.customerService.SearchCustomers(this.FirstName, this.LastName)
            .subscribe(function (custsFound) {
            _this.set(custsFound);
        }, function (Error) {
        });
    };
    ListCustomerComponent.prototype.set = function (custsFound) {
        this.listOfCusts = custsFound;
    };
    ListCustomerComponent = __decorate([
        core_1.Component({
            templateUrl: 'list.customer.component.html',
            styleUrls: ['list.customer.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            customer_service_1.CustomerService])
    ], ListCustomerComponent);
    return ListCustomerComponent;
}());
exports.ListCustomerComponent = ListCustomerComponent;
//# sourceMappingURL=list.customer.component.js.map