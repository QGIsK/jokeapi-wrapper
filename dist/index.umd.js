!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("isomorphic-unfetch")):"function"==typeof define&&define.amd?define(["isomorphic-unfetch"],t):(e||self).jokeapiWrapper=t(e.isomorphicUnfetch)}(this,function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var r=t(e);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e}).apply(this,arguments)}var n="https://v2.jokeapi.dev",o=function(e){return Array.isArray(e)?e.join(","):e},a=function(){function e(e){void 0===e&&(e={}),this._options=e}var t=e.prototype;return t.getJoke=function(e){void 0===e&&(e={}),e.categories||(e.categories="any");var t=this._buildUrl("joke",e);return this._request(t)},t.info=function(e){void 0===e&&(e={});var t=this._buildUrl("info",e);return this._request(t)},t.categories=function(e){void 0===e&&(e={});var t=this._buildUrl("categories",e);return this._request(t)},t.langcode=function(e){if(void 0===e&&(e={}),!e.language)return{error:!0,message:"You need to supply a language"};var t=this._buildUrl("langcode",e);return this._request(t)},t.languages=function(e){void 0===e&&(e={});var t=this._buildUrl("languages",e);return this._request(t)},t.flags=function(e){void 0===e&&(e={});var t=this._buildUrl("flags",e);return this._request(t)},t.formats=function(e){void 0===e&&(e={});var t=this._buildUrl("formats",e);return this._request(t)},t.ping=function(e){void 0===e&&(e={});var t=this._buildUrl("ping",e);return this._request(t)},t.endpoints=function(e){void 0===e&&(e={});var t=this._buildUrl("endpoints",e);return this._request(t)},t.submit=function(e){void 0===e&&(e={});var t=this._buildUrl("submit",void 0,e["dry-run"]);return delete e["dry-run"],this._request(t,{body:JSON.stringify(e),method:"POST"})},t._buildUrl=function(e,t,r){if(r)return n+"/"+e+"?dry-run";if(t){var i=function(e,t){var r,i={};if(e&&t)return Object.assign(i,e),"safe-mode"in t&&(i["safe-mode"]="safe-mode"),"safe-mode"in e&&(e["safe-mode"]?i["safe-mode"]="safe-mode":delete i["safe-mode"]),"format"in t&&(i.format=t.format),"format"in e&&("json"===e.format?delete i.format:i.format=e.format),("blacklistFlags"in e||"blacklistFlags"in t)&&(i.blacklistFlags=o(e.blacklistFlags?e.blacklistFlags:t.blacklistFlags)),("lang"in e||"lang"in t)&&(i.lang=e.lang?e.lang:t.lang),"type"in e&&(i.type=o(e.type)),"categories"in e&&(r="/"+o(e.categories),delete i.categories),"language"in e&&(r="/"+e.language,delete i.language),{parsedParams:i,wildcard:r}}(t,this._options),a=i.wildcard;return this._buildQuery(a?n+"/"+e+a:n+"/"+e,i.parsedParams)}return n+"/"+e},t._buildQuery=function(e,t){var r=Object.entries(t).map(function(e){return e[0]===e[1]?e[0]:e.map(encodeURIComponent).join("=")}).join("&");return r?e+"?"+r:e},t._request=function(e,t){try{return Promise.resolve(r.default(e,i({},t,{headers:{Authorization:this._options.apiKey,"Content-Type":"application/json"}}))).then(function(t){var r=new URL(e);return new URLSearchParams(r.search).get("format")?t.text():t.json()})}catch(e){return Promise.reject(e)}},e}();return a.BASE=n,a.HOST="https://jokeapi.dev",a.API_VERSION="2",a.CATEGORIES=["any","misc","programming","dark","pun","spooky","christmas","miscellaneous","coding","development","halloween"],a.BLACKLIST_FLAGS=["nsfw","religious","political","racist","sexist","explicit"],a.FORMAT=["json","xml","yaml","txt"],a.TYPE=["single","twopart"],a.AMOUNT_MAX=10,a});
//# sourceMappingURL=index.umd.js.map