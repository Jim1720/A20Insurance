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
var http_1 = require("@angular/common/http");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'content-Type': 'application/json' })
};
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.SignIn = function () {
        this.signedIn = true;
    };
    AdminService.prototype.SignedIn = function () {
        return this.signedIn;
    };
    // Read admin password and user id data from server.
    AdminService.prototype.getAdminCredentials = function (IDnPAS) {
        var url = 'api/Admin/signon/' + IDnPAS;
        return this.http.get(url, httpOptions);
    };
    // Read admin password and user id data from server.
    AdminService.prototype.verifyAdminPasswordForResetAction = function (Password) {
        // verify administrator password for password.
        var url = 'api/Admin/checkpass/' + Password;
        return this.http.get(url, httpOptions);
    };
    // transport action from admin signon screen to admin maint screen.
    AdminService.prototype.storeAction = function (action) {
        this.AdminAction = action;
    };
    AdminService.prototype.readAction = function () {
        return this.AdminAction;
    };
    AdminService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map