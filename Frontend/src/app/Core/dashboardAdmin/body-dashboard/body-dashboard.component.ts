import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {EmployeeDashboardService} from '../../dashboardEmployees/employee-dashboard.service';

@Component({
  selector: 'app-body-dashboard',
  templateUrl: './body-dashboard.component.html',
  styleUrls: ['./body-dashboard.component.scss']
})
export class BodyDashboardComponent implements OnInit {
  data: any;
  datapie: any;
  options: any;
  countLoan: any[] = [];
  chart: Chart;
   x:[];
  constructor(private service: EmployeeDashboardService) {

    this.service.indexLoan().subscribe((response) => {

      for (var i = 0; i < response['data'].length; i++) {
        let id = response['data'][i]['_id'];
        let title = response['data'][i]['title'];
        this.service.countRequestLoan(id).subscribe((response) => {
          this.countLoan.push({title: title, count: response['count']});

        });
      }

      this.data = {
        labels: ['تسهیلات مسکن', 'تسهیلات مرابحه یک', 'تسهیلات مرابحه دو', 'تسهیلات مرابحه سه', 'تسهیلات کارت اعتباری ملی', 'تسهیلات قرض الحسنه ملی'],

        datasets: [
          {
            label: 'تعداد درخواست برای وام',
            backgroundColor: ['#9933CC', '#4285F4', '#f57f17', '#ffab00', '#006064', '#00C851'],
            data: [this.countLoan[0].count,15,11,17,15,30],
            borderColor: '#33b5e5',
            borderWidth: 0.6,
            fontSize: 14,
            hoverBackgroundColor: '#263238'
          },

        ]
      };
    });



    this.options = {
      title: {
        display: false,
        // text: 'تعداد درخواست برای وام',
        fontSize: 16
      },
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          // This more specific font property overrides the global property
          fontSize: 10,
          fontColor: 'red',

        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: true,
            color: 'red'
          },
          ticks: {
            beginAtZero: true,
            stepSize: 1,
            fontColor: 'green', // this here
          }
        }],
        yAxes: [{
          display: true
        }]
      }
    };
  }

  ngOnInit() {



  }


  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
