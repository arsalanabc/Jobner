var firebase = require('./app');
(function(){
/*! @license Firebase v3.6.5
    Build: 3.6.5-rc.1
    Terms: https://firebase.google.com/terms/ */
(function(){var k,l=this,m=function(a){return void 0!==a},aa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&
!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==b&&"undefined"==typeof a.call)return"object";return b};var p=function(a,b){return-1!==a.indexOf(b)};var ba=function(a,b,c){function d(){z||(z=!0,b.apply(null,arguments))}function e(b){n=setTimeout(function(){n=null;a(f,2===C)},b)}function f(a,b){if(!z)if(a)d.apply(null,arguments);else if(2===C||B)d.apply(null,arguments);else{64>h&&(h*=2);var c;1===C?(C=2,c=0):c=1E3*(h+Math.random());e(c)}}function g(a){Ha||(Ha=!0,z||(null!==n?(a||(C=2),clearTimeout(n),e(0)):a||(C=1)))}var h=1,n=null,B=!1,C=0,z=!1,Ha=!1;e(0);setTimeout(function(){B=!0;g(!0)},c);return g};var q="https://firebasestorage.googleapis.com";var r=function(a,b){this.code="storage/"+a;this.message="Firebase Storage: "+b;this.serverResponse=null;this.name="FirebaseError"};(function(){var a=Error;function b(){}b.prototype=a.prototype;r.b=a.prototype;r.prototype=new b;r.a=function(b,d,e){for(var c=Array(arguments.length-2),g=2;g<arguments.length;g++)c[g-2]=arguments[g];return a.prototype[d].apply(b,c)}})();
var ca=function(){return new r("unknown","An unknown error occurred, please check the error payload for server response.")},da=function(){return new r("canceled","User canceled the upload/download.")},ea=function(){return new r("cannot-slice-blob","Cannot slice blob for upload. Please retry the upload.")},fa=function(a,b,c){return new r("invalid-argument","Invalid argument in `"+b+"` at index "+a+": "+c)},ga=function(){return new r("app-deleted","The Firebase app was deleted.")},t=function(a,b){return new r("invalid-format",
"String does not match format '"+a+"': "+b)},u=function(a){throw new r("internal-error","Internal error: "+a);};var v=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},ha=function(a){var b={};v(a,function(a,d){b[a]=d});return b};var ia=function(a,b){b=b.split("/").filter(function(a){return 0<a.length}).join("/");return 0===a.length?b:a+"/"+b},ja=function(a){var b=a.lastIndexOf("/",a.length-2);return-1===b?a:a.slice(b+1)};var ka=function(a){if("undefined"!==typeof firebase)return new firebase.Promise(a);throw Error("Error in Firebase Storage - be sure to load firebase-app.js first.");};var w=function(a,b,c,d){this.h=a;this.b={};this.method=b;this.headers={};this.body=null;this.j=c;this.l=this.a=null;this.c=[200];this.g=[];this.timeout=d;this.f=!0};var la={STATE_CHANGED:"state_changed"},x={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"},ma=function(a){switch(a){case "running":case "pausing":case "canceling":return"running";case "paused":return"paused";case "success":return"success";case "canceled":return"canceled";case "error":return"error";default:return"error"}};var y=function(a){return m(a)&&null!==a},na=function(a){return"string"===typeof a||a instanceof String},oa=function(){return"undefined"!==typeof Blob};var qa=function(a,b){var c=pa;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var ra=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},sa=function(a,b){return a<b?-1:a>b?1:0};var A=function(a){return function(){var b=[];Array.prototype.push.apply(b,arguments);firebase.Promise.resolve(!0).then(function(){a.apply(null,b)})}};var D=function(a,b){this.bucket=a;this.path=b},ta=function(a){var b=encodeURIComponent;return"/b/"+b(a.bucket)+"/o/"+b(a.path)},ua=function(a){for(var b=null,c=[{K:/^gs:\/\/([A-Za-z0-9.\-]+)(\/(.*))?$/i,G:{bucket:1,path:3},J:function(a){"/"===a.path.charAt(a.path.length-1)&&(a.path=a.path.slice(0,-1))}},{K:/^https?:\/\/firebasestorage\.googleapis\.com\/v[A-Za-z0-9_]+\/b\/([A-Za-z0-9.\-]+)\/o(\/([^?#]*).*)?$/i,G:{bucket:1,path:3},J:function(a){a.path=decodeURIComponent(a.path)}}],d=0;d<c.length;d++){var e=
c[d],f=e.K.exec(a);if(f){b=f[e.G.bucket];(f=f[e.G.path])||(f="");b=new D(b,f);e.J(b);break}}if(null==b)throw new r("invalid-url","Invalid URL '"+a+"'.");return b};var va=function(a,b,c){"function"==aa(a)||y(b)||y(c)?(this.c=a,this.a=b||null,this.b=c||null):(this.c=a.next||null,this.a=a.error||null,this.b=a.complete||null)};var E={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},wa=function(a){switch(a){case "raw":case "base64":case "base64url":case "data_url":break;default:throw"Expected one of the event types: [raw, base64, base64url, data_url].";}},xa=function(a,b){this.b=a;this.a=b||null},Ba=function(a,b){switch(a){case "raw":return new xa(ya(b));case "base64":case "base64url":return new xa(za(a,b));case "data_url":a=new Aa(b);var c;if(a.a)c=za("base64",a.c);else{try{c=decodeURIComponent(a.c)}catch(d){throw t("data_url",
"Malformed data URL.");}c=ya(c)}return new xa(c,(new Aa(b)).b)}throw ca();},ya=function(a){for(var b=[],c=0;c<a.length;c++){var d=a.charCodeAt(c);if(127>=d)b.push(d);else if(2047>=d)b.push(192|d>>6,128|d&63);else if(55296==(d&64512))if(c<a.length-1&&56320==(a.charCodeAt(c+1)&64512)){var e=a.charCodeAt(++c),d=65536|(d&1023)<<10|e&1023;b.push(240|d>>18,128|d>>12&63,128|d>>6&63,128|d&63)}else b.push(239,191,189);else 56320==(d&64512)?b.push(239,191,189):b.push(224|d>>12,128|d>>6&63,128|d&63)}return new Uint8Array(b)},
za=function(a,b){switch(a){case "base64":var c=-1!==b.indexOf("-"),d=-1!==b.indexOf("_");if(c||d)throw t(a,"Invalid character '"+(c?"-":"_")+"' found: is it base64url encoded?");break;case "base64url":c=-1!==b.indexOf("+");d=-1!==b.indexOf("/");if(c||d)throw t(a,"Invalid character '"+(c?"+":"/")+"' found: is it base64 encoded?");b=b.replace(/-/g,"+").replace(/_/g,"/")}var e;try{e=atob(b)}catch(f){throw t(a,"Invalid character found");}a=new Uint8Array(e.length);for(b=0;b<e.length;b++)a[b]=e.charCodeAt(b);
return a},Aa=function(a){var b=a.match(/^data:([^,]+)?,/);if(null===b)throw t("data_url","Must be formatted 'data:[<mediatype>][;base64],<data>");b=b[1]||null;this.a=!1;this.b=null;if(null!=b){var c=b.length-7;this.b=(this.a=0<=c&&b.indexOf(";base64",c)==c)?b.substring(0,b.length-7):b}this.c=a.substring(a.indexOf(",")+1)};var Ca=function(a){var b=encodeURIComponent,c="?";v(a,function(a,e){a=b(a)+"="+b(e);c=c+a+"&"});return c=c.slice(0,-1)};var Da=function(){var a=this;this.a=new XMLHttpRequest;this.c=0;this.f=ka(function(b){a.a.addEventListener("abort",function(){a.c=2;b(a)});a.a.addEventListener("error",function(){a.c=1;b(a)});a.a.addEventListener("load",function(){b(a)})});this.b=!1},Ea=function(a,b,c,d,e){if(a.b)throw u("cannot .send() more than once");a.b=!0;a.a.open(c,b,!0);y(e)&&v(e,function(b,c){a.a.setRequestHeader(b,c.toString())});y(d)?a.a.send(d):a.a.send();return a.f},Fa=function(a){if(!a.b)throw u("cannot .getErrorCode() before sending");
return a.c},F=function(a){if(!a.b)throw u("cannot .getStatus() before sending");try{return a.a.status}catch(b){return-1}},Ga=function(a){if(!a.b)throw u("cannot .getResponseText() before sending");return a.a.responseText};Da.prototype.abort=function(){this.a.abort()};var G=function(a,b,c,d,e,f){this.b=a;this.h=b;this.f=c;this.a=d;this.g=e;this.c=f};k=G.prototype;k.V=function(){return this.b};k.qa=function(){return this.h};k.na=function(){return this.f};k.ia=function(){return this.a};k.W=function(){if(y(this.a)){var a=this.a.downloadURLs;return y(a)&&y(a[0])?a[0]:null}return null};k.pa=function(){return this.g};k.la=function(){return this.c};var H;a:{var Ia=l.navigator;if(Ia){var Ja=Ia.userAgent;if(Ja){H=Ja;break a}}H=""};var La=function(a,b,c,d,e,f,g,h,n,B,C){this.C=a;this.A=b;this.v=c;this.o=d;this.B=e.slice();this.m=f.slice();this.j=this.l=this.c=this.b=null;this.f=this.g=!1;this.s=g;this.h=h;this.D=C;this.w=n;var z=this;this.u=ka(function(a,b){z.l=a;z.j=b;Ka(z)})},Ma=function(a,b,c){this.b=a;this.c=b;this.a=!!c},Ka=function(a){function b(a,b){b?a(!1,new Ma(!1,null,!0)):(b=new Da,b.a.withCredentials=d.D,d.b=b,Ea(b,d.C,d.A,d.o,d.v).then(function(b){d.b=null;var c=0===Fa(b),e=F(b);if(!(c=!c))var c=p([408,429],e),
f=p(d.m,e),c=500<=e&&600>e||c||f;c?(b=2===Fa(b),a(!1,new Ma(!1,null,b))):a(!0,new Ma(p(d.B,e),b))}))}function c(a,b){var c=d.l;a=d.j;var e=b.c;if(b.b)try{var f=d.s(e,Ga(e));m(f)?c(f):c()}catch(B){a(B)}else null!==e?(b=ca(),f=Ga(e),b.serverResponse=f,d.h?a(d.h(e,b)):a(b)):(b=b.a?d.f?ga():da():new r("retry-limit-exceeded","Max retry time for operation exceeded, please try again."),a(b))}var d=a;a.g?c(0,new Ma(!1,null,!0)):a.c=ba(b,c,a.w)};La.prototype.a=function(){return this.u};
La.prototype.cancel=function(a){this.g=!0;this.f=a||!1;null!==this.c&&(0,this.c)(!1);null!==this.b&&this.b.abort()};var Na=function(a,b,c){var d=Ca(a.b),d=a.h+d,e=a.headers?ha(a.headers):{};null!==b&&0<b.length&&(e.Authorization="Firebase "+b);e["X-Firebase-Storage-Version"]="webjs/"+("undefined"!==typeof firebase?firebase.SDK_VERSION:"AppManager");return new La(d,a.method,e,a.body,a.c,a.g,a.j,a.a,a.timeout,0,c)};var Oa=function(){};var Pa=function(a){this.b=firebase.Promise.reject(a)};Pa.prototype.a=function(){return this.b};Pa.prototype.cancel=function(){};var Qa=function(){this.a={};this.b=Number.MIN_SAFE_INTEGER},Ra=function(a,b){function c(){delete e.a[d]}var d=a.b;a.b++;a.a[d]=b;var e=a;b.a().then(c,c)},Sa=function(a){v(a.a,function(a,c){c&&c.cancel(!0)});a.a={}};var Ta=function(a,b,c,d,e){this.a=a;this.g=null;if(null!==this.a&&(a=this.a.options,y(a))){a=a.storageBucket||null;if(null==a)a=null;else{var f=null;try{f=ua(a)}catch(g){}if(null!==f){if(""!==f.path)throw new r("invalid-default-bucket","Invalid default bucket '"+a+"'.");a=f.bucket}}this.g=a}this.o=b;this.m=c;this.j=e;this.l=d;this.c=12E4;this.b=6E4;this.h=new Qa;this.f=!1},Ua=function(a){return null!==a.a&&y(a.a.INTERNAL)&&y(a.a.INTERNAL.getToken)?a.a.INTERNAL.getToken().then(function(a){return y(a)?
a.accessToken:null},function(){return null}):firebase.Promise.resolve(null)};Ta.prototype.bucket=function(){if(this.f)throw ga();return this.g};var I=function(a,b,c){if(a.f)return new Pa(ga());b=a.m(b,c,null===a.a,a.j);Ra(a.h,b);return b};var Va=-1!=H.indexOf("Opera"),Wa=-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"),Xa=-1!=H.indexOf("Edge"),Ya=-1!=H.indexOf("Gecko")&&!(-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"))&&!(-1!=H.indexOf("Trident")||-1!=H.indexOf("MSIE"))&&-1==H.indexOf("Edge"),Za=-1!=H.toLowerCase().indexOf("webkit")&&-1==H.indexOf("Edge"),$a;
a:{var ab="",bb=function(){var a=H;if(Ya)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Xa)return/Edge\/([\d\.]+)/.exec(a);if(Wa)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Za)return/WebKit\/(\S+)/.exec(a);if(Va)return/(?:Version)[ \/]?(\S+)/.exec(a)}();bb&&(ab=bb?bb[1]:"");if(Wa){var cb,db=l.document;cb=db?db.documentMode:void 0;if(null!=cb&&cb>parseFloat(ab)){$a=String(cb);break a}}$a=ab}
var eb=$a,pa={},fb=function(a){return qa(a,function(){for(var b=0,c=ra(String(eb)).split("."),d=ra(String(a)).split("."),e=Math.max(c.length,d.length),f=0;0==b&&f<e;f++){var g=c[f]||"",h=d[f]||"";do{g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==g[0].length&&0==h[0].length)break;b=sa(0==g[1].length?0:parseInt(g[1],10),0==h[1].length?0:parseInt(h[1],10))||sa(0==g[2].length,0==h[2].length)||sa(g[2],h[2]);g=g[3];h=h[3]}while(0==b)}return 0<=b})};var gb=function(a){var b=l.BlobBuilder||l.WebKitBlobBuilder;if(m(b)){for(var b=new b,c=0;c<arguments.length;c++)b.append(arguments[c]);return b.getBlob()}b=Array.prototype.slice.call(arguments);c=l.BlobBuilder||l.WebKitBlobBuilder;if(m(c)){for(var c=new c,d=0;d<b.length;d++)c.append(b[d],void 0);b=c.getBlob(void 0)}else if(m(l.Blob))b=new Blob(b,{});else throw Error("This browser doesn't seem to support creating Blobs");return b},hb=function(a,b,c){m(c)||(c=a.size);return a.webkitSlice?a.webkitSlice(b,
c):a.mozSlice?a.mozSlice(b,c):a.slice?Ya&&!fb("13.0")||Za&&!fb("537.1")?(0>b&&(b+=a.size),0>b&&(b=0),0>c&&(c+=a.size),c<b&&(c=b),a.slice(b,c-b)):a.slice(b,c):null};var ib=function(a,b){return b},J=function(a,b,c,d){this.c=a;this.b=b||a;this.writable=!!c;this.a=d||ib},jb=null,kb=function(){if(jb)return jb;var a=[];a.push(new J("bucket"));a.push(new J("generation"));a.push(new J("metageneration"));a.push(new J("name","fullPath",!0));var b=new J("name");b.a=function(a,b){return!na(b)||2>b.length?b:ja(b)};a.push(b);b=new J("size");b.a=function(a,b){return y(b)?+b:b};a.push(b);a.push(new J("timeCreated"));a.push(new J("updated"));a.push(new J("md5Hash",null,!0));
a.push(new J("cacheControl",null,!0));a.push(new J("contentDisposition",null,!0));a.push(new J("contentEncoding",null,!0));a.push(new J("contentLanguage",null,!0));a.push(new J("contentType",null,!0));a.push(new J("metadata","customMetadata",!0));a.push(new J("downloadTokens","downloadURLs",!1,function(a,b){if(!(na(b)&&0<b.length))return[];var c=encodeURIComponent;return b.split(",").map(function(b){var d=a.fullPath,d="https://firebasestorage.googleapis.com/v0"+("/b/"+c(a.bucket)+"/o/"+c(d));b=Ca({alt:"media",
token:b});return d+b})}));return jb=a},lb=function(a,b){Object.defineProperty(a,"ref",{get:function(){return b.o(b,new D(a.bucket,a.fullPath))}})},mb=function(a,b){for(var c={},d=b.length,e=0;e<d;e++){var f=b[e];f.writable&&(c[f.c]=a[f.b])}return JSON.stringify(c)},nb=function(a){if(!a||"object"!==typeof a)throw"Expected Metadata object.";for(var b in a){var c=a[b];if("customMetadata"===b){if("object"!==typeof c)throw"Expected object for 'customMetadata' mapping.";}else if(null!=c&&"object"===typeof c)throw"Mapping for '"+
b+"' cannot be an object.";}};var K=function(a,b,c){for(var d=b.length,e=b.length,f=0;f<b.length;f++)if(b[f].b){d=f;break}if(!(d<=c.length&&c.length<=e))throw d===e?(b=d,d=1===d?"argument":"arguments"):(b="between "+d+" and "+e,d="arguments"),new r("invalid-argument-count","Invalid argument count in `"+a+"`: Expected "+b+" "+d+", received "+c.length+".");for(f=0;f<c.length;f++)try{b[f].a(c[f])}catch(g){if(g instanceof Error)throw fa(f,a,g.message);throw fa(f,a,g);}},L=function(a,b){var c=this;this.a=function(b){c.b&&!m(b)||a(b)};
this.b=!!b},ob=function(a,b){return function(c){a(c);b(c)}},M=function(a,b){function c(a){if(!("string"===typeof a||a instanceof String))throw"Expected string.";}var d;a?d=ob(c,a):d=c;return new L(d,b)},pb=function(){return new L(function(a){if(!(a instanceof Uint8Array||a instanceof ArrayBuffer||oa()&&a instanceof Blob))throw"Expected Blob or File.";})},qb=function(){return new L(function(a){if(!(("number"===typeof a||a instanceof Number)&&0<=a))throw"Expected a number 0 or greater.";})},rb=function(a,
b){return new L(function(b){if(!(null===b||y(b)&&b instanceof Object))throw"Expected an Object.";y(a)&&a(b)},b)},N=function(){return new L(function(a){if(null!==a&&"function"!=aa(a))throw"Expected a Function.";},!0)};var O=function(a,b){oa()&&a instanceof Blob?(this.i=a,b=a.size,a=a.type):(a instanceof ArrayBuffer?(b?this.i=new Uint8Array(a):(this.i=new Uint8Array(a.byteLength),this.i.set(new Uint8Array(a))),b=this.i.length):(b?this.i=a:(this.i=new Uint8Array(a.length),this.i.set(a)),b=a.length),a="");this.a=b;this.b=a};O.prototype.type=function(){return this.b};
O.prototype.slice=function(a,b){if(oa()&&this.i instanceof Blob)return a=hb(this.i,a,b),null===a?null:new O(a);a=new Uint8Array(this.i.buffer,a,b-a);return new O(a,!0)};
var sb=function(a){var b=[];Array.prototype.push.apply(b,arguments);if(oa())return b=b.map(function(a){return a instanceof O?a.i:a}),new O(gb.apply(null,b));var b=b.map(function(a){return na(a)?Ba("raw",a).b.buffer:a.i.buffer}),c=0;b.forEach(function(a){c+=a.byteLength});var d=new Uint8Array(c),e=0;b.forEach(function(a){a=new Uint8Array(a);for(var b=0;b<a.length;b++)d[e++]=a[b]});return new O(d,!0)};var P=function(a){if(!a)throw ca();},tb=function(a,b){return function(c,d){var e;a:{try{e=JSON.parse(d)}catch(h){e=null;break a}c=typeof e;e="object"==c&&null!=e||"function"==c?e:null}if(null===e)e=null;else{c={type:"file"};d=b.length;for(var f=0;f<d;f++){var g=b[f];c[g.b]=g.a(c,e[g.c])}lb(c,a);e=c}P(null!==e);return e}},Q=function(a){return function(b,c){b=401===F(b)?new r("unauthenticated","User is not authenticated, please authenticate using Firebase Authentication and try again."):402===F(b)?
new r("quota-exceeded","Quota for bucket '"+a.bucket+"' exceeded, please view quota on https://firebase.google.com/pricing/."):403===F(b)?new r("unauthorized","User does not have permission to access '"+a.path+"'."):c;b.serverResponse=c.serverResponse;return b}},ub=function(a){var b=Q(a);return function(c,d){var e=b(c,d);404===F(c)&&(e=new r("object-not-found","Object '"+a.path+"' does not exist."));e.serverResponse=d.serverResponse;return e}},vb=function(a,b,c){var d=ta(b);a=new w(q+"/v0"+d,"GET",
tb(a,c),a.c);a.a=ub(b);return a},wb=function(a,b){var c=ta(b);a=new w(q+"/v0"+c,"DELETE",function(){},a.c);a.c=[200,204];a.a=ub(b);return a},xb=function(a,b,c){c=c?ha(c):{};c.fullPath=a.path;c.size=b.a;c.contentType||(a=b&&b.type()||"application/octet-stream",c.contentType=a);return c},yb=function(a,b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g={"X-Goog-Upload-Protocol":"multipart"},h;h="";for(var n=0;2>n;n++)h+=Math.random().toString().slice(2);g["Content-Type"]="multipart/related; boundary="+
h;e=xb(b,d,e);n=mb(e,c);d=sb("--"+h+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+n+"\r\n--"+h+"\r\nContent-Type: "+e.contentType+"\r\n\r\n",d,"\r\n--"+h+"--");if(null===d)throw ea();a=new w(q+"/v0"+f,"POST",tb(a,c),a.b);a.b={name:e.fullPath};a.headers=g;a.body=d.i;a.a=Q(b);return a},zb=function(a,b,c,d){this.a=a;this.b=b;this.c=!!c;this.f=d||null},Ab=function(a,b){var c;try{c=a.a.getResponseHeader("X-Goog-Upload-Status")}catch(d){P(!1)}P(p(b||["active"],c));return c},Bb=function(a,
b,c,d,e){var f="/b/"+encodeURIComponent(b.bucket)+"/o",g=xb(b,d,e);e={name:g.fullPath};f=q+"/v0"+f;d={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":d.a,"X-Goog-Upload-Header-Content-Type":g.contentType,"Content-Type":"application/json; charset=utf-8"};c=mb(g,c);a=new w(f,"POST",function(a){Ab(a);var b;try{b=a.a.getResponseHeader("X-Goog-Upload-URL")}catch(B){P(!1)}P(na(b));return b},a.b);a.b=e;a.headers=d;a.body=c;a.a=Q(b);return a},Cb=
function(a,b,c,d){a=new w(c,"POST",function(a){var b=Ab(a,["active","final"]),c;try{c=a.a.getResponseHeader("X-Goog-Upload-Size-Received")}catch(h){P(!1)}a=c;isFinite(a)&&(a=String(a));a="string"==typeof a?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN;P(!isNaN(a));return new zb(a,d.a,"final"===b)},a.b);a.headers={"X-Goog-Upload-Command":"query"};a.a=Q(b);a.f=!1;return a},Db=function(a,b,c,d,e,f,g){var h=new zb(0,0);g?(h.a=g.a,h.b=g.b):(h.a=0,h.b=d.a);if(d.a!==h.b)throw new r("server-file-wrong-size",
"Server recorded incorrect upload file size, please retry the upload.");var n=g=h.b-h.a;0<e&&(n=Math.min(n,e));var B=h.a;e={"X-Goog-Upload-Command":n===g?"upload, finalize":"upload","X-Goog-Upload-Offset":h.a};g=d.slice(B,B+n);if(null===g)throw ea();c=new w(c,"POST",function(a,c){var e=Ab(a,["active","final"]),g=h.a+n,C=d.a,z;"final"===e?z=tb(b,f)(a,c):z=null;return new zb(g,C,"final"===e,z)},b.b);c.headers=e;c.body=g.i;c.l=null;c.a=Q(a);c.f=!1;return c};var T=function(a,b,c,d,e,f){this.L=a;this.c=b;this.l=c;this.f=e;this.h=f||null;this.s=d;this.m=0;this.D=this.u=!1;this.B=[];this.S=262144<this.f.a;this.b="running";this.a=this.v=this.g=null;this.j=1;var g=this;this.F=function(a){g.a=null;g.j=1;"storage/canceled"===a.code?(g.u=!0,R(g)):(g.g=a,S(g,"error"))};this.P=function(a){g.a=null;"storage/canceled"===a.code?R(g):(g.g=a,S(g,"error"))};this.A=this.o=null;this.C=ka(function(a,b){g.o=a;g.A=b;Eb(g)});this.C.then(null,function(){})},Eb=function(a){"running"===
a.b&&null===a.a&&(a.S?null===a.v?Fb(a):a.u?Gb(a):a.D?Hb(a):Ib(a):Jb(a))},U=function(a,b){Ua(a.c).then(function(c){switch(a.b){case "running":b(c);break;case "canceling":S(a,"canceled");break;case "pausing":S(a,"paused")}})},Fb=function(a){U(a,function(b){var c=Bb(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.v=b;a.u=!1;R(a)},this.F)})},Gb=function(a){var b=a.v;U(a,function(c){var d=Cb(a.c,a.l,b,a.f);a.a=I(a.c,d,c);a.a.a().then(function(b){a.a=null;Kb(a,b.a);a.u=!1;b.c&&(a.D=
!0);R(a)},a.F)})},Ib=function(a){var b=262144*a.j,c=new zb(a.m,a.f.a),d=a.v;U(a,function(e){var f;try{f=Db(a.l,a.c,d,a.f,b,a.s,c)}catch(g){a.g=g;S(a,"error");return}a.a=I(a.c,f,e);a.a.a().then(function(b){33554432>262144*a.j&&(a.j*=2);a.a=null;Kb(a,b.a);b.c?(a.h=b.f,S(a,"success")):R(a)},a.F)})},Hb=function(a){U(a,function(b){var c=vb(a.c,a.l,a.s);a.a=I(a.c,c,b);a.a.a().then(function(b){a.a=null;a.h=b;S(a,"success")},a.P)})},Jb=function(a){U(a,function(b){var c=yb(a.c,a.l,a.s,a.f,a.h);a.a=I(a.c,c,
b);a.a.a().then(function(b){a.a=null;a.h=b;Kb(a,a.f.a);S(a,"success")},a.F)})},Kb=function(a,b){var c=a.m;a.m=b;a.m>c&&V(a)},S=function(a,b){if(a.b!==b)switch(b){case "canceling":a.b=b;null!==a.a&&a.a.cancel();break;case "pausing":a.b=b;null!==a.a&&a.a.cancel();break;case "running":var c="paused"===a.b;a.b=b;c&&(V(a),Eb(a));break;case "paused":a.b=b;V(a);break;case "canceled":a.g=da();a.b=b;V(a);break;case "error":a.b=b;V(a);break;case "success":a.b=b,V(a)}},R=function(a){switch(a.b){case "pausing":S(a,
"paused");break;case "canceling":S(a,"canceled");break;case "running":Eb(a)}};T.prototype.w=function(){return new G(this.m,this.f.a,ma(this.b),this.h,this,this.L)};
T.prototype.M=function(a,b,c,d){function e(a){try{g(a);return}catch(z){}try{if(h(a),!(m(a.next)||m(a.error)||m(a.complete)))throw"";}catch(z){throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";}}function f(a){return function(b,c,d){null!==a&&K("on",a,arguments);var e=new va(b,c,d);Lb(n,e);return function(){var a=n.B,b=a.indexOf(e);-1!==b&&a.splice(b,1)}}}var g=N().a,h=rb(null,!0).a;K("on",[M(function(){if("state_changed"!==a)throw"Expected one of the event types: [state_changed].";
}),rb(e,!0),N(),N()],arguments);var n=this,B=[rb(function(a){if(null===a)throw"Expected a function or an Object with one of `next`, `error`, `complete` properties.";e(a)}),N(),N()];return m(b)||m(c)||m(d)?f(null)(b,c,d):f(B)};T.prototype.then=function(a,b){return this.C.then(a,b)};
var Lb=function(a,b){a.B.push(b);Mb(a,b)},V=function(a){Nb(a);Array.prototype.slice.call(a.B).forEach(function(b){Mb(a,b)})},Nb=function(a){if(null!==a.o){var b=!0;switch(ma(a.b)){case "success":A(a.o.bind(null,a.w()))();break;case "canceled":case "error":A(a.A.bind(null,a.g))();break;default:b=!1}b&&(a.o=null,a.A=null)}},Mb=function(a,b){switch(ma(a.b)){case "running":case "paused":null!==b.c&&A(b.c.bind(b,a.w()))();break;case "success":null!==b.b&&A(b.b.bind(b))();break;case "canceled":case "error":null!==
b.a&&A(b.a.bind(b,a.g))();break;default:null!==b.a&&A(b.a.bind(b,a.g))()}};T.prototype.O=function(){K("resume",[],arguments);var a="paused"===this.b||"pausing"===this.b;a&&S(this,"running");return a};T.prototype.N=function(){K("pause",[],arguments);var a="running"===this.b;a&&S(this,"pausing");return a};T.prototype.cancel=function(){K("cancel",[],arguments);var a="running"===this.b||"pausing"===this.b;a&&S(this,"canceling");return a};var W=function(a,b){this.b=a;if(b)this.a=b instanceof D?b:ua(b);else if(a=a.bucket(),null!==a)this.a=new D(a,"");else throw new r("no-default-bucket","No default bucket found. Did you set the 'storageBucket' property when initializing the app?");};W.prototype.toString=function(){K("toString",[],arguments);return"gs://"+this.a.bucket+"/"+this.a.path};var Ob=function(a,b){return new W(a,b)};k=W.prototype;
k.H=function(a){K("child",[M()],arguments);var b=ia(this.a.path,a);return Ob(this.b,new D(this.a.bucket,b))};k.ka=function(){var a;a=this.a.path;if(0==a.length)a=null;else{var b=a.lastIndexOf("/");a=-1===b?"":a.slice(0,b)}return null===a?null:Ob(this.b,new D(this.a.bucket,a))};k.ma=function(){return Ob(this.b,new D(this.a.bucket,""))};k.U=function(){return this.a.bucket};k.fa=function(){return this.a.path};k.ja=function(){return ja(this.a.path)};k.oa=function(){return this.b.l};
k.Z=function(a,b){K("put",[pb(),new L(nb,!0)],arguments);X(this,"put");return new T(this,this.b,this.a,kb(),new O(a),b)};k.$=function(a,b,c){K("putString",[M(),M(wa,!0),new L(nb,!0)],arguments);X(this,"putString");var d=Ba(y(b)?b:"raw",a),e=c?ha(c):{};!y(e.contentType)&&y(d.a)&&(e.contentType=d.a);return new T(this,this.b,this.a,kb(),new O(d.b,!0),e)};k.X=function(){K("delete",[],arguments);X(this,"delete");var a=this;return Ua(this.b).then(function(b){var c=wb(a.b,a.a);return I(a.b,c,b).a()})};
k.I=function(){K("getMetadata",[],arguments);X(this,"getMetadata");var a=this;return Ua(this.b).then(function(b){var c=vb(a.b,a.a,kb());return I(a.b,c,b).a()})};k.aa=function(a){K("updateMetadata",[new L(nb,void 0)],arguments);X(this,"updateMetadata");var b=this;return Ua(this.b).then(function(c){var d=b.b,e=b.a,f=a,g=kb(),h=ta(e),h=q+"/v0"+h,f=mb(f,g),d=new w(h,"PATCH",tb(d,g),d.c);d.headers={"Content-Type":"application/json; charset=utf-8"};d.body=f;d.a=ub(e);return I(b.b,d,c).a()})};
k.Y=function(){K("getDownloadURL",[],arguments);X(this,"getDownloadURL");return this.I().then(function(a){a=a.downloadURLs[0];if(y(a))return a;throw new r("no-download-url","The given file does not have any download URLs.");})};var X=function(a,b){if(""===a.a.path)throw new r("invalid-root-operation","The operation '"+b+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').");};var Y=function(a,b){this.a=new Ta(a,function(a,b){return new W(a,b)},Na,this,y(b)?b:new Oa);this.b=a;this.c=new Pb(this)};k=Y.prototype;k.ba=function(a){K("ref",[M(function(a){if(/^[A-Za-z]+:\/\//.test(a))throw"Expected child path but got a URL, use refFromURL instead.";},!0)],arguments);var b=new W(this.a);return m(a)?b.H(a):b};
k.ca=function(a){K("refFromURL",[M(function(a){if(!/^[A-Za-z]+:\/\//.test(a))throw"Expected full URL but got a child path, use ref instead.";try{ua(a)}catch(c){throw"Expected valid full URL but got an invalid one.";}},!1)],arguments);return new W(this.a,a)};k.ha=function(){return this.a.b};k.ea=function(a){K("setMaxUploadRetryTime",[qb()],arguments);this.a.b=a};k.ga=function(){return this.a.c};k.da=function(a){K("setMaxOperationRetryTime",[qb()],arguments);this.a.c=a};k.T=function(){return this.b};
k.R=function(){return this.c};var Pb=function(a){this.a=a};Pb.prototype.b=function(){var a=this.a.a;a.f=!0;a.a=null;Sa(a.h)};var Z=function(a,b,c){Object.defineProperty(a,b,{get:c})};W.prototype.toString=W.prototype.toString;W.prototype.child=W.prototype.H;W.prototype.put=W.prototype.Z;W.prototype.putString=W.prototype.$;W.prototype["delete"]=W.prototype.X;W.prototype.getMetadata=W.prototype.I;W.prototype.updateMetadata=W.prototype.aa;W.prototype.getDownloadURL=W.prototype.Y;Z(W.prototype,"parent",W.prototype.ka);Z(W.prototype,"root",W.prototype.ma);Z(W.prototype,"bucket",W.prototype.U);Z(W.prototype,"fullPath",W.prototype.fa);
Z(W.prototype,"name",W.prototype.ja);Z(W.prototype,"storage",W.prototype.oa);Y.prototype.ref=Y.prototype.ba;Y.prototype.refFromURL=Y.prototype.ca;Z(Y.prototype,"maxOperationRetryTime",Y.prototype.ga);Y.prototype.setMaxOperationRetryTime=Y.prototype.da;Z(Y.prototype,"maxUploadRetryTime",Y.prototype.ha);Y.prototype.setMaxUploadRetryTime=Y.prototype.ea;Z(Y.prototype,"app",Y.prototype.T);Z(Y.prototype,"INTERNAL",Y.prototype.R);Pb.prototype["delete"]=Pb.prototype.b;Y.prototype.capi_=function(a){q=a};
T.prototype.on=T.prototype.M;T.prototype.resume=T.prototype.O;T.prototype.pause=T.prototype.N;T.prototype.cancel=T.prototype.cancel;Z(T.prototype,"snapshot",T.prototype.w);Z(G.prototype,"bytesTransferred",G.prototype.V);Z(G.prototype,"totalBytes",G.prototype.qa);Z(G.prototype,"state",G.prototype.na);Z(G.prototype,"metadata",G.prototype.ia);Z(G.prototype,"downloadURL",G.prototype.W);Z(G.prototype,"task",G.prototype.pa);Z(G.prototype,"ref",G.prototype.la);la.STATE_CHANGED="state_changed";
x.RUNNING="running";x.PAUSED="paused";x.SUCCESS="success";x.CANCELED="canceled";x.ERROR="error";E.RAW="raw";E.BASE64="base64";E.BASE64URL="base64url";E.DATA_URL="data_url";(function(){function a(a){return new Y(a)}var b={TaskState:x,TaskEvent:la,StringFormat:E,Storage:Y,Reference:W};if("undefined"!==typeof firebase)firebase.INTERNAL.registerService("storage",a,b);else throw Error("Cannot install Firebase Storage - be sure to load firebase-app.js first.");})();}).call(this);
}).call(global);
module.exports = firebase.storage;