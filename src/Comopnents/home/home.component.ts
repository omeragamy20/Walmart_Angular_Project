import { Component } from '@angular/core';
import { HomeSectionOneComponent } from "../home-section-one/home-section-one.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSectionOneComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
