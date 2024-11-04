import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../InterFaces/user';
import { UserService } from '../../../Services/User/user.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-sign-in-or-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in-or-register.component.html',
  styleUrl: './sign-in-or-register.component.css'
})
export class SignInOrRegisterComponent implements OnInit {
  users:User[]={} as User[]  
  EmailUser:string =''

  constructor(private router:Router,private usrSer:UserService){}
  ngOnInit(): void {
    this.usrSer.GetAllUsers().subscribe({
    next:(value)=> {
      this.users = value
    },
   })
  }
  
  onSubmit(){

    let chk =  this.users.find((ele)=>{
      return this.EmailUser == ele.email 
    })

    if(chk){
      this.router.navigate(['/Login',this.EmailUser])
    }else{
      this.router.navigate(['/Register',this.EmailUser])
    }
  }
}
