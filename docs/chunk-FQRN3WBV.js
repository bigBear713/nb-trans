import{A as f,B as d,D as v,E as x,F as E,G as b,H as S,I as h,J as l,L as y,M as T,Z as B,_ as D,aa as k,ba as I,ca as P,j as i,k as g,l as F,n as _,r as p,s as a,t as c,u as s,y as u,z as r}from"./chunk-73BIQRKQ.js";var A=()=>({prefix:"content"}),R=(t,e,n)=>[t,e,n],j=t=>({params:t,prefix:"content"});function O(t,e){if(t&1&&s(0,"b",4),t&2){let n=e.content,o=e.list;p("nb-trans-subcontent",n)("subcontentList",o)}}function w(t,e){if(t&1&&s(0,"a",4),t&2){let n=e.content,o=e.list;p("nb-trans-subcontent",n)("subcontentList",o)}}function G(t,e){if(t&1&&(a(0,"b"),r(1),c()),t&2){let n=e.content;i(),f(n)}}var J=(()=>{let e=class e{constructor(o){this.gtagService=o,this.params={params1:"{{params2}}",params2:"1111",params3:"2222"},this.compStr1=`
    <div>
      <nb-trans key="complexContent" [components]="[com0,com1,com2]" [options]="{params,prefix:'content'}" />
    </div>

    <ng-template #com0 let-comContent="content" let-list="list">
      <b [nb-trans-subcontent]="comContent" [subcontentList]="list"></b>
    </ng-template>

    <ng-template #com1 let-comContent="content" let-list="list">
      <a [nb-trans-subcontent]="comContent" [subcontentList]="list"></a>
    </ng-template>

    <ng-template #com2 let-comContent="content">
      <b>{{comContent}}</b>
    </ng-template>
  `,this.trackPage()}ngOnInit(){}trackPage(){this.gtagService.trackPage({page_name:"Standalone Component"})}};e.\u0275fac=function(m){return new(m||e)(g(P))},e.\u0275cmp=F({type:e,selectors:[["app-feature2"]],decls:18,vars:17,consts:[["com0",""],["com1",""],["com2",""],["key","complexContent",3,"components","options"],[3,"nb-trans-subcontent","subcontentList"]],template:function(m,C){if(m&1&&(a(0,"h5"),r(1),b(2,"json"),c(),a(3,"p"),r(4),b(5,"nbTrans"),c(),a(6,"div")(7,"pre")(8,"code"),r(9),c()()(),a(10,"div"),s(11,"nb-trans",3),c(),_(12,O,1,2,"ng-template",null,0,l)(14,w,1,2,"ng-template",null,1,l)(16,G,2,1,"ng-template",null,2,l)),m&2){let L=u(13),M=u(15),N=u(17);i(),d(" \u4F7F\u7528ng-trans\u7EC4\u4EF6\uFF0C\u5E26\u6709components\u53C2\u6570\u548Coptions\u53C2\u6570\u3002\u8BBE\u7F6Ekey\u503C\u524D\u7F00\u548C\u7FFB\u8BD1\u6587\u672C\u4E2D\u7684\u53C2\u6570,params\u53C2\u6570\u4E3A\uFF1A ",S(2,5,C.params),`
`),i(3),d("\u7FFB\u8BD1\u6587\u672C\u539F\u6587\uFF1A",h(5,7,"complexContent",v(10,A))),i(5),f(C.compStr1),i(2),p("components",E(11,R,L,M,N))("options",x(15,j,C.params))}},dependencies:[I,D,k,T,B,y],styles:["a[_ngcontent-%COMP%]{color:#0ff;cursor:pointer}"],changeDetection:0});let t=e;return t})(),V=[{path:"",component:J}];export{J as Feature2Component,V as routes};
