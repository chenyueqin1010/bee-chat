import{l as p,d,c as g,u as h,a as y,r as v,o as I,b as S,e as b,f as O,g as E,Q as L,N,D as P,P as R,z as k}from"./vendor.93178d86.20220621_200421.js";const $=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}};$();const w=p("/",{query:{},transports:["websocket","polling"]}),j=d("userInfo",{state:()=>({userInfo:{}})});const q={setup(a){const s=h(),n=y(),r=j();return localStorage.getItem("USER_INFO")&&w.emit("login",localStorage.getItem("USER_INFO"),e=>{if(!e){localStorage.removeItem("USER_INFO"),s.replace({path:"/login"}),n.notify({type:"warning",message:"\u6635\u79F0\u8FC7\u671F\u4E86\uFF0C\u6362\u4E00\u4E2A\u5427"});return}r.userInfo=e}),(e,t)=>{const o=v("router-view");return I(),g(o)}}},A="modulepreload",u={},F="./",f=function(s,n){return!n||n.length===0?s():Promise.all(n.map(r=>{if(r=`${F}${r}`,r in u)return;u[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":A,e||(o.as="script",o.crossOrigin=""),o.href=r,document.head.appendChild(o),e)return new Promise((m,_)=>{o.addEventListener("load",m),o.addEventListener("error",_)})})).then(()=>s())},U=[{path:"/",name:"Index",component:()=>f(()=>import("./Index.df326746.20220621_200421.js"),["assets/Index.df326746.20220621_200421.js","assets/Index.6bf4883c.20220621_200421.css","assets/vendor.93178d86.20220621_200421.js","assets/plugin-vue_export-helper.f4fb32df.20220621_200421.js"])}];var x=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:U});const z=[{path:"/login",name:"Login",component:()=>f(()=>import("./Login.569c7695.20220621_200421.js"),["assets/Login.569c7695.20220621_200421.js","assets/Login.3865c08e.20220621_200421.css","assets/vendor.93178d86.20220621_200421.js","assets/plugin-vue_export-helper.f4fb32df.20220621_200421.js"])}];var C=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:z});let c=[];const D={"./modules/Index.js":x,"./modules/login.js":C};Object.values(D).map(a=>{c=c.concat(a.default)});const l=S({history:b(),routes:c,strict:!0,scrollBehavior:()=>({left:0,top:0})});l.beforeEach((a,s,n)=>{localStorage.getItem("USER_INFO")?a.name==="Login"?l.replace("/"):n():a.name==="Login"?n():l.replace("/login")});const T=O();const i=E(q);i.use(l);i.use(T);i.use(L,{plugins:{Notify:N,Dialog:P,Loading:R},config:{notify:{color:"primary",timeout:2500}},lang:k});i.mount("#app");export{f as _,j as g,w as s};