!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function n(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[489],{489:function(e,i,o){o.r(i),o.d(i,{AgentWiseStockModule:function(){return w}});var c=o(38583),r=o(63423),a=o(92340),s=o(3679),u=o(37716),g=o(37825),l=o(83188),d=o(5620),Z=o(93738),p=o(35618),f=o(86640),v=o(51095),A=o(95913),x=o(76627);function h(t,e){if(1&t&&(u.TgZ(0,"tr"),u.TgZ(1,"td"),u._uU(2),u.qZA(),u.TgZ(3,"td"),u._uU(4),u.qZA(),u.TgZ(5,"td"),u._uU(6),u.qZA(),u.TgZ(7,"td"),u._uU(8),u.qZA(),u.TgZ(9,"td"),u._uU(10),u.qZA(),u.TgZ(11,"td",14),u._uU(12),u.ALo(13,"number"),u.qZA(),u.TgZ(14,"td",14),u._uU(15),u.qZA(),u.qZA()),2&t){var n=e.$implicit,i=e.index;u.xp6(2),u.Oqu(i+1),u.xp6(2),u.Oqu(n.tag),u.xp6(2),u.Oqu(n.modelNo),u.xp6(2),u.Oqu(n.modelSize),u.xp6(2),u.Oqu(n.quantity),u.xp6(2),u.Oqu(u.xi3(13,7,n.gold,"1.3")),u.xp6(3),u.Oqu(n.labourCharge)}}function m(t,e){if(1&t&&(u.TgZ(0,"div",11),u.TgZ(1,"table",12),u.TgZ(2,"thead"),u.TgZ(3,"tr"),u.TgZ(4,"th"),u._uU(5,"SL"),u.qZA(),u.TgZ(6,"th"),u._uU(7,"Tag"),u.qZA(),u.TgZ(8,"th"),u._uU(9,"Model No."),u.qZA(),u.TgZ(10,"th"),u._uU(11,"Model Size"),u.qZA(),u.TgZ(12,"th"),u._uU(13,"Quantity"),u.qZA(),u.TgZ(14,"th"),u._uU(15,"Gold"),u.qZA(),u.TgZ(16,"th"),u._uU(17,"Labour Charge"),u.qZA(),u.qZA(),u.qZA(),u.TgZ(18,"tbody"),u.YNc(19,h,16,10,"tr",13),u.qZA(),u.qZA(),u.qZA()),2&t){var n=u.oxw();u.xp6(19),u.Q6J("ngForOf",n.stoockListByAgent)}}function q(t,e){1&t&&(u.TgZ(0,"div",15),u.TgZ(1,"div",16),u.TgZ(2,"div",17),u._UZ(3,"div",18),u._UZ(4,"div",19),u.TgZ(5,"div",18),u._uU(6,"3"),u.qZA(),u.TgZ(7,"div",18),u._uU(8,"4"),u.qZA(),u.qZA(),u.qZA(),u.qZA())}var T,b=[{path:"",component:(T=function(){function e(n,i,o){t(this,e),this.agentService=n,this.stockService=i,this.commonService=o,this.isProduction=a.N.production,this.fileName="ExcelSheet.xlsx",this.printDivStyle={table:{"border-collapse":"collapse",width:"100%"},label:{width:"100%"},th:{border:"1px  solid black",fontSize:"small"},td:{border:"1px  solid black",fontSize:"small"}},this.agentList=this.agentService.getAgents(),this.agentStockForm=new s.cw({agent_id:new s.NI(null)})}return n(e,[{key:"ngOnInit",value:function(){var t=this;this.agentList=this.agentService.getAgents(),this.agentService.getAgentUpdateListener().subscribe(function(e){t.agentList=e})}},{key:"stockByAgent",value:function(t){var e=this;this.stockService.getStockByAgent(this.agentStockForm.value.agent_id).subscribe(function(t){e.stoockListByAgent=t.data})}}]),e}(),T.\u0275fac=function(t){return new(t||T)(u.Y36(g.R),u.Y36(l.q),u.Y36(d.v))},T.\u0275cmp=u.Xpm({type:T,selectors:[["app-agent-wise-stock"]],decls:20,vars:5,consts:[["id","agent-wise-stock-div"],[3,"formGroup"],["fxFlex","30"],["bindLabel","agent_name","bindValue","agent_id","formControlName","agent_id","placeholder","Select Agent",1,"custom",3,"items","change"],["fxLayout","row","fxLayout.xs","column"],["fxFlex","40",1,"child-1"],[2,"text-align","right"],["mat-button","","color","primary","printSectionId","stockListDiv","styleSheetFile","assets/print_css/agent_wise_stock/style1.css","ngxPrint","",3,"useExistingCss"],["mat-button","","color","primary",3,"click"],["id","stockListDiv","class","table-responsive",4,"ngIf"],["id","developer-div",4,"ngIf"],["id","stockListDiv",1,"table-responsive"],["id","printable-stock-table",1,"table","table-bodered","table-condensed"],[4,"ngFor","ngForOf"],[1,"text-right"],["id","developer-div"],[1,"outerContainer"],["fxLayout","row","fxLayoutGap","1px","fxLayout.sm","column",1,"container"],["fxLayoutAlign","center center"],["fxFlex","2 1 auto","fxLayoutAlign","center center"]],template:function(t,e){1&t&&(u.TgZ(0,"div",0),u.TgZ(1,"mat-card"),u.TgZ(2,"mat-card-content"),u.TgZ(3,"div"),u.TgZ(4,"form",1),u.TgZ(5,"div",2),u.TgZ(6,"ng-select",3),u.NdJ("change",function(t){return e.stockByAgent(t)}),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.TgZ(7,"div",4),u.TgZ(8,"div",5),u.TgZ(9,"div",6),u.TgZ(10,"button",7),u.TgZ(11,"mat-icon"),u._uU(12,"print"),u.qZA(),u.qZA(),u.TgZ(13,"button",8),u.NdJ("click",function(){return e.commonService.exportToExcel("printable-stock-table","stock.xlsx")}),u.TgZ(14,"mat-icon"),u._uU(15,"cloud_download"),u.qZA(),u.qZA(),u.TgZ(16,"button",8),u.NdJ("click",function(){return e.commonService.arrayToExcel(e.agentList,"stock.xlsx")}),u._uU(17,"Save Agents to Excel"),u.qZA(),u.qZA(),u.YNc(18,m,20,1,"div",9),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.qZA(),u.YNc(19,q,9,0,"div",10)),2&t&&(u.xp6(4),u.Q6J("formGroup",e.agentStockForm),u.xp6(2),u.Q6J("items",e.agentList),u.xp6(4),u.Q6J("useExistingCss",!0),u.xp6(8),u.Q6J("ngIf",e.stoockListByAgent),u.xp6(1),u.Q6J("ngIf",!e.isProduction))},directives:[Z.a8,Z.dn,s._Y,s.JL,s.sg,p.yH,f.w9,s.JJ,s.u,p.xw,v.lW,A.I,x.Hw,c.O5,c.sg,p.SQ,p.Wh],pipes:[c.JJ],styles:["#agent-wise-stock-div[_ngcontent-%COMP%]{min-height:100vh;width:100vw;padding-left:35px;padding-right:65px;font-size:xx-small}#developer-div[_ngcontent-%COMP%]{padding-left:35px;padding-right:65px}"]}),T)}],k=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[r.Bz.forChild(b)],r.Bz]}),e}(),y=o(49983),_=o(39577),S=o(80291),w=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[[c.ez,k,Z.QW,f.A0,p.ae,x.Ps,s.u5,s.UX,y.c,v.ot,_.uH,S.pm,A.K]]}),e}()}}])}();