import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  loading = false;
  busyReqCount = 0;

  busy(){
    this.busyReqCount++;
    this.loading = true;
  }

  idle() {
    this.busyReqCount--;
    if(this.busyReqCount <= 0) {
      this.busyReqCount = 0;
      this.loading = false;
    }
  }
}
