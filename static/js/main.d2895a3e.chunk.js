(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t){},130:function(e,t,a){},215:function(e,t,a){e.exports=a(729)},223:function(e,t,a){},729:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(17),i=a.n(c),l=(a(220),a(130),a(13)),o=a.n(l),s=a(34),u=a(28),m=a(18),h=a(52),d=a(49),p=a(53),g=a(780),f=a(785),b=a(784),v=a(781),E=(a(223),a(764)),y=a(16),O=a(763),w=a(8),j=(Object(w.a)(function(e){return{root:{color:e.palette.getContrastText("rgba(90, 105, 191,1.0)"),backgroundColor:"rgba(90, 105, 191,1.0)","&:hover":{backgroundColor:"rgba(90, 105, 191,0.95)",color:"#fff"}}}})(O.a),function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).handleLogOut=function(){var e=Object(s.a)(o.a.mark(function e(t){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault();try{y.b.signOut(),a.props.auth.setAuthStatus(!1),a.props.auth.setUser(null),window.location.href="/"}catch(n){console.log(n.message)}case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{style:{backgroundColor:"#fff",position:"absolute",width:"100%"},className:"navbar",role:"navigation","aria-label":"main navigation"},r.a.createElement("div",{className:"navbar-brand"},r.a.createElement("a",{className:"navbar-item",href:"/"},r.a.createElement("img",{src:"NEWLOGO.png",width:"28",height:"28",alt:"hexal logo"}))),r.a.createElement("div",{id:"navbarBasicExample",className:"navbar-menu"},this.props.logined?r.a.createElement("div",{className:"navbar-start"},r.a.createElement(E.a,{to:"/"},r.a.createElement("div",{className:"link-1"},r.a.createElement("img",{className:"hovicon effect-1",src:"graph.png",width:"20",height:"20",alt:"home"}))),r.a.createElement(E.a,{to:"/temp"},r.a.createElement("div",{className:"link-1"},r.a.createElement("img",{className:"hovicon effect-1",src:"fileadd.png",width:"20",height:"20",alt:"p"})))):r.a.createElement("div",{className:"navbar-start"},r.a.createElement(E.a,{to:"/"},r.a.createElement("img",{className:"hovicon effect-1",src:"graph.png",width:"20",height:"20",alt:"home"})),r.a.createElement(E.a,{to:"/temp"},r.a.createElement("div",{className:"link-1"},r.a.createElement("img",{className:"hovicon effect-1",src:"fileadd.png",width:"20",height:"20",alt:"p"}))))))}}]),t}(n.Component)),x=a(41),A=a(89),k=a(765),N=a(766),I=a(779),_=a(767),S=a(69),C=a(777),L=a(194),T=a.n(L),U=a(195),q=a.n(U),D=a(196),P=a.n(D),R='\nquery list{\n  listMyTypes(filter:{type:{contains:"student"}},limit:100){\n    items{\n      id type name grade class link todo haveto due \n      words{id name link haveto due} \n      record{id bookid month day words etc}\n      test{id name score month day}\n      homework{id name assignment done month day}\n    }\n    }\n  }\n\n',G=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r))))._getStudentData=Object(s.a)(o.a.mark(function e(){return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y.a.graphql(Object(y.d)(R)).then(function(e){alert(JSON.stringify(e.data.listMyTypes.items))});case 2:case"end":return e.stop()}},e)})),a.componentDidMount=function(){a._getStudentData()},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"onLeave",value:function(e,t,a){console.log("Leaving section "+e.index)}},{key:"afterLoad",value:function(e,t,a){console.log("After load: "+t.index)}},{key:"render",value:function(){return r.a.createElement(q.a,{scrollOverflow:!0,sectionsColor:["#fff","#fff","#fff"],onLeave:this.onLeave.bind(this),afterLoad:this.afterLoad.bind(this),render:function(e){e.state,e.fullpageApi;return r.a.createElement("div",{id:"fullpage-wrapper"},r.a.createElement("div",{align:"center",className:"section section1"},r.a.createElement("div",{style:{padding:80}},r.a.createElement(P.a,{animateIn:"fadeIn",animateOnce:!1},r.a.createElement("h1",{style:{color:"#5a69bf"}},"\uc0c8\ub85c\uc6b4 \uc601\uc5b4\ud559\uc2b5\uc758 \uc2dc\uc791")),r.a.createElement("img",{style:{height:400},src:"mainimage2.png",alt:"conserve energy"}))),r.a.createElement("div",{className:"section"},r.a.createElement("div",{style:{height:700},align:"center"},r.a.createElement("img",{style:{height:500},src:"\uc120\uc0dd\ub2d8\ud6a8\uacfc.png",alt:"teacher"}))),r.a.createElement("div",{className:"section"},r.a.createElement(M,null)))}})}}]),t}(r.a.Component);function K(e){var t=e.children,a=e.value,n=e.index,c=Object(A.a)(e,["children","value","index"]);return r.a.createElement(S.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},c),a===n&&r.a.createElement(C.a,{p:3},t))}function W(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var J=Object(k.a)({root:{flexGrow:1}});function M(){var e=J(),t=r.a.useState(0),a=Object(x.a)(t,2),n=a[0],c=a[1];return r.a.createElement("div",null,r.a.createElement(N.a,{elevation:0,square:!0,className:e.root},r.a.createElement(I.a,{centered:!0,value:n,onChange:function(e,t){c(t)},variant:"fullWidth",indicatorColor:"primary",textColor:"primary","aria-label":"icon tabs example"},r.a.createElement(_.a,Object.assign({icon:r.a.createElement("img",{width:100,height:100,src:"1.png",alt:"11111"})},W(0),{"aria-label":"phone"})),r.a.createElement(_.a,Object.assign({icon:r.a.createElement("img",{width:100,height:100,src:"2.png",alt:"22222"})},W(1),{"aria-label":"favorite"})),r.a.createElement(_.a,Object.assign({icon:r.a.createElement("img",{width:100,height:100,src:"3.png",alt:"33333"})},W(2),{"aria-label":"person"})))),r.a.createElement(T.a,{axis:"x",index:n,onChangeIndex:function(e){c(e)}},r.a.createElement(K,{value:n,index:0},r.a.createElement("div",{align:"center",style:{height:500}},r.a.createElement("img",{style:{height:500},src:"effect1.png",alt:"effect1"}))),r.a.createElement(K,{value:n,index:1},r.a.createElement("div",{align:"center",style:{height:500}},r.a.createElement("img",{style:{height:500},src:"effect2.png",alt:"effect2"}))),r.a.createElement(K,{value:n,index:2},r.a.createElement("div",{align:"center",style:{height:500}},r.a.createElement("img",{style:{height:500},src:"effect3.png",alt:"effect3"})))))}a(632),a(651),a(652),a(653),a(654),a(778),a(769),a(770),a(771),a(768),a(197);a(679),a(697),a(113),a(178),a(698),a(773),a(783),a(774),a(776),a(775),a(786),a(198),a(93),a(772);a(727);var Y=function(e){function t(){return Object(u.a)(this,t),Object(h.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("p",null,"loading"),r.a.createElement(z,null))}}]),t}(n.Component);function B(e){var t=e.children,a=e.value,n=e.index,c=Object(A.a)(e,["children","value","index"]);return r.a.createElement(S.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},c),a===n&&r.a.createElement(C.a,{p:3},t))}function H(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}function z(){var e=r.a.useState(0),t=Object(x.a)(e,2),a=t[0],n=t[1];return r.a.createElement("div",null,r.a.createElement(I.a,{value:a,onChange:function(e,t){n(t)},"aria-label":"simple tabs example"},r.a.createElement(_.a,Object.assign({label:"Item One"},H(0))),r.a.createElement(_.a,Object.assign({label:"Item Two"},H(1))),r.a.createElement(_.a,Object.assign({label:"Item Three"},H(2)))),r.a.createElement(B,{value:a,index:0},"Item One"),r.a.createElement(B,{value:a,index:1},"Item Two"),r.a.createElement(B,{value:a,index:2},"Item Three"))}var F=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(h.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={isAuthenticated:!1,isAuthenticating:!0,user:null,note:[]},a.setAuthStatus=function(e){a.setState({isAuthenticated:e})},a.setUser=function(e){a.setState({user:e})},a}return Object(p.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(s.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y.b.currentSession();case 3:return e.sent,this.setAuthStatus(!0),console.log("ttttt"),e.next=8,y.b.currentAuthenticatedUser();case 8:t=e.sent,this.setUser(t),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),"No current user"!==e.t0&&alert(e.t0);case 15:this.setState({isAuthenticating:!1});case 16:case"end":return e.stop()}},e,this,[[0,12]])}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t={isAuthenticated:this.state.isAuthenticated,user:this.state.user,setAuthStatus:this.setAuthStatus,setUser:this.setUser};return!this.state.isAuthenticating&&r.a.createElement("div",{className:"App"},r.a.createElement(g.a,null,r.a.createElement("div",null,r.a.createElement(j,{logined:this.state.isAuthenticated,auth:t}),r.a.createElement(f.a,null,r.a.createElement(b.a,{exact:!0,path:"/",render:function(a){return e.state.isAuthenticated?r.a.createElement(v.a,{to:"/mainconsole"}):r.a.createElement(G,Object.assign({},a,{auth:t}))}}),r.a.createElement(b.a,{exact:!0,path:"/temp",render:function(e){return r.a.createElement(Y,Object.assign({},e,{auth:t}))}})," */}"))))}}]),t}(n.Component),V=a(98);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));y.c.configure({Auth:{mandatorySignIn:!0,region:V.cognito.REGION,userPoolId:V.cognito.USER_POOL_ID,userPoolWebClientId:V.cognito.APP_CLIENT_ID},Storage:{AWSS3:{bucket:"verdemo",region:"ap-northeast-2"}},aws_project_region:"ap-northeast-2",aws_appsync_graphqlEndpoint:"https://6rha74vb45elpo6wue7tw2ladm.appsync-api.ap-northeast-2.amazonaws.com/graphql",aws_appsync_region:"ap-northeast-2",aws_appsync_authenticationType:"API_KEY",aws_appsync_apiKey:"da2-53xamyyb3vagfcwl5xylphc43u"}),i.a.render(r.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},98:function(e){e.exports={api:{invokeUrl:"https://5bltcq602h.execute-api.us-west-2.amazonaws.com/prod"},cognito:{REGION:"ap-northeast-2",USER_POOL_ID:"ap-northeast-2_O6h5CbYvt",APP_CLIENT_ID:"qolqi2gi7svqi7p7dchsltq10"},S3:{bucketName:"wowproject-wow",dirName:"demo",region:"ap-northeast-2",accessKeyId:"AKIAIRRU47F5VG7TAUYA",secretAccessKey:"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"}}}},[[215,1,2]]]);
//# sourceMappingURL=main.d2895a3e.chunk.js.map