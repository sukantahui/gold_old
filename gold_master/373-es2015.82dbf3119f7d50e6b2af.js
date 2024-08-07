"use strict";(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[373],{10373:function(e,t,a){a.r(t),a.d(t,{SendRawMaterialToEmployeeModule:function(){return y}});var r=a(38583),l=a(63423),i=a(92340),o=a(3679),n=a(88259),s=a.n(n),c=a(37716),m=a(91841),u=a(57916),d=a(5620),g=a(86640),p=a(98295),Z=a(49983),h=a(51095),f=a(42542),b=a(65939);function v(e,t){if(1&e&&(c.TgZ(0,"tr"),c.TgZ(1,"td"),c._uU(2),c.qZA(),c.TgZ(3,"td",18),c._uU(4),c.qZA(),c.qZA()),2&e){const e=t.$implicit;c.xp6(2),c.Oqu(e.rawMaterialName),c.xp6(2),c.Oqu(e.closingBalance)}}function A(e,t){if(1&e){const e=c.EpF();c.TgZ(0,"mat-button-toggle-group",19),c.TgZ(1,"mat-button-toggle",20),c.NdJ("click",function(){return c.CHM(e),c.oxw().showDeveloperDiv=!0}),c._uU(2,"Show"),c.qZA(),c.TgZ(3,"mat-button-toggle",20),c.NdJ("click",function(){return c.CHM(e),c.oxw().showDeveloperDiv=!1}),c._uU(4,"Hide"),c.qZA(),c.qZA()}}function T(e,t){if(1&e&&(c.TgZ(0,"div",21),c.TgZ(1,"div",22),c.TgZ(2,"h2"),c._uU(3,"Developer Area"),c.qZA(),c.TgZ(4,"mat-tab-group",23),c.TgZ(5,"mat-tab",24),c.TgZ(6,"pre"),c._uU(7),c.ALo(8,"json"),c.qZA(),c.qZA(),c.TgZ(9,"mat-tab",25),c.TgZ(10,"pre"),c._uU(11),c.ALo(12,"json"),c.ALo(13,"json"),c.qZA(),c.qZA(),c.TgZ(14,"mat-tab",26),c.TgZ(15,"pre"),c._uU(16),c.ALo(17,"json"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA()),2&e){const e=c.oxw();c.xp6(7),c.hij("                    materialSendingForm = ",c.lcZ(8,4,e.materialSendingForm.value),"\n                "),c.xp6(4),c.AsE("                    selectableMaterials = ",c.lcZ(12,6,e.selectableMaterials),"\n                    rawMaterials = ",c.lcZ(13,8,e.rawMaterials),"\n                "),c.xp6(5),c.hij("                    materialBalances = ",c.lcZ(17,10,e.materialBalances),"\n                ")}}const q=[{path:"",component:(()=>{class e{constructor(e,t,a,r){this.route=e,this.http=t,this.managerService=a,this.commonservice=r,this.isProduction=i.N.production,this.materialBalances=[],this.route.data.subscribe(e=>{this.user=e.materialResolver.user,this.resolverValues=e.materialResolver,this.employees=e.materialResolver.employees.data,this.projectDetails=e.materialResolver.projectDetails,this.rawMaterials=e.materialResolver.rawMaterials.data,this.materialBalances=e.materialResolver.materialBalances.data,this.selectableEmployees=this.employees.filter(e=>this.projectDetails.managerToEmployeeMaterial.employees.find(t=>t===e.employeeId)),this.selectableMaterials=this.rawMaterials.filter(e=>this.projectDetails.managerToEmployeeMaterial.materialsToSend.find(t=>t===e.rmID))}),this.materialSendingForm=new o.cw({outward_employee_id:new o.NI(null,[o.kI.required]),inward_employee_id:new o.NI(this.user.emp_id,[o.kI.required]),rm_id:new o.NI(null,[o.kI.required]),value:new o.NI(0,[o.kI.required])})}ngOnInit(){}saveMaterialTransfer(){s().fire({title:"Dal Creation",text:"Are you sure?",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, Convert",cancelButtonText:"No!",background:"rgba(38,39,47,0.95)"}).then(e=>{!e.value||this.managerService.saveMaterialTransfer(this.materialSendingForm.value).subscribe(e=>{!0===e.status&&(s().fire({timer:2e3,title:"Saved",text:"Transferred successfully",icon:"success",showCancelButton:!1,confirmButtonColor:"#1661a0",cancelButtonColor:"#d33",background:"rgba(38,39,47,0.95)"}),this.savedResponse=e)},e=>{s().fire({title:e.message,text:"Transfer unsuccessful",icon:"error",showConfirmButton:!1,background:"rgba(38,39,47,0.95)",timer:3e3})})})}onEmployeeChange(){const e=this.materialSendingForm.get("inward_employee_id").value;this.http.get(this.commonservice.getAPI()+"/materialBalance/"+e).subscribe(e=>{console.log(e.data)})}}return e.\u0275fac=function(t){return new(t||e)(c.Y36(l.gz),c.Y36(m.eN),c.Y36(u.b),c.Y36(d.v))},e.\u0275cmp=c.Xpm({type:e,selectors:[["app-send-raw-material-to-employee"]],decls:29,vars:7,consts:[[1,"d-flex","flex-row",2,"min-height","80vh"],[1,"p-2","col-4"],[3,"formGroup"],["bindLabel","employeeName","bindValue","employeeId","formControlName","inward_employee_id","placeholder","Select Employee",1,"custom",3,"items","click"],["bindLabel","rmName","bindValue","rmID","formControlName","rm_id","placeholder","Select Material",1,"custom",3,"items"],[1,"example-full-width"],["type","number","matInput","","formControlName","value","placeholder","Material value",1,"text-right"],[1,"p-2","bd-highlight"],[1,"example-button-row"],["mat-button","","color","primary",1,"text-right",3,"disabled","click"],[1,"p-2","col-8","d-flex"],[1,"p-2","col-6"],[1,"table","table-striped","col-xl-12","col-lg-12","col-xs-12"],["scope","col"],[4,"ngFor","ngForOf"],[1,"p-2"],["name","fontStyle","aria-label","Font Style",4,"ngIf"],["id","developer-div",4,"ngIf"],[1,"text-right"],["name","fontStyle","aria-label","Font Style"],[3,"click"],["id","developer-div"],[1,"outerContainer"],["mat-align-tabs","center","backgroundColor","accent"],["label","Sec 1"],["label","Sec 2"],["label","Sec 3"]],template:function(e,t){1&e&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"form",2),c.TgZ(3,"ng-select",3),c.NdJ("click",function(){return t.onEmployeeChange()}),c.qZA(),c._UZ(4,"ng-select",4),c.TgZ(5,"div"),c.TgZ(6,"mat-form-field",5),c.TgZ(7,"mat-label"),c._uU(8,"Enter Material Value"),c.qZA(),c._UZ(9,"input",6),c.qZA(),c.qZA(),c.TgZ(10,"div",7),c.TgZ(11,"div",8),c.TgZ(12,"button",9),c.NdJ("click",function(){return t.saveMaterialTransfer()}),c._uU(13,"Save Record"),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.qZA(),c.TgZ(14,"div",10),c.TgZ(15,"div",11),c.TgZ(16,"table",12),c.TgZ(17,"thead"),c.TgZ(18,"tr"),c.TgZ(19,"th",13),c._uU(20,"Material Name"),c.qZA(),c.TgZ(21,"th",13),c._uU(22,"Value"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(23,"tbody"),c.YNc(24,v,5,2,"tr",14),c.qZA(),c.qZA(),c.qZA(),c.TgZ(25,"div",15),c._uU(26,"Flex item 1"),c.qZA(),c.qZA(),c.qZA(),c.YNc(27,A,5,0,"mat-button-toggle-group",16),c.YNc(28,T,18,12,"div",17)),2&e&&(c.xp6(2),c.Q6J("formGroup",t.materialSendingForm),c.xp6(1),c.Q6J("items",t.selectableEmployees),c.xp6(1),c.Q6J("items",t.selectableMaterials),c.xp6(8),c.Q6J("disabled",!t.materialSendingForm.valid||t.materialSendingForm.pristine),c.xp6(12),c.Q6J("ngForOf",t.materialBalances),c.xp6(3),c.Q6J("ngIf",!t.isProduction),c.xp6(1),c.Q6J("ngIf",t.showDeveloperDiv&&!t.isProduction))},directives:[o._Y,o.JL,o.sg,g.w9,o.JJ,o.u,p.KE,p.hX,o.wV,Z.Nt,o.Fj,h.lW,r.sg,r.O5,f.A9,f.Yi,b.SP,b.uX],pipes:[r.Ts],styles:[""]}),e})()}];let w=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[l.Bz.forChild(q)],l.Bz]}),e})(),y=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=c.oAB({type:e}),e.\u0275inj=c.cJS({imports:[[r.ez,w,b.Nh,f.vV,o.UX,g.A0,p.lN,Z.c,h.ot]]}),e})()}}]);