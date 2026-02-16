import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-misc-report',
  templateUrl: './misc-report.component.html',
  styleUrls: ['./misc-report.component.scss']
})
export class MiscReportComponent implements OnInit {

  isProduction: boolean = environment.production;

  subject: string = 'Misc Reports';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {

          let route = this.activatedRoute.firstChild;

          while (route?.firstChild) {
            route = route.firstChild;
          }

          if (route?.snapshot?.data?.['title']) {
            this.subject = route.snapshot.data['title'];
          }

        });

  }

}
