/*! For license information please see jokeapi-wrapper.js.LICENSE.txt */
var jokeapi_wrapper;(()=>{var e={79:(e,t,r)=>{function o(e){return e&&e.default||e}e.exports=global.fetch=global.fetch||("undefined"==typeof process?o(r(869)):function(e,t){return o(r(418))(String(e).replace(/^\/\//g,"https://"),t)})},869:(e,t,r)=>{"use strict";function o(e,t){return t=t||{},new Promise((function(r,o){var n=new XMLHttpRequest,s=[],i=[],a={},u=function(){return{ok:2==(n.status/100|0),statusText:n.statusText,status:n.status,url:n.responseURL,text:function(){return Promise.resolve(n.responseText)},json:function(){return Promise.resolve(n.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([n.response]))},clone:u,headers:{keys:function(){return s},entries:function(){return i},get:function(e){return a[e.toLowerCase()]},has:function(e){return e.toLowerCase()in a}}}};for(var l in n.open(t.method||"get",e,!0),n.onload=function(){n.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,(function(e,t,r){s.push(t=t.toLowerCase()),i.push([t,r]),a[t]=a[t]?a[t]+","+r:r})),r(u())},n.onerror=o,n.withCredentials="include"==t.credentials,t.headers)n.setRequestHeader(l,t.headers[l]);n.send(t.body||null)}))}r.r(t),r.d(t,{default:()=>o})},558:(e,t,r)=>{"use strict";r.r(t);var o=r(79),n=r.n(o);const s="https://v2.jokeapi.dev",i=e=>Array.isArray(e)?e.join(","):e;e=r.hmd(e);class a{constructor(e={}){this._options=e}getJoke(e={}){e.categories||(e.categories="any");const t=this._buildUrl("joke",e);return this._request(t)}info(e={}){const t=this._buildUrl("info",e);return this._request(t)}categories(e={}){const t=this._buildUrl("categories",e);return this._request(t)}langcode(e={}){if(!e.language)return{error:!0,message:"You need to supply a language"};const t=this._buildUrl("langcode",e);return this._request(t)}languages(e={}){const t=this._buildUrl("languages",e);return this._request(t)}flags(e={}){const t=this._buildUrl("flags",e);return this._request(t)}formats(e={}){const t=this._buildUrl("formats",e);return this._request(t)}ping(e={}){const t=this._buildUrl("ping",e);return this._request(t)}endpoints(e={}){const t=this._buildUrl("endpoints",e);return this._request(t)}submit(e={}){const t=this._buildUrl("submit",void 0,e["dry-run"]);return delete e["dry-run"],this._request(t,{body:JSON.stringify(e),method:"POST"})}_buildUrl(e,t,r){if(r)return`${s}/${e}?dry-run`;if(t){const{parsedParams:r,wildcard:o}=((e,t)=>{const r={};let o;if(e&&t)return Object.assign(r,e),"safe-mode"in t&&(r["safe-mode"]="safe-mode"),"safe-mode"in e&&(e["safe-mode"]?r["safe-mode"]="safe-mode":delete r["safe-mode"]),"format"in t&&(r.format=t.format),"format"in e&&("json"===e.format?delete r.format:r.format=e.format),("blacklistFlags"in e||"blacklistFlags"in t)&&(r.blacklistFlags=e.blacklistFlags?i(e.blacklistFlags):i(t.blacklistFlags)),("lang"in e||"lang"in t)&&(r.lang=e.lang?e.lang:t.lang),"type"in e&&(r.type=i(e.type)),"categories"in e&&(o=`/${i(e.categories)}`,delete r.categories),"language"in e&&(o=`/${e.language}`,delete r.language),{parsedParams:r,wildcard:o}})(t,this._options),n=o?`${s}/${e}${o}`:`${s}/${e}`;return this._buildQuery(n,r)}return`${s}/${e}`}_buildQuery(e,t){const r=Object.entries(t).map((e=>e[0]===e[1]?e[0]:e.map(encodeURIComponent).join("="))).join("&");return r?`${e}?${r}`:e}async _request(e,t){const r={Authorization:this._options.apiKey,"Content-Type":"application/json"},o=await n()(e,{...t,headers:r}),s=new URL(e);return new URLSearchParams(s.search).get("format")?o.text():o.json()}}a.BASE=s,a.HOST="https://jokeapi.dev",a.API_VERSION="2",a.CATEGORIES=["any","misc","programming","dark","pun","spooky","christmas","miscellaneous","coding","development","halloween"],a.BLACKLIST_FLAGS=["nsfw","religious","political","racist","sexist","explicit"],a.FORMAT=["json","xml","yaml","txt"],a.TYPE=["single","twopart"],a.AMOUNT_MAX=10,e.exports=a,e.exports.default=a},418:(e,t,r)=>{"use strict";r.r(t),r.d(t,{FetchError:()=>d,Headers:()=>_,Request:()=>N,Response:()=>q,default:()=>K});const o=require("stream"),n=require("http"),s=require("url"),i=require("https"),a=require("zlib"),u=o.Readable,l=Symbol("buffer"),c=Symbol("type");class f{constructor(){this[c]="";const e=arguments[0],t=arguments[1],r=[];let o=0;if(e){const t=e,n=Number(t.length);for(let e=0;e<n;e++){const n=t[e];let s;s=n instanceof Buffer?n:ArrayBuffer.isView(n)?Buffer.from(n.buffer,n.byteOffset,n.byteLength):n instanceof ArrayBuffer?Buffer.from(n):n instanceof f?n[l]:Buffer.from("string"==typeof n?n:String(n)),o+=s.length,r.push(s)}}this[l]=Buffer.concat(r);let n=t&&void 0!==t.type&&String(t.type).toLowerCase();n&&!/[^\u0020-\u007E]/.test(n)&&(this[c]=n)}get size(){return this[l].length}get type(){return this[c]}text(){return Promise.resolve(this[l].toString())}arrayBuffer(){const e=this[l],t=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(t)}stream(){const e=new u;return e._read=function(){},e.push(this[l]),e.push(null),e}toString(){return"[object Blob]"}slice(){const e=this.size,t=arguments[0],r=arguments[1];let o,n;o=void 0===t?0:t<0?Math.max(e+t,0):Math.min(t,e),n=void 0===r?e:r<0?Math.max(e+r,0):Math.min(r,e);const s=Math.max(n-o,0),i=this[l].slice(o,o+s),a=new f([],{type:arguments[2]});return a[l]=i,a}}function d(e,t,r){Error.call(this,e),this.message=e,this.type=t,r&&(this.code=this.errno=r.code),Error.captureStackTrace(this,this.constructor)}let p;Object.defineProperties(f.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}}),Object.defineProperty(f.prototype,Symbol.toStringTag,{value:"Blob",writable:!1,enumerable:!1,configurable:!0}),d.prototype=Object.create(Error.prototype),d.prototype.constructor=d,d.prototype.name="FetchError";try{p=require("encoding").convert}catch(e){}const h=Symbol("Body internals"),b=o.PassThrough;function m(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r.size;let s=void 0===n?0:n;var i=r.timeout;let a=void 0===i?0:i;null==e?e=null:g(e)?e=Buffer.from(e.toString()):w(e)||Buffer.isBuffer(e)||("[object ArrayBuffer]"===Object.prototype.toString.call(e)?e=Buffer.from(e):ArrayBuffer.isView(e)?e=Buffer.from(e.buffer,e.byteOffset,e.byteLength):e instanceof o||(e=Buffer.from(String(e)))),this[h]={body:e,disturbed:!1,error:null},this.size=s,this.timeout=a,e instanceof o&&e.on("error",(function(e){const r="AbortError"===e.name?e:new d(`Invalid response body while trying to fetch ${t.url}: ${e.message}`,"system",e);t[h].error=r}))}function y(){var e=this;if(this[h].disturbed)return m.Promise.reject(new TypeError(`body used already for: ${this.url}`));if(this[h].disturbed=!0,this[h].error)return m.Promise.reject(this[h].error);let t=this.body;if(null===t)return m.Promise.resolve(Buffer.alloc(0));if(w(t)&&(t=t.stream()),Buffer.isBuffer(t))return m.Promise.resolve(t);if(!(t instanceof o))return m.Promise.resolve(Buffer.alloc(0));let r=[],n=0,s=!1;return new m.Promise((function(o,i){let a;e.timeout&&(a=setTimeout((function(){s=!0,i(new d(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))}),e.timeout)),t.on("error",(function(t){"AbortError"===t.name?(s=!0,i(t)):i(new d(`Invalid response body while trying to fetch ${e.url}: ${t.message}`,"system",t))})),t.on("data",(function(t){if(!s&&null!==t){if(e.size&&n+t.length>e.size)return s=!0,void i(new d(`content size at ${e.url} over limit: ${e.size}`,"max-size"));n+=t.length,r.push(t)}})),t.on("end",(function(){if(!s){clearTimeout(a);try{o(Buffer.concat(r,n))}catch(t){i(new d(`Could not create Buffer from response body for ${e.url}: ${t.message}`,"system",t))}}}))}))}function g(e){return"object"==typeof e&&"function"==typeof e.append&&"function"==typeof e.delete&&"function"==typeof e.get&&"function"==typeof e.getAll&&"function"==typeof e.has&&"function"==typeof e.set&&("URLSearchParams"===e.constructor.name||"[object URLSearchParams]"===Object.prototype.toString.call(e)||"function"==typeof e.sort)}function w(e){return"object"==typeof e&&"function"==typeof e.arrayBuffer&&"string"==typeof e.type&&"function"==typeof e.stream&&"function"==typeof e.constructor&&"string"==typeof e.constructor.name&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function v(e){let t,r,n=e.body;if(e.bodyUsed)throw new Error("cannot clone body after it is used");return n instanceof o&&"function"!=typeof n.getBoundary&&(t=new b,r=new b,n.pipe(t),n.pipe(r),e[h].body=t,n=r),n}function S(e){return null===e?null:"string"==typeof e?"text/plain;charset=UTF-8":g(e)?"application/x-www-form-urlencoded;charset=UTF-8":w(e)?e.type||null:Buffer.isBuffer(e)||"[object ArrayBuffer]"===Object.prototype.toString.call(e)||ArrayBuffer.isView(e)?null:"function"==typeof e.getBoundary?`multipart/form-data;boundary=${e.getBoundary()}`:e instanceof o?null:"text/plain;charset=UTF-8"}function j(e){const t=e.body;return null===t?0:w(t)?t.size:Buffer.isBuffer(t)?t.length:t&&"function"==typeof t.getLengthSync&&(t._lengthRetrievers&&0==t._lengthRetrievers.length||t.hasKnownLength&&t.hasKnownLength())?t.getLengthSync():null}m.prototype={get body(){return this[h].body},get bodyUsed(){return this[h].disturbed},arrayBuffer(){return y.call(this).then((function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)}))},blob(){let e=this.headers&&this.headers.get("content-type")||"";return y.call(this).then((function(t){return Object.assign(new f([],{type:e.toLowerCase()}),{[l]:t})}))},json(){var e=this;return y.call(this).then((function(t){try{return JSON.parse(t.toString())}catch(t){return m.Promise.reject(new d(`invalid json response body at ${e.url} reason: ${t.message}`,"invalid-json"))}}))},text(){return y.call(this).then((function(e){return e.toString()}))},buffer(){return y.call(this)},textConverted(){var e=this;return y.call(this).then((function(t){return function(e,t){if("function"!=typeof p)throw new Error("The package `encoding` must be installed to use the textConverted() function");const r=t.get("content-type");let o,n,s="utf-8";return r&&(o=/charset=([^;]*)/i.exec(r)),n=e.slice(0,1024).toString(),!o&&n&&(o=/<meta.+?charset=(['"])(.+?)\1/i.exec(n)),!o&&n&&(o=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(n),o||(o=/<meta[\s]+?content=(['"])(.+?)\1[\s]+?http-equiv=(['"])content-type\3/i.exec(n),o&&o.pop()),o&&(o=/charset=(.*)/i.exec(o.pop()))),!o&&n&&(o=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(n)),o&&(s=o.pop(),"gb2312"!==s&&"gbk"!==s||(s="gb18030")),p(e,"UTF-8",s).toString()}(t,e.headers)}))}},Object.defineProperties(m.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0}}),m.mixIn=function(e){for(const t of Object.getOwnPropertyNames(m.prototype))if(!(t in e)){const r=Object.getOwnPropertyDescriptor(m.prototype,t);Object.defineProperty(e,t,r)}},m.Promise=global.Promise;const T=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/,O=/[^\t\x20-\x7e\x80-\xff]/;function x(e){if(e=`${e}`,T.test(e)||""===e)throw new TypeError(`${e} is not a legal HTTP header name`)}function P(e){if(e=`${e}`,O.test(e))throw new TypeError(`${e} is not a legal HTTP header value`)}function E(e,t){t=t.toLowerCase();for(const r in e)if(r.toLowerCase()===t)return r}const $=Symbol("map");class _{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;if(this[$]=Object.create(null),e instanceof _){const t=e.raw(),r=Object.keys(t);for(const e of r)for(const r of t[e])this.append(e,r)}else if(null==e);else{if("object"!=typeof e)throw new TypeError("Provided initializer must be an object");{const t=e[Symbol.iterator];if(null!=t){if("function"!=typeof t)throw new TypeError("Header pairs must be iterable");const r=[];for(const t of e){if("object"!=typeof t||"function"!=typeof t[Symbol.iterator])throw new TypeError("Each header pair must be iterable");r.push(Array.from(t))}for(const e of r){if(2!==e.length)throw new TypeError("Each header pair must be a name/value tuple");this.append(e[0],e[1])}}else for(const t of Object.keys(e)){const r=e[t];this.append(t,r)}}}}get(e){x(e=`${e}`);const t=E(this[$],e);return void 0===t?null:this[$][t].join(", ")}forEach(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=B(this),o=0;for(;o<r.length;){var n=r[o];const s=n[0],i=n[1];e.call(t,i,s,this),r=B(this),o++}}set(e,t){t=`${t}`,x(e=`${e}`),P(t);const r=E(this[$],e);this[$][void 0!==r?r:e]=[t]}append(e,t){t=`${t}`,x(e=`${e}`),P(t);const r=E(this[$],e);void 0!==r?this[$][r].push(t):this[$][e]=[t]}has(e){return x(e=`${e}`),void 0!==E(this[$],e)}delete(e){x(e=`${e}`);const t=E(this[$],e);void 0!==t&&delete this[$][t]}raw(){return this[$]}keys(){return A(this,"key")}values(){return A(this,"value")}[Symbol.iterator](){return A(this,"key+value")}}function B(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"key+value";const r=Object.keys(e[$]).sort();return r.map("key"===t?function(e){return e.toLowerCase()}:"value"===t?function(t){return e[$][t].join(", ")}:function(t){return[t.toLowerCase(),e[$][t].join(", ")]})}_.prototype.entries=_.prototype[Symbol.iterator],Object.defineProperty(_.prototype,Symbol.toStringTag,{value:"Headers",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(_.prototype,{get:{enumerable:!0},forEach:{enumerable:!0},set:{enumerable:!0},append:{enumerable:!0},has:{enumerable:!0},delete:{enumerable:!0},keys:{enumerable:!0},values:{enumerable:!0},entries:{enumerable:!0}});const k=Symbol("internal");function A(e,t){const r=Object.create(C);return r[k]={target:e,kind:t,index:0},r}const C=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==C)throw new TypeError("Value of `this` is not a HeadersIterator");var e=this[k];const t=e.target,r=e.kind,o=e.index,n=B(t,r);return o>=n.length?{value:void 0,done:!0}:(this[k].index=o+1,{value:n[o],done:!1})}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));function L(e){const t=Object.assign({__proto__:null},e[$]),r=E(e[$],"Host");return void 0!==r&&(t[r]=t[r][0]),t}Object.defineProperty(C,Symbol.toStringTag,{value:"HeadersIterator",writable:!1,enumerable:!1,configurable:!0});const U=Symbol("Response internals"),R=n.STATUS_CODES;class q{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};m.call(this,e,t);const r=t.status||200,o=new _(t.headers);if(null!=e&&!o.has("Content-Type")){const t=S(e);t&&o.append("Content-Type",t)}this[U]={url:t.url,status:r,statusText:t.statusText||R[r],headers:o,counter:t.counter}}get url(){return this[U].url||""}get status(){return this[U].status}get ok(){return this[U].status>=200&&this[U].status<300}get redirected(){return this[U].counter>0}get statusText(){return this[U].statusText}get headers(){return this[U].headers}clone(){return new q(v(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}m.mixIn(q.prototype),Object.defineProperties(q.prototype,{url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}}),Object.defineProperty(q.prototype,Symbol.toStringTag,{value:"Response",writable:!1,enumerable:!1,configurable:!0});const z=Symbol("Request internals"),F=s.parse,H=s.format,M="destroy"in o.Readable.prototype;function I(e){return"object"==typeof e&&"object"==typeof e[z]}class N{constructor(e){let t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};I(e)?t=F(e.url):(t=e&&e.href?F(e.href):F(`${e}`),e={});let o=r.method||e.method||"GET";if(o=o.toUpperCase(),(null!=r.body||I(e)&&null!==e.body)&&("GET"===o||"HEAD"===o))throw new TypeError("Request with GET/HEAD method cannot have body");let n=null!=r.body?r.body:I(e)&&null!==e.body?v(e):null;m.call(this,n,{timeout:r.timeout||e.timeout||0,size:r.size||e.size||0});const s=new _(r.headers||e.headers||{});if(null!=n&&!s.has("Content-Type")){const e=S(n);e&&s.append("Content-Type",e)}let i=I(e)?e.signal:null;if("signal"in r&&(i=r.signal),null!=i&&!function(e){const t=e&&"object"==typeof e&&Object.getPrototypeOf(e);return!(!t||"AbortSignal"!==t.constructor.name)}(i))throw new TypeError("Expected signal to be an instanceof AbortSignal");this[z]={method:o,redirect:r.redirect||e.redirect||"follow",headers:s,parsedURL:t,signal:i},this.follow=void 0!==r.follow?r.follow:void 0!==e.follow?e.follow:20,this.compress=void 0!==r.compress?r.compress:void 0===e.compress||e.compress,this.counter=r.counter||e.counter||0,this.agent=r.agent||e.agent}get method(){return this[z].method}get url(){return H(this[z].parsedURL)}get headers(){return this[z].headers}get redirect(){return this[z].redirect}get signal(){return this[z].signal}clone(){return new N(this)}}function D(e){Error.call(this,e),this.type="aborted",this.message=e,Error.captureStackTrace(this,this.constructor)}m.mixIn(N.prototype),Object.defineProperty(N.prototype,Symbol.toStringTag,{value:"Request",writable:!1,enumerable:!1,configurable:!0}),Object.defineProperties(N.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0}}),D.prototype=Object.create(Error.prototype),D.prototype.constructor=D,D.prototype.name="AbortError";const G=o.PassThrough,V=s.resolve;function J(e,t){if(!J.Promise)throw new Error("native promise missing, set fetch.Promise to your favorite alternative");return m.Promise=J.Promise,new J.Promise((function(r,s){const u=new N(e,t),l=function(e){const t=e[z].parsedURL,r=new _(e[z].headers);if(r.has("Accept")||r.set("Accept","*/*"),!t.protocol||!t.hostname)throw new TypeError("Only absolute URLs are supported");if(!/^https?:$/.test(t.protocol))throw new TypeError("Only HTTP(S) protocols are supported");if(e.signal&&e.body instanceof o.Readable&&!M)throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8");let n=null;if(null==e.body&&/^(POST|PUT)$/i.test(e.method)&&(n="0"),null!=e.body){const t=j(e);"number"==typeof t&&(n=String(t))}n&&r.set("Content-Length",n),r.has("User-Agent")||r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"),e.compress&&!r.has("Accept-Encoding")&&r.set("Accept-Encoding","gzip,deflate");let s=e.agent;return"function"==typeof s&&(s=s(t)),r.has("Connection")||s||r.set("Connection","close"),Object.assign({},t,{method:e.method,headers:L(r),agent:s})}(u),c=("https:"===l.protocol?i:n).request,f=u.signal;let p=null;const h=function(){let e=new D("The user aborted a request.");s(e),u.body&&u.body instanceof o.Readable&&u.body.destroy(e),p&&p.body&&p.body.emit("error",e)};if(f&&f.aborted)return void h();const b=function(){h(),g()},m=c(l);let y;function g(){m.abort(),f&&f.removeEventListener("abort",b),clearTimeout(y)}f&&f.addEventListener("abort",b),u.timeout&&m.once("socket",(function(e){y=setTimeout((function(){s(new d(`network timeout at: ${u.url}`,"request-timeout")),g()}),u.timeout)})),m.on("error",(function(e){s(new d(`request to ${u.url} failed, reason: ${e.message}`,"system",e)),g()})),m.on("response",(function(e){clearTimeout(y);const t=function(e){const t=new _;for(const r of Object.keys(e))if(!T.test(r))if(Array.isArray(e[r]))for(const o of e[r])O.test(o)||(void 0===t[$][r]?t[$][r]=[o]:t[$][r].push(o));else O.test(e[r])||(t[$][r]=[e[r]]);return t}(e.headers);if(J.isRedirect(e.statusCode)){const o=t.get("Location"),n=null===o?null:V(u.url,o);switch(u.redirect){case"error":return s(new d(`uri requested responds with a redirect, redirect mode is set to error: ${u.url}`,"no-redirect")),void g();case"manual":if(null!==n)try{t.set("Location",n)}catch(e){s(e)}break;case"follow":if(null===n)break;if(u.counter>=u.follow)return s(new d(`maximum redirect reached at: ${u.url}`,"max-redirect")),void g();const o={headers:new _(u.headers),follow:u.follow,counter:u.counter+1,agent:u.agent,compress:u.compress,method:u.method,body:u.body,signal:u.signal,timeout:u.timeout,size:u.size};return 303!==e.statusCode&&u.body&&null===j(u)?(s(new d("Cannot follow redirect with body being a readable stream","unsupported-redirect")),void g()):(303!==e.statusCode&&(301!==e.statusCode&&302!==e.statusCode||"POST"!==u.method)||(o.method="GET",o.body=void 0,o.headers.delete("content-length")),r(J(new N(n,o))),void g())}}e.once("end",(function(){f&&f.removeEventListener("abort",b)}));let o=e.pipe(new G);const n={url:u.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:u.size,timeout:u.timeout,counter:u.counter},i=t.get("Content-Encoding");if(!u.compress||"HEAD"===u.method||null===i||204===e.statusCode||304===e.statusCode)return p=new q(o,n),void r(p);const l={flush:a.Z_SYNC_FLUSH,finishFlush:a.Z_SYNC_FLUSH};if("gzip"==i||"x-gzip"==i)return o=o.pipe(a.createGunzip(l)),p=new q(o,n),void r(p);if("deflate"!=i&&"x-deflate"!=i){if("br"==i&&"function"==typeof a.createBrotliDecompress)return o=o.pipe(a.createBrotliDecompress()),p=new q(o,n),void r(p);p=new q(o,n),r(p)}else e.pipe(new G).once("data",(function(e){o=8==(15&e[0])?o.pipe(a.createInflate()):o.pipe(a.createInflateRaw()),p=new q(o,n),r(p)}))})),function(e,t){const r=t.body;null===r?e.end():w(r)?r.stream().pipe(e):Buffer.isBuffer(r)?(e.write(r),e.end()):r.pipe(e)}(m,u)}))}J.isRedirect=function(e){return 301===e||302===e||303===e||307===e||308===e},J.Promise=global.Promise;const K=J}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var s=t[o]={id:o,loaded:!1,exports:{}};return e[o](s,s.exports,r),s.loaded=!0,s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o=r(558);jokeapi_wrapper=o})();