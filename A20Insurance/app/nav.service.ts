import { Injectable, Output } from '@angular/core';
import { NavMessage } from './navmessage';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 

@Injectable()
export class NavService {

    // purpose: send messages to nav.menu.component as observable 
    // turn on and off nav menu based on service calls EnableNavMenu and hideNavMenu respectively.
    // when app starts - turn off
    // when register, sign in - turn on
    // when admin sign in - turn off.

    firstMessage: NavMessage = 
    {
        show: false,
        first: "",
        last: "" 
    }

    // first message to observable is to turn the nav menu off
    private messageSource = new BehaviorSubject<NavMessage>(this.firstMessage);
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeMessage(message: NavMessage)
    {
        this.messageSource.next(message);
    }

    public enableNavMenu(inFirst: string, inLast: string)
    {
        // produce a message to the nav.menu to turn the menu on with a name.
        var turnOnMessage: NavMessage = { show: true, first: inFirst, last: inLast }
        // send this to nav menu 
        this.messageSource.next(turnOnMessage); // turn on nav menu with name
    }
     

    public hideNavMenu() {

        // turn nav menu off again.
        var turnOffmessage: NavMessage = this.firstMessage;
        this.messageSource.next(turnOffmessage);
    }
     
     
}

