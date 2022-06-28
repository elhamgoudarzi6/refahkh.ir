import {Component, OnInit} from '@angular/core';
import {EmployeeModel} from '../../../Auth/Employee.model';
import {EmployeeDashboardService} from '../employee-dashboard.service';
import {ActivatedRoute} from '@angular/router';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeDashboardModule} from '../employee-dashboard.module';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-content-body',
    templateUrl: './content-body.component.html',
    styleUrls: ['./content-body.component.scss'],
    providers: [MessageService]
})
export class ContentBodyComponent implements OnInit {
    public employeeModel: EmployeeDashboardModule[];
    public countLoan: any[] = [];
    public cols: any[];
    public employee = {
        id: '',
        firstName: '',
        lastName: '',
        fatherName: '',
        address: '',
        nationalCode: '',
        personalCode: '',
        mobile: '',
        acountNum: '',
        typeEmployee: '',
        gender: '',
        phoneNumber: '',
        image: '',

    };
    public resultRequestLoan;
    public personalCode: string;
    public password: string;
    public dataRecived = {
        personalCode: '',
        password: '',
        employee_id: ''
    };
    public userForm: FormGroup;
    display: boolean = false;
    public loanID: string;


    constructor(private messageService: MessageService, private fb: FormBuilder, private service: EmployeeDashboardService, private activatedRoute: ActivatedRoute) {
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
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params) => {
                this.dataRecived.personalCode = params.get('personalCode');
                this.dataRecived.password = params.get('password');
                this.dataRecived.employee_id = params.get('employee_id');
            }
        );
        this.userForm = this.fb.group({
            'personalCode': new FormControl(''),
            'password': new FormControl(''),
            'firstName': new FormControl('', Validators.required),
            'lastName': new FormControl('', Validators.required),
            'fatherName': new FormControl('', Validators.required),
            'address': new FormControl('', Validators.required),
            'nationalCode': new FormControl('', Validators.required),
            'mobile': new FormControl('', Validators.required),
            'acountNum': new FormControl('', Validators.required),
            'typeEmployee': new FormControl('', Validators.required),
            'gender': new FormControl('', Validators.required),
            'phoneNumber': new FormControl('', Validators.required),
            'image': new FormControl(''),
        });
        this.service.login(this.dataRecived).subscribe((response) => {
            this.employee.id = response['data']['id'];
            this.employee.firstName = response['data']['firstName'];
            this.employee.lastName = response['data']['lastName'];
            this.employee.fatherName = response['data']['fatherName'];
            this.employee.nationalCode = response['data']['nationalCode'];
            this.employee.personalCode = response['data']['personalCode'];
            this.employee.typeEmployee = response['data']['typeEmployee'];
            this.employee.mobile = response['data']['mobile'];
            this.employee.acountNum = response['data']['acountNum'];
            this.employee.gender = response['data']['gender'];
            this.employee.address = response['data']['address'];
            this.employee.phoneNumber = response['data']['phoneNumber'];
            this.employee.image = response['data']['image'];
        });
        this.loadDataLoan();

    }

    loadDataLoan() {
        this.countLoan.splice(0, this.countLoan.length);
        this.service.indexLoan().subscribe((response) => {
            this.employeeModel = response['data'];
            for (var i = 0; i < response['data'].length; i++) {
                let id = response['data'][i]['_id'];
                this.service.countRequestLoan(id).subscribe((response) => {
                    this.countLoan.push({id: id, count: response['count']});
                });
            }

        });

    }
    onUpload(event) {
        const formData = new FormData();
        for (let i = 0; i < event.files.length; i++) {
            formData.append('image', event.files[i], event.files[i]['name']);
        }
        this.service.uploadFile(formData).subscribe((response) => {
            if (response['success'] === true) {
                this.employee.image = response['imagePath'];
            } else {

            }
        });
    }
    onUpdate() {
        this.service.update(this.userForm.value, this.employee.id).subscribe((response) => {
            if (response['success'] === true) {
                this.messageService.add({severity: 'success', summary: 'پرسنل محترم', detail: response['data']});
               this.requestLoan(this.loanID);
                this.display = !this.display;
            }
        });
    }
    showDialog(id: any) {
        this.loanID = id;
        this.display = true;
    }
    requestLoan(id: any) {
        let data = {
            loanID: id,
            personalCode: this.employee.personalCode,
            employee_id: this.dataRecived.employee_id
        };
        this.service.requestLoan(data).subscribe((response) => {
            console.log(response)
            this.resultRequestLoan = response['data'];
            this.messageService.add({
                severity: 'success',
                summary: 'پرسنل محترم',
                detail: response['data'],
                life: 50000
            });
        });
        this.loadDataLoan();
    }
}



