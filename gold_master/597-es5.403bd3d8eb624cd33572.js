!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[597],{6597:function(e,r,n){n.r(r),n.d(r,{StatusReportModule:function(){return U}});var a,i=n(8583),d=n(4655),l=n(3679),c=n(7716),u=n(5304),s=n(8307),g=n(5620),p=n(1841),Z=n(4889),h=n(5662),v=((a=function(){function e(o,r,n,a){t(this,e),this.commonService=o,this.http=r,this.errorService=n,this.logger=a}return o(e,[{key:"getMaterialReceivedByDate",value:function(t,e,o,r){return this.http.get(this.commonService.getAPI()+"/dev/materialReceivedTransactions/total/"+t+"/"+e+"/"+o+"/"+r+"/1").pipe((0,u.K)(this.errorService.serverError),(0,s.b)(function(t){}))}},{key:"getGoldSendToJobByDateAndEmployee",value:function(t,e,o,r){return this.http.get(this.commonService.getAPI()+"/dev/goldSendToJobs/total/"+t+"/"+e+"/"+o+"/"+r).pipe((0,u.K)(this.errorService.serverError),(0,s.b)(function(t){}))}},{key:"getGoldReceivedFromJobByDateAndEmployee",value:function(t,e,o,r){return this.http.get(this.commonService.getAPI()+"/dev/goldReceivedFromJobs/total/"+t+"/"+e+"/"+o+"/"+r).pipe((0,u.K)(this.errorService.serverError),(0,s.b)(function(t){}))}},{key:"getNitricReceivedFromJobByDateAndEmployee",value:function(t,e,o,r){return this.http.get(this.commonService.getAPI()+"/dev/nitricReceivedFromJobs/total/"+t+"/"+e+"/"+o+"/"+r).pipe((0,u.K)(this.errorService.serverError),(0,s.b)(function(t){}))}},{key:"getBillTotalByDate",value:function(t,e){return this.http.get(this.commonService.getAPI()+"/dev/billTotal/total/"+t+"/"+e).pipe((0,u.K)(this.errorService.serverError),(0,s.b)(function(t){}))}}]),e}()).\u0275fac=function(t){return new(t||a)(c.LFG(g.v),c.LFG(p.eN),c.LFG(Z.T),c.LFG(h.R0))},a.\u0275prov=c.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"}),a),f=n(3738),m=n(5618),y=n(8295),A=n(9983),T=n(3220),q=n(6627),b=n(1095);function x(t,e){if(1&t&&(c.TgZ(0,"div",16),c.TgZ(1,"div",17),c.TgZ(2,"div",18),c.TgZ(3,"table",19),c.TgZ(4,"thead"),c.TgZ(5,"tr"),c.TgZ(6,"th",20),c._uU(7),c.ALo(8,"date"),c.ALo(9,"date"),c.qZA(),c.TgZ(10,"th"),c._uU(11),c.qZA(),c.qZA(),c.TgZ(12,"tr"),c.TgZ(13,"th"),c._uU(14,"Particulars"),c.qZA(),c.TgZ(15,"th"),c._uU(16,"Value"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(17,"tbody"),c.TgZ(18,"tr"),c.TgZ(19,"th",21),c._uU(20,"JOB Details"),c.qZA(),c.qZA(),c.TgZ(21,"tr"),c.TgZ(22,"th"),c._uU(23,"Send to Job"),c.qZA(),c.TgZ(24,"td",22),c._uU(25),c.qZA(),c.qZA(),c.TgZ(26,"tr"),c.TgZ(27,"th"),c._uU(28,"Mathakata"),c.qZA(),c.TgZ(29,"td",22),c._uU(30),c.qZA(),c.qZA(),c.TgZ(31,"tr"),c.TgZ(32,"th"),c._uU(33,"Nitric"),c.qZA(),c.TgZ(34,"td",22),c._uU(35),c.qZA(),c.qZA(),c.TgZ(36,"tr"),c.TgZ(37,"th",21),c._uU(38,"Bill Details"),c.qZA(),c.qZA(),c.TgZ(39,"tr"),c.TgZ(40,"th"),c._uU(41,"P Loss"),c.qZA(),c.TgZ(42,"td",22),c._uU(43),c.qZA(),c.qZA(),c.TgZ(44,"tr"),c.TgZ(45,"th"),c._uU(46,"Labour Charge"),c.qZA(),c.TgZ(47,"td",22),c._uU(48),c.ALo(49,"currency"),c.qZA(),c.qZA(),c.TgZ(50,"tr"),c.TgZ(51,"th"),c._uU(52,"Guinea Gold"),c.qZA(),c.TgZ(53,"td",22),c._uU(54),c.qZA(),c.qZA(),c.TgZ(55,"tr"),c.TgZ(56,"th"),c._uU(57,"Fine Gold"),c.qZA(),c.TgZ(58,"td",22),c._uU(59),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c._UZ(60,"div",23),c.qZA(),c.qZA()),2&t){var o=c.oxw();c.xp6(7),c.AsE("Gold Received Between ",c.xi3(8,10,o.startDate,"dd/MM/yyyy")," and ",c.xi3(9,13,o.endDate,"dd/MM/yyyy"),""),c.xp6(4),c.hij("",o.totalGoldReceived," gm."),c.xp6(14),c.hij("",o.totalGoldSendToJob," gm."),c.xp6(5),c.hij("",o.totalGoldReceivedFromJob," gm."),c.xp6(5),c.hij("",o.totalNitricReceivedFromJob," gm."),c.xp6(8),c.hij("",o.billTotal.ploss," gm."),c.xp6(5),c.Oqu(c.Dn7(49,16,o.billTotal.lc,"INR",!0)),c.xp6(6),c.Oqu(o.billTotal.guinea_gold),c.xp6(5),c.Oqu(o.billTotal.fine_gold)}}function _(t,e){if(1&t&&(c.TgZ(0,"div",24),c.TgZ(1,"pre"),c._uU(2),c.ALo(3,"json"),c.qZA(),c.TgZ(4,"pre"),c._uU(5),c.ALo(6,"json"),c.ALo(7,"json"),c.qZA(),c.TgZ(8,"pre"),c._uU(9),c.ALo(10,"json"),c.qZA(),c.qZA()),2&t){var o=c.oxw();c.xp6(2),c.hij("        statusReportForm = ",c.lcZ(3,4,o.statusReportForm.value),"\n    "),c.xp6(3),c.AsE("        startDate = ",c.lcZ(6,6,o.startDate),"\n        endDate = ",c.lcZ(7,8,o.endDate),"\n    "),c.xp6(4),c.hij("        totalGoldReceived = ",c.lcZ(10,10,o.totalGoldReceived),"\n    ")}}var D=[{path:"",component:function(){var e=function(){function e(o){t(this,e),this.statusReportService=o,this.reportCount=0,this.billTotal={ploss:0,lc:0,mv:0,fine_gold:0,guinea_gold:0};var r=new Date,n=(0,i.p6)(r,"yyyy-MM-dd","en");this.startDate=(0,i.p6)(r,"yyyy-MM-dd","en"),this.endDate=(0,i.p6)(r,"yyyy-MM-dd","en"),this.statusReportForm=new l.cw({start_date:new l.NI(n),end_date:new l.NI(n)})}return o(e,[{key:"ngOnInit",value:function(){}},{key:"dateInputEvent",value:function(t){}},{key:"startDateChangeEvent",value:function(t){this.startDate=(0,i.p6)(new Date(t.value),"yyyy-MM-dd","en")}},{key:"endDateChangeEvent",value:function(t){this.endDate=(0,i.p6)(new Date(t.value),"yyyy-MM-dd","en")}},{key:"getReport",value:function(){var t=this;this.statusReportService.getMaterialReceivedByDate(this.startDate,this.endDate,48,70).subscribe(function(e){t.totalGoldReceived=e.data,t.reportCount++,console.log("Total Received Gold",e)},function(t){console.log(t)}),this.statusReportService.getGoldSendToJobByDateAndEmployee(this.startDate,this.endDate,48,70).subscribe(function(e){t.totalGoldSendToJob=e.data,t.reportCount++,console.log("Total Gold Send to job",e)},function(t){console.log(t)}),this.statusReportService.getGoldReceivedFromJobByDateAndEmployee(this.startDate,this.endDate,48,70).subscribe(function(e){t.totalGoldReceivedFromJob=e.data,t.reportCount++,console.log("Total Gold Received from job",e)},function(t){console.log(t)}),this.statusReportService.getNitricReceivedFromJobByDateAndEmployee(this.startDate,this.endDate,45,70).subscribe(function(e){t.totalNitricReceivedFromJob=e.data,t.reportCount++,console.log("Nitric Received from Job",e)},function(t){console.log(t)}),this.statusReportService.getBillTotalByDate(this.startDate,this.endDate).subscribe(function(e){t.billTotal=e.data,t.reportCount++,console.log("Bill Total",e)},function(t){console.log(t)})}}]),e}();return e.\u0275fac=function(t){return new(t||e)(c.Y36(v))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-status-report"]],decls:33,vars:7,consts:[["id","status-report-div"],[1,"example-card"],["mat-card-avatar","",1,"example-header-image"],["fxLayout","row","fxLayout.xs","column","fxLayoutAlign","start","fxLayoutGap","10px","fxLayoutGap.xs","0",1,"container"],[3,"formGroup"],["fxFlex","30",1,"example-full-width"],["matInput","","formControlName","start_date","placeholder","dd/mm/yyyy",3,"matDatepicker","dateChange"],["matSuffix","",3,"for"],["matDatepickerToggleIcon",""],["startDatePicker",""],["matInput","","formControlName","end_date","placeholder","dd/mm/yyyy",3,"matDatepicker","dateInput","dateChange"],["endDatePicker",""],["fxFlex","30",1,"example-button-row"],["mat-button","","color","primary",3,"click"],["id","report-area",4,"ngIf"],["id","developer-div",4,"ngIf"],["id","report-area"],[1,"d-flex","flex-row","bd-highlight","mb-3"],[1,"p-2","bd-highlight","col-8"],[1,"table"],["colspan","3"],["colspan","2",1,"text-center"],[1,"text-right"],[1,"d-flex","col-4","flex-row","bd-highlight","mb-3"],["id","developer-div"]],template:function(t,e){if(1&t&&(c.TgZ(0,"div",0),c.TgZ(1,"mat-card",1),c.TgZ(2,"mat-card-header"),c._UZ(3,"div",2),c.TgZ(4,"mat-card-title"),c._uU(5,"Working Status Report"),c.qZA(),c.qZA(),c.TgZ(6,"mat-card-content"),c.TgZ(7,"div",3),c.TgZ(8,"form",4),c.TgZ(9,"div",3),c.TgZ(10,"mat-form-field",5),c.TgZ(11,"mat-label"),c._uU(12,"Start date (dd/mm/yyyy)"),c.qZA(),c.TgZ(13,"input",6),c.NdJ("dateChange",function(t){return e.startDateChangeEvent(t)}),c.qZA(),c.TgZ(14,"mat-datepicker-toggle",7),c.TgZ(15,"mat-icon",8),c._uU(16,"keyboard_arrow_down"),c.qZA(),c.qZA(),c._UZ(17,"mat-datepicker",null,9),c.qZA(),c.TgZ(19,"mat-form-field",5),c.TgZ(20,"mat-label"),c._uU(21,"End date (dd/mm/yyyy)"),c.qZA(),c.TgZ(22,"input",10),c.NdJ("dateInput",function(t){return e.dateInputEvent(t)})("dateChange",function(t){return e.endDateChangeEvent(t)}),c.qZA(),c.TgZ(23,"mat-datepicker-toggle",7),c.TgZ(24,"mat-icon",8),c._uU(25,"keyboard_arrow_down"),c.qZA(),c.qZA(),c._UZ(26,"mat-datepicker",null,11),c.qZA(),c.TgZ(28,"div",12),c.TgZ(29,"button",13),c.NdJ("click",function(){return e.getReport()}),c._uU(30,"Search"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.YNc(31,x,61,20,"div",14),c.qZA(),c.YNc(32,_,11,12,"div",15)),2&t){var o=c.MAs(18),r=c.MAs(27);c.xp6(8),c.Q6J("formGroup",e.statusReportForm),c.xp6(5),c.Q6J("matDatepicker",o),c.xp6(1),c.Q6J("for",o),c.xp6(8),c.Q6J("matDatepicker",r),c.xp6(1),c.Q6J("for",r),c.xp6(8),c.Q6J("ngIf",e.reportCount>0),c.xp6(1),c.Q6J("ngIf",!1)}},directives:[f.a8,f.dk,f.kc,f.n5,f.dn,m.xw,m.Wh,m.SQ,l._Y,l.JL,l.sg,y.KE,m.yH,y.hX,A.Nt,l.Fj,T.hl,l.JJ,l.u,T.nW,y.R9,q.Hw,T.Q0,T.Mq,b.lW,i.O5],pipes:[i.uU,i.H9,i.Ts],styles:["#status-report-div[_ngcontent-%COMP%]{min-height:100vh;width:100vw;padding-left:35px;padding-right:65px}#developer-div[_ngcontent-%COMP%]{padding-left:35px;padding-right:65px}"]}),e}()}],R=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[d.Bz.forChild(D)],d.Bz]}),e}(),k=n(2458),U=function(){var e=function e(){t(this,e)};return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({providers:[{provide:k.Ad,useValue:"en-GB"}],imports:[[i.ez,R,f.QW,T.FA,y.lN,l.u5,l.UX,k.XK,A.c,q.Ps,b.ot,m.ae]]}),e}()}}])}();