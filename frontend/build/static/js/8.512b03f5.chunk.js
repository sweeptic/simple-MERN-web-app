(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{42:function(e,t,a){"use strict";var n=a(0),c=a.n(n);a(49);t.a=function(e){return c.a.createElement("div",{className:"card ".concat(e.className),style:e.style},e.children)}},49:function(e,t,a){},60:function(e,t,a){},61:function(e,t,a){},62:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);var n=a(47),c=a.n(n),r=a(48),l=a(10),s=a(0),i=a.n(s),u=a(8),m=(a(60),function(e){return i.a.createElement("div",{className:"avatar ".concat(e.className),style:e.style},i.a.createElement("img",{src:e.image,alt:e.alt,style:{width:e.width,height:e.width}}))}),o=a(42),f=(a(61),function(e){return i.a.createElement("li",{className:"user-item"},i.a.createElement(o.a,{className:"user-item__content"},i.a.createElement(u.b,{to:"/".concat(e.id,"/places")},i.a.createElement("div",{className:"user-item__image"},i.a.createElement(m,{image:"".concat("http://localhost:5000","/").concat(e.image),alt:e.name})),i.a.createElement("div",{className:"user-item__info"},i.a.createElement("h2",null,e.name),i.a.createElement("h3",null,e.placeCount," ",1===e.placeCount?"Place":"Places")))))}),d=(a(62),function(e){return 0===e.items.length?i.a.createElement("div",{className:"center"},i.a.createElement(o.a,null,i.a.createElement("h2",null,"No users found."))):i.a.createElement("ul",{className:"users-list"},e.items.map((function(e){return i.a.createElement(f,{key:e.id,id:e.id,image:e.image,name:e.name,placeCount:e.places.length})})))}),E=a(50),h=a(15),p=a(51);t.default=function(){console.log("render users");var e=Object(s.useState)(),t=Object(l.a)(e,2),a=t[0],n=t[1],u=Object(p.a)(),m=u.isLoading,o=u.error,f=u.sendRequest,v=u.clearError;return Object(s.useEffect)((function(){(function(){var e=Object(r.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f("".concat("http://localhost:5000/api","/users"));case 3:t=e.sent,n(t.users),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}})()()}),[f]),i.a.createElement(i.a.Fragment,null,i.a.createElement(E.a,{error:o,onClear:v}),m&&i.a.createElement("div",{className:"center"},i.a.createElement(h.a,null)),!m&&a&&i.a.createElement(d,{items:a}))}}}]);
//# sourceMappingURL=8.512b03f5.chunk.js.map