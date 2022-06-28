import {Component, OnInit} from '@angular/core';
import {ServiceAdminService} from '../../serviceAdmin.service';

@Component({
  selector: 'app-lottery-mrs',
  templateUrl: './lottery-mrs.component.html',
  styleUrls: ['./lottery-mrs.component.scss']
})
export class LotteryMrsComponent implements OnInit {
  public listWin: string[] = [];

  constructor(private service: ServiceAdminService) {
  }

  ngOnInit() {
    this.service.listRequestMrs().subscribe((response) => {
      this.listWin = response['data'];
      console.log(response)

    });
  }

}
