import { Component } from '@angular/core';
import { HomeSectionOneComponent } from "../home-section-one/home-section-one.component";
import { HomeLayOutComponent } from '../home-lay-out/home-lay-out.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSectionOneComponent,HomeLayOutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
