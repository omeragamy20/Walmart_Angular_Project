import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Services/User/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../../InterFaces/user';
import { UserLogin } from '../../../InterFaces/user-login';
import { AuthService } from '../../../Services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogin:UserLogin = {} as UserLogin
  users:User[] = [] as User[] 
  username:string =''
  
  @Input()Email :string = '';

  constructor(private auth : AuthService,private router:Router,private _ActivatedRoute: ActivatedRoute,private userSer:UserService){}
  
  ngOnInit(): void {
    this.Email = this._ActivatedRoute.snapshot.params['Email'];
     this.userSer.GetAllUsers().subscribe({
      next:(value)=>{
        this.users = value
      },
    })
  }

  onSubmit()
  {
    
     this.users.find((ele)=>{
      if(ele.email == this.Email)
        this.username = ele.username
      return ;
    })

    if(this.username != undefined){
    this.userLogin.username = this.username

    this.userSer.UserLogin(this.userLogin).subscribe({
      next:(res)=>{
       this.auth.setTokenAndId(res.token,res.id);
       this.router.navigateByUrl("/home")
      },
      error:(err)=>{
        console.log(err)
      }
    })
     
  }
  }
}
