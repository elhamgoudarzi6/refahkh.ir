import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {ServiceAdminService} from '../../serviceAdmin.service';
import * as xlsx from 'xlsx';

@Component({
  selector: 'app-lottery-win',
  templateUrl: './lottery-win.component.html',
  styleUrls: ['./lottery-win.component.scss']
})
export class LotteryWinComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  mardak: SelectItem[];
  public listWin: any [] = [];
  public successSpinner: boolean = false;
  public loanForm = {
    loanID: '',

  };

  constructor(private service: ServiceAdminService) {
    this.mardak = [];
  }

  printToCart(printSectionId: string) {
    let popupWinindow;
    let innerContents = document.getElementById(printSectionId).innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();
  }

  ngOnInit() {
    this.service.indexLoan().subscribe((response) => {
      if (response['success'] === true) {
        // this.successSpinner = false;
        for (var i = 0; i < response['data'].length; i++) {
          let id = response['data'][i]['_id'];
          let title = response['data'][i]['title'];
          this.service.countRequestLoan(id).subscribe((response) => {
            this.mardak.push({label: title, value: id});

          });
        }
      }
    });
  }

  onListWin() {
    this.successSpinner = true;
    this.listWin.splice(0, this.listWin.length);
    this.service.listWin(this.loanForm).subscribe((response) => {
      if (response['success'] === true) {
        this.listWin = response['data'];
        this.successSpinner = false;
      }
    });
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }
}
