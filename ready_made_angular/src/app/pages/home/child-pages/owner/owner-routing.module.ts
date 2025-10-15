import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner.component';
import {MaterialBalanceResolver} from '../../../../resolvers/material-balance.resolver';
import {MaterialResolver} from '../../../../resolvers/material.resolver';
import {EmployeesResolver} from '../../../../resolvers/employees.resolver';
import {ProjectDetailsResolver} from '../../../../resolvers/project-details.resolver';
import {CashTransactionByEmployeeResolver} from '../../../../resolvers/cash-transaction-by-employee.resolver';
import {CashBalanceResolver} from '../../../../resolvers/cash-balance.resolver';
import {UserResolver} from '../../../../resolvers/user.resolver';
import {MaterialBetweenEmployeesResolver} from '../../../../resolvers/material-between-employees.resolver';
import {PlossWithdrawResolver} from '../../../../resolvers/ploss-withdraw.resolver';

const routes: Routes = [{ path: '', component: OwnerComponent
  , children: [
  { path: 'MaterialToManager'
    , loadChildren: () => import('./material-to-manager/material-to-manager.module').then(m => m.MaterialToManagerModule)
    , resolve: {materialResolver: MaterialResolver}
  },
  { path: 'MaterialFromManager'
    , loadChildren: () => import('./material-from-manager/material-from-manager.module').then(m => m.MaterialFromManagerModule)
    , resolve: {materialResolver: MaterialResolver}
  },
   { path: 'OwnerCashWithdrawn'
      // tslint:disable-next-line:max-line-length
      , loadChildren: () => import('src/app/pages/home/child-pages/sales-manager/misc-manager/manager-cash-withdrawn/manager-cash-withdrawn.module').then(m => m.ManagerCashWithdrawnModule)
      , resolve: {
        employeeResolver: EmployeesResolver,
        projectDetails: ProjectDetailsResolver,
        cashTransactionsByEmployee: CashTransactionByEmployeeResolver,
        cashBalances: CashBalanceResolver,
        currentUser: UserResolver
      }
   },
   { path: 'OwnerCashToManager'
       // tslint:disable-next-line:max-line-length
       , loadChildren: () => import('./cash-to-manager/cash-to-manager.module').then(m => m.CashToManagerModule)
       , resolve: {
            employeeResolver: EmployeesResolver,
            projectDetails: ProjectDetailsResolver,
            cashTransactionsByEmployee: CashTransactionByEmployeeResolver,
            cashBalances: CashBalanceResolver,
            currentUser: UserResolver
       }
   },

   { path: 'materialTransactionReport'
            // tslint:disable-next-line:max-line-length
            , loadChildren: () => import('./material-transaction-report/material-transaction-report.module').then(m => m.MaterialTransactionReportModule)
            , resolve: {
                projectDetails: ProjectDetailsResolver,
                materialTransactionBetweenEmployees: MaterialBetweenEmployeesResolver,
                currentUser: UserResolver
            }
    },

    { path: 'PlossWithdrawn'
        // tslint:disable-next-line:max-line-length
        , loadChildren: () => import('./ploss-withdrawn/ploss-withdrawn.module').then(m => m.PlossWithdrawnModule)
        , resolve: {
             plossData: PlossWithdrawResolver,
             currentUser: UserResolver
        }
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
