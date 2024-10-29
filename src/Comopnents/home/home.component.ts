import { Component } from '@angular/core';
import { HomeSectionOneComponent} from "../home-section-one/home-section-one.component";
import { CategoryComponent } from "../category/category.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSectionOneComponent,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
// export class category{

// }
