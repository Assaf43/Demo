import { Component, inject } from '@angular/core';
import { ShopService } from '../../../core/services/shop.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-filter-dialog',
  imports: [MatDividerModule, MatSelectionList, MatListOption, FormsModule, MatAnchor],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.scss',
})
export class FilterDialogComponent {
  
  shopService = inject(ShopService);
  private dialogRef = inject(MatDialogRef<FilterDialogComponent>);
  data = inject(MAT_DIALOG_DATA);

  selectedBrands: string[] = this.data.selectedBrands;
  selectedTypes: string[] = this.data.selectedTypes;

  onApplyFilters() {
    this.dialogRef.close({
      selectedBrands: this.selectedBrands,
      selectedTypes: this.selectedTypes
    });
  }
  onResetFilters() {
    this.selectedBrands = [];
    this.selectedTypes = [];
  }

}
