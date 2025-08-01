import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';








// @ts-ignore
const routes: Routes = [

  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

  { path: 'top', loadChildren: () => import('./pages/home/top/top.module').then(m => m.TopModule) },

  { path: 'about', loadChildren: () => import('./pages/home/about/about.module').then(m => m.AboutModule) },

  { path: 'MenuPublic', loadChildren: () => import('./pages/home/menu/menu-public/menu-public.module').then(m => m.MenuPublicModule) },

  { path: 'MenuOwner', loadChildren: () => import('./pages/home/menu/menu-owner/menu-owner.module').then(m => m.MenuOwnerModule) },

  { path: 'MenuItem', loadChildren: () => import('./pages/home/menu/menu-item/menu-item.module').then(m => m.MenuItemModule) },

  { path: 'HomeNotFound', loadChildren: () => import('./pages/home/home-not-found/home-not-found.module').then(m => m.HomeNotFoundModule) },

  { path: 'WhyUs', loadChildren: () => import('./pages/home/why-us/why-us.module').then(m => m.WhyUsModule) },

  { path: 'features', loadChildren: () => import('./pages/home/features/features.module').then(m => m.FeaturesModule) },

  { path: 'PopularCourses', loadChildren: () => import('./pages/home/popular-courses/popular-courses.module').then(m => m.PopularCoursesModule) },

  { path: 'trainer', loadChildren: () => import('./pages/home/trainer/trainer.module').then(m => m.TrainerModule) },

  { path: 'developer', loadChildren: () => import('./pages/home/child-pages/developer/developer.module').then(m => m.DeveloperModule) },

  { path: 'MenuDeveloper', loadChildren: () => import('./pages/home/menu/menu-developer/menu-developer.module').then(m => m.MenuDeveloperModule) },

  { path: 'Admin', loadChildren: () => import('./pages/home/child-pages/admin/admin.module').then(m => m.AdminModule) },

  { path: 'banking', loadChildren: () => import('./pages/home/child-pages/banking/banking.module').then(m => m.BankingModule) },

  { path: 'LoadingSpinner', loadChildren: () => import('./shared/loading-spinner/loading-spinner.module').then(m => m.LoadingSpinnerModule) },

  { path: 'Student', loadChildren: () => import('./pages/home/child-pages/student/student.module').then(m => m.StudentModule) },

  { path: 'TestSection', loadChildren: () => import('./pages/home/test-section/test-section.module').then(m => m.TestSectionModule) },

  { path: 'OfferSection', loadChildren: () => import('./pages/home/offer-section/offer-section.module').then(m => m.OfferSectionModule) },

  { path: 'CalloutSection', loadChildren: () => import('./pages/home/callout-section/callout-section.module').then(m => m.CalloutSectionModule) },

  { path: 'PortfolioSection', loadChildren: () => import('./pages/home/portfolio-section/portfolio-section.module').then(m => m.PortfolioSectionModule) },

  { path: 'SalesManager', loadChildren: () => import('./pages/home/child-pages/sales-manager/sales-manager.module').then(m => m.SalesManagerModule) },

  { path: 'MenuSalesManager', loadChildren: () => import('./pages/home/menu/menu-sales-manager/menu-sales-manager.module').then(m => m.MenuSalesManagerModule) },

  { path: 'TransferToAgent', loadChildren: () => import('./pages/home/child-pages/sales-manager/transfer-to-agent/transfer-to-agent.module').then(m => m.TransferToAgentModule) },

  { path: 'TransferFromAgents', loadChildren: () => import('./pages/home/child-pages/sales-manager/transfer-from-agents/transfer-from-agents.module').then(m => m.TransferFromAgentsModule) },

  { path: 'stockEntry', loadChildren: () => import('./pages/home/child-pages/sales-manager/stock-entry/stock-entry.module').then(m => m.StockEntryModule) },

  { path: 'OfficeStaff', loadChildren: () => import('./pages/home/child-pages/office-staff/office-staff.module').then(m => m.OfficeStaffModule) },

  { path: 'MenuOfficeStaff', loadChildren: () => import('./pages/home/menu/menu-office-staff/menu-office-staff.module').then(m => m.MenuOfficeStaffModule) },

  { path: 'StatusReport', loadChildren: () => import('./pages/home/child-pages/office-staff/status-report/status-report.module').then(m => m.StatusReportModule) },

  { path: 'AgentWiseSaleReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/agent-wise-sale-report/agent-wise-sale-report.module').then(m => m.AgentWiseSaleReportModule) },

  { path: 'Order', loadChildren: () => import('./pages/home/child-pages/sales-manager/order/order.module').then(m => m.OrderModule) },

  { path: 'AgentWiseStock', loadChildren: () => import('./pages/home/child-pages/sales-manager/agent-wise-stock/agent-wise-stock.module').then(m => m.AgentWiseStockModule) },

  { path: 'AgentWiseCustomerReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/agent-wise-customer-report/agent-wise-customer-report.module').then(m => m.AgentWiseCustomerReportModule) },



  { path: 'test', loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule) },

  { path: 'WorkingJob', loadChildren: () => import('./pages/home/child-pages/office-staff/working-job/working-job.module').then(m => m.WorkingJobModule) },

  { path: 'menu-petty-cash', loadChildren: () => import('./pages/home/menu/menu-petty-cash/menu-petty-cash.module').then(m => m.MenuPettyCashModule) },

  { path: 'MenuManager', loadChildren: () => import('./pages/home/menu/menu-manager/menu-manager.module').then(m => m.MenuManagerModule) },

  { path: 'ExtraGoldAdd', loadChildren: () => import('./pages/home/child-pages/developer/extra-gold-add/extra-gold-add.module').then(m => m.ExtraGoldAddModule) },

  { path: 'DeveloperHome', loadChildren: () => import('./pages/home/child-pages/developer/developer-home/developer-home.module').then(m => m.DeveloperHomeModule) },
















































  // { path: 'GoldReceived', loadChildren: () => import('./pages/home/child-pages/sales-manager/Customer-Receipt/gold-received/gold-received.module').then(m => m.GoldReceivedModule) },









  // { path: 'CustomerDiscountReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/misc-report/customer-discount-report/customer-discount-report.module').then(m => m.CustomerDiscountReportModule) },

  // { path: 'CustomerDiscountReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/misc-report/customer-discount-report/customer-discount-report.module').then(m => m.CustomerDiscountReportModule) },

  // { path: 'CustomerDueCalculation', loadChildren: () => import('./pages/home/child-pages/sales-manager/misc-report/customer-due-calculation/customer-due-calculation.module').then(m => m.CustomerDueCalculationModule) },



  // { path: 'JobReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/product-report/job-report/job-report.module').then(m => m.JobReportModule) },

  // { path: 'DueReport', loadChildren: () => import('./pages/home/child-pages/sales-manager/product-report/due-report/due-report.module').then(m => m.DueReportModule) },

  // { path: 'SaleReturn', loadChildren: () => import('./pages/home/child-pages/sales-manager/sale-return/sale-return.module').then(m => m.SaleReturnModule) },















  // { path: 'Manager', loadChildren: () => import('./pages/home/child-pages/manager/manager.module').then(m => m.ManagerModule) }
  // tslint:disable-next-line:max-line-length
  // { path: 'AgentSalary', loadChildren: () => import('./pages/home/child-pages/sales-manager/agent-salary/agent-salary.module').then(m => m.AgentSalaryModule) }




  // { path: 'auth', loadChildren: () => import('./pages/home/auth/auth.module').then(m => m.AuthModule) },
  // { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  // { path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
