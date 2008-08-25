/*
	Copyright (c) 2004-2008, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

	http://dojotoolkit.org/license

*/


if(!dojo._hasResource["dojox.charting.Theme"]){
dojo._hasResource["dojox.charting.Theme"]=true;
dojo.provide("dojox.charting.Theme");
dojo.require("dojox.color");
dojo.require("dojox.color.Palette");
(function(){
var _1=dojox.charting;
_1.Theme=function(_2){
_2=_2||{};
var _3=_1.Theme._def;
dojo.forEach(["chart","plotarea","axis","series","marker"],function(n){
this[n]=dojo.mixin(dojo.clone(_3[n]),_2[n]||{});
},this);
this.markers=dojo.mixin(dojo.clone(_1.Theme.Markers),_2.markers||{});
this.colors=[];
this.antiAlias=("antiAlias" in _2)?_2.antiAlias:true;
this.assignColors=("assignColors" in _2)?_2.assignColors:true;
this.assignMarkers=("assignMarkers" in _2)?_2.assignMarkers:true;
_2.colors=_2.colors||_3.colors;
dojo.forEach(_2.colors,function(_5){
this.colors.push(_5);
},this);
this._current={color:0,marker:0};
this._markers=[];
this._buildMarkerArray();
};
_1.Theme.Markers={CIRCLE:"m-3,0 c0,-4 6,-4 6,0 m-6,0 c0,4 6,4 6,0",SQUARE:"m-3,-3 l0,6 6,0 0,-6 z",DIAMOND:"m0,-3 l3,3 -3,3 -3,-3 z",CROSS:"m0,-3 l0,6 m-3,-3 l6,0",X:"m-3,-3 l6,6 m0,-6 l-6,6",TRIANGLE:"m-3,3 l3,-6 3,6 z",TRIANGLE_INVERTED:"m-3,-3 l3,6 3,-6 z"};
_1.Theme._def={chart:{stroke:null,fill:"white"},plotarea:{stroke:null,fill:"white"},axis:{stroke:{color:"#333",width:1},line:{color:"#ccc",width:1,style:"Dot",cap:"round"},majorTick:{color:"#666",width:1,length:6,position:"center"},minorTick:{color:"#666",width:0.8,length:3,position:"center"},font:"normal normal normal 7pt Tahoma",fontColor:"#333"},series:{outline:{width:0.1,color:"#ccc"},stroke:{width:1.5,color:"#333"},fill:"#ccc",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},marker:{stroke:{width:1},fill:"#333",font:"normal normal normal 7pt Tahoma",fontColor:"#000"},colors:["#000","#111","#222","#333","#444","#555","#666","#777","#888","#999","#aaa","#bbb","#ccc"]};
dojo.extend(_1.Theme,{defineColors:function(_6){
var _7=_6||{};
var c=[],n=_7.num||5;
if(_7.colors){
var l=_7.colors.length;
for(var i=0;i<n;i++){
c.push(_7.colors[i%l]);
}
this.colors=c;
}else{
if(_7.hue){
var s=_7.saturation||100;
var st=_7.low||30;
var _e=_7.high||90;
var l=(_e+st)/2;
this.colors=dojox.color.Palette.generate(dojox.color.fromHsv(_7.hue,s,l),"monochromatic").colors;
}else{
if(_7.generator){
this.colors=dojox.color.Palette.generate(_7.base,_7.generator).colors;
}
}
}
},_buildMarkerArray:function(){
this._markers=[];
for(var p in this.markers){
this._markers.push(this.markers[p]);
}
this._current.marker=0;
},addMarker:function(_10,_11){
this.markers[_10]=_11;
this._buildMarkerArray();
},setMarkers:function(obj){
this.markers=obj;
this._buildMarkerArray();
},next:function(_13){
if(_13=="marker"){
return this._markers[this._current.marker++%this._markers.length];
}else{
return this.colors[this._current.color++%this.colors.length];
}
},clear:function(){
this._current={color:0,marker:0};
}});
})();
}
