"use strict";(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[915],{19915:function(t,a,e){e.r(a),e.d(a,{AgentSalaryWithdrawModule:function(){return U}});var r=e(16274),n=e(65543),o=e(24766),i=e(93324),l=e(66565),d=e(42741),s=e(75239),c=e(9881),u=e(39009),h=e(81608),g=e(80814),m=e(21499),p=e(33103),Z=e(67617),y=e(19275),A=e(31749);function S(t,a){if(1&t){const t=d.EpF();d.TgZ(0,"div",20),d.TgZ(1,"div",21),d.TgZ(2,"div",22),d.TgZ(3,"div",23),d.TgZ(4,"button",24),d.NdJ("click",function(){return d.CHM(t),d.oxw().download2("Declaration of Sale.docx")}),d._uU(5,"Test"),d.qZA(),d.TgZ(6,"a",25),d._uU(7," download here "),d.qZA(),d.TgZ(8,"pre"),d._uU(9,"\n                "),d.qZA(),d.qZA(),d.TgZ(10,"div",26),d.TgZ(11,"pre"),d._uU(12),d.ALo(13,"json"),d.qZA(),d.qZA(),d._UZ(14,"div",23),d._UZ(15,"div",23),d.qZA(),d.qZA(),d.qZA()}if(2&t){const t=d.oxw();d.xp6(12),d.hij("                    agentSalarySearchForm = ",d.lcZ(13,1,t.agentSalarySearchForm.value),"\n                ")}}const v=[{path:"",component:(()=>{class t{constructor(t,a,e){this.route=t,this.agentService=a,this.downloads=e,this.isProduction=o.N.production,this.year=2022,this.month=1,this.isLoading=!1,this.currentMonthTotalSalary=0,this.currentMonthTotalSalaryWithdraw=0,this.months=["No Month","January","February","March","April","May","June","July","August","September","October","November","December"],this.printDivStyle={table:{"border-collapse":"collapse",width:"100%"},label:{width:"100%"},th:{border:"1px  solid black",fontSize:"small"},td:{border:"1px  solid black",fontSize:"small"}},this.route.data.subscribe(t=>{this.agents=t.agentSalaryWithdrawResolver.agents.data}),this.agentSalarySearchForm=new i.cw({yearNumber:new i.NI(2022),monthNumber:new i.NI(5),agentId:new i.NI(null),amount:new i.NI(100)})}ngOnInit(){}saveAgentSalaryWithdrawal(){this.agentService.saveAgentSalaryWithdraw(this.agentSalarySearchForm.value).subscribe(t=>{this.currentMonthTotalSalary=t.data.totalSalary,this.currentMonthTotalSalaryWithdraw=t.data.salaryWithdraw},t=>{console.log(t)})}onAgentSelect(t){this.agentService.fetchAgentSalaryAndWithdrawByYearAndMonth(t.agent_id,this.agentSalarySearchForm.get("yearNumber").value,this.agentSalarySearchForm.get("monthNumber").value).subscribe(t=>{this.currentMonthTotalSalary=t.data.totalSalary,this.currentMonthTotalSalaryWithdraw=t.data.salaryWithdraw})}download(){this.downloads.download("/downloads/archive.zip").subscribe(t=>{const a=document.createElement("a"),e=URL.createObjectURL(t);a.href=e,a.download="archive.zip",a.click(),URL.revokeObjectURL(e)})}download2(t){this.downloads.download("assets/downloads/"+t).subscribe(a=>(0,l.saveAs)(a,t))}}return t.\u0275fac=function(a){return new(a||t)(d.Y36(n.gz),d.Y36(s.R),d.Y36(c.K))},t.\u0275cmp=d.Xpm({type:t,selectors:[["app-agent-salary-withdraw"]],decls:43,vars:19,consts:[["id","agent-wise-sale-report-div"],[1,"example-card"],["mat-card-avatar","",1,"example-header-image"],["fxLayout","row","fxLayout.xs","column","fxLayoutAlign","start","fxLayoutGap","10px","fxLayoutGap.xs","0",1,"container"],[3,"formGroup"],["fxLayoutGap","30px",2,"padding-top","10px"],["for","year"],["formControlName","yearNumber","mode","decimal","thousandSeparator"," ","inputId","year",3,"showButtons","min","max"],["for","month"],["formControlName","monthNumber","mode","decimal","thousandSeparator"," ","inputId","month",3,"showButtons","min","max"],["bindLabel","agent_name","bindValue","agent_id","formControlName","agentId","placeholder","Select Agent",1,"custom",3,"items","change"],["for","amount"],["formControlName","amount","mode","decimal","thousandSeparator"," ","inputId","amount",3,"showButtons","min","max"],["label","Save","id","search","icon","pi pi-search",3,"loading","click"],[2,"text-align","right"],["mat-button","","color","primary","printSectionId","printAgentSalaryReportDiv","ngxPrint","",3,"printStyle","useExistingCss"],["id","printAgentSalaryReportDiv"],[1,"text-center"],[1,"no-print"],["id","developer-div",4,"ngIf"],["id","developer-div"],[1,"outerContainer"],["fxLayout","row","fxLayoutGap","1px","fxLayout.sm","column",1,"container"],["fxLayoutAlign","center center"],[3,"click"],["target","_blank","rel","noopener noreferrer",3,"href"],["fxFlex","2 1 auto","fxLayoutAlign","center center"]],template:function(t,a){1&t&&(d.TgZ(0,"div",0),d.TgZ(1,"mat-card",1),d.TgZ(2,"mat-card-header"),d._UZ(3,"div",2),d.TgZ(4,"mat-card-title"),d._uU(5,"Agent Salary Withdraw"),d.qZA(),d.qZA(),d.TgZ(6,"mat-card-content"),d.TgZ(7,"div",3),d.TgZ(8,"form",4),d.TgZ(9,"div",3),d.TgZ(10,"div",5),d.TgZ(11,"label",6),d._uU(12,"Year"),d.qZA(),d._UZ(13,"p-inputNumber",7),d.qZA(),d.TgZ(14,"div",5),d.TgZ(15,"label",8),d._uU(16,"Month"),d.qZA(),d._UZ(17,"p-inputNumber",9),d.qZA(),d.qZA(),d.TgZ(18,"div",3),d.TgZ(19,"div",5),d.TgZ(20,"ng-select",10),d.NdJ("change",function(t){return a.onAgentSelect(t)}),d.qZA(),d.TgZ(21,"span"),d._uU(22),d.qZA(),d.qZA(),d.qZA(),d.TgZ(23,"div",3),d.TgZ(24,"div",5),d.TgZ(25,"label",11),d._uU(26,"Amount"),d.qZA(),d._UZ(27,"p-inputNumber",12),d.qZA(),d.TgZ(28,"div",5),d.TgZ(29,"p-button",13),d.NdJ("click",function(){return a.saveAgentSalaryWithdrawal()}),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.TgZ(30,"mat-card",1),d.TgZ(31,"div",14),d.TgZ(32,"button",15),d.TgZ(33,"mat-icon"),d._uU(34,"print"),d.qZA(),d.qZA(),d.qZA(),d.TgZ(35,"div",16),d.TgZ(36,"mat-card-header"),d._UZ(37,"div",2),d.TgZ(38,"mat-card-title",17),d._uU(39),d.qZA(),d.qZA(),d.TgZ(40,"mat-card-content"),d._UZ(41,"div",18),d.qZA(),d.qZA(),d.qZA(),d.qZA(),d.YNc(42,S,16,3,"div",19)),2&t&&(d.xp6(8),d.Q6J("formGroup",a.agentSalarySearchForm),d.xp6(5),d.Q6J("showButtons",!0)("min",2022)("max",2032),d.xp6(4),d.Q6J("showButtons",!0)("min",1)("max",12),d.xp6(3),d.Q6J("items",a.agents),d.xp6(2),d.AsE("Current Salary: ",a.currentMonthTotalSalary," and Current Withdraw: ",a.currentMonthTotalSalaryWithdraw," "),d.xp6(5),d.Q6J("showButtons",!0)("min",100)("max",5e4),d.xp6(2),d.Q6J("loading",a.isLoading),d.xp6(3),d.Q6J("printStyle",a.printDivStyle)("useExistingCss",!0),d.xp6(7),d.AsE("Agent Salary Report: ",a.months[a.agentSalarySearchForm.get("monthNumber").value],", ",a.agentSalarySearchForm.get("yearNumber").value," "),d.xp6(3),d.Q6J("ngIf",!a.isProduction))},directives:[u.a8,u.dk,u.kc,u.n5,u.dn,h.xw,h.Wh,h.SQ,i._Y,i.JL,i.sg,g.Rn,i.JJ,i.u,m.w9,p.zx,Z.lW,y.I,A.Hw,r.O5,h.yH],pipes:[r.Ts],styles:[".ng-select[_ngcontent-%COMP%]{width:300px}"]}),t})()}];let w=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[n.Bz.forChild(v)],n.Bz]}),t})();var x=e(44113),b=e(10823),f=e(19018),T=e(62397),q=e(70846),N=e(73454),_=e(52514);let U=(()=>{class t{}return t.\u0275fac=function(a){return new(a||t)},t.\u0275mod=d.oAB({type:t}),t.\u0275inj=d.cJS({imports:[[r.ez,w,h.ae,u.QW,u.QW,x.FA,b.lN,i.u5,i.UX,f.c,A.Ps,Z.ot,p.hJ,h.ae,A.Ps,T.JX,q.rP,N.pm,y.K,_.xu,g.L$,m.A0]]}),t})()}}]);