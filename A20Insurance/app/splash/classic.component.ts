import { Component } from '@angular/core'; 
import { Router, ActivatedRoute } from '@angular/router';  

@Component({
    templateUrl: 'classic.component.html',
    styleUrls: ['classic.component.css'],
    moduleId: module.id
})
export class ClassicComponent {

    constructor(private router: Router) { };


    onRoute(event: any) {

        // make menu hide and route. 
        var whereTo = event.target.innerText;

        if (whereTo == "Sign-in") { whereTo = "signin"; }
        if (whereTo == "Register") { whereTo = "register"; } 

        this.router.navigate([whereTo]);


    }

}
