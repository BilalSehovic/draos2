import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  public username: string = "";
  constructor(@Inject(Router) private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  public help() {
    // show help
    this.dialog.open(HelpDialogComponent, { width: '50vw', height: 'auto' });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}