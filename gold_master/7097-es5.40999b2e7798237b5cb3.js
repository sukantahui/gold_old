!function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(i=r.key,o=void 0,"symbol"==typeof(o=function(t,e){if("object"!=typeof t||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,e||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(i,"string"))?o:String(o)),r)}var i,o}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}(self.webpackChunkaccounts=self.webpackChunkaccounts||[]).push([[7097],{17097:function(e,r,i){i.r(r),i.d(r,{JobDetailsReportModule:function(){return y}});var o,a=i(38583),u=i(63423),c=i(3679),s=i(37716),f=i(91841),p=[{path:"",component:(o=function(){function e(n,r){var i=this;t(this,e),this.route=n,this.http=r,this.route.data.subscribe(function(t){i.karigars=t.karigarResolver.karigars.data});var o=new Date,u=(0,a.p6)(o,"yyyy-MM-dd","en");this.startDate=(0,a.p6)(o,"yyyy-MM-dd","en"),this.endDate=(0,a.p6)(o,"yyyy-MM-dd","en"),this.reportForm=new c.cw({start_date:new c.NI(u),end_date:new c.NI(u),karigar_id:new c.NI(null)})}return n(e,[{key:"ngOnInit",value:function(){}}]),e}(),o.\u0275fac=function(t){return new(t||o)(s.Y36(u.gz),s.Y36(f.eN))},o.\u0275cmp=s.Xpm({type:o,selectors:[["app-job-details-report"]],decls:2,vars:0,template:function(t,e){1&t&&(s.TgZ(0,"p"),s._uU(1,"job-details-report works!"),s.qZA())},styles:[""]}),o)}],l=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[u.Bz.forChild(p)],u.Bz]}),e}(),y=function(){var e=n(function e(){t(this,e)});return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=s.oAB({type:e}),e.\u0275inj=s.cJS({imports:[[a.ez,l]]}),e}()}}])}();