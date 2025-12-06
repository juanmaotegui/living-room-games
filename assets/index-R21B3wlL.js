(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();var ki={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(t,e){if(!t)throw Ve(e)},Ve=function(t){return new Error("Firebase Database ("+Ds.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Co=function(t){const e=[];let n=0,i=0;for(;n<t.length;){const s=t[n++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[n++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[n++],o=t[n++],a=t[n++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=t[n++],o=t[n++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},qn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,l=s+2<t.length,c=l?t[s+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(d=64)),i.push(n[u],n[h],n[d],n[p])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ks(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Co(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<t.length;){const r=n[t.charAt(s++)],a=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||h==null)throw new Eo;const d=r<<2|a>>4;if(i.push(d),c!==64){const p=a<<4&240|c>>2;if(i.push(p),h!==64){const _=c<<6&192|h;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Eo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ps=function(t){const e=ks(t);return qn.encodeByteArray(e,!0)},kt=function(t){return Ps(t).replace(/\./g,"")},wn=function(t){try{return qn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wo(t){return xs(void 0,t)}function xs(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!bo(n)||(t[n]=xs(t[n],e[n]));return t}function bo(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Io(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const So=()=>Io().__FIREBASE_DEFAULTS__,To=()=>{if(typeof process>"u"||typeof ki>"u")return;const t=ki.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},No=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&wn(t[1]);return e&&JSON.parse(e)},Os=()=>{try{return So()||To()||No()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Ro=t=>{var e,n;return(n=(e=Os())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Ao=t=>{const e=Ro(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},Ms=()=>{var t;return(t=Os())===null||t===void 0?void 0:t.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},i=e||"demo-project",s=t.iat||0,r=t.sub||t.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},t);return[kt(JSON.stringify(n)),kt(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ls(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ko())}function Po(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function xo(){return Ds.NODE_ADMIN===!0}function Oo(){try{return typeof indexedDB=="object"}catch{return!1}}function Mo(){return new Promise((t,e)=>{try{let n=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lo="FirebaseError";class vt extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Lo,Object.setPrototypeOf(this,vt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Fs.prototype.create)}}class Fs{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){const i=n[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?Fo(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new vt(s,a,i)}}function Fo(t,e){return t.replace(Bo,(n,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Bo=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(t){return JSON.parse(t)}function M(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bs=function(t){let e={},n={},i={},s="";try{const r=t.split(".");e=at(wn(r[0])||""),n=at(wn(r[1])||""),s=r[2],i=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:i,signature:s}},Wo=function(t){const e=Bs(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},Uo=function(t){const e=Bs(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Fe(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function Pi(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Pt(t,e,n){const i={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(i[s]=e.call(n,t[s],s,t));return i}function bn(t,e){if(t===e)return!0;const n=Object.keys(t),i=Object.keys(e);for(const s of n){if(!i.includes(s))return!1;const r=t[s],o=e[s];if(xi(r)&&xi(o)){if(!bn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!n.includes(s))return!1;return!0}function xi(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(t){const e=[];for(const[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Go{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const i=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)i[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)i[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const d=i[h-3]^i[h-8]^i[h-14]^i[h-16];i[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(s<<5|s>>>27)+c+l+u+i[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const i=n-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<n;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Yt(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $o=function(t){const e=[];let n=0;for(let i=0;i<t.length;i++){let s=t.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Kt=function(t){let e=0;for(let n=0;n<t.length;n++){const i=t.charCodeAt(n);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function je(t){return t&&t._delegate?t._delegate:t}class lt{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const i=new yt;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(zo(e))try{this.getOrInitializeService({instanceIdentifier:ye})}catch{}for(const[n,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ye){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ye){return this.instances.has(e)}getOptions(e=ye){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:n});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,n){var i;const s=this.normalizeInstanceIdentifier(n),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,n){const i=this.onInitCallbacks.get(n);if(i)for(const s of i)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:jo(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ye){return this.component?this.component.multipleInstances?e:ye:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jo(t){return t===ye?void 0:t}function zo(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new Vo(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var T;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(T||(T={}));const Yo={debug:T.DEBUG,verbose:T.VERBOSE,info:T.INFO,warn:T.WARN,error:T.ERROR,silent:T.SILENT},Ko=T.INFO,Qo={[T.DEBUG]:"log",[T.VERBOSE]:"log",[T.INFO]:"info",[T.WARN]:"warn",[T.ERROR]:"error"},Xo=(t,e,...n)=>{if(e<t.logLevel)return;const i=new Date().toISOString(),s=Qo[e];if(s)console[s](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ws{constructor(e){this.name=e,this._logLevel=Ko,this._logHandler=Xo,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in T))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Yo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,T.DEBUG,...e),this._logHandler(this,T.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,T.VERBOSE,...e),this._logHandler(this,T.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,T.INFO,...e),this._logHandler(this,T.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,T.WARN,...e),this._logHandler(this,T.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,T.ERROR,...e),this._logHandler(this,T.ERROR,...e)}}const Jo=(t,e)=>e.some(n=>t instanceof n);let Oi,Mi;function Zo(){return Oi||(Oi=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ea(){return Mi||(Mi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Us=new WeakMap,In=new WeakMap,Hs=new WeakMap,un=new WeakMap,Yn=new WeakMap;function ta(t){const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("success",r),t.removeEventListener("error",o)},r=()=>{n(he(t.result)),s()},o=()=>{i(t.error),s()};t.addEventListener("success",r),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Us.set(n,t)}).catch(()=>{}),Yn.set(e,t),e}function na(t){if(In.has(t))return;const e=new Promise((n,i)=>{const s=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",o),t.removeEventListener("abort",o)},r=()=>{n(),s()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",r),t.addEventListener("error",o),t.addEventListener("abort",o)});In.set(t,e)}let Sn={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return In.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Hs.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return he(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ia(t){Sn=t(Sn)}function sa(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const i=t.call(dn(this),e,...n);return Hs.set(i,e.sort?e.sort():[e]),he(i)}:ea().includes(t)?function(...e){return t.apply(dn(this),e),he(Us.get(this))}:function(...e){return he(t.apply(dn(this),e))}}function ra(t){return typeof t=="function"?sa(t):(t instanceof IDBTransaction&&na(t),Jo(t,Zo())?new Proxy(t,Sn):t)}function he(t){if(t instanceof IDBRequest)return ta(t);if(un.has(t))return un.get(t);const e=ra(t);return e!==t&&(un.set(t,e),Yn.set(e,t)),e}const dn=t=>Yn.get(t);function oa(t,e,{blocked:n,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(t,e),a=he(o);return i&&o.addEventListener("upgradeneeded",l=>{i(he(o.result),l.oldVersion,l.newVersion,he(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const aa=["get","getKey","getAll","getAllKeys","count"],la=["put","add","delete","clear"],fn=new Map;function Li(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(fn.get(e))return fn.get(e);const n=e.replace(/FromIndex$/,""),i=e!==n,s=la.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(s||aa.includes(n)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),s&&l.done]))[0]};return fn.set(e,r),r}ia(t=>({...t,get:(e,n,i)=>Li(e,n)||t.get(e,n,i),has:(e,n)=>!!Li(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(ha(n)){const i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}}function ha(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Tn="@firebase/app",Fi="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oe=new Ws("@firebase/app"),ua="@firebase/app-compat",da="@firebase/analytics-compat",fa="@firebase/analytics",pa="@firebase/app-check-compat",_a="@firebase/app-check",ma="@firebase/auth",ga="@firebase/auth-compat",ya="@firebase/database",va="@firebase/data-connect",Ca="@firebase/database-compat",Ea="@firebase/functions",wa="@firebase/functions-compat",ba="@firebase/installations",Ia="@firebase/installations-compat",Sa="@firebase/messaging",Ta="@firebase/messaging-compat",Na="@firebase/performance",Ra="@firebase/performance-compat",Aa="@firebase/remote-config",Da="@firebase/remote-config-compat",ka="@firebase/storage",Pa="@firebase/storage-compat",xa="@firebase/firestore",Oa="@firebase/vertexai-preview",Ma="@firebase/firestore-compat",La="firebase",Fa="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nn="[DEFAULT]",Ba={[Tn]:"fire-core",[ua]:"fire-core-compat",[fa]:"fire-analytics",[da]:"fire-analytics-compat",[_a]:"fire-app-check",[pa]:"fire-app-check-compat",[ma]:"fire-auth",[ga]:"fire-auth-compat",[ya]:"fire-rtdb",[va]:"fire-data-connect",[Ca]:"fire-rtdb-compat",[Ea]:"fire-fn",[wa]:"fire-fn-compat",[ba]:"fire-iid",[Ia]:"fire-iid-compat",[Sa]:"fire-fcm",[Ta]:"fire-fcm-compat",[Na]:"fire-perf",[Ra]:"fire-perf-compat",[Aa]:"fire-rc",[Da]:"fire-rc-compat",[ka]:"fire-gcs",[Pa]:"fire-gcs-compat",[xa]:"fire-fst",[Ma]:"fire-fst-compat",[Oa]:"fire-vertex","fire-js":"fire-js",[La]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new Map,Wa=new Map,Rn=new Map;function Bi(t,e){try{t.container.addComponent(e)}catch(n){oe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ot(t){const e=t.name;if(Rn.has(e))return oe.debug(`There were multiple attempts to register component ${e}.`),!1;Rn.set(e,t);for(const n of xt.values())Bi(n,t);for(const n of Wa.values())Bi(n,t);return!0}function Ua(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ha={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ue=new Fs("app","Firebase",Ha);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ue.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a=Fa;function Gs(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Nn,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw ue.create("bad-app-name",{appName:String(s)});if(n||(n=Ms()),!n)throw ue.create("no-options");const r=xt.get(s);if(r){if(bn(n,r.options)&&bn(i,r.config))return r;throw ue.create("duplicate-app",{appName:s})}const o=new qo(s);for(const l of Rn.values())o.addComponent(l);const a=new Ga(n,i,o);return xt.set(s,a),a}function Va(t=Nn){const e=xt.get(t);if(!e&&t===Nn&&Ms())return Gs();if(!e)throw ue.create("no-app",{appName:t});return e}function xe(t,e,n){var i;let s=(i=Ba[t])!==null&&i!==void 0?i:t;n&&(s+=`-${n}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),oe.warn(a.join(" "));return}Ot(new lt(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="firebase-heartbeat-database",za=1,ct="firebase-heartbeat-store";let pn=null;function $s(){return pn||(pn=oa(ja,za,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ct)}catch(n){console.warn(n)}}}}).catch(t=>{throw ue.create("idb-open",{originalErrorMessage:t.message})})),pn}async function qa(t){try{const n=(await $s()).transaction(ct),i=await n.objectStore(ct).get(Vs(t));return await n.done,i}catch(e){if(e instanceof vt)oe.warn(e.message);else{const n=ue.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});oe.warn(n.message)}}}async function Wi(t,e){try{const i=(await $s()).transaction(ct,"readwrite");await i.objectStore(ct).put(e,Vs(t)),await i.done}catch(n){if(n instanceof vt)oe.warn(n.message);else{const i=ue.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});oe.warn(i.message)}}}function Vs(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya=1024,Ka=30*24*60*60*1e3;class Qa{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Ja(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Ui();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Ka}),this._storage.overwrite(this._heartbeatsCache))}catch(i){oe.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ui(),{heartbeatsToSend:i,unsentEntries:s}=Xa(this._heartbeatsCache.heartbeats),r=kt(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(n){return oe.warn(n),""}}}function Ui(){return new Date().toISOString().substring(0,10)}function Xa(t,e=Ya){const n=[];let i=t.slice();for(const s of t){const r=n.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),Hi(n)>e){r.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Hi(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}class Ja{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Oo()?Mo().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await qa(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Wi(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Hi(t){return kt(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(t){Ot(new lt("platform-logger",e=>new ca(e),"PRIVATE")),Ot(new lt("heartbeat",e=>new Qa(e),"PRIVATE")),xe(Tn,Fi,t),xe(Tn,Fi,"esm2017"),xe("fire-js","")}Za("");var el="firebase",tl="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */xe(el,tl,"app");var Gi={};const $i="@firebase/database",Vi="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let js="";function nl(t){js=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),M(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:at(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return ee(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zs=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new il(e)}}catch{}return new sl},Ee=zs("localStorage"),rl=zs("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=new Ws("@firebase/database"),ol=function(){let t=1;return function(){return t++}}(),qs=function(t){const e=$o(t),n=new Go;n.update(e);const i=n.digest();return qn.encodeByteArray(i)},Ct=function(...t){let e="";for(let n=0;n<t.length;n++){const i=t[n];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Ct.apply(null,i):typeof i=="object"?e+=M(i):e+=i,e+=" "}return e};let tt=null,ji=!0;const al=function(t,e){f(!0,"Can't turn on custom loggers persistently."),Oe.logLevel=T.VERBOSE,tt=Oe.log.bind(Oe)},B=function(...t){if(ji===!0&&(ji=!1,tt===null&&rl.get("logging_enabled")===!0&&al()),tt){const e=Ct.apply(null,t);tt(e)}},Et=function(t){return function(...e){B(t,...e)}},An=function(...t){const e="FIREBASE INTERNAL ERROR: "+Ct(...t);Oe.error(e)},ae=function(...t){const e=`FIREBASE FATAL ERROR: ${Ct(...t)}`;throw Oe.error(e),new Error(e)},G=function(...t){const e="FIREBASE WARNING: "+Ct(...t);Oe.warn(e)},ll=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&G("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Kn=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},cl=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Be="[MIN_NAME]",Ie="[MAX_NAME]",Ne=function(t,e){if(t===e)return 0;if(t===Be||e===Ie)return-1;if(e===Be||t===Ie)return 1;{const n=zi(t),i=zi(e);return n!==null?i!==null?n-i===0?t.length-e.length:n-i:-1:i!==null?1:t<e?-1:1}},hl=function(t,e){return t===e?0:t<e?-1:1},Ke=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+M(e))},Qn=function(t){if(typeof t!="object"||t===null)return M(t);const e=[];for(const i in t)e.push(i);e.sort();let n="{";for(let i=0;i<e.length;i++)i!==0&&(n+=","),n+=M(e[i]),n+=":",n+=Qn(t[e[i]]);return n+="}",n},Ys=function(t,e){const n=t.length;if(n<=e)return[t];const i=[];for(let s=0;s<n;s+=e)s+e>n?i.push(t.substring(s,n)):i.push(t.substring(s,s+e));return i};function W(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const Ks=function(t){f(!Kn(t),"Invalid JSON number");const e=11,n=52,i=(1<<e-1)-1;let s,r,o,a,l;t===0?(r=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(t)/Math.LN2),i),r=a+i,o=Math.round(t*Math.pow(2,n-a)-Math.pow(2,n))):(r=0,o=Math.round(t/Math.pow(2,1-i-n))));const c=[];for(l=n;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},ul=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},dl=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function fl(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const i=new Error(t+" at "+e._path.toString()+": "+n);return i.code=t.toUpperCase(),i}const pl=new RegExp("^-?(0*)\\d{1,10}$"),_l=-2147483648,ml=2147483647,zi=function(t){if(pl.test(t)){const e=Number(t);if(e>=_l&&e<=ml)return e}return null},ze=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw G("Exception was thrown by user callback.",n),e},Math.floor(0))}},gl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},nt=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){G(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,n,i){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(B("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,i):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',G(e)}}class Dt{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Dt.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="5",Qs="v",Xs="s",Js="r",Zs="f",er=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,tr="ls",nr="p",Dn="ac",ir="websocket",sr="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,n,i,s,r=!1,o="",a=!1,l=!1){this.secure=n,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ee.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ee.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function Cl(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function or(t,e,n){f(typeof e=="string","typeof type must == string"),f(typeof n=="object","typeof params must == object");let i;if(e===ir)i=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===sr)i=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Cl(t)&&(n.ns=t.namespace);const s=[];return W(n,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class El{constructor(){this.counters_={}}incrementCounter(e,n=1){ee(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return wo(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n={},mn={};function Jn(t){const e=t.toString();return _n[e]||(_n[e]=new El),_n[e]}function wl(t,e){const n=t.toString();return mn[n]||(mn[n]=e()),mn[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bl{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ze(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qi="start",Il="close",Sl="pLPCommand",Tl="pRTLPCB",ar="id",lr="pw",cr="ser",Nl="cb",Rl="seg",Al="ts",Dl="d",kl="dframe",hr=1870,ur=30,Pl=hr-ur,xl=25e3,Ol=3e4;class Pe{constructor(e,n,i,s,r,o,a){this.connId=e,this.repoInfo=n,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Et(e),this.stats_=Jn(n),this.urlFn=l=>(this.appCheckToken&&(l[Dn]=this.appCheckToken),or(n,sr,l))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new bl(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(Ol)),cl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Zn((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===qi)this.id=a,this.password=l;else if(o===Il)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[qi]="t",i[cr]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Nl]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Qs]=Xn,this.transportSessionId&&(i[Xs]=this.transportSessionId),this.lastSessionId&&(i[tr]=this.lastSessionId),this.applicationId&&(i[nr]=this.applicationId),this.appCheckToken&&(i[Dn]=this.appCheckToken),typeof location<"u"&&location.hostname&&er.test(location.hostname)&&(i[Js]=Zs);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Pe.forceAllow_=!0}static forceDisallow(){Pe.forceDisallow_=!0}static isAvailable(){return Pe.forceAllow_?!0:!Pe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!ul()&&!dl()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=M(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Ps(n),s=Ys(i,Pl);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const i={};i[kl]="t",i[ar]=e,i[lr]=n,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=M(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class Zn{constructor(e,n,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ol(),window[Sl+this.uniqueCallbackIdentifier]=e,window[Tl+this.uniqueCallbackIdentifier]=n,this.myIFrame=Zn.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){B("frame writing exception"),a.stack&&B(a.stack),B(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||B("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[ar]=this.myID,e[lr]=this.myPW,e[cr]=this.currentSerial;let n=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+ur+i.length<=hr;){const o=this.pendingSegs.shift();i=i+"&"+Rl+s+"="+o.seg+"&"+Al+s+"="+o.ts+"&"+Dl+s+"="+o.d,s++}return n=n+i,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,i){this.pendingSegs.push({seg:e,ts:n,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const i=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(i,Math.floor(xl)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),n())},i.onerror=()=>{B("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml=16384,Ll=45e3;let Mt=null;typeof MozWebSocket<"u"?Mt=MozWebSocket:typeof WebSocket<"u"&&(Mt=WebSocket);class Y{constructor(e,n,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Et(this.connId),this.stats_=Jn(n),this.connURL=Y.connectionURL_(n,o,a,s,i),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,i,s,r){const o={};return o[Qs]=Xn,typeof location<"u"&&location.hostname&&er.test(location.hostname)&&(o[Js]=Zs),n&&(o[Xs]=n),i&&(o[tr]=i),s&&(o[Dn]=s),r&&(o[nr]=r),or(e,ir,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ee.set("previous_websocket_failure",!0);try{let i;xo(),this.mySock=new Mt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Y.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(n);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Mt!==null&&!Y.forceDisallow_}static previouslyFailed(){return Ee.isInMemoryStorage||Ee.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ee.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const i=at(n);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const i=this.extractFrameCount_(n);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const n=M(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const i=Ys(n,Ml);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(Ll))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Y.responsesRequiredToBeHealthy=2;Y.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Pe,Y]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=Y&&Y.isAvailable();let i=n&&!Y.previouslyFailed();if(e.webSocketOnly&&(n||G("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Y];else{const s=this.transports_=[];for(const r of ht.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);ht.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ht.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl=6e4,Bl=5e3,Wl=10*1024,Ul=100*1024,gn="t",Yi="d",Hl="s",Ki="r",Gl="e",Qi="o",Xi="a",Ji="n",Zi="p",$l="h";class Vl{constructor(e,n,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=n,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Et("c:"+this.id+":"),this.transportManager_=new ht(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=nt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>Ul?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>Wl?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(gn in e){const n=e[gn];n===Xi?this.upgradeIfSecondaryHealthy_():n===Ki?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Qi&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=Ke("t",e),i=Ke("d",e);if(n==="c")this.onSecondaryControl_(i);else if(n==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Zi,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Xi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ji,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=Ke("t",e),i=Ke("d",e);n==="c"?this.onControl_(i):n==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=Ke(gn,e);if(Yi in e){const i=e[Yi];if(n===$l){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Ji){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===Hl?this.onConnectionShutdown_(i):n===Ki?this.onReset_(i):n===Gl?An("Server Error: "+i):n===Qi?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):An("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Xn!==i&&G("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,i),nt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(Fl))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):nt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(Bl))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Zi,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ee.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{put(e,n,i,s){}merge(e,n,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,i){}onDisconnectMerge(e,n,i){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,n)}}on(e,n,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:i});const s=this.getInitialEvent(e);s&&n.apply(i,s)}off(e,n,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===n&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends fr{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ls()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Lt}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=32,ts=768;class I{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function w(){return new I("")}function g(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function _e(t){return t.pieces_.length-t.pieceNum_}function N(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new I(t.pieces_,e)}function ei(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function jl(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function ut(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function pr(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new I(e,0)}function D(t,e){const n=[];for(let i=t.pieceNum_;i<t.pieces_.length;i++)n.push(t.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)n.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&n.push(i[s])}return new I(n,0)}function C(t){return t.pieceNum_>=t.pieces_.length}function H(t,e){const n=g(t),i=g(e);if(n===null)return e;if(n===i)return H(N(t),N(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function zl(t,e){const n=ut(t,0),i=ut(e,0);for(let s=0;s<n.length&&s<i.length;s++){const r=Ne(n[s],i[s]);if(r!==0)return r}return n.length===i.length?0:n.length<i.length?-1:1}function ti(t,e){if(_e(t)!==_e(e))return!1;for(let n=t.pieceNum_,i=e.pieceNum_;n<=t.pieces_.length;n++,i++)if(t.pieces_[n]!==e.pieces_[i])return!1;return!0}function j(t,e){let n=t.pieceNum_,i=e.pieceNum_;if(_e(t)>_e(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[i])return!1;++n,++i}return!0}class ql{constructor(e,n){this.errorPrefix_=n,this.parts_=ut(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Kt(this.parts_[i]);_r(this)}}function Yl(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=Kt(e),_r(t)}function Kl(t){const e=t.parts_.pop();t.byteLength_-=Kt(e),t.parts_.length>0&&(t.byteLength_-=1)}function _r(t){if(t.byteLength_>ts)throw new Error(t.errorPrefix_+"has a key path longer than "+ts+" bytes ("+t.byteLength_+").");if(t.parts_.length>es)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+es+") or object contains a cycle "+ve(t))}function ve(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ni extends fr{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new ni}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=1e3,Ql=60*5*1e3,ns=30*1e3,Xl=1.3,Jl=3e4,Zl="server_kill",is=3;class ie extends dr{constructor(e,n,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=ie.nextPersistentConnectionId_++,this.log_=Et("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Qe,this.maxReconnectDelay_=Ql,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");ni.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Lt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,i){const s=++this.requestNumber_,r={r:s,a:e,b:n};this.log_(M(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const n=new yt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?n.resolve(a):n.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),n.promise}listen(e,n,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:n,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(i)})}sendListen_(e){const n=e.query,i=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=n._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;ie.warnOnListenWarnings_(l,n),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&ee(e,"w")){const i=Fe(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',r=n._path.toString();G(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Uo(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=ns)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=Wo(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(n,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,i=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,i)})}unlisten(e,n){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,n)}sendUnlisten_(e,n,i,s){this.log_("Unlisten on "+e+" for "+n);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:i})}onDisconnectMerge(e,n,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:i})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,i,s){const r={p:n,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,i,s){this.putInternal("p",e,n,i,s)}merge(e,n,i,s){this.putInternal("m",e,n,i,s)}putInternal(e,n,i,s,r){this.initConnection_();const o={p:n,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,i,r=>{this.log_(n+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+M(e));const n=e.r,i=this.requestCBHash_[n];i&&(delete this.requestCBHash_[n],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):An("Unrecognized action received from server: "+M(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Jl&&(this.reconnectDelay_=Qe),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*Xl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ie.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(h){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?B("getToken() completed but was canceled"):(B("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new Vl(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,i,p=>{G(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Zl)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&G(h),l())}}}interrupt(e){B("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){B("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Pi(this.interruptReasons_)&&(this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let i;n?i=n.map(r=>Qn(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(n),r.delete(n),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,n){B("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=is&&(this.reconnectDelay_=ns,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){B("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=is&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+js.replace(/\./g,"-")]=1,Ls()?e["framework.cordova"]=1:Po()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Lt.getInstance().currentlyOnline();return Pi(this.interruptReasons_)&&e}}ie.nextPersistentConnectionId_=0;ie.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new y(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const i=new y(Be,e),s=new y(Be,n);return this.compare(i,s)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nt;class mr extends Qt{static get __EMPTY_NODE(){return Nt}static set __EMPTY_NODE(e){Nt=e}compare(e,n){return Ne(e.name,n.name)}isDefinedOn(e){throw Ve("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return y.MIN}maxPost(){return new y(Ie,Nt)}makePost(e,n){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Nt)}toString(){return".key"}}const Me=new mr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e,n,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?i(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class F{constructor(e,n,i,s,r){this.key=e,this.value=n,this.color=i??F.RED,this.left=s??V.EMPTY_NODE,this.right=r??V.EMPTY_NODE}copy(e,n,i,s,r){return new F(e??this.key,n??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,n,i),null):r===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return V.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let i,s;if(i=this,n(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),n(e,i.key)===0){if(i.right.isEmpty())return V.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,F.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,F.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}F.RED=!0;F.BLACK=!1;class ec{copy(e,n,i,s,r){return this}insert(e,n,i){return new F(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class V{constructor(e,n=V.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new V(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,F.BLACK,null,null))}remove(e){return new V(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,F.BLACK,null,null))}get(e){let n,i=this.root_;for(;!i.isEmpty();){if(n=this.comparator_(e,i.key),n===0)return i.value;n<0?i=i.left:n>0&&(i=i.right)}return null}getPredecessorKey(e){let n,i=this.root_,s=null;for(;!i.isEmpty();)if(n=this.comparator_(e,i.key),n===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else n<0?i=i.left:n>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Rt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Rt(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Rt(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Rt(this.root_,null,this.comparator_,!0,e)}}V.EMPTY_NODE=new ec;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tc(t,e){return Ne(t.name,e.name)}function ii(t,e){return Ne(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let kn;function nc(t){kn=t}const gr=function(t){return typeof t=="number"?"number:"+Ks(t):"string:"+t},yr=function(t){if(t.isLeafNode()){const e=t.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&ee(e,".sv"),"Priority must be a string or number.")}else f(t===kn||t.isEmpty(),"priority of unexpected type.");f(t===kn||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ss;class L{constructor(e,n=L.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),yr(this.priorityNode_)}static set __childrenNodeConstructor(e){ss=e}static get __childrenNodeConstructor(){return ss}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new L(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:g(e)===".priority"?this.priorityNode_:L.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:L.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const i=g(e);return i===null?n:n.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||_e(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,L.__childrenNodeConstructor.EMPTY_NODE.updateChild(N(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+gr(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=Ks(this.value_):e+=this.value_,this.lazyHash_=qs(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===L.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof L.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,i=typeof this.value_,s=L.VALUE_TYPE_ORDER.indexOf(n),r=L.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+n),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}L.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vr,Cr;function ic(t){vr=t}function sc(t){Cr=t}class rc extends Qt{compare(e,n){const i=e.node.getPriority(),s=n.node.getPriority(),r=i.compareTo(s);return r===0?Ne(e.name,n.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Ie,new L("[PRIORITY-POST]",Cr))}makePost(e,n){const i=vr(e);return new y(n,new L("[PRIORITY-POST]",i))}toString(){return".priority"}}const k=new rc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc=Math.log(2);class ac{constructor(e){const n=r=>parseInt(Math.log(r)/oc,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Ft=function(t,e,n,i){t.sort(e);const s=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=t[l],d=n?n(h):h,new F(d,h.node,F.BLACK,null,null);{const p=parseInt(u/2,10)+l,_=s(l,p),b=s(p+1,c);return h=t[p],d=n?n(h):h,new F(d,h.node,F.BLACK,_,b)}},r=function(l){let c=null,u=null,h=t.length;const d=function(_,b){const x=h-_,Ae=h;h-=_;const Tt=s(x+1,Ae),hn=t[x],vo=n?n(hn):hn;p(new F(vo,hn.node,b,null,Tt))},p=function(_){c?(c.left=_,c=_):(u=_,c=_)};for(let _=0;_<l.count;++_){const b=l.nextBitIsOne(),x=Math.pow(2,l.count-(_+1));b?d(x,F.BLACK):(d(x,F.BLACK),d(x,F.RED))}return u},o=new ac(t.length),a=r(o);return new V(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yn;const De={};class ne{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return f(De&&k,"ChildrenNode.ts has not been loaded"),yn=yn||new ne({".priority":De},{".priority":k}),yn}get(e){const n=Fe(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof V?n:null}hasIndex(e){return ee(this.indexSet_,e.toString())}addIndex(e,n){f(e!==Me,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=n.getIterator(y.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=Ft(i,e.getCompare()):a=De;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new ne(u,c)}addToIndexes(e,n){const i=Pt(this.indexes_,(s,r)=>{const o=Fe(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===De)if(o.isDefinedOn(e.node)){const a=[],l=n.getIterator(y.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Ft(a,o.getCompare())}else return De;else{const a=n.get(e.name);let l=s;return a&&(l=l.remove(new y(e.name,a))),l.insert(e,e.node)}});return new ne(i,this.indexSet_)}removeFromIndexes(e,n){const i=Pt(this.indexes_,s=>{if(s===De)return s;{const r=n.get(e.name);return r?s.remove(new y(e.name,r)):s}});return new ne(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xe;class m{constructor(e,n,i){this.children_=e,this.priorityNode_=n,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&yr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Xe||(Xe=new m(new V(ii),null,ne.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Xe}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?Xe:n}}getChild(e){const n=g(e);return n===null?this:this.getImmediateChild(n).getChild(N(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(f(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const i=new y(e,n);let s,r;n.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,n),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Xe:this.priorityNode_;return new m(s,o,r)}}updateChild(e,n){const i=g(e);if(i===null)return n;{f(g(e)!==".priority"||_e(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(N(e),n);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let i=0,s=0,r=!0;if(this.forEachChild(k,(o,a)=>{n[o]=a.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in n)o[a]=n[a];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+gr(this.getPriority().val())+":"),this.forEachChild(k,(n,i)=>{const s=i.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":qs(e)}return this.lazyHash_}getPredecessorChildName(e,n,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new y(e,n));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new y(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const i=n.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new y(n,this.children_.get(n)):null}forEachChild(e,n){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const i=this.resolveIndex_(n);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&n.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===wt?-1:0}withIndex(e){if(e===Me||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Me||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const i=this.getIterator(k),s=n.getIterator(k);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Me?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class lc extends m{constructor(){super(new V(ii),m.EMPTY_NODE,ne.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const wt=new lc;Object.defineProperties(y,{MIN:{value:new y(Be,m.EMPTY_NODE)},MAX:{value:new y(Ie,wt)}});mr.__EMPTY_NODE=m.EMPTY_NODE;L.__childrenNodeConstructor=m;nc(wt);sc(wt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cc=!0;function O(t,e=null){if(t===null)return m.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new L(n,O(e))}if(!(t instanceof Array)&&cc){const n=[];let i=!1;if(W(t,(o,a)=>{if(o.substring(0,1)!=="."){const l=O(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),n.push(new y(o,l)))}}),n.length===0)return m.EMPTY_NODE;const r=Ft(n,tc,o=>o.name,ii);if(i){const o=Ft(n,k.getCompare());return new m(r,O(e),new ne({".priority":o},{".priority":k}))}else return new m(r,O(e),ne.Default)}else{let n=m.EMPTY_NODE;return W(t,(i,s)=>{if(ee(t,i)&&i.substring(0,1)!=="."){const r=O(s);(r.isLeafNode()||!r.isEmpty())&&(n=n.updateImmediateChild(i,r))}}),n.updatePriority(O(e))}}ic(O);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc extends Qt{constructor(e){super(),this.indexPath_=e,f(!C(e)&&g(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const i=this.extractChild(e.node),s=this.extractChild(n.node),r=i.compareTo(s);return r===0?Ne(e.name,n.name):r}makePost(e,n){const i=O(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(n,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,wt);return new y(Ie,e)}toString(){return ut(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uc extends Qt{compare(e,n){const i=e.node.compareTo(n.node);return i===0?Ne(e.name,n.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,n){const i=O(e);return new y(n,i)}toString(){return".value"}}const dc=new uc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Er(t){return{type:"value",snapshotNode:t}}function We(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function dt(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function ft(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function fc(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e){this.index_=e}updateChild(e,n,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(n);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(n)?o.trackChildChange(dt(n,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(We(n,i)):o.trackChildChange(ft(n,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(n,i).withIndex(this.index_)}updateFullNode(e,n,i){return i!=null&&(e.isLeafNode()||e.forEachChild(k,(s,r)=>{n.hasChild(s)||i.trackChildChange(dt(s,r))}),n.isLeafNode()||n.forEachChild(k,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(ft(s,r,o))}else i.trackChildChange(We(s,r))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.indexedFilter_=new si(e.getIndex()),this.index_=e.getIndex(),this.startPost_=pt.getStartPost_(e),this.endPost_=pt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&i}updateChild(e,n,i,s,r,o){return this.matches(new y(n,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,i,s,r,o)}updateFullNode(e,n,i){n.isLeafNode()&&(n=m.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return n.forEachChild(k,(o,a)=>{r.matches(new y(o,a))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=n=>{const i=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new pt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,i,s,r,o){return this.rangedFilter_.matches(new y(n,i))||(i=m.EMPTY_NODE),e.getImmediateChild(n).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,i,s,r,o):this.fullLimitUpdateChild_(e,n,i,r,o)}updateFullNode(e,n,i){let s;if(n.isLeafNode()||n.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,i,s,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,p)=>h(p,d)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new y(n,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(n)){const h=a.getImmediateChild(n);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===n||a.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const p=d==null?1:o(d,l);if(u&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(ft(n,i,h)),a.updateImmediateChild(n,i);{r!=null&&r.trackChildChange(dt(n,h));const b=a.updateImmediateChild(n,m.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(We(d.name,d.node)),b.updateImmediateChild(d.name,d.node)):b}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(dt(c.name,c.node)),r.trackChildChange(We(n,i))),a.updateImmediateChild(n,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=k}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Be}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ie}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===k}copy(){const e=new ri;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function _c(t){return t.loadsAllData()?new si(t.getIndex()):t.hasLimit()?new pc(t):new pt(t)}function rs(t){const e={};if(t.isDefault())return e;let n;if(t.index_===k?n="$priority":t.index_===dc?n="$value":t.index_===Me?n="$key":(f(t.index_ instanceof hc,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=M(n),t.startSet_){const i=t.startAfterSet_?"startAfter":"startAt";e[i]=M(t.indexStartValue_),t.startNameSet_&&(e[i]+=","+M(t.indexStartName_))}if(t.endSet_){const i=t.endBeforeSet_?"endBefore":"endAt";e[i]=M(t.indexEndValue_),t.endNameSet_&&(e[i]+=","+M(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function os(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==k&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bt extends dr{constructor(e,n,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=Et("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Bt.getListenId_(e,i),a={};this.listens_[o]=a;const l=rs(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,i),Fe(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,n){const i=Bt.getListenId_(e,n);delete this.listens_[i]}get(e){const n=rs(e._queryParams),i=e._path.toString(),s=new yt;return this.restRequest_(i+".json",n,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},i){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(n.auth=s.accessToken),r&&r.token&&(n.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ho(n);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=at(a.responseText)}catch{G("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&G("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wt(){return{value:null,children:new Map}}function wr(t,e,n){if(C(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const i=g(e);t.children.has(i)||t.children.set(i,Wt());const s=t.children.get(i);e=N(e),wr(s,e,n)}}function Pn(t,e,n){t.value!==null?n(e,t.value):gc(t,(i,s)=>{const r=new I(e.toString()+"/"+i);Pn(s,r,n)})}function gc(t,e){t.children.forEach((n,i)=>{e(i,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&W(this.last_,(i,s)=>{n[i]=n[i]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=10*1e3,vc=30*1e3,Cc=5*60*1e3;class Ec{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new yc(e);const i=as+(vc-as)*Math.random();nt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),n={};let i=!1;W(e,(s,r)=>{r>0&&ee(this.statsToReport_,s)&&(n[s]=r,i=!0)}),i&&this.server_.reportStats(n),nt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Cc))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(K||(K={}));function oi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ai(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function li(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e,n,i){this.path=e,this.affectedTree=n,this.revert=i,this.type=K.ACK_USER_WRITE,this.source=oi()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new I(e));return new Ut(w(),n,this.revert)}}else return f(g(this.path)===e,"operationForChild called for unrelated child."),new Ut(N(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,n){this.source=e,this.path=n,this.type=K.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new _t(this.source,w()):new _t(this.source,N(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,n,i){this.source=e,this.path=n,this.snap=i,this.type=K.OVERWRITE}operationForChild(e){return C(this.path)?new Se(this.source,w(),this.snap.getImmediateChild(e)):new Se(this.source,N(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,n,i){this.source=e,this.path=n,this.children=i,this.type=K.MERGE}operationForChild(e){if(C(this.path)){const n=this.children.subtree(new I(e));return n.isEmpty()?null:n.value?new Se(this.source,w(),n.value):new Ue(this.source,w(),n)}else return f(g(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Ue(this.source,N(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,n,i){this.node_=e,this.fullyInitialized_=n,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const n=g(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wc{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function bc(t,e,n,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(fc(o.childName,o.snapshotNode))}),Je(t,s,"child_removed",e,i,n),Je(t,s,"child_added",e,i,n),Je(t,s,"child_moved",r,i,n),Je(t,s,"child_changed",e,i,n),Je(t,s,"value",e,i,n),s}function Je(t,e,n,i,s,r){const o=i.filter(a=>a.type===n);o.sort((a,l)=>Sc(t,a,l)),o.forEach(a=>{const l=Ic(t,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,t.query_))})})}function Ic(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function Sc(t,e,n){if(e.childName==null||n.childName==null)throw Ve("Should only compare child_ events.");const i=new y(e.childName,e.snapshotNode),s=new y(n.childName,n.snapshotNode);return t.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xt(t,e){return{eventCache:t,serverCache:e}}function it(t,e,n,i){return Xt(new me(e,n,i),t.serverCache)}function br(t,e,n,i){return Xt(t.eventCache,new me(e,n,i))}function Ht(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Te(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vn;const Tc=()=>(vn||(vn=new V(hl)),vn);class S{constructor(e,n=Tc()){this.value=e,this.children=n}static fromObject(e){let n=new S(null);return W(e,(i,s)=>{n=n.set(new I(i),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:w(),value:this.value};if(C(e))return null;{const i=g(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(N(e),n);return r!=null?{path:D(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const n=g(e),i=this.children.get(n);return i!==null?i.subtree(N(e)):new S(null)}}set(e,n){if(C(e))return new S(n,this.children);{const i=g(e),r=(this.children.get(i)||new S(null)).set(N(e),n),o=this.children.insert(i,r);return new S(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new S(null):new S(null,this.children);{const n=g(e),i=this.children.get(n);if(i){const s=i.remove(N(e));let r;return s.isEmpty()?r=this.children.remove(n):r=this.children.insert(n,s),this.value===null&&r.isEmpty()?new S(null):new S(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const n=g(e),i=this.children.get(n);return i?i.get(N(e)):null}}setTree(e,n){if(C(e))return n;{const i=g(e),r=(this.children.get(i)||new S(null)).setTree(N(e),n);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new S(this.value,o)}}fold(e){return this.fold_(w(),e)}fold_(e,n){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(D(e,s),n)}),n(e,this.value,i)}findOnPath(e,n){return this.findOnPath_(e,w(),n)}findOnPath_(e,n,i){const s=this.value?i(n,this.value):!1;if(s)return s;if(C(e))return null;{const r=g(e),o=this.children.get(r);return o?o.findOnPath_(N(e),D(n,r),i):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,w(),n)}foreachOnPath_(e,n,i){if(C(e))return this;{this.value&&i(n,this.value);const s=g(e),r=this.children.get(s);return r?r.foreachOnPath_(N(e),D(n,s),i):new S(null)}}foreach(e){this.foreach_(w(),e)}foreach_(e,n){this.children.inorderTraversal((i,s)=>{s.foreach_(D(e,i),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,i)=>{i.value&&e(n,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q{constructor(e){this.writeTree_=e}static empty(){return new Q(new S(null))}}function st(t,e,n){if(C(e))return new Q(new S(n));{const i=t.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=H(s,e);return r=r.updateChild(o,n),new Q(t.writeTree_.set(s,r))}else{const s=new S(n),r=t.writeTree_.setTree(e,s);return new Q(r)}}}function xn(t,e,n){let i=t;return W(n,(s,r)=>{i=st(i,D(e,s),r)}),i}function ls(t,e){if(C(e))return Q.empty();{const n=t.writeTree_.setTree(e,new S(null));return new Q(n)}}function On(t,e){return Re(t,e)!=null}function Re(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(H(n.path,e)):null}function cs(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(k,(i,s)=>{e.push(new y(i,s))}):t.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new y(i,s.value))}),e}function de(t,e){if(C(e))return t;{const n=Re(t,e);return n!=null?new Q(new S(n)):new Q(t.writeTree_.subtree(e))}}function Mn(t){return t.writeTree_.isEmpty()}function He(t,e){return Ir(w(),t.writeTree_,e)}function Ir(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):n=Ir(D(t,s),r,n)}),!n.getChild(t).isEmpty()&&i!==null&&(n=n.updateChild(D(t,".priority"),i)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(t,e){return Rr(e,t)}function Nc(t,e,n,i,s){f(i>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:i,visible:s}),s&&(t.visibleWrites=st(t.visibleWrites,e,n)),t.lastWriteId=i}function Rc(t,e,n,i){f(i>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:i,visible:!0}),t.visibleWrites=xn(t.visibleWrites,e,n),t.lastWriteId=i}function Ac(t,e){for(let n=0;n<t.allWrites.length;n++){const i=t.allWrites[n];if(i.writeId===e)return i}return null}function Dc(t,e){const n=t.allWrites.findIndex(a=>a.writeId===e);f(n>=0,"removeWrite called with nonexistent writeId.");const i=t.allWrites[n];t.allWrites.splice(n,1);let s=i.visible,r=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const a=t.allWrites[o];a.visible&&(o>=n&&kc(a,i.path)?s=!1:j(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return Pc(t),!0;if(i.snap)t.visibleWrites=ls(t.visibleWrites,i.path);else{const a=i.children;W(a,l=>{t.visibleWrites=ls(t.visibleWrites,D(i.path,l))})}return!0}else return!1}function kc(t,e){if(t.snap)return j(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&j(D(t.path,n),e))return!0;return!1}function Pc(t){t.visibleWrites=Sr(t.allWrites,xc,w()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function xc(t){return t.visible}function Sr(t,e,n){let i=Q.empty();for(let s=0;s<t.length;++s){const r=t[s];if(e(r)){const o=r.path;let a;if(r.snap)j(n,o)?(a=H(n,o),i=st(i,a,r.snap)):j(o,n)&&(a=H(o,n),i=st(i,w(),r.snap.getChild(a)));else if(r.children){if(j(n,o))a=H(n,o),i=xn(i,a,r.children);else if(j(o,n))if(a=H(o,n),C(a))i=xn(i,w(),r.children);else{const l=Fe(r.children,g(a));if(l){const c=l.getChild(N(a));i=st(i,w(),c)}}}else throw Ve("WriteRecord should have .snap or .children")}}return i}function Tr(t,e,n,i,s){if(!i&&!s){const r=Re(t.visibleWrites,e);if(r!=null)return r;{const o=de(t.visibleWrites,e);if(Mn(o))return n;if(n==null&&!On(o,w()))return null;{const a=n||m.EMPTY_NODE;return He(o,a)}}}else{const r=de(t.visibleWrites,e);if(!s&&Mn(r))return n;if(!s&&n==null&&!On(r,w()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(j(c.path,e)||j(e,c.path))},a=Sr(t.allWrites,o,e),l=n||m.EMPTY_NODE;return He(a,l)}}}function Oc(t,e,n){let i=m.EMPTY_NODE;const s=Re(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(k,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(n){const r=de(t.visibleWrites,e);return n.forEachChild(k,(o,a)=>{const l=He(de(r,new I(o)),a);i=i.updateImmediateChild(o,l)}),cs(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=de(t.visibleWrites,e);return cs(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function Mc(t,e,n,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=D(e,n);if(On(t.visibleWrites,r))return null;{const o=de(t.visibleWrites,r);return Mn(o)?s.getChild(n):He(o,s.getChild(n))}}function Lc(t,e,n,i){const s=D(e,n),r=Re(t.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(n)){const o=de(t.visibleWrites,s);return He(o,i.getNode().getImmediateChild(n))}else return null}function Fc(t,e){return Re(t.visibleWrites,e)}function Bc(t,e,n,i,s,r,o){let a;const l=de(t.visibleWrites,e),c=Re(l,w());if(c!=null)a=c;else if(n!=null)a=He(l,n);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=d.getNext();for(;p&&u.length<s;)h(p,i)!==0&&u.push(p),p=d.getNext();return u}else return[]}function Wc(){return{visibleWrites:Q.empty(),allWrites:[],lastWriteId:-1}}function Gt(t,e,n,i){return Tr(t.writeTree,t.treePath,e,n,i)}function ci(t,e){return Oc(t.writeTree,t.treePath,e)}function hs(t,e,n,i){return Mc(t.writeTree,t.treePath,e,n,i)}function $t(t,e){return Fc(t.writeTree,D(t.treePath,e))}function Uc(t,e,n,i,s,r){return Bc(t.writeTree,t.treePath,e,n,i,s,r)}function hi(t,e,n){return Lc(t.writeTree,t.treePath,e,n)}function Nr(t,e){return Rr(D(t.treePath,e),t.writeTree)}function Rr(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,i=e.childName;f(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(n==="child_added"&&r==="child_removed")this.changeMap.set(i,ft(i,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(n==="child_removed"&&r==="child_changed")this.changeMap.set(i,dt(i,s.oldSnap));else if(n==="child_changed"&&r==="child_added")this.changeMap.set(i,We(i,e.snapshotNode));else if(n==="child_changed"&&r==="child_changed")this.changeMap.set(i,ft(i,e.snapshotNode,s.oldSnap));else throw Ve("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc{getCompleteChild(e){return null}getChildAfterChild(e,n,i){return null}}const Ar=new Gc;class ui{constructor(e,n,i=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=i}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new me(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return hi(this.writes_,e,i)}}getChildAfterChild(e,n,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Te(this.viewCache_),r=Uc(this.writes_,s,n,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(t){return{filter:t}}function Vc(t,e){f(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function jc(t,e,n,i,s){const r=new Hc;let o,a;if(n.type===K.OVERWRITE){const c=n;c.source.fromUser?o=Ln(t,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=Vt(t,e,c.path,c.snap,i,s,a,r))}else if(n.type===K.MERGE){const c=n;c.source.fromUser?o=qc(t,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=Fn(t,e,c.path,c.children,i,s,a,r))}else if(n.type===K.ACK_USER_WRITE){const c=n;c.revert?o=Qc(t,e,c.path,i,s,r):o=Yc(t,e,c.path,c.affectedTree,i,s,r)}else if(n.type===K.LISTEN_COMPLETE)o=Kc(t,e,n.path,i,r);else throw Ve("Unknown operation type: "+n.type);const l=r.getChanges();return zc(e,o,l),{viewCache:o,changes:l}}function zc(t,e,n){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Ht(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&n.push(Er(Ht(e)))}}function Dr(t,e,n,i,s,r){const o=e.eventCache;if($t(i,n)!=null)return e;{let a,l;if(C(n))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Te(e),u=c instanceof m?c:m.EMPTY_NODE,h=ci(i,u);a=t.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Gt(i,Te(e));a=t.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=g(n);if(c===".priority"){f(_e(n)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=hs(i,n,u,l);h!=null?a=t.filter.updatePriority(u,h):a=o.getNode()}else{const u=N(n);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=hs(i,n,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=hi(i,c,e.serverCache);h!=null?a=t.filter.updateChild(o.getNode(),c,h,u,s,r):a=o.getNode()}}return it(e,a,o.isFullyInitialized()||C(n),t.filter.filtersNodes())}}function Vt(t,e,n,i,s,r,o,a){const l=e.serverCache;let c;const u=o?t.filter:t.filter.getIndexedFilter();if(C(n))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(n,i);c=u.updateFullNode(l.getNode(),p,null)}else{const p=g(n);if(!l.isCompleteForPath(n)&&_e(n)>1)return e;const _=N(n),x=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=u.updatePriority(l.getNode(),x):c=u.updateChild(l.getNode(),p,x,_,Ar,null)}const h=br(e,c,l.isFullyInitialized()||C(n),u.filtersNodes()),d=new ui(s,h,r);return Dr(t,h,n,s,d,a)}function Ln(t,e,n,i,s,r,o){const a=e.eventCache;let l,c;const u=new ui(s,e,r);if(C(n))c=t.filter.updateFullNode(e.eventCache.getNode(),i,o),l=it(e,c,!0,t.filter.filtersNodes());else{const h=g(n);if(h===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),i),l=it(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=N(n),p=a.getNode().getImmediateChild(h);let _;if(C(d))_=i;else{const b=u.getCompleteChild(h);b!=null?ei(d)===".priority"&&b.getChild(pr(d)).isEmpty()?_=b:_=b.updateChild(d,i):_=m.EMPTY_NODE}if(p.equals(_))l=e;else{const b=t.filter.updateChild(a.getNode(),h,_,d,u,o);l=it(e,b,a.isFullyInitialized(),t.filter.filtersNodes())}}}return l}function us(t,e){return t.eventCache.isCompleteForChild(e)}function qc(t,e,n,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=D(n,l);us(e,g(u))&&(a=Ln(t,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=D(n,l);us(e,g(u))||(a=Ln(t,a,u,c,s,r,o))}),a}function ds(t,e,n){return n.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function Fn(t,e,n,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;C(n)?c=i:c=new S(null).setTree(n,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const p=e.serverCache.getNode().getImmediateChild(h),_=ds(t,p,d);l=Vt(t,l,new I(h),_,s,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const p=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!p){const _=e.serverCache.getNode().getImmediateChild(h),b=ds(t,_,d);l=Vt(t,l,new I(h),b,s,r,o,a)}}),l}function Yc(t,e,n,i,s,r,o){if($t(s,n)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(C(n)&&l.isFullyInitialized()||l.isCompleteForPath(n))return Vt(t,e,n,l.getNode().getChild(n),s,r,a,o);if(C(n)){let c=new S(null);return l.getNode().forEachChild(Me,(u,h)=>{c=c.set(new I(u),h)}),Fn(t,e,n,c,s,r,a,o)}else return e}else{let c=new S(null);return i.foreach((u,h)=>{const d=D(n,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),Fn(t,e,n,c,s,r,a,o)}}function Kc(t,e,n,i,s){const r=e.serverCache,o=br(e,r.getNode(),r.isFullyInitialized()||C(n),r.isFiltered());return Dr(t,o,n,i,Ar,s)}function Qc(t,e,n,i,s,r){let o;if($t(i,n)!=null)return e;{const a=new ui(i,e,s),l=e.eventCache.getNode();let c;if(C(n)||g(n)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Gt(i,Te(e));else{const h=e.serverCache.getNode();f(h instanceof m,"serverChildren would be complete if leaf node"),u=ci(i,h)}u=u,c=t.filter.updateFullNode(l,u,r)}else{const u=g(n);let h=hi(i,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=t.filter.updateChild(l,u,h,N(n),a,r):e.eventCache.getNode().hasChild(u)?c=t.filter.updateChild(l,u,m.EMPTY_NODE,N(n),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Gt(i,Te(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||$t(i,w())!=null,it(e,c,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new si(i.getIndex()),r=_c(i);this.processor_=$c(r);const o=n.serverCache,a=n.eventCache,l=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,a.getNode(),null),u=new me(l,o.isFullyInitialized(),s.filtersNodes()),h=new me(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Xt(h,u),this.eventGenerator_=new wc(this.query_)}get query(){return this.query_}}function Jc(t){return t.viewCache_.serverCache.getNode()}function Zc(t){return Ht(t.viewCache_)}function eh(t,e){const n=Te(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!C(e)&&!n.getImmediateChild(g(e)).isEmpty())?n.getChild(e):null}function fs(t){return t.eventRegistrations_.length===0}function th(t,e){t.eventRegistrations_.push(e)}function ps(t,e,n){const i=[];if(n){f(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(n,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<t.eventRegistrations_.length;++r){const o=t.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(r+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return i}function _s(t,e,n,i){e.type===K.MERGE&&e.source.queryId!==null&&(f(Te(t.viewCache_),"We should always have a full cache before handling merges"),f(Ht(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,r=jc(t.processor_,s,e,n,i);return Vc(t.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=r.viewCache,kr(t,r.changes,r.viewCache.eventCache.getNode(),null)}function nh(t,e){const n=t.viewCache_.eventCache,i=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(k,(r,o)=>{i.push(We(r,o))}),n.isFullyInitialized()&&i.push(Er(n.getNode())),kr(t,i,n.getNode(),e)}function kr(t,e,n,i){const s=i?[i]:t.eventRegistrations_;return bc(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jt;class Pr{constructor(){this.views=new Map}}function ih(t){f(!jt,"__referenceConstructor has already been defined"),jt=t}function sh(){return f(jt,"Reference.ts has not been loaded"),jt}function rh(t){return t.views.size===0}function di(t,e,n,i){const s=e.source.queryId;if(s!==null){const r=t.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),_s(r,e,n,i)}else{let r=[];for(const o of t.views.values())r=r.concat(_s(o,e,n,i));return r}}function xr(t,e,n,i,s){const r=e._queryIdentifier,o=t.views.get(r);if(!o){let a=Gt(n,s?i:null),l=!1;a?l=!0:i instanceof m?(a=ci(n,i),l=!1):(a=m.EMPTY_NODE,l=!1);const c=Xt(new me(a,l,!1),new me(i,s,!1));return new Xc(e,c)}return o}function oh(t,e,n,i,s,r){const o=xr(t,e,i,s,r);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),th(o,n),nh(o,n)}function ah(t,e,n,i){const s=e._queryIdentifier,r=[];let o=[];const a=ge(t);if(s==="default")for(const[l,c]of t.views.entries())o=o.concat(ps(c,n,i)),fs(c)&&(t.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=t.views.get(s);l&&(o=o.concat(ps(l,n,i)),fs(l)&&(t.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!ge(t)&&r.push(new(sh())(e._repo,e._path)),{removed:r,events:o}}function Or(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function fe(t,e){let n=null;for(const i of t.views.values())n=n||eh(i,e);return n}function Mr(t,e){if(e._queryParams.loadsAllData())return Zt(t);{const i=e._queryIdentifier;return t.views.get(i)}}function Lr(t,e){return Mr(t,e)!=null}function ge(t){return Zt(t)!=null}function Zt(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zt;function lh(t){f(!zt,"__referenceConstructor has already been defined"),zt=t}function ch(){return f(zt,"Reference.ts has not been loaded"),zt}let hh=1;class ms{constructor(e){this.listenProvider_=e,this.syncPointTree_=new S(null),this.pendingWriteTree_=Wc(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Fr(t,e,n,i,s){return Nc(t.pendingWriteTree_,e,n,i,s),s?qe(t,new Se(oi(),e,n)):[]}function uh(t,e,n,i){Rc(t.pendingWriteTree_,e,n,i);const s=S.fromObject(n);return qe(t,new Ue(oi(),e,s))}function ce(t,e,n=!1){const i=Ac(t.pendingWriteTree_,e);if(Dc(t.pendingWriteTree_,e)){let r=new S(null);return i.snap!=null?r=r.set(w(),!0):W(i.children,o=>{r=r.set(new I(o),!0)}),qe(t,new Ut(i.path,r,n))}else return[]}function bt(t,e,n){return qe(t,new Se(ai(),e,n))}function dh(t,e,n){const i=S.fromObject(n);return qe(t,new Ue(ai(),e,i))}function fh(t,e){return qe(t,new _t(ai(),e))}function ph(t,e,n){const i=pi(t,n);if(i){const s=_i(i),r=s.path,o=s.queryId,a=H(r,e),l=new _t(li(o),a);return mi(t,r,l)}else return[]}function qt(t,e,n,i,s=!1){const r=e._path,o=t.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Lr(o,e))){const l=ah(o,e,n,i);rh(o)&&(t.syncPointTree_=t.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(r,(d,p)=>ge(p));if(u&&!h){const d=t.syncPointTree_.subtree(r);if(!d.isEmpty()){const p=gh(d);for(let _=0;_<p.length;++_){const b=p[_],x=b.query,Ae=Hr(t,b);t.listenProvider_.startListening(rt(x),mt(t,x),Ae.hashFn,Ae.onComplete)}}}!h&&c.length>0&&!i&&(u?t.listenProvider_.stopListening(rt(e),null):c.forEach(d=>{const p=t.queryToTagMap.get(en(d));t.listenProvider_.stopListening(rt(d),p)}))}yh(t,c)}return a}function Br(t,e,n,i){const s=pi(t,i);if(s!=null){const r=_i(s),o=r.path,a=r.queryId,l=H(o,e),c=new Se(li(a),l,n);return mi(t,o,c)}else return[]}function _h(t,e,n,i){const s=pi(t,i);if(s){const r=_i(s),o=r.path,a=r.queryId,l=H(o,e),c=S.fromObject(n),u=new Ue(li(a),l,c);return mi(t,o,u)}else return[]}function Bn(t,e,n,i=!1){const s=e._path;let r=null,o=!1;t.syncPointTree_.foreachOnPath(s,(d,p)=>{const _=H(d,s);r=r||fe(p,_),o=o||ge(p)});let a=t.syncPointTree_.get(s);a?(o=o||ge(a),r=r||fe(a,w())):(a=new Pr,t.syncPointTree_=t.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=m.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((p,_)=>{const b=fe(_,w());b&&(r=r.updateImmediateChild(p,b))}));const c=Lr(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=en(e);f(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const p=vh();t.queryToTagMap.set(d,p),t.tagToQueryMap.set(p,d)}const u=Jt(t.pendingWriteTree_,s);let h=oh(a,e,n,u,r,l);if(!c&&!o&&!i){const d=Mr(a,e);h=h.concat(Ch(t,e,d))}return h}function fi(t,e,n){const s=t.pendingWriteTree_,r=t.syncPointTree_.findOnPath(e,(o,a)=>{const l=H(o,e),c=fe(a,l);if(c)return c});return Tr(s,e,r,n,!0)}function mh(t,e){const n=e._path;let i=null;t.syncPointTree_.foreachOnPath(n,(c,u)=>{const h=H(c,n);i=i||fe(u,h)});let s=t.syncPointTree_.get(n);s?i=i||fe(s,w()):(s=new Pr,t.syncPointTree_=t.syncPointTree_.set(n,s));const r=i!=null,o=r?new me(i,!0,!1):null,a=Jt(t.pendingWriteTree_,e._path),l=xr(s,e,a,r?o.getNode():m.EMPTY_NODE,r);return Zc(l)}function qe(t,e){return Wr(e,t.syncPointTree_,null,Jt(t.pendingWriteTree_,w()))}function Wr(t,e,n,i){if(C(t.path))return Ur(t,e,n,i);{const s=e.get(w());n==null&&s!=null&&(n=fe(s,w()));let r=[];const o=g(t.path),a=t.operationForChild(o),l=e.children.get(o);if(l&&a){const c=n?n.getImmediateChild(o):null,u=Nr(i,o);r=r.concat(Wr(a,l,c,u))}return s&&(r=r.concat(di(s,t,i,n))),r}}function Ur(t,e,n,i){const s=e.get(w());n==null&&s!=null&&(n=fe(s,w()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=n?n.getImmediateChild(o):null,c=Nr(i,o),u=t.operationForChild(o);u&&(r=r.concat(Ur(u,a,l,c)))}),s&&(r=r.concat(di(s,t,i,n))),r}function Hr(t,e){const n=e.query,i=mt(t,n);return{hashFn:()=>(Jc(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?ph(t,n._path,i):fh(t,n._path);{const r=fl(s,n);return qt(t,n,null,r)}}}}function mt(t,e){const n=en(e);return t.queryToTagMap.get(n)}function en(t){return t._path.toString()+"$"+t._queryIdentifier}function pi(t,e){return t.tagToQueryMap.get(e)}function _i(t){const e=t.indexOf("$");return f(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new I(t.substr(0,e))}}function mi(t,e,n){const i=t.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=Jt(t.pendingWriteTree_,e);return di(i,n,s,null)}function gh(t){return t.fold((e,n,i)=>{if(n&&ge(n))return[Zt(n)];{let s=[];return n&&(s=Or(n)),W(i,(r,o)=>{s=s.concat(o)}),s}})}function rt(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(ch())(t._repo,t._path):t}function yh(t,e){for(let n=0;n<e.length;++n){const i=e[n];if(!i._queryParams.loadsAllData()){const s=en(i),r=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(r)}}}function vh(){return hh++}function Ch(t,e,n){const i=e._path,s=mt(t,e),r=Hr(t,n),o=t.listenProvider_.startListening(rt(e),s,r.hashFn,r.onComplete),a=t.syncPointTree_.subtree(i);if(s)f(!ge(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!C(c)&&u&&ge(u))return[Zt(u).query];{let d=[];return u&&(d=d.concat(Or(u).map(p=>p.query))),W(h,(p,_)=>{d=d.concat(_)}),d}});for(let c=0;c<l.length;++c){const u=l[c];t.listenProvider_.stopListening(rt(u),mt(t,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new gi(n)}node(){return this.node_}}class yi{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=D(this.path_,e);return new yi(this.syncTree_,n)}node(){return fi(this.syncTree_,this.path_)}}const Eh=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},gs=function(t,e,n){if(!t||typeof t!="object")return t;if(f(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return wh(t[".sv"],e,n);if(typeof t[".sv"]=="object")return bh(t[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},wh=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:f(!1,"Unexpected server value: "+t)}},bh=function(t,e,n){t.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const i=t.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},Gr=function(t,e,n,i){return vi(e,new yi(n,t),i)},$r=function(t,e,n){return vi(t,new gi(e),n)};function vi(t,e,n){const i=t.getPriority().val(),s=gs(i,e.getImmediateChild(".priority"),n);let r;if(t.isLeafNode()){const o=t,a=gs(o.getValue(),e,n);return a!==o.getValue()||s!==o.getPriority().val()?new L(a,O(s)):t}else{const o=t;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new L(s))),o.forEachChild(k,(a,l)=>{const c=vi(l,e.getImmediateChild(a),n);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ci{constructor(e="",n=null,i={children:{},childCount:0}){this.name=e,this.parent=n,this.node=i}}function Ei(t,e){let n=e instanceof I?e:new I(e),i=t,s=g(n);for(;s!==null;){const r=Fe(i.node.children,s)||{children:{},childCount:0};i=new Ci(s,i,r),n=N(n),s=g(n)}return i}function Ye(t){return t.node.value}function Vr(t,e){t.node.value=e,Wn(t)}function jr(t){return t.node.childCount>0}function Ih(t){return Ye(t)===void 0&&!jr(t)}function tn(t,e){W(t.node.children,(n,i)=>{e(new Ci(n,t,i))})}function zr(t,e,n,i){n&&e(t),tn(t,s=>{zr(s,e,!0)})}function Sh(t,e,n){let i=t.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function It(t){return new I(t.parent===null?t.name:It(t.parent)+"/"+t.name)}function Wn(t){t.parent!==null&&Th(t.parent,t.name,t)}function Th(t,e,n){const i=Ih(n),s=ee(t.node.children,e);i&&s?(delete t.node.children[e],t.node.childCount--,Wn(t)):!i&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Wn(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nh=/[\[\].#$\/\u0000-\u001F\u007F]/,Rh=/[\[\].#$\u0000-\u001F\u007F]/,Cn=10*1024*1024,wi=function(t){return typeof t=="string"&&t.length!==0&&!Nh.test(t)},qr=function(t){return typeof t=="string"&&t.length!==0&&!Rh.test(t)},Ah=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),qr(t)},Dh=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Kn(t)||t&&typeof t=="object"&&ee(t,".sv")},kh=function(t,e,n,i){nn(Yt(t,"value"),e,n)},nn=function(t,e,n){const i=n instanceof I?new ql(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+ve(i));if(typeof e=="function")throw new Error(t+"contains a function "+ve(i)+" with contents = "+e.toString());if(Kn(e))throw new Error(t+"contains "+e.toString()+" "+ve(i));if(typeof e=="string"&&e.length>Cn/3&&Kt(e)>Cn)throw new Error(t+"contains a string greater than "+Cn+" utf8 bytes "+ve(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(W(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!wi(o)))throw new Error(t+" contains an invalid key ("+o+") "+ve(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);Yl(i,o),nn(t,a,i),Kl(i)}),s&&r)throw new Error(t+' contains ".value" child '+ve(i)+" in addition to actual children.")}},Ph=function(t,e){let n,i;for(n=0;n<e.length;n++){i=e[n];const r=ut(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!wi(r[o]))throw new Error(t+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(zl);let s=null;for(n=0;n<e.length;n++){if(i=e[n],s!==null&&j(s,i))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},xh=function(t,e,n,i){const s=Yt(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];W(e,(o,a)=>{const l=new I(o);if(nn(s,a,D(n,l)),ei(l)===".priority"&&!Dh(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),Ph(s,r)},Yr=function(t,e,n,i){if(!qr(n))throw new Error(Yt(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Oh=function(t,e,n,i){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Yr(t,e,n)},Mh=function(t,e){if(g(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},Lh=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!wi(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!Ah(n))throw new Error(Yt(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function sn(t,e){let n=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();n!==null&&!ti(r,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:r}),n.events.push(s)}n&&t.eventLists_.push(n)}function Kr(t,e,n){sn(t,n),Qr(t,i=>ti(i,e))}function q(t,e,n){sn(t,n),Qr(t,i=>j(i,e)||j(e,i))}function Qr(t,e){t.recursionDepth_++;let n=!0;for(let i=0;i<t.eventLists_.length;i++){const s=t.eventLists_[i];if(s){const r=s.path;e(r)?(Bh(t.eventLists_[i]),t.eventLists_[i]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function Bh(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const i=n.getEventRunner();tt&&B("event: "+n.toString()),ze(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh="repo_interrupt",Uh=25;class Hh{constructor(e,n,i,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Fh,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Wt(),this.transactionQueueTree_=new Ci,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Gh(t,e,n){if(t.stats_=Jn(t.repoInfo_),t.forceRestClient_||gl())t.server_=new Bt(t.repoInfo_,(i,s,r,o)=>{ys(t,i,s,r,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>vs(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{M(n)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}t.persistentConnection_=new ie(t.repoInfo_,e,(i,s,r,o)=>{ys(t,i,s,r,o)},i=>{vs(t,i)},i=>{Vh(t,i)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(i=>{t.server_.refreshAuthToken(i)}),t.appCheckProvider_.addTokenChangeListener(i=>{t.server_.refreshAppCheckToken(i.token)}),t.statsReporter_=wl(t.repoInfo_,()=>new Ec(t.stats_,t.server_)),t.infoData_=new mc,t.infoSyncTree_=new ms({startListening:(i,s,r,o)=>{let a=[];const l=t.infoData_.getNode(i._path);return l.isEmpty()||(a=bt(t.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),bi(t,"connected",!1),t.serverSyncTree_=new ms({startListening:(i,s,r,o)=>(t.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);q(t.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{t.server_.unlisten(i,s)}})}function $h(t){const n=t.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function rn(t){return Eh({timestamp:$h(t)})}function ys(t,e,n,i,s){t.dataUpdateCount++;const r=new I(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(i){const l=Pt(n,c=>O(c));o=_h(t.serverSyncTree_,r,l,s)}else{const l=O(n);o=Br(t.serverSyncTree_,r,l,s)}else if(i){const l=Pt(n,c=>O(c));o=dh(t.serverSyncTree_,r,l)}else{const l=O(n);o=bt(t.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Ge(t,r)),q(t.eventQueue_,a,o)}function vs(t,e){bi(t,"connected",e),e===!1&&Yh(t)}function Vh(t,e){W(e,(n,i)=>{bi(t,n,i)})}function bi(t,e,n){const i=new I("/.info/"+e),s=O(n);t.infoData_.updateSnapshot(i,s);const r=bt(t.infoSyncTree_,i,s);q(t.eventQueue_,i,r)}function Ii(t){return t.nextWriteId_++}function jh(t,e,n){const i=mh(t.serverSyncTree_,e);return i!=null?Promise.resolve(i):t.server_.get(e).then(s=>{const r=O(s).withIndex(e._queryParams.getIndex());Bn(t.serverSyncTree_,e,n,!0);let o;if(e._queryParams.loadsAllData())o=bt(t.serverSyncTree_,e._path,r);else{const a=mt(t.serverSyncTree_,e);o=Br(t.serverSyncTree_,e._path,r,a)}return q(t.eventQueue_,e._path,o),qt(t.serverSyncTree_,e,n,null,!0),r},s=>(St(t,"get for query "+M(e)+" failed: "+s),Promise.reject(new Error(s))))}function zh(t,e,n,i,s){St(t,"set",{path:e.toString(),value:n,priority:i});const r=rn(t),o=O(n,i),a=fi(t.serverSyncTree_,e),l=$r(o,a,r),c=Ii(t),u=Fr(t.serverSyncTree_,e,l,c,!0);sn(t.eventQueue_,u),t.server_.put(e.toString(),o.val(!0),(d,p)=>{const _=d==="ok";_||G("set at "+e+" failed: "+d);const b=ce(t.serverSyncTree_,c,!_);q(t.eventQueue_,e,b),Un(t,s,d,p)});const h=Ti(t,e);Ge(t,h),q(t.eventQueue_,h,[])}function qh(t,e,n,i){St(t,"update",{path:e.toString(),value:n});let s=!0;const r=rn(t),o={};if(W(n,(a,l)=>{s=!1,o[a]=Gr(D(e,a),O(l),t.serverSyncTree_,r)}),s)B("update() called with empty data.  Don't do anything."),Un(t,i,"ok",void 0);else{const a=Ii(t),l=uh(t.serverSyncTree_,e,o,a);sn(t.eventQueue_,l),t.server_.merge(e.toString(),n,(c,u)=>{const h=c==="ok";h||G("update at "+e+" failed: "+c);const d=ce(t.serverSyncTree_,a,!h),p=d.length>0?Ge(t,e):e;q(t.eventQueue_,p,d),Un(t,i,c,u)}),W(n,c=>{const u=Ti(t,D(e,c));Ge(t,u)}),q(t.eventQueue_,e,[])}}function Yh(t){St(t,"onDisconnectEvents");const e=rn(t),n=Wt();Pn(t.onDisconnect_,w(),(s,r)=>{const o=Gr(s,r,t.serverSyncTree_,e);wr(n,s,o)});let i=[];Pn(n,w(),(s,r)=>{i=i.concat(bt(t.serverSyncTree_,s,r));const o=Ti(t,s);Ge(t,o)}),t.onDisconnect_=Wt(),q(t.eventQueue_,w(),i)}function Kh(t,e,n){let i;g(e._path)===".info"?i=Bn(t.infoSyncTree_,e,n):i=Bn(t.serverSyncTree_,e,n),Kr(t.eventQueue_,e._path,i)}function Qh(t,e,n){let i;g(e._path)===".info"?i=qt(t.infoSyncTree_,e,n):i=qt(t.serverSyncTree_,e,n),Kr(t.eventQueue_,e._path,i)}function Xh(t){t.persistentConnection_&&t.persistentConnection_.interrupt(Wh)}function St(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),B(n,...e)}function Un(t,e,n,i){e&&ze(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function Xr(t,e,n){return fi(t.serverSyncTree_,e,n)||m.EMPTY_NODE}function Si(t,e=t.transactionQueueTree_){if(e||on(t,e),Ye(e)){const n=Zr(t,e);f(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Jh(t,It(e),n)}else jr(e)&&tn(e,n=>{Si(t,n)})}function Jh(t,e,n){const i=n.map(c=>c.currentWriteId),s=Xr(t,e,i);let r=s;const o=s.hash();for(let c=0;c<n.length;c++){const u=n[c];f(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=H(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;t.server_.put(l.toString(),a,c=>{St(t,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<n.length;d++)n[d].status=2,u=u.concat(ce(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&h.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();on(t,Ei(t.transactionQueueTree_,e)),Si(t,t.transactionQueueTree_),q(t.eventQueue_,e,u);for(let d=0;d<h.length;d++)ze(h[d])}else{if(c==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{G("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=c}Ge(t,e)}},o)}function Ge(t,e){const n=Jr(t,e),i=It(n),s=Zr(t,n);return Zh(t,s,i),i}function Zh(t,e,n){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=H(n,l.path);let u=!1,h;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,s=s.concat(ce(t.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=Uh)u=!0,h="maxretry",s=s.concat(ce(t.serverSyncTree_,l.currentWriteId,!0));else{const d=Xr(t,l.path,o);l.currentInputSnapshot=d;const p=e[a].update(d.val());if(p!==void 0){nn("transaction failed: Data returned ",p,l.path);let _=O(p);typeof p=="object"&&p!=null&&ee(p,".priority")||(_=_.updatePriority(d.getPriority()));const x=l.currentWriteId,Ae=rn(t),Tt=$r(_,d,Ae);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=Tt,l.currentWriteId=Ii(t),o.splice(o.indexOf(x),1),s=s.concat(Fr(t.serverSyncTree_,l.path,Tt,l.currentWriteId,l.applyLocally)),s=s.concat(ce(t.serverSyncTree_,x,!0))}else u=!0,h="nodata",s=s.concat(ce(t.serverSyncTree_,l.currentWriteId,!0))}q(t.eventQueue_,n,s),s=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(h),!1,null))))}on(t,t.transactionQueueTree_);for(let a=0;a<i.length;a++)ze(i[a]);Si(t,t.transactionQueueTree_)}function Jr(t,e){let n,i=t.transactionQueueTree_;for(n=g(e);n!==null&&Ye(i)===void 0;)i=Ei(i,n),e=N(e),n=g(e);return i}function Zr(t,e){const n=[];return eo(t,e,n),n.sort((i,s)=>i.order-s.order),n}function eo(t,e,n){const i=Ye(e);if(i)for(let s=0;s<i.length;s++)n.push(i[s]);tn(e,s=>{eo(t,s,n)})}function on(t,e){const n=Ye(e);if(n){let i=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[i]=n[s],i++);n.length=i,Vr(e,n.length>0?n:void 0)}tn(e,i=>{on(t,i)})}function Ti(t,e){const n=It(Jr(t,e)),i=Ei(t.transactionQueueTree_,e);return Sh(i,s=>{En(t,s)}),En(t,i),zr(i,s=>{En(t,s)}),n}function En(t,e){const n=Ye(e);if(n){const i=[];let s=[],r=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,n[o].status=3,n[o].abortReason="set"):(f(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(ce(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&i.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Vr(e,void 0):n.length=r+1,q(t.eventQueue_,It(e),s);for(let o=0;o<i.length;o++)ze(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eu(t){let e="";const n=t.split("/");for(let i=0;i<n.length;i++)if(n[i].length>0){let s=n[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function tu(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const i=n.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):G(`Invalid query segment '${n}' in query '${t}'`)}return e}const Cs=function(t,e){const n=nu(t),i=n.namespace;n.domain==="firebase.com"&&ae(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&n.domain!=="localhost"&&ae("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||ll();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new rr(n.host,n.secure,i,s,e,"",i!==n.subdomain),path:new I(n.pathString)}},nu=function(t){let e="",n="",i="",s="",r="",o=!0,a="https",l=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(a=t.substring(0,c-1),t=t.substring(c+2));let u=t.indexOf("/");u===-1&&(u=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(u,h)),u<h&&(s=eu(t.substring(u,h)));const d=tu(t.substring(Math.min(t.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")n="localhost";else if(p.split(".").length<=2)n=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),n=e.substring(_+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:n,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(e,n,i,s){this.eventType=e,this.eventRegistration=n,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+M(this.snapshot.exportVal())}}class su{constructor(e,n,i){this.eventRegistration=e,this.error=n,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(e,n,i,s){this._repo=e,this._path=n,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:ei(this._path)}get ref(){return new le(this._repo,this._path)}get _queryIdentifier(){const e=os(this._queryParams),n=Qn(e);return n==="{}"?"default":n}get _queryObject(){return os(this._queryParams)}isEqual(e){if(e=je(e),!(e instanceof Ni))return!1;const n=this._repo===e._repo,i=ti(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+jl(this._path)}}class le extends Ni{constructor(e,n){super(e,n,new ri,!1)}get parent(){const e=pr(this._path);return e===null?null:new le(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class gt{constructor(e,n,i){this._node=e,this.ref=n,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new I(e),i=Hn(this.ref,e);return new gt(this._node.getChild(n),i,k)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new gt(s,Hn(this.ref,i),k)))}hasChild(e){const n=new I(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function Z(t,e){return t=je(t),t._checkNotDeleted("ref"),e!==void 0?Hn(t._root,e):t._root}function Hn(t,e){return t=je(t),g(t._path)===null?Oh("child","path",e):Yr("child","path",e),new le(t._repo,D(t._path,e))}function an(t,e){t=je(t),Mh("set",t._path),kh("set",e,t._path);const n=new yt;return zh(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function no(t,e){xh("update",e,t._path);const n=new yt;return qh(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}function ru(t){t=je(t);const e=new to(()=>{}),n=new ln(e);return jh(t._repo,t,n).then(i=>new gt(i,new le(t._repo,t._path),t._queryParams.getIndex()))}class ln{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const i=n._queryParams.getIndex();return new iu("value",this,new gt(e.snapshotNode,new le(n._repo,n._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new su(this,e,n):null}matches(e){return e instanceof ln?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function ou(t,e,n,i,s){const r=new to(n,void 0),o=new ln(r);return Kh(t._repo,t,o),()=>Qh(t._repo,t,o)}function Ri(t,e,n,i){return ou(t,"value",e)}ih(le);lh(le);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const au="FIREBASE_DATABASE_EMULATOR_HOST",Gn={};let lu=!1;function cu(t,e,n,i){t.repoInfo_=new rr(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),i&&(t.authTokenProvider_=i)}function hu(t,e,n,i,s){let r=i||t.options.databaseURL;r===void 0&&(t.options.projectId||ae("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),B("Using default host for project ",t.options.projectId),r=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Cs(r,s),a=o.repoInfo,l;typeof process<"u"&&Gi&&(l=Gi[au]),l?(r=`http://${l}?ns=${a.namespace}`,o=Cs(r,s),a=o.repoInfo):o.repoInfo.secure;const c=new vl(t.name,t.options,e);Lh("Invalid Firebase Database URL",o),C(o.path)||ae("Database URL must point to the root of a Firebase Database (not including a child path).");const u=du(a,t,c,new yl(t.name,n));return new fu(u,t)}function uu(t,e){const n=Gn[e];(!n||n[t.key]!==t)&&ae(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Xh(t),delete n[t.key]}function du(t,e,n,i){let s=Gn[e.name];s||(s={},Gn[e.name]=s);let r=s[t.toURLString()];return r&&ae("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Hh(t,lu,n,i),s[t.toURLString()]=r,r}class fu{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Gh(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new le(this._repo,w())),this._rootInternal}_delete(){return this._rootInternal!==null&&(uu(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ae("Cannot call "+e+" on a deleted database.")}}function pu(t=Va(),e){const n=Ua(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const i=Ao("database");i&&_u(n,...i)}return n}function _u(t,e,n,i={}){t=je(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&ae("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&ae('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Dt(Dt.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:Do(i.mockUserToken,t.app.options.projectId);r=new Dt(o)}cu(s,e,n,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(t){nl($a),Ot(new lt("database",(e,{instanceIdentifier:n})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return hu(i,s,r,n)},"PUBLIC").setMultipleInstances(!0)),xe($i,Vi,t),xe($i,Vi,"esm2017")}ie.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};ie.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};mu();const gu={apiKey:"AIzaSyDu71EwXEdkBaPonIkn0MTboQqqWJB3uUg",authDomain:"living-room-games.firebaseapp.com",databaseURL:"https://living-room-games-default-rtdb.firebaseio.com",projectId:"living-room-games",storageBucket:"living-room-games.firebasestorage.app",messagingSenderId:"1097791469514",appId:"1:1097791469514:web:353e654a167df3d914c133"};function yu(){const t=Gs(gu),e=pu(t);return{app:t,db:e}}let Ze=null;function Es(t){window.location.hash=t}function vu(t,e){const n=()=>{const i=window.location.hash.slice(1)||"/";Ze&&(Ze(),Ze=null),t.innerHTML="",i==="/host"?Ze=e.hostController.mount(t):i==="/player"?Ze=e.playerController.mount(t):Cu(t)};window.addEventListener("hashchange",n),n()}function Cu(t){t.innerHTML=`
    <div class="landing-container">
      <h1 class="landing-title">🎮 Living Room Games</h1>
      <p class="landing-subtitle">Play games together on the TV</p>
      <div class="landing-buttons">
        <button id="btn-host" class="primary">Host a Game</button>
        <button id="btn-player" class="primary">Join a Game</button>
      </div>
    </div>
  `,document.getElementById("btn-host").addEventListener("click",()=>{Es("#/host")}),document.getElementById("btn-player").addEventListener("click",()=>{Es("#/player")})}function E(t,e=document){return e.querySelector(t)}function A(t,e,n){t&&t.addEventListener(e,n)}function Le(t){t&&t.classList.remove("hidden")}function be(t){t&&t.classList.add("hidden")}function Eu(t){return t.innerHTML=`
    <div class="host-container">
      <div class="header">
        <h1>🎮 Living Room Games - HOST</h1>
        <p>Set up and manage your game room</p>
      </div>

      <div id="room-creation" class="card">
        <h2 class="section-title">Room</h2>
        <button id="btn-create-room" class="primary">Create Room</button>
        <div id="room-info" class="hidden room-info">
          <p>Room Code:</p>
          <div class="room-code" id="room-code-display"></div>
          <p style="margin-top: 15px; font-size: 12px;">Share this link:</p>
          <div class="room-url" id="room-url-display"></div>
        </div>
      </div>

      <div id="players-section" class="hidden card">
        <h2 class="section-title">Players</h2>
        <p id="player-count">0 players</p>
        <div class="players-list" id="players-list"></div>
      </div>

      <div id="game-selection" class="hidden card">
        <h2 class="section-title">Game Selection</h2>
        <label>
          Select Game:
          <select id="game-select">
            <option value="">-- Choose a game --</option>
            <option value="tanks">Tanks War</option>
          </select>
        </label>
      </div>

      <div id="controls-section" class="hidden card">
        <h2 class="section-title">Controls</h2>
        <div class="controls">
          <button id="btn-start-game" class="primary" disabled>Start Game</button>
          <button id="btn-end-game" class="danger hidden">End Game</button>
        </div>
      </div>

      <div id="canvas-container" class="hidden canvas-container">
        <canvas id="game-canvas" width="800" height="600"></canvas>
      </div>

      <div id="results-section" class="hidden results-section">
        <h2>🏆 Game Over!</h2>
        <p id="winner-message"></p>
        <button id="btn-next-game" class="primary" style="margin-top: 20px;">Play Again</button>
      </div>
    </div>
  `,{roomCreation:E("#room-creation"),roomInfo:E("#room-info"),roomCodeDisplay:E("#room-code-display"),roomUrlDisplay:E("#room-url-display"),btnCreateRoom:E("#btn-create-room"),playersSection:E("#players-section"),playerCount:E("#player-count"),playersList:E("#players-list"),gameSelection:E("#game-selection"),gameSelect:E("#game-select"),controlsSection:E("#controls-section"),btnStartGame:E("#btn-start-game"),btnEndGame:E("#btn-end-game"),canvasContainer:E("#canvas-container"),canvas:E("#game-canvas"),resultsSection:E("#results-section"),winnerMessage:E("#winner-message"),btnNextGame:E("#btn-next-game")}}function io(t,e){const{playerCount:n,playersList:i}=t;n&&(n.textContent=`${e.length} player${e.length!==1?"s":""}`),i&&(i.innerHTML="",e.forEach(s=>{const r=document.createElement("div");r.className="player-badge",r.innerHTML=`
        <div class="player-color-dot" style="background-color: ${s.color}"></div>
        <span>${s.name}</span>
      `,i.appendChild(r)}))}function wu(t){be(t.playersSection),be(t.gameSelection),Le(t.canvasContainer),Le(t.btnEndGame),be(t.btnStartGame)}function so(t,e){be(t.canvasContainer),be(t.btnEndGame),Le(t.resultsSection),t.winnerMessage&&(t.winnerMessage.innerHTML=`<p class="winner-name">${e}</p><p>wins!</p>`)}function bu(t,e){be(t.resultsSection),Le(t.playersSection),Le(t.gameSelection),Le(t.btnStartGame),be(t.btnEndGame),t.gameSelect.value="",t.btnStartGame.disabled=!0,io(t,e)}function Iu(t,e){t.btnStartGame.disabled=!e}const P=15,ke=5,ws=150,bs=300,Su=Math.PI*2,Tu=300,Nu=3;function Ru(t,e,n){const i={};return t.forEach((s,r)=>{const o=Math.PI*2*r/t.length,a=150;i[s.playerId]={x:e/2+Math.cos(o)*a,y:n/2+Math.sin(o)*a,angle:o,hp:Nu,alive:!0,lastShootTime:0}}),{startedAt:Date.now(),finishedAt:null,winnerPlayerId:null,tanks:i,bullets:{}}}function Au(t,e,n,i,s){const r=Date.now();Object.entries(t.tanks).forEach(([a,l])=>{if(!l.alive)return;const c=e[a]||{},u=c.moveX||0,h=c.moveY||0;if(u!==0&&(l.angle+=Su*n*u),h!==0){const d=h>0?1:-1;l.x+=Math.cos(l.angle)*ws*n*d,l.y+=Math.sin(l.angle)*ws*n*d,l.x=Math.max(P,Math.min(i-P,l.x)),l.y=Math.max(P,Math.min(s-P,l.y))}if(c.shoot&&r-l.lastShootTime>Tu){const d=`${a}_${Date.now()}`,p=Math.cos(l.angle)*bs,_=Math.sin(l.angle)*bs;t.bullets[d]={x:l.x+Math.cos(l.angle)*P,y:l.y+Math.sin(l.angle)*P,vx:p,vy:_,ownerPlayerId:a,createdAt:r},l.lastShootTime=r}});const o=[];return Object.entries(t.bullets).forEach(([a,l])=>{l.x+=l.vx*n,l.y+=l.vy*n,(l.x<-ke||l.x>i+ke||l.y<-ke||l.y>s+ke||r-l.createdAt>1e4)&&o.push(a)}),o.forEach(a=>{delete t.bullets[a]}),Object.entries(t.bullets).forEach(([a,l])=>{Object.entries(t.tanks).forEach(([c,u])=>{if(!u.alive||l.ownerPlayerId===c)return;const h=l.x-u.x,d=l.y-u.y;Math.sqrt(h*h+d*d)<P+ke&&(u.hp--,u.hp<=0&&(u.alive=!1),delete t.bullets[a])})}),t}function Du(t){const e=Object.entries(t.tanks).filter(([n,i])=>i.alive);return e.length===1?e[0][0]:null}let te=null,Is=null,At=0;function ku({canvas:t,roomCode:e,db:n,getInputs:i,getState:s,players:r,onGameEnd:o,onStateUpdate:a}){const l=t.getContext("2d"),c=t.width,u=t.height,h={};r.forEach(p=>{h[p.playerId]=p.color}),Is=Date.now(),At=Is;const d=()=>{const p=Date.now();At=p;const _=s();if(!_){te=requestAnimationFrame(d);return}l.fillStyle="#0a0a0a",l.fillRect(0,0,c,u),Mu(l,c,u),_.tanks&&Object.entries(_.tanks).forEach(([b,x])=>{xu(l,x,h[b]||"#fff")}),_.bullets&&Object.entries(_.bullets).forEach(([b,x])=>{Ou(l,x)}),l.strokeStyle="#007bff",l.lineWidth=2,l.strokeRect(0,0,c,u),(p-At>100||p-At<0)&&a(_),te=requestAnimationFrame(d)};return te=requestAnimationFrame(d),()=>{te&&(cancelAnimationFrame(te),te=null)}}function Pu(){te&&(cancelAnimationFrame(te),te=null)}function xu(t,e,n){t.save(),t.translate(e.x,e.y),t.rotate(e.angle),t.fillStyle=n,t.fillRect(-P,-P/2,P*2,P),t.fillStyle=n,t.fillRect(-4,-8,8,8),t.restore();const i=30,s=4;t.fillStyle="#333",t.fillRect(e.x-i/2,e.y-P-12,i,s);const r=Math.max(0,e.hp/3);t.fillStyle=r>.5?"#28a745":r>.25?"#ffc107":"#dc3545",t.fillRect(e.x-i/2,e.y-P-12,i*r,s),e.alive||(t.strokeStyle="#dc3545",t.lineWidth=3,t.beginPath(),t.moveTo(e.x-P,e.y-P),t.lineTo(e.x+P,e.y+P),t.moveTo(e.x+P,e.y-P),t.lineTo(e.x-P,e.y+P),t.stroke())}function Ou(t,e){t.fillStyle="#fff",t.beginPath(),t.arc(e.x,e.y,ke,0,Math.PI*2),t.fill(),t.strokeStyle="rgba(255, 255, 255, 0.5)",t.lineWidth=1,t.stroke()}function Mu(t,e,n){t.strokeStyle="#1a1a1a",t.lineWidth=1;for(let i=0;i<e;i+=50)t.beginPath(),t.moveTo(i,0),t.lineTo(i,n),t.stroke();for(let i=0;i<n;i+=50)t.beginPath(),t.moveTo(0,i),t.lineTo(e,i),t.stroke()}const Ss=["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8","#F7DC6F"];let Ts=0;function Lu(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";let e="";for(let n=0;n<4;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}async function Fu(t){const e=Lu(),n=Math.random().toString(36).substring(2,9),i=Z(t,`rooms/${e}/info`);return await an(i,{code:e,hostSessionId:n,phase:"lobby",currentGameId:null,createdAt:Date.now()}),{roomCode:e,hostSessionId:n}}function ro(t,e,n){const i=Z(t,`rooms/${e}/info`);return Ri(i,s=>{s.exists()&&n(s.val())})}function Bu(t,e,n){const i=Z(t,`rooms/${e}/players`);return Ri(i,s=>{const r=[];s.exists()&&s.forEach(o=>{r.push({playerId:o.key,...o.val()})}),n(r)})}async function Wu(t,e,n){const i=Z(t,`rooms/${e}/info`),s=await ru(i);if(!s.exists())throw new Error("Room does not exist");if(s.val().phase==="inGame")throw new Error("Cannot join while a game is in progress");const o=Math.random().toString(36).substring(2,9),a=Ss[Ts%Ss.length];Ts++;const l=Z(t,`rooms/${e}/players/${o}`);return await an(l,{name:n,color:a,joinedAt:Date.now(),connected:!0}),{roomCode:e,playerId:o,color:a}}async function Ai(t,e,n,i){const s=Z(t,`rooms/${e}/info`);await no(s,{phase:n,currentGameId:i})}async function Uu(t,e,n,i){const s=Z(t,`rooms/${e}/inputs/${n}`);await an(s,{...i,updatedAt:Date.now()})}function Hu(t,e,n){const i=Z(t,`rooms/${e}/inputs`);return Ri(i,s=>{const r={};s.exists()&&s.forEach(o=>{r[o.key]=o.val()}),n(r)})}async function Gu(t,e,n){const r={};n.forEach((a,l)=>{const c=Math.PI*2*l/n.length,u=150;r[a.playerId]={x:800/2+Math.cos(c)*u,y:600/2+Math.sin(c)*u,angle:c,hp:3,alive:!0}});const o=Z(t,`rooms/${e}/games/tanks/state`);await an(o,{startedAt:Date.now(),finishedAt:null,winnerPlayerId:null,tanks:r,bullets:{}})}async function oo(t,e,n){const i=Z(t,`rooms/${e}/games/tanks/state`);await no(i,n)}let z=null,R=null,$=null,$u=null,se=[],pe=null,re="lobby",ot={roomInfo:null,players:null,inputs:null},Di={},we=null,J=null;const ao={setDb(t){z=t},mount(t){return R=Eu(t),ju(),Vu}};function Vu(){ed(),J&&(J(),J=null),Pu()}function ju(){A(R.btnCreateRoom,"click",zu),A(R.btnStartGame,"click",Ku),A(R.btnEndGame,"click",Ju),A(R.btnNextGame,"click",Zu),A(R.gameSelect,"change",Yu)}async function zu(){try{const t=await Fu(z);$=t.roomCode,$u=t.hostSessionId,R.roomCodeDisplay.textContent=$;const e=window.location.origin+window.location.pathname;R.roomUrlDisplay.textContent=`${e}#/player?room=${$}`,R.roomInfo.classList.remove("hidden"),R.btnCreateRoom.disabled=!0,R.playersSection.classList.remove("hidden"),R.gameSelection.classList.remove("hidden"),R.controlsSection.classList.remove("hidden"),qu()}catch(t){console.error("Failed to create room:",t),alert("Error creating room: "+t.message)}}function qu(){ot.roomInfo=ro(z,$,t=>{re=t.phase,pe=t.currentGameId}),ot.players=Bu(z,$,t=>{se=t,(re==="lobby"||re==="results")&&io(R,se),lo()}),ot.inputs=Hu(z,$,t=>{Di=t})}function lo(){const t=$&&pe&&se.length>=2&&re==="lobby";Iu(R,t)}function Yu(t){pe=t.target.value||null,lo()}async function Ku(){if(!$||!pe||se.length<2){alert("Cannot start game: need at least 2 players and a selected game");return}try{await Ai(z,$,"inGame",pe),pe==="tanks"&&await Qu()}catch(t){console.error("Failed to start game:",t),alert("Error starting game: "+t.message)}}async function Qu(){wu(R),await Gu(z,$,se),we=Ru(se,R.canvas.width,R.canvas.height),J=ku({canvas:R.canvas,roomCode:$,db:z,getInputs:()=>Di,getState:()=>we,players:se,onGameEnd:co,onStateUpdate:t=>{oo(z,$,{tanks:t.tanks,bullets:t.bullets,winnerPlayerId:t.winnerPlayerId}).catch(console.error)}}),Xu()}async function Xu(){const t=16.666666666666668,e=Date.now(),n=()=>{const s=(Date.now()-e)/1e3;if(we&&re==="inGame"){we=Au(we,Di,Math.min(s/1e3,.033),R.canvas.width,R.canvas.height);const r=Du(we);r&&co(r)}re==="inGame"&&setTimeout(n,t)};n()}async function co(t){re="results",J&&(J(),J=null);const e=se.find(i=>i.playerId===t),n=e?e.name:"Unknown";await Ai(z,$,"results",pe),await oo(z,$,{finishedAt:Date.now(),winnerPlayerId:t}),so(R,n)}async function Ju(){re="results",J&&(J(),J=null),await Ai(z,$,"results",null),so(R,"Game Ended")}async function Zu(){bu(R,se),re="lobby",pe=null,we=null}function ed(){Object.values(ot).forEach(t=>{t&&t()}),ot={roomInfo:null,players:null,inputs:null}}function td(t){return t.innerHTML=`
    <div class="player-container">
      <div class="player-content">
        <h1 style="text-align: center; margin-bottom: 30px;">🎮 Join Game</h1>

        <!-- Join Form -->
        <div id="join-form-section">
          <div class="form-group">
            <label for="room-code-input">Room Code:</label>
            <input
              id="room-code-input"
              type="text"
              placeholder="e.g., ABCD"
              maxlength="10"
              style="text-transform: uppercase;"
            />
          </div>
          <div class="form-group">
            <label for="player-name-input">Your Name:</label>
            <input
              id="player-name-input"
              type="text"
              placeholder="Enter your name"
              maxlength="20"
            />
          </div>
          <button id="btn-join" class="primary" style="width: 100%;">Join Room</button>
          <div id="join-error" class="error-message hidden"></div>
        </div>

        <!-- Waiting Section -->
        <div id="waiting-section" class="hidden">
          <div class="player-info">
            <div class="info-line">
              <strong>Room:</strong> <span id="room-display"></span>
            </div>
            <div class="info-line">
              <strong>Name:</strong> <span id="name-display"></span>
            </div>
            <div class="info-line">
              <strong>Color:</strong>
              <span class="color-indicator" id="color-indicator" style="background-color: #fff;"></span>
            </div>
          </div>
          <div class="waiting-message">
            <p id="waiting-message">Waiting for host to start a game...</p>
          </div>
        </div>

        <!-- Game Controller Section (Tanks) -->
        <div id="game-controller-section" class="hidden">
          <h2 style="text-align: center; margin-bottom: 20px;">Tanks War</h2>
          <div class="controller-grid">
            <button id="btn-left" class="controller-btn">←</button>
            <button id="btn-up" class="controller-btn">↑</button>
            <button id="btn-right" class="controller-btn">→</button>
            <button id="btn-down" class="controller-btn">↓</button>
          </div>
          <button id="btn-shoot" class="shoot-button primary">SHOOT</button>
        </div>

        <!-- Results Section -->
        <div id="results-section" class="hidden">
          <div class="waiting-message" id="results-message"></div>
          <p style="text-align: center; color: #aaa; font-size: 14px; margin-top: 20px;">
            Waiting for next game...
          </p>
        </div>
      </div>
    </div>
  `,{joinFormSection:E("#join-form-section"),roomCodeInput:E("#room-code-input"),playerNameInput:E("#player-name-input"),btnJoin:E("#btn-join"),joinError:E("#join-error"),waitingSection:E("#waiting-section"),roomDisplay:E("#room-display"),nameDisplay:E("#name-display"),colorIndicator:E("#color-indicator"),waitingMessage:E("#waiting-message"),gameControllerSection:E("#game-controller-section"),btnUp:E("#btn-up"),btnDown:E("#btn-down"),btnLeft:E("#btn-left"),btnRight:E("#btn-right"),btnShoot:E("#btn-shoot"),resultsSection:E("#results-section"),resultsMessage:E("#results-message")}}function nd(t){t.joinFormSection.classList.remove("hidden"),t.waitingSection.classList.add("hidden"),t.gameControllerSection.classList.add("hidden"),t.resultsSection.classList.add("hidden"),t.joinError.classList.add("hidden")}function ho(t,e,n,i){t.joinFormSection.classList.add("hidden"),t.waitingSection.classList.remove("hidden"),t.gameControllerSection.classList.add("hidden"),t.resultsSection.classList.add("hidden"),t.roomDisplay.textContent=e,t.nameDisplay.textContent=n,t.colorIndicator.style.backgroundColor=i}function id(t){t.joinFormSection.classList.add("hidden"),t.waitingSection.classList.add("hidden"),t.gameControllerSection.classList.remove("hidden"),t.resultsSection.classList.add("hidden"),uo(t)}function sd(t,e){t.joinFormSection.classList.add("hidden"),t.waitingSection.classList.add("hidden"),t.gameControllerSection.classList.add("hidden"),t.resultsSection.classList.remove("hidden"),t.resultsMessage&&(t.resultsMessage.textContent=e)}function Ns(t,e){t.joinError.textContent=e,t.joinError.classList.remove("hidden")}function rd(t){t.joinError.classList.add("hidden")}function od(t,e){e?t.classList.add("active"):t.classList.remove("active")}function uo(t){[t.btnUp,t.btnDown,t.btnLeft,t.btnRight,t.btnShoot].forEach(e=>{e&&e.classList.remove("active")})}let cn=null,v=null,$e=null,$n=null,Vn=null,jn=null,zn={roomInfo:null,inputs:null},et={moveX:0,moveY:0,shoot:!1},Rs=0;const ad=50,Ce={up:!1,down:!1,left:!1,right:!1,shoot:!1},fo={setDb(t){cn=t},mount(t){v=td(t),cd(),nd(v);const n=new URLSearchParams(window.location.search).get("room");return n&&(v.roomCodeInput.value=n),ld}};function ld(){fd(),ud()}function cd(){A(v.btnJoin,"click",As),A(v.roomCodeInput,"keypress",t=>{t.key==="Enter"&&As()}),hd()}function hd(){A(v.btnUp,"pointerdown",()=>X("up")),A(v.btnUp,"pointerup",()=>U("up")),A(v.btnUp,"pointerleave",()=>U("up")),A(v.btnDown,"pointerdown",()=>X("down")),A(v.btnDown,"pointerup",()=>U("down")),A(v.btnDown,"pointerleave",()=>U("down")),A(v.btnLeft,"pointerdown",()=>X("left")),A(v.btnLeft,"pointerup",()=>U("left")),A(v.btnLeft,"pointerleave",()=>U("left")),A(v.btnRight,"pointerdown",()=>X("right")),A(v.btnRight,"pointerup",()=>U("right")),A(v.btnRight,"pointerleave",()=>U("right")),A(v.btnShoot,"pointerdown",()=>X("shoot")),A(v.btnShoot,"pointerup",()=>U("shoot")),A(v.btnShoot,"pointerleave",()=>U("shoot")),document.addEventListener("keydown",po),document.addEventListener("keyup",_o)}function ud(){document.removeEventListener("keydown",po),document.removeEventListener("keyup",_o)}function po(t){if(!v.gameControllerSection.classList.contains("hidden"))switch(t.key.toLowerCase()){case"arrowup":case"w":X("up"),t.preventDefault();break;case"arrowdown":case"s":X("down"),t.preventDefault();break;case"arrowleft":case"a":X("left"),t.preventDefault();break;case"arrowright":case"d":X("right"),t.preventDefault();break;case" ":X("shoot"),t.preventDefault();break}}function _o(t){if(!v.gameControllerSection.classList.contains("hidden"))switch(t.key.toLowerCase()){case"arrowup":case"w":U("up"),t.preventDefault();break;case"arrowdown":case"s":U("down"),t.preventDefault();break;case"arrowleft":case"a":U("left"),t.preventDefault();break;case"arrowright":case"d":U("right"),t.preventDefault();break;case" ":U("shoot"),t.preventDefault();break}}function X(t){Ce[t]=!0,mo(!0,t),go()}function U(t){Ce[t]=!1,mo(!1,t),go()}function mo(t,e){const n={up:v.btnUp,down:v.btnDown,left:v.btnLeft,right:v.btnRight,shoot:v.btnShoot};n[e]&&od(n[e],t)}function go(){const t=Date.now();let e=0,n=0;Ce.left&&(e=-1),Ce.right&&(e=1),Ce.up&&(n=1),Ce.down&&(n=-1);const i={moveX:e,moveY:n,shoot:Ce.shoot};(i.moveX!==et.moveX||i.moveY!==et.moveY||i.shoot!==et.shoot)&&t-Rs>=ad&&(et=i,Rs=t,$n&&$e&&Uu(cn,$e,$n,et).catch(console.error))}async function As(){rd(v);const t=v.roomCodeInput.value.trim().toUpperCase(),e=v.playerNameInput.value.trim();if(!t||!e){Ns(v,"Please enter both room code and name");return}try{const n=await Wu(cn,t,e);$e=n.roomCode,$n=n.playerId,Vn=n.color,jn=e,ho(v,$e,jn,Vn),dd()}catch(n){console.error("Failed to join room:",n),Ns(v,n.message||"Failed to join room")}}function dd(){zn.roomInfo=ro(cn,$e,t=>{t.phase,t.currentGameId,t.phase==="inGame"&&t.currentGameId==="tanks"?(id(v),uo(v)):t.phase==="results"?sd(v,"⏸️ Game Over"):t.phase==="lobby"&&ho(v,$e,jn,Vn)})}function fd(){Object.values(zn).forEach(t=>{t&&t()}),zn={roomInfo:null,inputs:null}}const{db:yo}=yu();ao.setDb(yo);fo.setDb(yo);const pd=document.getElementById("app");vu(pd,{hostController:ao,playerController:fo});
