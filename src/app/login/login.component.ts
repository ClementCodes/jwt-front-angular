import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { tap } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: FormControl
  userPassword!: FormControl
  mainForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private userAuthService: UserAuthService, private route: Router) { }



  ngOnInit(): void {

    this.mainForm = this.formBuilder.group({
      userName: this.userName,
      userPassword: this.userPassword,

    })
  }


  login() {
    this.userService.login(this.mainForm.value).pipe(

      tap((response: any) => {

        this.userAuthService.setRoles(response.user.role)
        this.userAuthService.setToken(response.jwtToken)


        const role = response.user.role[0].roleName

        if (role === "Admin") {
          this.route.navigate(["/admin"])
          console.log(response.user.role)
        } else {

          this.route.navigate(["/user"])
          console.log("error");

        };




      })
    ).subscribe();

    // .subscribe((response) => {console.log(response);},  (error) => { console.log(error); })

  }
}
