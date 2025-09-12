import { Component, OnInit } from '@angular/core';
import {NavItem} from '../menu-owner/menu-owner.component';

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
          displayName: 'Production',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Working Jobs',
              iconName: 'star_rate',
              route: 'WorkingJob'
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
              displayName: 'JOB',
              iconName: 'label',
              children: [
                {
                  displayName: 'Print Job',
                  iconName: 'shopping_cart',
                  color: 'blue',
                  route: 'PrintJobForOwner',
                }
              ]
            },
            {
              displayName: 'Create Bill',
              iconName: 'star_rate',
              route: 'CreateBill'
            }
          ]
        }
      ]
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
