import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnacbarService {
  private snackbar= inject(MatSnackBar);

  error(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['snack-error'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  success(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 3000,
      panelClass: ['snack-success'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
