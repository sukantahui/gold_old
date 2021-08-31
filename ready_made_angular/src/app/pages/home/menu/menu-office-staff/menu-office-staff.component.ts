import { Component, OnInit } from '@angular/core';
import {NavItem} from "../menu-owner/menu-owner.component";

@Component({
  selector: 'app-menu-office-staff',
  templateUrl: './menu-office-staff.component.html',
  styleUrls: ['./menu-office-staff.component.scss']
})
export class MenuOfficeStaffComponent implements OnInit {
  navItems: NavItem[] = [
    {
      displayName: 'Report',
      iconName: 'close',
      children: [
        {
          displayName: 'Status Report',
          iconName: 'group',
          route: 'StaffReport'
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
