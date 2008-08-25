/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

	http://dojotoolkit.org/license

*/


if(!dojo._hasResource["dojo._base.lang"]){
dojo._hasResource["dojo._base.lang"]=true;
dojo.provide("dojo._base.lang");
dojo.isString=function(it){
return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);
};
dojo.isArray=function(it){
return it&&(it instanceof Array||typeof it=="array");
};
dojo.isFunction=(function(){
var _3=function(it){
return it&&(typeof it=="function"||it instanceof Function);
};
return dojo.isSafari?function(it){
if(typeof it=="function"&&it=="[object NodeList]"){
return false;
}
return _3(it);
}:_3;
})();
dojo.isObject=function(it){
return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));
};
dojo.isArrayLike=function(it){
var d=dojo;
return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));
};
dojo.isAlien=function(it){
return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.extend=function(_a,_b){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_a.prototype,arguments[i]);
}
return _a;
};
dojo._hitchArgs=function(_e,_f){
var pre=dojo._toArray(arguments,2);
var _11=dojo.isString(_f);
return function(){
var _12=dojo._toArray(arguments);
var f=_11?(_e||dojo.global)[_f]:_f;
return f&&f.apply(_e||this,pre.concat(_12));
};
};
dojo.hitch=function(_14,_15){
if(arguments.length>2){
return dojo._hitchArgs.apply(dojo,arguments);
}
if(!_15){
_15=_14;
_14=null;
}
if(dojo.isString(_15)){
_14=_14||dojo.global;
if(!_14[_15]){
throw (["dojo.hitch: scope[\"",_15,"\"] is null (scope=\"",_14,"\")"].join(""));
}
return function(){
return _14[_15].apply(_14,arguments||[]);
};
}
return !_14?_15:function(){
return _15.apply(_14,arguments||[]);
};
};
dojo.delegate=dojo._delegate=(function(){
function TMP(){
};
return function(obj,_17){
TMP.prototype=obj;
var tmp=new TMP();
if(_17){
dojo._mixin(tmp,_17);
}
return tmp;
};
})();
(function(){
var _19=function(obj,_1b,_1c){
return (_1c||[]).concat(Array.prototype.slice.call(obj,_1b||0));
};
var _1d=function(obj,_1f,_20){
var arr=_20||[];
for(var x=_1f||0;x<obj.length;x++){
arr.push(obj[x]);
}
return arr;
};
dojo._toArray=(!dojo.isIE)?_19:function(obj){
return ((obj.item)?_1d:_19).apply(this,arguments);
};
})();
dojo.partial=function(_24){
var arr=[null];
return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));
};
dojo.clone=function(o){
if(!o){
return o;
}
if(dojo.isArray(o)){
var r=[];
for(var i=0;i<o.length;++i){
r.push(dojo.clone(o[i]));
}
return r;
}
if(!dojo.isObject(o)){
return o;
}
if(o.nodeType&&o.cloneNode){
return o.cloneNode(true);
}
if(o instanceof Date){
return new Date(o.getTime());
}
var r=new o.constructor();
for(var i in o){
if(!(i in r)||r[i]!=o[i]){
r[i]=dojo.clone(o[i]);
}
}
return r;
};
dojo.trim=function(str){
return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");
};
}
