import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { isBoolean } from 'util';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  public title = "";
  public karticaForm: any = {};
  public clicked: boolean = false;
  public formInit: boolean = false;
  public reserveShow: boolean = false;
  public danas: Date = new Date();

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, @Inject(DataService) public dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.title = this.data.proizvodacVozila + ' ' + this.data.modelVozila;
      this.data.rentOd = isNaN(new Date(this.data.rentOd).getFullYear()) ? null : new Date(this.data.rentOd);
      this.data.rentDo = isNaN(new Date(this.data.rentDo).getFullYear()) ? null : new Date(this.data.rentDo);
    }
  }
  
  public imgLoad(e) {
    // if img width over 30% screen, scale
    if (e.currentTarget.width > Math.round(window.innerWidth*0.3)) {
      this.clicked = true;
    }
  }

  public reserve() {
    this.karticaForm = this.dataService.getKartica();
    if (this.karticaForm.istice) {
      this.karticaForm.istice = new Date(this.karticaForm.istice);
    }
    
    this.reserveShow = true;
    setTimeout(() => {
      document.getElementById('resDiv').scrollIntoView();
    }, 10);
  }

  public sacuvaj() {
    localStorage.setItem('kartica', JSON.stringify(this.karticaForm));
    this.dataService.reserve(this.data.id);
    this.snackBar.open('Uspješno', '', {duration: 5000});
    this.dialogRef.close();
  }

  public clear()  {
    for (var member in this.karticaForm) {
      if (!isBoolean(this.karticaForm[member])) {
        delete this.karticaForm[member];
      }
      else {
        this.karticaForm[member] = false;
      }
    }
  }
}
