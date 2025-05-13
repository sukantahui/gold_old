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
          displayName: 'Business Status',
          iconName: 'person',
          route: 'BusinessStatus',
        },
        {
          displayName: 'Material',
          iconName: 'group',
          children: [
            {
              displayName: '92 Daily Transactions',
              iconName: 'person',
              route: 'GiniDailyTransaction',
            },
          ]
        },
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
          displayName: 'Stock',
          iconName: 'pie_chart',
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
            },
            {
              displayName: 'Stock in Hand',
              iconName: 'feedback',
              route: 'StockInHandReport'
            }

          ]
        },
        {
          displayName: 'Misc. Report',
          iconName: 'pie_chart',
          route: 'MiscReport'
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
          displayName: 'BILL',
          iconName: 'label',
          children: [
            {
              displayName: 'Create Bill',
              iconName: 'shopping_cart',
              color: 'green',
              route: 'CreateBill',
            }
          ]
        },
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
          displayName: 'Agent Activity',
          iconName: 'group',
          children: [
            {
              displayName: 'Agent Withdraw',
              iconName: 'person',
              route: 'AgentSalaryWithdraw'
            },
            {
              displayName: 'Sale Return',
              iconName: 'person',
              route: 'SaleReturn'
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
    },
    {
      displayName: 'Production',
      disabled: false,
      iconName: 'close',
      route: 'michael-prentice',
      children: [
        {
          displayName: 'JOB',
          iconName: 'label',
          children: [
            {
              displayName: 'Send to Job',
              iconName: 'shopping_cart',
              color: 'green',
              route: 'SendToJob',
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
