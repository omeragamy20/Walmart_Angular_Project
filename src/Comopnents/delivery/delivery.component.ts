import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css'
})
export class DeliveryComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      // Navigate to another page
      this.router.navigate(['/home']);
    }, 10000);
  }

}
