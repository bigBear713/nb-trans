import{$ as P,B as v,C as x,D as E,E as S,F as b,G as h,H as y,I as l,L as T,M as B,X as D,Y as k,_ as I,aa as L,g,m as i,n as F,o as s,p as _,q as a,r,s as m,w as u,x as c,y as f,z as d}from"./chunk-4DGUF7YY.js";function R(t,e){if(t&1&&m(0,"b",4),t&2){let n=e.content,o=e.list;s("nb-trans-subcontent",n)("subcontentList",o)}}function j(t,e){if(t&1&&m(0,"a",4),t&2){let n=e.content,o=e.list;s("nb-trans-subcontent",n)("subcontentList",o)}}function O(t,e){if(t&1&&(a(0,"b"),c(1),r()),t&2){let n=e.content;i(1),f(n)}}var w=()=>({prefix:"content"}),G=(t,e,n)=>[t,e,n],J=t=>({params:t,prefix:"content"}),q=(()=>{let e=class e{constructor(o){this.gtagService=o,this.params={params1:"{{params2}}",params2:"1111",params3:"2222"},this.compStr1=`
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
  `,this.trackPage()}ngOnInit(){}trackPage(){this.gtagService.trackPage({page_name:"Standalone Component"})}};e.\u0275fac=function(p){return new(p||e)(F(L))},e.\u0275cmp=g({type:e,selectors:[["app-feature2"]],standalone:!0,features:[v],decls:18,vars:17,consts:[["key","complexContent",3,"components","options"],["com0",""],["com1",""],["com2",""],[3,"nb-trans-subcontent","subcontentList"]],template:function(p,C){if(p&1&&(a(0,"h5"),c(1),b(2,"json"),r(),a(3,"p"),c(4),b(5,"nbTrans"),r(),a(6,"div")(7,"pre")(8,"code"),c(9),r()()(),a(10,"div"),m(11,"nb-trans",0),r(),_(12,R,1,2,"ng-template",null,1,l)(14,j,1,2,"ng-template",null,2,l)(16,O,2,1,"ng-template",null,3,l)),p&2){let M=u(13),N=u(15),A=u(17);i(1),d("\u4F7F\u7528ng-trans\u7EC4\u4EF6\uFF0C\u5E26\u6709components\u53C2\u6570\u548Coptions\u53C2\u6570\u3002\u8BBE\u7F6Ekey\u503C\u524D\u7F00\u548C\u7FFB\u8BD1\u6587\u672C\u4E2D\u7684\u53C2\u6570,params\u53C2\u6570\u4E3A\uFF1A",h(2,5,C.params),""),i(3),d(" \u7FFB\u8BD1\u6587\u672C\u539F\u6587\uFF1A",y(5,7,"complexContent",x(10,w)),`
`),i(5),f(C.compStr1),i(2),s("components",S(11,G,M,N,A))("options",E(15,J,C.params))}},dependencies:[P,k,I,D,B,T],styles:["a[_ngcontent-%COMP%]{color:#0ff;cursor:pointer}"],changeDetection:0});let t=e;return t})(),W=[{path:"",component:q}];export{q as Feature2Component,W as routes};
