import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(
        private auth: AuthService,
        router: Router,
        private userService: UserService) {

        auth.user$.subscribe(user => {
            if (user) {
                userService.save(user);

                const returnUrl = localStorage.getItem('returnUrl');
                router.navigateByUrl(returnUrl);
            }
        });
    }
}
