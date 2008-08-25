/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

	http://dojotoolkit.org/license

*/


if(!dojo._hasResource["dojox.xmpp.UserService"]){
dojo._hasResource["dojox.xmpp.UserService"]=true;
dojo.provide("dojox.xmpp.UserService");
dojo.declare("dojox.xmpp.UserService",null,{constructor:function(_1){
this.session=_1;
},getPersonalProfile:function(){
var _2={id:this.session.getNextIqId(),type:"get"};
var _3=new dojox.string.Builder(dojox.xmpp.util.createElement("iq",_2,false));
_3.append(dojox.xmpp.util.createElement("query",{xmlns:"jabber:iq:private"},false));
_3.append(dojox.xmpp.util.createElement("sunmsgr",{xmlsns:"sun:xmpp:properties"},true));
_3.append("</query></iq>");
var _4=this.session.dispatchPacket(_3.toString(),"iq",_2.id);
_4.addCallback(this,"_onGetPersonalProfile");
},setPersonalProfile:function(_5){
var _6={id:this.session.getNextIqId(),type:"set"};
var _7=new dojox.string.Builder(dojox.xmpp.util.createElement("iq",_6,false));
_7.append(dojox.xmpp.util.createElement("query",{xmlns:"jabber:iq:private"},false));
_7.append(dojox.xmpp.util.createElement("sunmsgr",{xmlsns:"sun:xmpp:properties"},false));
for(var _8 in _5){
_7.append(dojox.xmpp.util.createElement("property",{name:_8},false));
_7.append(dojox.xmpp.util.createElement("value",{},false));
_7.append(_5[_8]);
_7.append("</value></props>");
}
_7.append("</sunmsgr></query></iq>");
var _9=this.session.dispatchPacket(_7.toString(),"iq",_6.id);
_9.addCallback(this,"_onSetPersonalProfile");
},_onSetPersonalProfile:function(_a){
if(_a.getAttribute("type")=="result"){
this.onSetPersonalProfile(_a.getAttribute("id"));
}else{
if(_a.getAttribute("type")=="error"){
var _b=this.session.processXmppError(_a);
this.onSetPersonalProfileFailure(_b);
}
}
},onSetPersonalProfile:function(id){
},onSetPersonalProfileFailure:function(_d){
},_onGetPersonalProfile:function(_e){
if(_e.getAttribute("type")=="result"){
props={};
if(_e.hasChildNodes()){
var _f=_e.firstChild;
if((_f.nodeName=="query")&&(_f.getAttribute("xmlns")=="jabber:iq:private")){
var _10=_f.firstChild;
if((_10.nodeName=="query")&&(_10.getAttributes("xmlns")=="sun:xmpp:properties")){
for(var i=0;i<_10.childNodes.length;i++){
var n=_10.childNodes[i];
if(n.nodeName=="property"){
var _13=n.getAttribute("name");
var val=n.firstChild||"";
props[_13]=val;
}
}
}
}
this.onGetPersonalProfile(props);
}
}else{
if(_e.getAttribute("type")=="error"){
var err=this.session.processXmppError(_e);
this.onGetPersonalProfileFailure(err);
}
}
return _e;
},onGetPersonalProfile:function(_16){
},onGetPersonalProfileFailure:function(err){
}});
}
