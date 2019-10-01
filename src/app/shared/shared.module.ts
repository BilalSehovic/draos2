import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatRadioModule, MatSelectModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatExpansionModule, MatStepperModule, MatButtonModule, MatDialogModule, MatSnackBarModule, MatTooltipModule, MatIconModule, MatBadgeModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDataGridModule, DxTemplateModule, DxFormModule, DxCheckBoxModule, DxTileViewModule, DxLookupModule } from 'devextreme-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
    DxDataGridModule,
    DxLookupModule,
    DxTemplateModule,
    DxFormModule,
    DxCheckBoxModule,
    DxTileViewModule
  ],
  exports: [
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatIconModule,
    MatBadgeModule,
    DxDataGridModule,
    DxLookupModule,
    DxTemplateModule,
    DxFormModule,
    DxCheckBoxModule,
    DxTileViewModule
  ]
})
export class SharedModule { }
