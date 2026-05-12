import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,    
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog);

  products: Pagination<Product> | null = null;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];
  shopParams = new ShopParams();

  ngOnInit(): void {
    this.initalizeShop();
  }

  initalizeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => (this.products = response),
      error: (error) => console.error(error),
    });
  }

  onSearchChange() {
    this.shopParams.pageIndex = 1; // Reset to first page when search changes
    this.getProducts();
  }

  onSortChange($event: MatSelectionListChange) {
    const selectedOptions = $event.source.selectedOptions.selected;
    if (selectedOptions.length > 0) {
      console.log('Selected sort option:', selectedOptions[0].value);      
      
      this.shopParams.sort = selectedOptions[0].value;
      this.shopParams.pageIndex = 1; // Reset to first page when sorting changes
      this.getProducts();
    }
  }

  handlePageEvent($event: PageEvent) {
    console.log('Page event:', $event);
    this.shopParams.pageIndex = $event.pageIndex + 1;
    this.shopParams.pageSize = $event.pageSize;
    this.getProducts();
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(FilterDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.shopParams.brands = result.selectedBrands;
        this.shopParams.types = result.selectedTypes;
        this.shopParams.pageIndex = 1; // Reset to first page when filters change
        this.getProducts();
        //this.initalizeShop();
      }
    });
  }
}
