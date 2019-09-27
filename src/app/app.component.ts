import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rent-a-car';

  constructor(@Inject(Router) public router: Router, @Inject(DataService) public dataService: DataService) {

    let login = localStorage.getItem('login');
    if (!login || login == 'false') {
      this.router.navigate(['/login']);
    }

    this.dataService.setData();
  }
}
