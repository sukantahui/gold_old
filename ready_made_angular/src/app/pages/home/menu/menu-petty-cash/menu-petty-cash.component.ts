import { Component, OnInit } from '@angular/core';
import {NavItem} from '../menu-owner/menu-owner.component';

@Component({
  selector: 'app-menu-petty-cash',
  templateUrl: './menu-petty-cash.component.html',
  styleUrls: ['./menu-petty-cash.component.scss']
})
export class MenuPettyCashComponent implements OnInit {

  constructor() { }
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
          displayName: 'Production',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Working Jobs',
              iconName: 'star_rate',
              route: 'WorkingJob'
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
        }
      ]
    },
    {
      displayName: 'Activity',
      iconName: 'close',
      children: [
        {
          displayName: 'Production',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Bill',
              iconName: 'star_rate',
              route: 'CreateBill'
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
        }
      ]
    },
  ];
  ngOnInit(): void {
  }

}
