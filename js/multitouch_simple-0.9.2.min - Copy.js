function MultiTouchTracker(_1){
if(_1===undefined){
_1={};
}
if(_1.cookie_domain){
this.cookie_domain=_1.cookie_domain;
}else{
this.cookie_domain=document.domain;
}
if(_1.cookie_name){
this.cookie_name=_1.cookie_name;
}else{
this.cookie_name="multitouch";
}
if(_1.cookie_lifetime){
this.cookie_lifetime=_1.cookie_lifetime;
}else{
this.cookie_lifetime=180;
}
if(_1.max_cookie_size){
this.max_cookie_size=_1.max_cookie_size;
}else{
this.max_cookie_size=2048;
}
this.allow_internal=_1.allow_internal;
this.fieldsep="!";
this.recsep="*";
var _2="google:q;yahoo:p;msn:q;bing:q;daum:q;eniro:search_word;naver:query;images.google:q;aol:query;aol:encquery;lycos:query;ask:q;altavista:q;netscape:query;cnn:query;about:terms;mamma:query;alltheweb:q;voila:rdata;virgilio:qs;live:q;baidu:wd;alice:qs;yandex:text;najdi:q;aol:q;mama:query;seznam:q;search:q;wp:szukaj;onet:qt;szukacz:q;yam:k;pchome:q;kvasir:q;sesam:q;ozu:q;terra:query;mynet:q;ekolay:q;rambler:words";
var e=_2.split(";");
this.engines=[];
for(var j=0;j<e.length;j++){
this.engines[j]=e[j].split(":");
}
};
MultiTouchTracker.prototype.addOrganic=function(_3,_4,_5){
this.engines.splice(_5?0:this.engines.length,0,[_3,_4]);
};
MultiTouchTracker.prototype.multitouch=function(_6,_7,_8){
if(_6===undefined){
_6="";
}
if(_7===undefined){
_7=document.referrer;
}
if(_8===undefined){
_8=window.location.href;
}
var _9=this.cookie_domain;
if(!this.allow_internal&&_9&&!MultiTouchTracker.is_empty_ref(_7)&&_7.match("^https?://?(?:[^/]*.)?"+_9+"/")){
return "Internal";
}
var _a="";
var _b="direct";
if(_8.match("[&?]gclid=")){
_a="cpc";
_b="adwords";
}else{
var _c=_8.match("[&?]utm_source=([^&#]+)");
if(_c==null){
if(_7){
var _d=this.isOrganic(_7);
if(_d){
_a="organic";
_b=MultiTouchTracker.clean_var(_d);
}else{
_a="referral";
_b=MultiTouchTracker.domain_of(_7);
}
}
}else{
_b=MultiTouchTracker.clean_var(_c[1]);
var _e=_8.match("[&?]utm_medium=([^&#]+)");
if(_e){
_a=MultiTouchTracker.clean_var(_e[1]);
}
}
}
return this.appendCookie(_b+this.fieldsep+_a+this.fieldsep+_6);
};
MultiTouchTracker.prototype.multitouch_event=function(_f,rev){
return this.appendCookie("__ORD"+this.fieldsep+_f+this.fieldsep+rev);
};
MultiTouchTracker.prototype.appendCookie=function(val){
var _10=MultiTouchTracker.split_cookie(document.cookie,this.cookie_name,";");
var now=(new Date()).getTime()*0.001;
var _11=(new Date((now+this.cookie_lifetime*24*3600)*1000)).toGMTString();
var _12=now-this.cookie_lifetime*24*3600;
if(_10.length>0){
var cv=_10.split(this.recsep);
while(cv.length>0){
var _13=cv[cv.length-1].split(this.fieldsep);
if(_13[_13.length-1]<_12){
cv.pop();
}else{
break;
}
}
_10=cv.join(this.recsep);
_10=this.recsep+_10;
}
_10=val+this.fieldsep+Math.floor(now)+_10;
var _14=_10;
while(_10.length>this.max_cookie_size){
var cv=_10.split(this.recsep);
cv.pop();
_10=cv.join(this.recsep);
}
var _15=this.cookie_name+"="+MultiTouchTracker.encode(_10)+"; path=/"+"; expires="+_11;
if(this.cookie_domain!=document.domain){
_15+="; domain="+this.cookie_domain;
}
document.cookie=_15;
return _14;
};
MultiTouchTracker.prototype.isOrganic=function(ref){
var dom=MultiTouchTracker.domain_of(ref);
if(!dom){
return;
}
ref=ref.split("?").join("&");
for(var j=0;j<this.engines.length;j++){
if(MultiTouchTracker.contains(dom,this.engines[j][0])&&MultiTouchTracker.contains(ref,"&"+this.engines[j][1]+"=")){
return this.engines[j][0];
}
}
return false;
};
MultiTouchTracker.clean_var=function(s){
s=s.replace(new RegExp(this.fieldsep+"|"+this.recsep,"g"),"");
if(!s){
s="-";
}
return s;
};
MultiTouchTracker.contains=function(_16,_17){
return _16.indexOf(_17)>-1;
};
MultiTouchTracker.is_empty_ref=function(ref){
return undefined==ref||"-"==ref||""==ref;
};
MultiTouchTracker.split_cookie=function(_18,_19,sep){
var _1a,end;
if(!sep){
sep="&";
}
_1a=_18.indexOf(_19+"=");
if(_1a==-1){
return "";
}
_1a+=_19.length+1;
end=_18.indexOf(sep,_1a);
if(end==-1){
end=_18.length;
}
return MultiTouchTracker.decode(_18.substring(_1a,end));
};
MultiTouchTracker.encode=function(s,u){
if(typeof (encodeURIComponent)=="function"){
if(u){
return encodeURI(s);
}else{
return encodeURIComponent(s);
}
}else{
return escape(s);
}
};
MultiTouchTracker.decode=function(s){
if(typeof (decodeURIComponent)=="function"){
return decodeURIComponent(s);
}else{
return unescape(s);
}
};
MultiTouchTracker.domain_of=function(ref){
if(!ref){
return "";
}
var _1b=ref.match(/https?:\/\/([^\/]+)/);
if(_1b){
return _1b[1];
}
return "";
};
var _mtt;
function multitouch(_1c){
if(_mtt===undefined){
_mtt=new MultiTouchTracker();
}
return _mtt.multitouch(_1c);
};
function multitouch_event(tid,rev){
if(_mtt===undefined){
_mtt=new MultiTouchTracker();
}
return _mtt.multitouch_event(tid,rev);
};
function multitouch_send_event(tid,rev){
_gaq.push(["_trackEvent","multitouch","TID"+tid,multitouch_event(tid,rev)]);
};
function multitouch_send_event_standard(gid,tid,rev){
var _1d=_gat._getTracker(gid);
_1d._trackEvent("multitouch","TID"+tid,multitouch_event(tid,rev));
};

