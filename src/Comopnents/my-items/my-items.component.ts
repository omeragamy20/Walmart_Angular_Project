import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-my-items',
  standalone: true,
  imports: [RouterLink,RouterOutlet, RouterLinkActive],
  templateUrl: './my-items.component.html',
  styleUrl: './my-items.component.css'
})
export class MyItemsComponent {

}
