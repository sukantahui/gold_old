import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

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
                                }


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
