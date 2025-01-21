import{$ as k,A as _,B as v,C as x,D as d,E,F as S,G as u,J as h,K as y,X as T,Y as B,_ as D,aa as I,j as i,k as b,l as g,n as F,o as m,p as a,q as c,r as p,v as s,w as r,x as C,y as f}from"./chunk-QMT4SQ4G.js";var N=()=>({prefix:"content"}),A=(t,n,e)=>[t,n,e],R=t=>({params:t,prefix:"content"});function j(t,n){if(t&1&&p(0,"b",4),t&2){let e=n.content,o=n.list;m("nb-trans-subcontent",e)("subcontentList",o)}}function O(t,n){if(t&1&&p(0,"a",4),t&2){let e=n.content,o=n.list;m("nb-trans-subcontent",e)("subcontentList",o)}}function w(t,n){if(t&1&&(a(0,"b"),r(1),c()),t&2){let e=n.content;i(),C(e)}}var G=(()=>{class t{constructor(e){this.gtagService=e,this.params={params1:"{{params2}}",params2:"1111",params3:"2222"},this.compStr1=`
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
  `,this.trackPage()}ngOnInit(){}trackPage(){this.gtagService.trackPage({page_name:"Standalone Component"})}static{this.\u0275fac=function(o){return new(o||t)(b(I))}}static{this.\u0275cmp=g({type:t,selectors:[["app-feature2"]],decls:18,vars:17,consts:[["com0",""],["com1",""],["com2",""],["key","complexContent",3,"components","options"],[3,"nb-trans-subcontent","subcontentList"]],template:function(o,l){if(o&1&&(a(0,"h5"),r(1),d(2,"json"),c(),a(3,"p"),r(4),d(5,"nbTrans"),c(),a(6,"div")(7,"pre")(8,"code"),r(9),c()()(),a(10,"div"),p(11,"nb-trans",3),c(),F(12,j,1,2,"ng-template",null,0,u)(14,O,1,2,"ng-template",null,1,u)(16,w,2,1,"ng-template",null,2,u)),o&2){let P=s(13),L=s(15),M=s(17);i(),f(" \u4F7F\u7528ng-trans\u7EC4\u4EF6\uFF0C\u5E26\u6709components\u53C2\u6570\u548Coptions\u53C2\u6570\u3002\u8BBE\u7F6Ekey\u503C\u524D\u7F00\u548C\u7FFB\u8BD1\u6587\u672C\u4E2D\u7684\u53C2\u6570,params\u53C2\u6570\u4E3A\uFF1A ",E(2,5,l.params),`
`),i(3),f("\u7FFB\u8BD1\u6587\u672C\u539F\u6587\uFF1A",S(5,7,"complexContent",_(10,N)),""),i(5),C(l.compStr1),i(2),m("components",x(11,A,P,L,M))("options",v(15,R,l.params))}},dependencies:[k,B,D,T,y,h],styles:["a[_ngcontent-%COMP%]{color:#0ff;cursor:pointer}"],changeDetection:0})}}return t})(),U=[{path:"",component:G}];export{G as Feature2Component,U as routes};
