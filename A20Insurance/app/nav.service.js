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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var NavService = /** @class */ (function () {
    function NavService() {
        // purpose: send messages to nav.menu.component as observable 
        // turn on and off nav menu based on service calls EnableNavMenu and hideNavMenu respectively.
        // when app starts - turn off
        // when register, sign in - turn on
        // when admin sign in - turn off.
        this.firstMessage = {
            show: false,
            first: "",
            last: ""
        };
        // first message to observable is to turn the nav menu off
        this.messageSource = new BehaviorSubject_1.BehaviorSubject(this.firstMessage);
        this.currentMessage = this.messageSource.asObservable();
    }
    NavService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    NavService.prototype.enableNavMenu = function (inFirst, inLast) {
        // produce a message to the nav.menu to turn the menu on with a name.
        var turnOnMessage = { show: true, first: inFirst, last: inLast };
        // send this to nav menu 
        this.messageSource.next(turnOnMessage); // turn on nav menu with name
    };
    NavService.prototype.hideNavMenu = function () {
        // turn nav menu off again.
        var turnOffmessage = this.firstMessage;
        this.messageSource.next(turnOffmessage);
    };
    NavService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], NavService);
    return NavService;
}());
exports.NavService = NavService;
//# sourceMappingURL=nav.service.js.map