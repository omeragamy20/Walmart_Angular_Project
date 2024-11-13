import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive , TranslateModule],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.css'
})
export class MyItemsComponent {

}
