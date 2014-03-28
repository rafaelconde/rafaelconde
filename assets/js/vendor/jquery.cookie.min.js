/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function n(e){if(t.raw)return e;try{return decodeURIComponent(e.replace(i," "))}catch(n){}}function o(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")),e=n(e);try{return t.json?JSON.parse(e):e}catch(o){}}var i=/\+/g,t=e.cookie=function(i,r,c){if(void 0!==r){if(c=e.extend({},t.defaults,c),"number"==typeof c.expires){var a=c.expires,d=c.expires=new Date;d.setDate(d.getDate()+a)}return r=t.json?JSON.stringify(r):String(r),document.cookie=[t.raw?i:encodeURIComponent(i),"=",t.raw?r:encodeURIComponent(r),c.expires?"; expires="+c.expires.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}for(var u=i?void 0:{},f=document.cookie?document.cookie.split("; "):[],p=0,s=f.length;s>p;p++){var m=f[p].split("="),x=n(m.shift()),l=m.join("=");if(i&&i===x){u=o(l);break}i||void 0===(l=o(l))||(u[x]=l)}return u};t.defaults={},e.removeCookie=function(n,o){return void 0!==e.cookie(n)?(e.cookie(n,"",e.extend({},o,{expires:-1})),!0):!1}});