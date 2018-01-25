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
var of_1 = require("rxjs/observable/of");
var http_1 = require("@angular/common/http");
//import { _catch } from 'rxjs/operator' 
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var PolicyService = /** @class */ (function () {
    function PolicyService(http) {
        this.http = http;
    }
    // Add Policy  
    PolicyService.prototype.addPolicy = function (policy) {
        var url = 'api/Policy';
        var jpolicy = JSON.stringify(policy);
        return this.http.post(url, jpolicy, httpOptions);
    };
    // Read Policy
    PolicyService.prototype.readPolicy = function (id) {
        var url = 'api/Policy/read/' + id;
        return this.http.get(url, httpOptions);
    };
    // Update Policy
    PolicyService.prototype.updatePolicy = function (policy) {
        var url = 'api/Policy';
        var jpolicy = JSON.stringify(policy);
        return this.http.put(url, jpolicy, httpOptions);
    };
    // List All Policies
    PolicyService.prototype.listPolicies = function () {
        var url = 'api/Policy/list/';
        return this.http.get(url, httpOptions);
    };
    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
    PolicyService.prototype.log = function (item) {
        console.log(item);
    };
    PolicyService.prototype.handleError = function (operation, result) {
        var _this = this;
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            _this.log(operation + " failed: " + error.message);
            // Let the app keep running by returning an empty result.
            return of_1.of(result);
        };
    };
    PolicyService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PolicyService);
    return PolicyService;
}());
exports.PolicyService = PolicyService;
//# sourceMappingURL=policy.service.js.map