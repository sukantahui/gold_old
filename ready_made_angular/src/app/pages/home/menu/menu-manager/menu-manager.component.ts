import { Component, OnInit } from '@angular/core';
import {NavItem} from '../menu-owner/menu-owner.component';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
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
            },
            {
              displayName: 'Agent Salary',
              iconName: 'person',
              route: 'AgentSalary',
            },
            {
              displayName: 'Salary Balance',
              iconName: 'person',
              route: 'AgentSalaryBalanceSheet',
            }
          ]
        },
        {
          displayName: 'Sale',
          iconName: 'group',
          children: [
            {
              displayName: 'Modelwise Sale',
              iconName: 'person',
              route: 'ModelWiseSaleReport',
            }
          ]
        },
        {
          displayName: 'Others',
          iconName: 'pie_chart',
          children: [
            {
              displayName: 'Discount to Customer',
              iconName: 'star_rate',
              route: 'CustomerDiscountReport'
            }
          ]
        },
        {
          displayName: 'Misc.',
          iconName: 'pie_chart',
          children: [
            {
              displayName: 'Product & Models',
              iconName: 'star_rate',
              route: 'ProductReport'
            }
          ]
        },
        {
          displayName: 'Stock',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Stock by Agent',
              iconName: 'star_rate',
              route: 'ShowItemStock'
            },
            {
              displayName: 'Stock GroupWise',
              iconName: 'star_rate',
              route: 'ReadymadeStockGroupwise'
            }
          ]
        },
        {
          displayName: 'MIS',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Withdraw by Owner',
              iconName: 'star_rate',
              route: 'WithdrawByOwner'
            },
            {
              displayName: 'Stock GroupWise',
              iconName: 'star_rate',
              route: 'ReadymadeStockGroupwise'
            }
          ]
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
          displayName: 'Customer',
          iconName: 'label',
          children: [
            {
              displayName: 'Lc/Gold Receipt',
              iconName: 'shopping_cart',
              color: 'green',
              route: 'CustomerReceipt',
            }
          ]
        },
        {
          displayName: 'Misc. Manage',
          iconName: 'label',
          route: 'MiscManager',
        },
        {
          displayName: 'Agent Activity',
          iconName: 'group',
          children: [
            {
              displayName: 'Agent Withdraw',
              iconName: 'person',
              route: 'AgentSalaryWithdraw'
            }
          ]
        },
        {
          displayName: 'Salary',
          iconName: 'group',
          children: [
            {
              displayName: 'Salary Holders',
              iconName: 'person',
              route: 'SalaryHolder'
            },
            {
              displayName: 'Create Salary',
              iconName: 'person',
              route: 'SalaryAdjustment'
            },
            {
              displayName: 'Pay Salary',
              iconName: 'person',
              route: 'SalaryHolderSalaryPayment'
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
