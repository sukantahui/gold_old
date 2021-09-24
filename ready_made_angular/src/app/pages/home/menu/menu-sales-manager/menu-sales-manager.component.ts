import { Component, OnInit } from '@angular/core';
import {NavItem} from '../menu-owner/menu-owner.component';

@Component({
  selector: 'app-menu-sales-manager',
  templateUrl: './menu-sales-manager.component.html',
  styleUrls: ['./menu-sales-manager.component.scss']
})
export class MenuSalesManagerComponent implements OnInit {

  navItems: NavItem[] = [
    {
      displayName: 'Transfer',
      iconName: 'close',
      children: [
        {
          displayName: 'Transfer To Agent',
          iconName: 'group',
          route: 'TransferToAgent'
        },
        {
          displayName: 'Transfer From Agents',
          iconName: 'group',
          route: 'TransferFromAgents'
        },
      ]
    },
    {
      displayName: 'Stocks',
      iconName: 'close',
      children: [
        {
          displayName: 'Stock Entry',
          iconName: 'group',
          route: 'StockEntry'
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
    },
    {
      displayName: 'Report',
      iconName: 'close',
      children: [
        {
          displayName: 'Agent',
          iconName: 'group',
          children: [
            {
              displayName: 'Agentwise Sale',
              iconName: 'person',
              route: 'AgentWiseSaleReport',
            },
            {
              displayName: 'Agentwise Stock',
              iconName: 'person',
              route: 'AgentWiseStock',
            },
            {
              displayName: 'Agentwise Customer',
              iconName: 'person',
              route: 'AgentWiseCustomerReport',
            }
          ]
        },
        {
          displayName: 'Others',
          iconName: 'pie_chart',
          children: [
            {
              displayName: 'Others report',
              iconName: 'star_rate',
              route: 'Show Stock by Agent'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Activity',
      disabled: false,
      iconName: 'close',
      route: 'michael-prentice',
      children: [
        {
          displayName: 'ORDER',
          iconName: 'label',
          children: [
            {
              displayName: 'Create Order',
              iconName: 'shopping_cart',
              color: 'green',
              route: 'Order',
            }
          ]
        },
        {
          displayName: 'Speakers',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  constructor() { }
  ngOnInit(): void {
  }

}
