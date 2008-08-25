/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

	http://dojotoolkit.org/license

*/


if(!dojo._hasResource["dojox.layout.ContentPane"]){
dojo._hasResource["dojox.layout.ContentPane"]=true;
dojo.provide("dojox.layout.ContentPane");
dojo.require("dijit.layout.ContentPane");
(function(){
if(dojo.isIE){
var _1=/(AlphaImageLoader\([^)]*?src=(['"]))(?![a-z]+:|\/)([^\r\n;}]+?)(\2[^)]*\)\s*[;}]?)/g;
}
var _2=/(?:(?:@import\s*(['"])(?![a-z]+:|\/)([^\r\n;{]+?)\1)|url\(\s*(['"]?)(?![a-z]+:|\/)([^\r\n;]+?)\3\s*\))([a-z, \s]*[;}]?)/g;
function adjustCssPaths(_3,_4){
if(!_4||!_3){
return;
}
if(_1){
_4=_4.replace(_1,function(_5,_6,_7,_8,_9){
return _6+(new dojo._Url(_3,"./"+_8).toString())+_9;
});
}
return _4.replace(_2,function(_a,_b,_c,_d,_e,_f){
if(_c){
return "@import \""+(new dojo._Url(_3,"./"+_c).toString())+"\""+_f;
}else{
return "url("+(new dojo._Url(_3,"./"+_e).toString())+")"+_f;
}
});
};
var _10=/(<[a-z][a-z0-9]*\s[^>]*)(?:(href|src)=(['"]?)([^>]*?)\3|style=(['"]?)([^>]*?)\5)([^>]*>)/gi;
function adjustHtmlPaths(_11,_12){
var url=_11||"./";
return _12.replace(_10,function(tag,_15,_16,_17,_18,_19,_1a,end){
return _15+(_16?(_16+"="+_17+(new dojo._Url(url,_18).toString())+_17):("style="+_19+adjustCssPaths(url,_1a)+_19))+end;
});
};
function secureForInnerHtml(_1c){
return _1c.replace(/(?:\s*<!DOCTYPE\s[^>]+>|<title[^>]*>[\s\S]*?<\/title>)/ig,"");
};
function snarfStyles(_1d,_1e,_1f){
_1f.attributes=[];
return _1e.replace(/(?:<style([^>]*)>([\s\S]*?)<\/style>|<link\s+(?=[^>]*rel=['"]?stylesheet)([^>]*?href=(['"])([^>]*?)\4[^>\/]*)\/?>)/gi,function(_20,_21,_22,_23,_24,_25){
var i,_27=(_21||_23||"").replace(/^\s*([\s\S]*?)\s*$/i,"$1");
if(_22){
i=_1f.push(_1d?adjustCssPaths(_1d,_22):_22);
}else{
i=_1f.push("@import \""+_25+"\";");
_27=_27.replace(/\s*(?:rel|href)=(['"])?[^\s]*\1\s*/gi,"");
}
if(_27){
_27=_27.split(/\s+/);
var _28={},tmp;
for(var j=0,e=_27.length;j<e;j++){
tmp=_27[j].split("=");
_28[tmp[0]]=tmp[1].replace(/^\s*['"]?([\s\S]*?)['"]?\s*$/,"$1");
}
_1f.attributes[i-1]=_28;
}
return "";
});
};
function snarfScripts(_2c,_2d){
_2d.code="";
function download(src){
if(_2d.downloadRemote){
dojo.xhrGet({url:src,sync:true,load:function(_2f){
_2d.code+=_2f+";";
},error:_2d.errBack});
}
};
return _2c.replace(/<script\s*(?![^>]*type=['"]?dojo)(?:[^>]*?(?:src=(['"]?)([^>]*?)\1[^>]*)?)*>([\s\S]*?)<\/script>/gi,function(_30,_31,src,_33){
if(src){
download(src);
}else{
_2d.code+=_33;
}
return "";
});
};
function evalInGlobal(_34,_35){
_35=_35||dojo.doc.body;
var n=_35.ownerDocument.createElement("script");
n.type="text/javascript";
_35.appendChild(n);
n.text=_34;
};
dojo.declare("dojox.layout.ContentPane",dijit.layout.ContentPane,{adjustPaths:false,cleanContent:false,renderStyles:false,executeScripts:true,scriptHasHooks:false,constructor:function(){
this.ioArgs={};
this.ioMethod=dojo.xhrGet;
this.onLoadDeferred=new dojo.Deferred();
this.onUnloadDeferred=new dojo.Deferred();
},postCreate:function(){
this._setUpDeferreds();
dijit.layout.ContentPane.prototype.postCreate.apply(this,arguments);
},onExecError:function(e){
},_setContentAttr:function(_38){
if(!this._isDownloaded){
var _39=this._setUpDeferreds();
}
this.inherited(arguments);
return _39;
},cancel:function(){
if(this._xhrDfd&&this._xhrDfd.fired==-1){
this.onUnloadDeferred=null;
}
dijit.layout.ContentPane.prototype.cancel.apply(this,arguments);
},_setUpDeferreds:function(){
var _t=this,_3b=function(){
_t.cancel();
};
var _3c=(_t.onLoadDeferred=new dojo.Deferred());
var _3d=(_t._nextUnloadDeferred=new dojo.Deferred());
return {cancel:_3b,addOnLoad:function(_3e){
_3c.addCallback(_3e);
},addOnUnload:function(_3f){
_3d.addCallback(_3f);
}};
},_onLoadHandler:function(){
dijit.layout.ContentPane.prototype._onLoadHandler.apply(this,arguments);
if(this.onLoadDeferred){
this.onLoadDeferred.callback(true);
}
},_onUnloadHandler:function(){
this.isLoaded=false;
this.cancel();
if(this.onUnloadDeferred){
this.onUnloadDeferred.callback(true);
}
dijit.layout.ContentPane.prototype._onUnloadHandler.apply(this,arguments);
if(this._nextUnloadDeferred){
this.onUnloadDeferred=this._nextUnloadDeferred;
}
},_onError:function(_40,err){
dijit.layout.ContentPane.prototype._onError.apply(this,arguments);
if(this.onLoadDeferred){
this.onLoadDeferred.errback(err);
}
},_prepareLoad:function(_42){
var _43=this._setUpDeferreds();
dijit.layout.ContentPane.prototype._prepareLoad.apply(this,arguments);
return _43;
},_setContent:function(_44){
var _45=[];
if(dojo.isString(_44)){
if(this.adjustPaths&&this.href){
_44=adjustHtmlPaths(this.href,_44);
}
if(this.cleanContent){
_44=secureForInnerHtml(_44);
}
if(this.renderStyles||this.cleanContent){
_44=snarfStyles(this.href,_44,_45);
}
if(this.executeScripts){
var _t=this,_47,_48={downloadRemote:true,errBack:function(e){
_t._onError.call(_t,"Exec","Error downloading remote script in \""+_t.id+"\"",e);
}};
_44=snarfScripts(_44,_48);
_47=_48.code;
}
var _4a=(this.containerNode||this.domNode),_4b,pre=_4b="",_4d=0;
switch(_4a.nodeName.toLowerCase()){
case "tr":
pre="<tr>";
_4b="</tr>";
_4d+=1;
case "tbody":
case "thead":
pre="<tbody>"+pre;
_4b+="</tbody>";
_4d+=1;
case "table":
pre="<table>"+pre;
_4b+="</table>";
_4d+=1;
break;
}
if(_4d){
var n=_4a.ownerDocument.createElement("div");
n.innerHTML=pre+_44+_4b;
do{
n=n.firstChild;
}while(--_4d);
_44=n.childNodes;
}
}
dijit.layout.ContentPane.prototype._setContent.call(this,_44);
if(this._styleNodes&&this._styleNodes.length){
while(this._styleNodes.length){
dojo._destroyElement(this._styleNodes.pop());
}
}
if(this.renderStyles&&_45&&_45.length){
this._renderStyles(_45);
}
if(this.executeScripts&&_47){
if(this.cleanContent){
_47=_47.replace(/(<!--|(?:\/\/)?-->|<!\[CDATA\[|\]\]>)/g,"");
}
if(this.scriptHasHooks){
_47=_47.replace(/_container_(?!\s*=[^=])/g,dijit._scopeName+".byId('"+this.id+"')");
}
try{
evalInGlobal(_47,(this.containerNode||this.domNode));
}
catch(e){
this._onError("Exec","Error eval script in "+this.id+", "+e.message,e);
}
}
},_renderStyles:function(_4f){
this._styleNodes=[];
var st,att,_52,doc=this.domNode.ownerDocument;
var _54=doc.getElementsByTagName("head")[0];
for(var i=0,e=_4f.length;i<e;i++){
_52=_4f[i];
att=_4f.attributes[i];
st=doc.createElement("style");
st.setAttribute("type","text/css");
for(var x in att){
st.setAttribute(x,att[x]);
}
this._styleNodes.push(st);
_54.appendChild(st);
if(st.styleSheet){
st.styleSheet.cssText=_52;
}else{
st.appendChild(doc.createTextNode(_52));
}
}
}});
})();
}
