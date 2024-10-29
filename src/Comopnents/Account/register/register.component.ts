import { Component, Input, input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserRegister } from '../../../InterFaces/user-register';
import { FormsModule, NgModel } from '@angular/forms';
import { UserService } from '../../../Services/User/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  UserReg:UserRegister = {} as UserRegister
  @Input()Email :string = '';
  constructor(private router:Router,private _ActivatedRoute: ActivatedRoute,private userSer:UserService){}
  
  ngOnInit(): void {
    this.Email = this._ActivatedRoute.snapshot.params['Email'];
  }

  onSubmit()
  {
    this.UserReg.Email = this.Email
   this.UserReg.ConfirmPassword = this.UserReg.Password 
   this.UserReg.Address = "ss"  
   this.UserReg.ImageUrl =".." 
   this.UserReg.Username =`${this.Email.split('@')[0]}00${this.UserReg.FirstName}00${this.UserReg.LastName}`;
     this.userSer.RegisterUser(this.UserReg).subscribe({
      next:(val)=>{
        this.router.navigate(['/home'])
      },error:(err)=>{
        console.log(this.UserReg)
        console.log(err)
      },
     });
    console.log(this.UserReg)
  }

}
