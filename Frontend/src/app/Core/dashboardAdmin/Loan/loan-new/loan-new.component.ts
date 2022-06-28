import {Component, OnInit} from '@angular/core';
import {LoanAdminModule} from '../../loanAdmin.module';
import {ServiceAdminService} from '../../serviceAdmin.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-loan-new',
  templateUrl: './loan-new.component.html',
  styleUrls: ['./loan-new.component.scss'],
  providers: [MessageService, ConfirmationService],

})
export class LoanNewComponent implements OnInit {
  public loanModel: LoanAdminModule[];
  public cols: any[];
  public loanForm: FormGroup;
  public loan = {
    id: '',
    title: '',
    amount: '',
    number: '',
    ceilingNum: '',
    condition: '',
    percent: '',
    branch: '',
    morabehe: '',
    leasing: ''
  };
  msgs: Message[] = [];
  display: boolean = false;
  displayEdit: boolean = false;
  position: string;
  public loanID: any;

  constructor(private confirmationService: ConfirmationService, private service: ServiceAdminService, private messageService: MessageService, private fb: FormBuilder) {

  }

  showDialog(id: any) {
    this.display = !this.display;
    this.loanID = id;
  }

  ngOnInit() {
    this.loanForm = this.fb.group({
      'title': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'ceilingNum': new FormControl('', Validators.required),
      'condition': new FormControl('', Validators.required),
      'percent': new FormControl('', Validators.required),
      'branch': new FormControl('', Validators.required),
      'morabehe': new FormControl('', Validators.required),
      'leasing': new FormControl('', Validators.required),
    });

    this.cols = [
      {field: 'title', header: 'عنوان تسهیلات'},
      {field: 'amount', header: 'مقدار'},
      {field: 'number', header: 'تعداد اقساط'},
      {field: 'ceilingNum', header: 'تعداد اقساط'},
      {field: 'condition', header: 'شرط'},
      {field: 'percent', header: 'درصد '},
      {field: 'birthday', header: 'تاریخ تولد  '},
      {field: 'serialNumber', header: 'سریال شناسنامه'}
    ];
    this.loadDataLoan();
  }

  onSubmit() {
    this.service.registerLoan(this.loanForm.value).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'کاربر محترم', detail: response['data']});
        this.loadDataLoan();
        this.clearTextInput();
      }
    });
  }

  loadDataLoan() {
    this.service.showLoan().subscribe((response) => {
      this.loanModel = response['data'];
    });
  }

  onDelete() {
    this.service.deleteLoan(this.loanID).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'کاربر محترم', detail: response['data']});
        this.loadDataLoan();
        this.display = false;
      }
    });
  }
  onUpdate() {
    this.service.updateLoan(this.loan,this.loanID).subscribe((response) => {
      if (response['success'] === true) {
        this.messageService.add({severity: 'success', summary: 'کاربر محترم', detail: response['data']});
        this.loadDataLoan();
        this.displayEdit = false;
        this.clearTextInput();
      }
    });
  }
  clearTextInput() {
    this.loan.title = '';
    this.loan.percent = '';
    this.loan.number = '';
    this.loan.leasing = '';
    this.loan.branch = '';
    this.loan.condition = '';
    this.loan.ceilingNum = '';
    this.loan.morabehe = '';
    this.loan.amount = '';
  }

  showDialogEdit(id: any) {
    this.loanID=id;
    this.displayEdit = !this.displayEdit;
    for (var i = 0; i < this.loanModel.length; i++) {
      if (this.loanModel[i]['_id'] === id) {
        this.loan.id = this.loanModel[i]['_id'];
        this.loan.title = this.loanModel[i]['title'];
        this.loan.branch = this.loanModel[i]['branch'];
        this.loan.percent = this.loanModel[i]['percent'];
        this.loan.condition = this.loanModel[i]['condition'];
        this.loan.ceilingNum = this.loanModel[i]['ceilingNum'];
        this.loan.number = this.loanModel[i]['number'];
        this.loan.amount = this.loan[i]['amount'];
        this.loan.morabehe = this.loan[i]['morabehe'];
        this.loan.leasing = this.loan[i]['leasing'];

      }
    }

  }

}
