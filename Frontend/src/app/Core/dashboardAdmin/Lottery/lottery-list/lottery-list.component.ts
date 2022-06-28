import {Component, OnInit} from '@angular/core';
import {ServiceAdminService} from '../../serviceAdmin.service';
import {MessageService, SelectItem} from 'primeng/api';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-lottery-list',
  templateUrl: './lottery-list.component.html',
  styleUrls: ['./lottery-list.component.scss'],
  providers: [MessageService]
})
export class LotteryListComponent implements OnInit {
  mardak: SelectItem[];
  public countLoan: any[] = [];
  public successSpinner: boolean = true;
  public resultWin: string[] = [];
  public activeResultWin: boolean = false;
  public resultShowLoan: string[] = [];
  public loanForm = {
    loanID: '',
    number: ''
  };
  public setFinalWin:any[]=[]
  constructor( private messageService: MessageService, private service: ServiceAdminService, private fb: FormBuilder) {
    this.mardak = [];
  }

  ngOnInit() {
    this.service.showLoan().subscribe((response) => {
      this.resultShowLoan = response['data'];
    });
    this.service.indexLoan().subscribe((response) => {
      if (response['success'] === true) {
        this.successSpinner = false;
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

  onRequestWin() {
    this.service.requestWin(this.loanForm).subscribe((response) => {
      if (response['success'] === true) {
        this.activeResultWin = true;
        this.resultWin = response['data'];
        for (var i = 0; i < response['data'].length; i++) {
          let personalCode = response['data'][i]['personalCode'];
        this.setFinalWin.push({"personalCode":personalCode})

        }

      }
    });
  }
  onSetFinalWin(){
    this.service.setFinalWin(this.setFinalWin).subscribe((response)=>{
      this.messageService.add({severity: 'success', summary: 'کاربر محترم', detail: response['data']});

    })
  }
}
