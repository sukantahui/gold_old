!function(){"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(o=r.key,i=void 0,"symbol"==typeof(i=function(e,n){if("object"!=typeof e||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,n||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(o,"string"))?i:String(i)),r)}var o,i}function t(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[4549],{74549:function(n,r,o){o.r(r),o.d(r,{ProductReportModule:function(){return v}});var i=o(38583),u=o(63423),c=o(92340),l=o(37716);function a(e,n){1&e&&(l.TgZ(0,"div",13),l.TgZ(1,"div",14),l.TgZ(2,"div",15),l.TgZ(3,"div",16),l.TgZ(4,"pre"),l._uU(5,"\n                    "),l.qZA(),l.qZA(),l.TgZ(6,"div",17),l.TgZ(7,"pre"),l._uU(8,"\n                    "),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.qZA())}var d,f=((d=function(){function n(){e(this,n),this.isProduction=c.N.production,this.subject="Owner Reports"}return t(n,[{key:"ngOnInit",value:function(){}}]),n}()).\u0275fac=function(e){return new(e||d)},d.\u0275cmp=l.Xpm({type:d,selectors:[["app-product-report"]],decls:28,vars:2,consts:[[1,"d-flex","flex-column",2,"min-height","100vh"],[1,"p-2","text-center",2,"background-color","rgb(183,174,159)"],[1,"p-2"],[1,"container-fluid","rounded","d-flex","flex-xl-row","justify-content-xl-between","flex-column"],[1,"p-2","col-xl-1",2,"background-color","rgb(199, 192, 192)"],["routerLink","./ProductSale",3,"click"],["routerLink","./DueReport",3,"click"],["routerLink","./JobReport",3,"click"],["routerLink","./FineReturnedToOwnerReport",3,"click"],["routerLink","./CashRefundToOwnwer",3,"click"],[1,"bloc_2","p-2","col-xl-11",2,"background-color","antiquewhite"],[1,"mt-auto","p-2","text-center",2,"background-color","rgb(77, 68, 68)"],["id","developer-div",4,"ngIf"],["id","developer-div"],[1,"outerContainer"],["fxLayout","row","fxLayoutGap","1px","fxLayout.sm","column",1,"container"],["fxLayoutAlign","center center",1,"col"],["fxFlex","2 1 auto","fxLayoutAlign","center center",1,"col"]],template:function(e,n){1&e&&(l.TgZ(0,"div",0),l.TgZ(1,"div",1),l.TgZ(2,"h3"),l._uU(3),l.qZA(),l.qZA(),l.TgZ(4,"div",2),l.TgZ(5,"div",3),l.TgZ(6,"div",4),l.TgZ(7,"ul"),l.TgZ(8,"li"),l.TgZ(9,"a",5),l.NdJ("click",function(){return n.subject="Model Sale Record"}),l._uU(10,"Modelwise Sale"),l.qZA(),l.qZA(),l.TgZ(11,"li"),l.TgZ(12,"a",6),l.NdJ("click",function(){return n.subject="All Due Report"}),l._uU(13,"Due Report"),l.qZA(),l.qZA(),l.TgZ(14,"li"),l.TgZ(15,"a",7),l.NdJ("click",function(){return n.subject="Job Report"}),l._uU(16,"Job Report"),l.qZA(),l.qZA(),l.TgZ(17,"li"),l.TgZ(18,"a",8),l.NdJ("click",function(){return n.subject="Fine Withdrawn by Owner"}),l._uU(19,"Fine Withdrawn"),l.qZA(),l.qZA(),l.TgZ(20,"li"),l.TgZ(21,"a",9),l.NdJ("click",function(){return n.subject="Cash Withdrawn by Owner"}),l._uU(22,"Cash Withdrawn"),l.qZA(),l.qZA(),l.qZA(),l.qZA(),l.TgZ(23,"div",10),l._UZ(24,"router-outlet"),l.qZA(),l.qZA(),l.qZA(),l.TgZ(25,"div",11),l._uU(26,"I am footer, i will stay here"),l.qZA(),l.qZA(),l.YNc(27,a,9,0,"div",12)),2&e&&(l.xp6(3),l.Oqu(n.subject),l.xp6(24),l.Q6J("ngIf",!n.isProduction))},directives:[u.yS,u.lC,i.O5],styles:[""]}),d),p=o(35758),s=o(88002),Z=o(82820),h=[{path:"",component:f,children:[{path:"ProductSale",loadChildren:function(){return Promise.all([o.e(4207),o.e(705),o.e(6584),o.e(5413)]).then(o.bind(o,75413)).then(function(e){return e.ProductSaleModule})}},{path:"DueReport",loadChildren:function(){return Promise.all([o.e(4207),o.e(705),o.e(6584),o.e(1547)]).then(o.bind(o,71547)).then(function(e){return e.DueReportModule})},resolve:{dueReportResolver:function(){var n=function(){function n(t){e(this,n),this.reportService=t}return t(n,[{key:"resolve",value:function(e,n){var t=this.reportService.getAgentDues();return(0,p.D)(t).pipe((0,s.U)(function(e){return{agentDues:e[0]}}))}}]),n}();return n.\u0275fac=function(e){return new(e||n)(l.LFG(Z.r))},n.\u0275prov=l.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n}()}},{path:"JobReport",loadChildren:function(){return Promise.all([o.e(4207),o.e(705),o.e(6584),o.e(8242)]).then(o.bind(o,28242)).then(function(e){return e.JobReportModule})}},{path:"FineReturnedToOwnerReport",loadChildren:function(){return Promise.all([o.e(4207),o.e(705),o.e(6584),o.e(1170)]).then(o.bind(o,31170)).then(function(e){return e.FineReturnedToOwnerReportModule})}},{path:"CashRefundToOwnwer",loadChildren:function(){return Promise.all([o.e(4207),o.e(705),o.e(6584),o.e(1152)]).then(o.bind(o,11152)).then(function(e){return e.CashRefundToOwnwerModule})}}]}],g=function(){var n=t(function n(){e(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=l.oAB({type:n}),n.\u0275inj=l.cJS({imports:[[u.Bz.forChild(h)],u.Bz]}),n}(),v=function(){var n=t(function n(){e(this,n)});return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=l.oAB({type:n}),n.\u0275inj=l.cJS({imports:[[i.ez,g]]}),n}()}}])}();