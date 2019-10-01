import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material';
import { isBoolean } from 'util';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('grid', { static: false }) public grid: DxDataGridComponent;
  @ViewChild('myForm', { static: false }) public myForm: DxFormComponent;
  public carsDS: any[] = [];
  public formInit: boolean = false;
  public allowAdding: boolean = false;
  public searchForm: any = {};
  public viewMode: string = undefined;
  public expanded: boolean = false;
  public isAdmin: boolean = false;
  public tileViewItems: any[] = [];
  public carMakers: any[] = [];
  public sutra: Date = new Date();
  public sutrapluspet: Date = new Date();
  public kategorije: any[] = ['Limuzina', 'MaloAuto', 'Karavan', 'Kombi', 'Terenac', 'Kabriolet', 'Oldtimer'];
  public goriva: any[] = ['Dizel', 'Benzin', 'Plin', 'Elektro', 'Hibrid'];

  constructor(@Inject(Router) public router: Router, @Inject(DataService) public dataService: DataService, public dialog: MatDialog) { 
    let login = localStorage.getItem('login');
    if (!login || login == 'false') {
      this.router.navigate(['/login']);
    }

    if (this.dataService.getRole() == 'renter') {
      this.allowAdding = true;
    }

    this.isAdmin = (this.dataService.getRole() == 'admin');
  }

  ngOnInit() { 
    this.onValueChanged = this.onValueChanged.bind(this);

    this.sutra.setDate(this.sutra.getDate() + 1);
    this.sutrapluspet.setDate(this.sutra.getDate() + 6);

    this.dataService.setData();
    
    this.carMakers = this.dataService.getCarMakers();
    this.carsDS = this.dataService.getCars();
    this.tileViewItems = this.dataService.getCars();

    this.viewMode = 'grid';
  }

  public apply() {
    this.carsDS = this.dataService.getCars();
    var propCount = 0;
    var boolProps1 = [];
    var boolProps2 = [];
    for (var property in this.searchForm) {
      if (this.searchForm[property] && !isBoolean(this.searchForm[property])) {
        if (property != 'rentOd' && property != 'rentDo') {
          this.carsDS = this.carsDS.filter(el => el[property] == this.searchForm[property]);
          propCount++;
        }
        else {
          if (property == 'rentOd') {
            this.carsDS = this.carsDS.filter(el => { return (new Date(this.searchForm[property]) >= new Date(el['rentOd'])) });
            this.carsDS = this.carsDS.filter(el => { return (new Date(this.searchForm[property]) <= new Date(el['rentDo'])) });
          }
          if (property == 'rentDo') {
            this.carsDS = this.carsDS.filter(el => { return (new Date(this.searchForm[property]) <= new Date(el['rentDo'])) });
            this.carsDS = this.carsDS.filter(el => { return (new Date(this.searchForm[property]) >= new Date(el['rentOd'])) });
          }
          propCount++;
        }
      }
      else if (isBoolean(this.searchForm[property]) && this.searchForm[property] && property != 'OznaciSveProizvodace') {
        if (this.kategorije.includes(property)) {
          boolProps1.push(property);
        }
        if (this.goriva.includes(property)) {
          boolProps2.push(property);
        }
        propCount++;
      }
    }

    if (boolProps1.length) {
      this.carsDS = this.carsDS.filter(el => {
        let res: boolean = false;
        boolProps1.forEach(bp => {
          if (el[bp] && el[bp] == true) {
            res = true;
          }
        })
        return res;
      });
    }

    if (boolProps2.length) {
      this.carsDS = this.carsDS.filter(el => {
        let res: boolean = false;
        boolProps2.forEach(bp => {
          if (el[bp] && el[bp] == true) {
            res = true;
          }
        })
        return res;
      });
    }

    if (propCount == 0) {
      this.carsDS = this.dataService.getCars();
    }

    // this.viewMode = 'grid';
    this.expanded = false;
  }

  public details(e: any) {
    // show details
    this.dialog.open(DetailsDialogComponent, { width: '80vw', height: '90vh', data: e.data }).afterClosed().subscribe(e => {
      this.apply();
    });
  }

  public flag(e: any) {
    // flag rent-a-car house
    e.data.flag = true;
    let cars = this.dataService.getCars();
    cars.forEach(el => {
      if (el.id == e.data.id) {
        el.flag = true;
      }
    });
    this.dataService.setCars(cars);
  }

  public block(e: any) {
    // block rent-a-car house
    e.data.block = true;
    let cars = this.dataService.getCars();
    cars.forEach(el => {
      if (el.id == e.data.id) {
        el.block = true;
      }
    });
    this.dataService.setCars(cars);
  }

  public onRowPrepared(e) {
    if (e.rowType == 'data' && e.data.block) {
      e.cells.forEach((c, index)=>{
        if (c.cellElement) {
          c.cellElement.style['text-decoration'] = "line-through";
        }
      })
    }
  }

  public onInitNewRow(e) {
    e.data.Rezervisan = true;
  }

  public onRowInserting(e) {
    e.data.Rezervisan = !e.data.Rezervisan;
    let kategorija = e.data.KategorijaVozila;
    let gorivo = e.data.GorivoVozila;
    delete e.data.KategorijaVozila;
    delete e.data.GorivoVozila;
    e.data[kategorija] = true;
    e.data[gorivo] = true;
  }

  public onRowInserted(e) {
    e.data.id = this.dataService.getCars()[this.dataService.getCars().length-1].id + 1;
    let cars: any[] = this.dataService.getCars();
    delete e.data['__KEY__'];
    cars.push(e.data);
    this.dataService.setCars(cars);
  }

  public onInitialized(e) {
    this.formInit = true;
  }

  public onValueChanged(e) {
    this.myForm.instance.getEditor('proizvodacVozila').option('disabled', e.value);
    if (e.value) {
      delete this.searchForm['proizvodacVozila'];
    }
  }

  public clear()  {
    for (var member in this.searchForm) {
      if (!isBoolean(this.searchForm[member])) {
        delete this.searchForm[member];
      }
      else {
        this.searchForm[member] = false;
      }
    }
  }

}
