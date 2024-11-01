import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../Services/Language/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

constructor(private lanSer:LanguageService){

}
switchLanguage(lang:string){
  this.lanSer.changeLang(lang);
}
}
