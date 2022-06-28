import {Component, OnInit} from '@angular/core';
import {map, shareReplay} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {MenuItem} from 'primeng/api';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  items: MenuItem[];

  /** Based on the screen size, switch from standard to one column per row */
  public dataRecived = {
    personalCode: '',
    password: '',

  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params) => {
        this.dataRecived.personalCode = params.get('personalCode');
        this.dataRecived.password = params.get('password');

      });

    this.items = [
      {
        label: 'خروج',
        icon: 'pi pi-power-off',
           command: (event: Event) => {

          this.router.navigate(['']);
        }
      }]
  }
  goPage(){
    this.router.navigate(['panel/loanNew',this.dataRecived]);
  }
}
