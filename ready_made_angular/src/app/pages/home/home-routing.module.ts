import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {AgentSalaryWithdrawResolver} from '../../resolvers/agent-salary-withdraw.resolver';
import {AgentSalaryBalanceSheetResolver} from '../../resolvers/agent-salary-balance-sheet.resolver';
import {SalaryAdjustmentResolver} from '../../resolvers/salary-adjustment.resolver';
import {SalaryHolderSalaryPaymentResolver} from '../../resolvers/salary-holder-salary-payment.resolver';
import {CustomerResolver} from '../../resolvers/customer.resolver';
import {ShowItemStockResolver} from '../../resolvers/show-item-stock.resolver';
import {SaleReturnResolver} from '../../resolvers/sale-return.resolver';
import {CustomerReceiptResolver} from '../../resolvers/customer-receipt.resolver';


// @ts-ignore
// @ts-ignore
// @ts-ignore
const routes: Routes = [
                          { path: '', component: HomeComponent,
                            children: [
                              {
                                path: 'test',
                                loadChildren: () => import('./child-pages/print-demo/print-demo.module')
                                    .then(mod => mod.PrintDemoModule)
                              },
                              {
                                  path: 'owner',
                                  loadChildren: () => import('./child-pages/owner/owner.module')
                                        .then(mod => mod.OwnerModule)
                               },
                               {
                                  path: 'developer',
                                  loadChildren: () => import('./child-pages/developer/developer.module')
                                        .then(mod => mod.DeveloperModule)
                               },
                               {
                                    path: 'banking',
                                    loadChildren: () => import('./child-pages/banking/banking.module')
                                        .then(mod => mod.BankingModule)
                               },
                                {
                                    path: 'SalesManager',
                                    loadChildren: () => import('./child-pages/sales-manager/sales-manager.module')
                                        .then(mod => mod.SalesManagerModule)
                                },
                                {
                                    path: 'Manager',
                                    loadChildren: () => import('./child-pages/manager/manager.module')
                                        .then(mod => mod.ManagerModule)
                                },
                                {

                                    path: 'OfficeStaff',
                                    loadChildren: () => import('./child-pages/office-staff/office-staff.module')
                                        .then(mod => mod.OfficeStaffModule)
                                },
                                {
                                    path: 'TransferToAgent',
                                    loadChildren: () => import('./child-pages/sales-manager/transfer-to-agent/transfer-to-agent.module')
                                        .then(mod => mod.TransferToAgentModule)
                                },
                                {
                                    path: 'TransferFromAgents',
                                    loadChildren: () => import('./child-pages/sales-manager/transfer-from-agents/transfer-from-agents.module')
                                        .then(mod => mod.TransferFromAgentsModule)
                                },
                                {
                                    path: 'StockEntry',
                                    loadChildren: () => import('./child-pages/sales-manager/stock-entry/stock-entry.module')
                                        .then(mod => mod.StockEntryModule)
                                },
                                {
                                    path: 'StaffReport',
                                    loadChildren: () => import('./child-pages/office-staff/status-report/status-report.module')
                                        .then(mod => mod.StatusReportModule)
                                },
                                {
                                    path: 'AgentWiseSaleReport',
                                    loadChildren: () => import('./child-pages/sales-manager/agent-wise-sale-report/agent-wise-sale-report.module')
                                        .then(mod => mod.AgentWiseSaleReportModule)
                                },
                                {
                                    path: 'Order',
                                    loadChildren: () => import('./child-pages/sales-manager/order/order.module')
                                        .then(mod => mod.OrderModule)
                                },
                                {
                                    path: 'AgentWiseStock',
                                    loadChildren: () => import('./child-pages/sales-manager/agent-wise-stock/agent-wise-stock.module')
                                        .then(mod => mod.AgentWiseStockModule)
                                },
                                {
                                    path: 'AgentWiseCustomerReport',
                                    loadChildren: () => import('./child-pages/sales-manager/agent-wise-customer-report/agent-wise-customer-report.module')
                                        .then(mod => mod.AgentWiseCustomerReportModule)
                                },
                                {
                                    path: 'CreateBill',
                                    loadChildren: () => import('./child-pages/office-staff/create-bill/create-bill-routing.module')
                                        .then(mod => mod.CreateBillRoutingModule)
                                },
                                // tslint:disable-next-line:max-line-length
                                { path: 'WorkingJob', loadChildren: () => import('./child-pages/office-staff/working-job/working-job.module')
                                        .then(m => m.WorkingJobModule)
                                },

                                { path: 'refinish', loadChildren: () => import('./child-pages/refinish/refinish.module')
                                        .then(m => m.RefinishModule)
                                },
                                { path: 'PettyCash', loadChildren: () => import('./child-pages/petty-cash/petty-cash.module')
                                        .then(m => m.PettyCashModule)
                                },
                                { path: 'AgentSalary', loadChildren: () => import('./child-pages/sales-manager/agent-salary/agent-salary.module')
                                        .then(m => m.AgentSalaryModule)
                                },
                                { path: 'AgentSalaryWithdraw', loadChildren: () => import('./child-pages/sales-manager/agent-salary-withdraw/agent-salary-withdraw.module')
                                        .then(m => m.AgentSalaryWithdrawModule),
                                    resolve: {agentSalaryWithdrawResolver: AgentSalaryWithdrawResolver}
                                },
                                { path: 'AgentSalaryBalanceSheet', loadChildren: () => import('./child-pages/sales-manager/agent-salary-balance-sheet/agent-salary-balance-sheet.module')
                                        .then(m => m.AgentSalaryBalanceSheetModule),
                                        resolve: {agentSalaryBalanceSheetResolver: AgentSalaryBalanceSheetResolver}
                                },
                                { path: 'SalaryHolder', loadChildren: () => import('./child-pages/sales-manager/salary-holder/salary-holder.module')
                                        .then(m => m.SalaryHolderModule),
                                    resolve: {agentSalaryBalanceSheetResolver: AgentSalaryBalanceSheetResolver}
                                },
                                { path: 'SalaryAdjustment', loadChildren: () => import('./child-pages/sales-manager/salary-adjustment/salary-adjustment.module')
                                        .then(m => m.SalaryAdjustmentModule),
                                    resolve: {salaryAdjustmentResolver: SalaryAdjustmentResolver}
                                },
                                { path: 'SalaryHolderSalaryPayment', loadChildren: () => import('./child-pages/sales-manager/salary-holder-salary-payment/salary-holder-salary-payment.module')
                                        .then(m => m.SalaryHolderSalaryPaymentModule),
                                    resolve: {salaryHolderSalaryPaymentResolver: SalaryHolderSalaryPaymentResolver}
                                },
                                { path: 'CustomerDiscountReport', loadChildren: () => import('./child-pages/sales-manager/customer-discount-report/customer-discount-report.module')
                                        .then(m => m.CustomerDiscountReportModule),
                                    resolve: {customerResolver: CustomerResolver}
                                },
                                { path: 'ShowItemStock', loadChildren: () => import('./child-pages/sales-manager/show-item-stock/show-item-stock.module')
                                        .then(m => m.ShowItemStockModule),
                                        resolve: {showItemStockResolver: ShowItemStockResolver}
                                },
                                { path: 'ProductReport'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/product-report/product-report.module').then(m => m.ProductReportModule)
                                },
                                { path: 'StockInHandReport'
                                    , loadChildren: () => import('./child-pages/sales-manager/stock-in-hand-report/stock-in-hand-report.module').then(m => m.StockInHandReportModule)
                                    , resolve: {showItemStockResolver: ShowItemStockResolver}
                                },
                                { path: 'ReadymadeStockGroupwise'
                                    , loadChildren: () => import('./child-pages/sales-manager/readymade-stock-groupwise/readymade-stock-groupwise.module').then(m => m.ReadymadeStockGroupwiseModule)
                                    , resolve: {showItemStockResolver: ShowItemStockResolver}
                                },
                                { path: 'SaleReturn'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/sale-return/sale-return.module').then(m => m.SaleReturnModule)
                                    , resolve: {saleReturnResolver: SaleReturnResolver}
                                },
                                { path: 'MiscReport'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/misc-report/misc-report.module').then(m => m.MiscReportModule)
                                },
                                { path: 'CustomerReceipt'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/Customer-Receipt/customer-receipt.module')
                                        .then(m => m.CustomerReceiptModule)
                                    , resolve: {customerReceiptResolver: CustomerReceiptResolver}
                                },
                                { path: 'MiscManager'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/misc-manager/misc-manager.module')
                                        .then(m => m.MiscManagerModule)
                                },
                                { path: 'WithdrawByOwner'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/withdraw-by-owner/withdraw-by-owner.module')
                                        .then(m => m.WithdrawByOwnerModule)
                                },
                                { path: 'SendToJob'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/sales-manager/send-to-job/send-to-job.module')
                                        .then(m => m.SendToJobModule)
                                },
                                { path: 'CreateBill'
                                    // tslint:disable-next-line:max-line-length
                                    , loadChildren: () => import('./child-pages/office-staff/create-bill/create-bill.module')
                                        .then(m => m.CreateBillModule)
                                },













                            ]
                          },
                          // { path: '404', loadChildren: () => import('./home-not-found/home-not-found.module')
                          //         .then(m => m.HomeNotFoundModule)
                          // },
                          // { path: '**', redirectTo: '/404'}
                      ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
