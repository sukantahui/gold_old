!function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(o=n.key,i=void 0,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(o,"string"))?i:String(i)),n)}var o,i}function r(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[1170],{31170:function(t,n,o){o.r(n),o.d(n,{FineReturnedToOwnerReportModule:function(){return L}});var i=o(38583),a=o(63423),u=o(92340),l=o(3679),c=o(37716),p=o(82820),d=o(5620),s=o(72458),f=o(98295),m=o(49983),Z=o(43220),g=o(4207),v=o(26584),A=o(33013);function q(e,t){if(1&e){var r=c.EpF();c.TgZ(0,"div",24),c.TgZ(1,"div",25),c._UZ(2,"i",26),c.TgZ(3,"input",27),c.NdJ("input",function(e){return c.CHM(r),c.oxw(),c.MAs(29).filterGlobal(e.target.value,"contains")}),c.qZA(),c.qZA(),c.qZA()}}function h(e,t){1&e&&(c.TgZ(0,"tr"),c.TgZ(1,"th"),c._uU(2,"SL"),c.qZA(),c.TgZ(3,"th",28),c._uU(4,"Date "),c._UZ(5,"p-sortIcon",29),c.qZA(),c.TgZ(6,"th",30),c._uU(7,"Reference "),c._UZ(8,"p-sortIcon",31),c.qZA(),c.TgZ(9,"th",32),c._uU(10,"Employee "),c._UZ(11,"p-sortIcon",33),c.qZA(),c.TgZ(12,"th",34),c._uU(13,"Gold "),c._UZ(14,"p-sortIcon",35),c.qZA(),c.TgZ(15,"th",36),c._uU(16,"Comment "),c._UZ(17,"p-sortIcon",37),c.qZA(),c.qZA())}function T(e,t){if(1&e&&(c.TgZ(0,"tr"),c.TgZ(1,"td"),c._uU(2),c.qZA(),c.TgZ(3,"td"),c._uU(4),c.qZA(),c.TgZ(5,"td"),c._uU(6),c.qZA(),c.TgZ(7,"td"),c._uU(8),c.qZA(),c.TgZ(9,"td",38),c._uU(10),c.ALo(11,"number"),c.qZA(),c.TgZ(12,"td"),c._uU(13),c.qZA(),c.qZA()),2&e){var r=t.$implicit,n=t.rowIndex;c.xp6(2),c.Oqu(n+1),c.xp6(2),c.Oqu(r.formatted_date),c.xp6(2),c.Oqu(r.receiver_reference),c.xp6(2),c.Oqu(r.sender_name),c.xp6(2),c.Oqu(c.xi3(11,6,r.inward_to_owner,"1.3")),c.xp6(3),c.Oqu(r.comment)}}function w(e,t){if(1&e&&(c.TgZ(0,"tr"),c.TgZ(1,"td",39),c._uU(2,"Total"),c.qZA(),c.TgZ(3,"td",38),c._uU(4),c.ALo(5,"number"),c.qZA(),c._UZ(6,"td"),c.qZA()),2&e){var r=c.oxw();c.xp6(4),c.Oqu(c.xi3(5,1,r.totalGold,"1.3"))}}function _(e,t){if(1&e&&(c.TgZ(0,"div",40),c.TgZ(1,"div",41),c.TgZ(2,"div",42),c.TgZ(3,"div",43),c.TgZ(4,"pre"),c._uU(5),c.ALo(6,"json"),c.qZA(),c.qZA(),c.TgZ(7,"div",44),c.TgZ(8,"pre"),c._uU(9,"\n                    "),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e){var r=c.oxw();c.xp6(5),c.hij("                        records = ",c.lcZ(6,1,r.records),"\n                    ")}}var x,b=function(){return[20,30,50,100,400,600,1e3,5e3]},S=function(){return["comment","sender_name","receiver_reference"]},y=[{path:"",component:(x=function(){function t(r,n,o){e(this,t),this.reportService=r,this.commonService=n,this.adapter=o,this.isProduction=u.N.production,this.isLoading=!1,this.totalGold=0,this.adapter.setLocale("in");var i=new Date,a=new Date;this.reportForm=new l.cw({startDate:new l.NI(i),startDateSql:new l.NI(null),endDate:new l.NI(a),endDateSql:new l.NI(null),reportLimit:new l.NI(50)})}return r(t,[{key:"setStartDateSQL",value:function(e){this.reportForm.patchValue({startDateSql:this.commonService.getSQLDate2(e)})}},{key:"setEndDateSQL",value:function(e){this.reportForm.patchValue({endDateSql:this.commonService.getSQLDate2(e)})}},{key:"ngOnInit",value:function(){}},{key:"loadReport",value:function(e,t){var r=this;this.reportForm.patchValue({startDateSql:this.commonService.getSQLDate2(e)}),this.reportForm.patchValue({endDateSql:this.commonService.getSQLDate2(t)}),this.isLoading=!0,this.reportService.getFineWithdrawnByOwner(this.reportForm.value.startDateSql,this.reportForm.value.endDateSql).subscribe(function(e){r.records=e.data,r.totalGold=r.records.map(function(e){return e.inward_to_owner}).reduce(function(e,t){return e+t}),r.isLoading=!1})}},{key:"onFilter",value:function(e,t){this.totalGold=t.filteredValue.map(function(e){return e.inward_to_owner}).reduce(function(e,t){return e+t})}}]),t}(),x.\u0275fac=function(e){return new(e||x)(c.Y36(p.r),c.Y36(d.v),c.Y36(s._A))},x.\u0275cmp=c.Xpm({type:x,selectors:[["app-fine-returned-to-owner-report"]],decls:35,vars:20,consts:[[1,"p-2"],[1,"container-fluid","rounded","d-flex","flex-xl-row","justify-content-xl-between","flex-column"],[1,"p-2","col-xl-10",2,"background-color","#e4e5d7","border-radius","10px","margin-bottom","5px"],[3,"formGroup"],[1,"form-row"],[1,"col"],["appearance","outline",1,"p-2"],["matInput","","formControlName","startDate",3,"matDatepicker","dateInput"],["ref1",""],["matSuffix","",3,"for"],["startView","year",3,"opened"],["matDatepicker1",""],["matInput","","formControlName","endDate",3,"matDatepicker","dateInput"],["ref2",""],["matDatepicker2",""],["pButton","","type","button","label","Show Record","icon","pi pi-check",3,"loading","click"],[1,"p-2",2,"border","1px solid #454141","border-radius","10px"],["styleClass","p-datatable-gridlines","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries",3,"value","rows","showCurrentPageReport","rowsPerPageOptions","paginator","globalFilterFields","responsive","onFilter"],["dt2",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","footer"],["id","developer-div",4,"ngIf"],[1,"d-flex","justify-content-between"],[1,"p-input-icon-left","ml-auto"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search",1,"text-right",3,"input"],["pSortableColumn","formatted_date"],["field","formatted_date"],["pSortableColumn","receiver_reference"],["field","receiver_reference"],["pSortableColumn","sender_name"],["field","sender_name"],["pSortableColumn","inward_to_owner"],["field","inward_to_owner"],["pSortableColumn","comment"],["field","comment"],[1,"text-right"],["colspan","4"],["id","developer-div"],[1,"outerContainer"],["fxLayout","row","fxLayoutGap","1px","fxLayout.sm","column",1,"container"],["fxLayoutAlign","center center",1,"col"],["fxFlex","2 1 auto","fxLayoutAlign","center center",1,"col"]],template:function(e,t){if(1&e){var r=c.EpF();c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"div",2),c.TgZ(3,"form",3),c.TgZ(4,"div",4),c.TgZ(5,"div",5),c.TgZ(6,"mat-form-field",6),c.TgZ(7,"mat-label"),c._uU(8,"Start Date"),c.qZA(),c.TgZ(9,"input",7,8),c.NdJ("dateInput",function(){c.CHM(r);var e=c.MAs(10);return t.setStartDateSQL(e.value)}),c.qZA(),c._UZ(11,"mat-datepicker-toggle",9),c._UZ(12,"mat-datepicker",10,11),c.qZA(),c.TgZ(14,"mat-form-field",6),c.TgZ(15,"mat-label"),c._uU(16,"End Date"),c.qZA(),c.TgZ(17,"input",12,13),c.NdJ("dateInput",function(){c.CHM(r);var e=c.MAs(18);return t.setEndDateSQL(e.value)}),c.qZA(),c._UZ(19,"mat-datepicker-toggle",9),c._UZ(20,"mat-datepicker",10,14),c.qZA(),c.qZA(),c.TgZ(22,"div",5),c.TgZ(23,"div"),c._uU(24),c.qZA(),c.TgZ(25,"button",15),c.NdJ("click",function(){c.CHM(r);var e=c.MAs(10),n=c.MAs(18);return t.loadReport(e.value,n.value)}),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(26,"div",1),c.TgZ(27,"div",16),c.TgZ(28,"p-table",17,18),c.NdJ("onFilter",function(e){c.CHM(r);var n=c.MAs(29);return t.onFilter(e,n)}),c.YNc(30,q,4,0,"ng-template",19),c.YNc(31,h,18,0,"ng-template",20),c.YNc(32,T,14,9,"ng-template",21),c.YNc(33,w,7,4,"ng-template",22),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.YNc(34,_,10,3,"div",23)}if(2&e){var n=c.MAs(10),o=c.MAs(13),i=c.MAs(18),a=c.MAs(21);c.xp6(3),c.Q6J("formGroup",t.reportForm),c.xp6(6),c.Q6J("matDatepicker",o),c.xp6(2),c.Q6J("for",o),c.xp6(1),c.Q6J("opened",!0),c.xp6(5),c.Q6J("matDatepicker",a),c.xp6(2),c.Q6J("for",a),c.xp6(1),c.Q6J("opened",!1),c.xp6(4),c.AsE("Fine Withdrawn from ",n.value," to ",i.value,""),c.xp6(1),c.Q6J("loading",t.isLoading),c.xp6(3),c.Q6J("value",t.records)("rows",1e3)("showCurrentPageReport",!0)("rowsPerPageOptions",c.DdM(18,b))("paginator",!0)("globalFilterFields",c.DdM(19,S))("responsive",!0),c.xp6(6),c.Q6J("ngIf",!t.isProduction)}},directives:[l._Y,l.JL,l.sg,f.KE,f.hX,m.Nt,l.Fj,Z.hl,l.JJ,l.u,Z.nW,f.R9,Z.Mq,g.Hq,v.iA,A.jx,i.O5,v.lQ,v.fz],pipes:[i.JJ,i.Ts],styles:[""]}),x)}],D=function(){var t=r(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[a.Bz.forChild(y)],a.Bz]}),t}(),U=o(70705),L=function(){var t=r(function t(){e(this,t)});return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[i.ez,D,Z.FA,m.c,s.XK,l.UX,g.hJ,v.U$,U.L$]]}),t}()}}])}();