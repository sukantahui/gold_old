!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(r=n.key,i=void 0,"symbol"==typeof(i=function(t,e){if("object"!=typeof t||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var n=o.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(r,"string"))?i:String(i)),n)}var r,i}function o(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[5066],{65066:function(e,n,r){r.r(n),r.d(n,{ReadymadeStockGroupwiseModule:function(){return J}});var i=r(38583),c=r(63423),u=r(92340),a=r(37716),l=r(82820),p=r(51095),d=r(26584),g=r(33013),s=r(76627),Z=r(35618);function f(t,e){if(1&t){var o=a.EpF();a.TgZ(0,"div",17),a.TgZ(1,"h4"),a._uU(2),a.qZA(),a.TgZ(3,"span",18),a._UZ(4,"i",19),a.TgZ(5,"input",20),a.NdJ("input",function(t){return a.CHM(o),a.oxw(),a.MAs(2).filterGlobal(t.target.value,"contains")}),a.qZA(),a.qZA(),a.qZA()}if(2&t){var n=a.oxw(2);a.xp6(2),a.Oqu(n.selectedCategory.category)}}function y(t,e){1&t&&(a.TgZ(0,"tr"),a.TgZ(1,"th"),a._uU(2,"SL"),a.qZA(),a.TgZ(3,"th",21),a._uU(4,"Model "),a._UZ(5,"p-sortIcon",22),a.qZA(),a.TgZ(6,"th",23),a._uU(7,"Qty "),a._UZ(8,"p-sortIcon",24),a.qZA(),a.TgZ(9,"th",25),a._uU(10,"Gold "),a._UZ(11,"p-sortIcon",26),a.qZA(),a.TgZ(12,"th",27),a._uU(13,"LC "),a._UZ(14,"p-sortIcon",28),a.qZA(),a.qZA())}function x(t,e){if(1&t){var o=a.EpF();a.TgZ(0,"a",32),a.NdJ("click",function(){a.CHM(o);var t=a.oxw(),e=t.$implicit,n=t.rowIndex;return a.oxw(2).modelSelected(e,n)}),a.TgZ(1,"mat-icon"),a._uU(2,"gps_not_fixed"),a.qZA(),a.qZA()}}function q(t,e){1&t&&(a.TgZ(0,"a",33),a.TgZ(1,"mat-icon"),a._uU(2,"gps_fixed"),a.qZA(),a.qZA())}function v(t,e){if(1&t&&(a.TgZ(0,"tr"),a.TgZ(1,"td"),a._uU(2),a.qZA(),a.TgZ(3,"td"),a._uU(4),a.qZA(),a.TgZ(5,"td"),a._uU(6),a.qZA(),a.TgZ(7,"td"),a._uU(8),a.qZA(),a.TgZ(9,"td"),a._uU(10),a.qZA(),a.TgZ(11,"td",29),a.YNc(12,x,3,0,"a",30),a.YNc(13,q,3,0,"a",31),a.qZA(),a.qZA()),2&t){var o=e.$implicit,n=e.rowIndex,r=a.oxw(2);a.xp6(2),a.Oqu(n+1),a.xp6(2),a.Oqu(o.product_code),a.xp6(2),a.Oqu(o.qty),a.xp6(2),a.Oqu(o.gold),a.xp6(2),a.Oqu(o.lc),a.xp6(2),a.Q6J("ngIf",r.selectedCategoryIndex!=n),a.xp6(1),a.Q6J("ngIf",r.selectedCategoryIndex==n)}}var A=function(){return[10,20,30,50,100,200,500,1e3,1e4]},T=function(){return["product_code","qty"]};function h(t,e){if(1&t&&(a.TgZ(0,"div",11),a.TgZ(1,"p-table",12,13),a.YNc(3,f,6,1,"ng-template",14),a.YNc(4,y,15,0,"ng-template",15),a.YNc(5,v,14,7,"ng-template",16),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(1),a.Q6J("value",o.stockListBySelectedCategory)("rows",100)("showCurrentPageReport",!0)("rowsPerPageOptions",a.DdM(7,A))("paginator",!0)("globalFilterFields",a.DdM(8,T))("responsive",!0)}}function m(t,e){if(1&t){var o=a.EpF();a.TgZ(0,"div",17),a.TgZ(1,"h4"),a._uU(2,"Stock by Category"),a.qZA(),a.TgZ(3,"span",18),a._UZ(4,"i",19),a.TgZ(5,"input",20),a.NdJ("input",function(t){return a.CHM(o),a.oxw(),a.MAs(2).filterGlobal(t.target.value,"contains")}),a.qZA(),a.qZA(),a.qZA()}}function w(t,e){1&t&&(a.TgZ(0,"tr"),a.TgZ(1,"th"),a._uU(2,"SL"),a.qZA(),a.TgZ(3,"th",21),a._uU(4,"Description "),a._UZ(5,"p-sortIcon",22),a.qZA(),a.TgZ(6,"th",23),a._uU(7,"Qty "),a._UZ(8,"p-sortIcon",24),a.qZA(),a.TgZ(9,"th",25),a._uU(10,"Gold "),a._UZ(11,"p-sortIcon",26),a.qZA(),a.TgZ(12,"th",27),a._uU(13,"LC "),a._UZ(14,"p-sortIcon",28),a.qZA(),a.qZA())}function b(t,e){if(1&t){var o=a.EpF();a.TgZ(0,"a",32),a.NdJ("click",function(){a.CHM(o);var t=a.oxw(),e=t.$implicit,n=t.rowIndex;return a.oxw(2).categorySelected(e,n)}),a.TgZ(1,"mat-icon"),a._uU(2,"gps_not_fixed"),a.qZA(),a.qZA()}}function _(t,e){1&t&&(a.TgZ(0,"a",33),a.TgZ(1,"mat-icon"),a._uU(2,"gps_fixed"),a.qZA(),a.qZA())}function k(t,e){if(1&t&&(a.TgZ(0,"tr"),a.TgZ(1,"td"),a._uU(2),a.qZA(),a.TgZ(3,"td"),a._uU(4),a.qZA(),a.TgZ(5,"td"),a._uU(6),a.qZA(),a.TgZ(7,"td"),a._uU(8),a.qZA(),a.TgZ(9,"td"),a._uU(10),a.qZA(),a.TgZ(11,"td",29),a.YNc(12,b,3,0,"a",30),a.YNc(13,_,3,0,"a",31),a.qZA(),a.qZA()),2&t){var o=e.$implicit,n=e.rowIndex,r=a.oxw(2);a.xp6(2),a.Oqu(n+1),a.xp6(2),a.Oqu(o.category),a.xp6(2),a.Oqu(o.qty),a.xp6(2),a.Oqu(o.gold),a.xp6(2),a.Oqu(o.lc),a.xp6(2),a.Q6J("ngIf",r.selectedCategoryIndex!=n),a.xp6(1),a.Q6J("ngIf",r.selectedCategoryIndex==n)}}var U=function(){return["category","qty"]};function C(t,e){if(1&t&&(a.TgZ(0,"div",34),a.TgZ(1,"p-table",12,35),a.YNc(3,m,6,0,"ng-template",14),a.YNc(4,w,15,0,"ng-template",15),a.YNc(5,k,14,7,"ng-template",16),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(1),a.Q6J("value",o.stockByGroup)("rows",100)("showCurrentPageReport",!0)("rowsPerPageOptions",a.DdM(7,A))("paginator",!0)("globalFilterFields",a.DdM(8,U))("responsive",!0)}}function I(t,e){if(1&t&&(a.TgZ(0,"div",36),a.TgZ(1,"div",37),a.TgZ(2,"div",38),a.TgZ(3,"div",39),a.TgZ(4,"pre"),a._uU(5),a.ALo(6,"json"),a.qZA(),a.qZA(),a.TgZ(7,"div",40),a.TgZ(8,"pre"),a._uU(9),a.ALo(10,"json"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&t){var o=a.oxw();a.xp6(5),a.hij("                            stockByGroup = ",a.lcZ(6,2,o.stockByGroup),"\n                    "),a.xp6(4),a.hij("                        stockListBySelectedCategory=",a.lcZ(10,4,o.stockListBySelectedCategory),"\n                    ")}}var S,L=[{path:"",component:(S=function(){function e(o){t(this,e),this.reportService=o,this.isProduction=u.N.production,this.selectedCategoryIndex=-1}return o(e,[{key:"ngOnInit",value:function(){}},{key:"showRecord",value:function(){var t=this;console.log("testing"),this.reportService.getStockInHandGroupwise().subscribe(function(e){t.stockByGroup=e.data})}},{key:"categorySelected",value:function(t,e){var o=this;this.selectedCategoryIndex=e,this.selectedCategory=this.stockByGroup[e],this.reportService.getStockInHandByCategory(t.product_category_id).subscribe(function(t){o.stockListBySelectedCategory=t.data})}},{key:"modelSelected",value:function(t,e){}}]),e}(),S.\u0275fac=function(t){return new(t||S)(a.Y36(l.r))},S.\u0275cmp=a.Xpm({type:S,selectors:[["app-readymade-stock-groupwise"]],decls:14,vars:3,consts:[[1,"d-flex","flex-column",2,"min-height","100vh"],[1,"p-2","text-center",2,"background-color","rgb(77, 68, 68)"],[1,"p-5","justify-content-xl-between"],["mat-button","",1,"primary",3,"click"],[1,"p-2"],[1,"container-fluid","rounded","d-flex","flex-xl-row","justify-content-xl-between","flex-column"],["class","p-2 col-xl-6","style","background-color: rgb(199, 192, 192)",4,"ngIf"],[1,"bloc_2","p-2","col-xl-6",2,"background-color","antiquewhite"],["class","p-2","style","border: 1px solid #454141; border-radius: 10px;",4,"ngIf"],[1,"mt-auto","p-2","text-center",2,"background-color","rgb(77, 68, 68)"],["id","developer-div",4,"ngIf"],[1,"p-2","col-xl-6",2,"background-color","rgb(199, 192, 192)"],["styleClass","p-datatable-gridlines","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries",3,"value","rows","showCurrentPageReport","rowsPerPageOptions","paginator","globalFilterFields","responsive"],["dt3",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],[1,"flex"],[1,"p-input-icon-left","ml-auto"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search keyword",3,"input"],["pSortableColumn","category"],["field","category"],["pSortableColumn","qty"],["field","qty"],["pSortableColumn","gold"],["field","gold"],["pSortableColumn","lc"],["field","lc"],[1,"text-right","noprint"],[3,"routerLink","click",4,"ngIf"],[3,"routerLink",4,"ngIf"],[3,"routerLink","click"],[3,"routerLink"],[1,"p-2",2,"border","1px solid #454141","border-radius","10px"],["dt2",""],["id","developer-div"],[1,"outerContainer"],["fxLayout","row","fxLayoutGap","1px","fxLayout.sm","column",1,"container-fluid","rounded","d-flex","flex-xl-row","justify-content-xl-between","flex-column"],["fxLayoutAlign","center center",1,"col"],["fxFlex","2 1 auto","fxLayoutAlign","center center",1,"col"]],template:function(t,e){1&t&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a._uU(2,"Stock by Category"),a.qZA(),a.TgZ(3,"div",2),a.TgZ(4,"button",3),a.NdJ("click",function(){return e.showRecord()}),a._uU(5,"Fetch Stock Record"),a.qZA(),a.qZA(),a.TgZ(6,"div",4),a.TgZ(7,"div",5),a.YNc(8,h,6,9,"div",6),a.TgZ(9,"div",7),a.YNc(10,C,6,9,"div",8),a.qZA(),a.qZA(),a.qZA(),a.TgZ(11,"div",9),a._uU(12,"I am footer, i will stay here"),a.qZA(),a.qZA(),a.YNc(13,I,11,6,"div",10)),2&t&&(a.xp6(8),a.Q6J("ngIf",e.stockListBySelectedCategory&&e.stockListBySelectedCategory.length>0),a.xp6(2),a.Q6J("ngIf",e.stockByGroup&&e.stockByGroup.length>0),a.xp6(3),a.Q6J("ngIf",!e.isProduction))},directives:[p.lW,i.O5,d.iA,g.jx,d.lQ,d.fz,c.yS,s.Hw,Z.xw,Z.SQ,Z.Wh,Z.yH],pipes:[i.Ts],styles:[""]}),S)}],N=function(){var e=o(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[c.Bz.forChild(L)],c.Bz]}),e}(),B=r(86640),O=r(3679),P=r(49983),J=function(){var e=o(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[[i.ez,N,p.ot,d.U$,B.A0,Z.ae,s.Ps,O.u5,O.UX,P.c]]}),e}()}}])}();