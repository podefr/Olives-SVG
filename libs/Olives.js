/*
 Olives http://flams.github.com/olives
 The MIT License (MIT)
 Copyright (c) 2012 Olivier Scherrer <pode.fr@gmail.com> - Olivier Wietrich <olivier.wietrich@gmail.com>
*/
define("Olives/DomUtils",function(){return{getNodes:function(b,h){return this.isAcceptedType(b)?(b.parentNode||document.createDocumentFragment().appendChild(b),b.parentNode.querySelectorAll(h||"*")):false},getDataset:function(b){var h=0,g,j={},e,a;if(this.isAcceptedType(b))if(b.hasOwnProperty("dataset"))return b.dataset;else{for(g=b.attributes.length;h<g;h++)e=b.attributes[h].name.split("-"),e.shift()=="data"&&(j[a=e.join("-")]=b.getAttribute("data-"+a));return j}else return false},isAcceptedType:function(b){return b instanceof
HTMLElement||b instanceof SVGElement?true:false},setAttribute:function(b,h,g){return b instanceof HTMLElement?(b[h]=g,true):b instanceof SVGElement?(b.setAttribute(h,g),true):false}}});define("Olives/Event-plugin",function(){return function(b){this.listen=function(h,g,j,e){h.addEventListener(g,function(a){b[j].call(b,a,h)},e=="true")}}});
define("Olives/LocalStore",["Store","Tools"],function(b,h){function g(){var b=null,e=localStorage,a=function(){e.setItem(b,this.toJSON())};this.setLocalStorage=function(d){return d&&d.setItem instanceof Function?(e=d,true):false};this.getLocalStorage=function(){return e};this.sync=function(d){return typeof d=="string"?(b=d,d=JSON.parse(e.getItem(d)),h.loop(d,function(d,a){this.has(a)||this.set(a,d)},this),a.call(this),this.watch("added",a,this),this.watch("updated",a,this),this.watch("deleted",a,
this),true):false}}return function(j){g.prototype=new b(j);return new g}});
define("Olives/Model-plugin",["Store","Observable","Tools","Olives/DomUtils"],function(b,h,g,j){return function(e,a){var d=null,f={},k={};this.observers={};this.setModel=function(l){return l instanceof b?(d=l,true):false};this.getModel=function(){return d};this.ItemRenderer=function(l,a){var c=null,f=null,e=null,k=null,h=null;this.setRenderer=function(a){c=a;return true};this.getRenderer=function(){return c};this.setRootNode=function(c){return j.isAcceptedType(c)?(e=c,c=e.querySelector("*"),this.setRenderer(c),
c&&e.removeChild(c),true):false};this.getRootNode=function(){return e};this.setPlugins=function(c){f=c;return true};this.getPlugins=function(){return f};this.items=new b([]);this.setStart=function(c){return k=parseInt(c,10)};this.getStart=function(){return k};this.setNb=function(c){return h=c=="*"?c:parseInt(c,10)};this.getNb=function(){return h};this.addItem=function(c){var a;return typeof c=="number"&&!this.items.get(c)?(a=this.create(c))?((c=this.getNextItem(c))?e.insertBefore(a,c):e.appendChild(a),
true):false:false};this.getNextItem=function(c){return this.items.alter("slice",c+1).filter(function(c){if(j.isAcceptedType(c))return true})[0]};this.removeItem=function(c){var a=this.items.get(c);return a?(e.removeChild(a),this.items.set(c),true):false};this.create=function(a){if(d.has(a)){var l=c.cloneNode(true),i=j.getNodes(l);g.toArray(i).forEach(function(c){c.setAttribute("data-"+f.name+"_id",a)});this.items.set(a,l);f.apply(l);return l}};this.render=function(){var c=h=="*"?d.getNbItems():h,
a=[];if(h!==null&&k!==null){this.items.loop(function(l,i){(i<k||i>=k+c||!d.has(i))&&a.push(i)},this);a.sort(g.compareNumbers).reverse().forEach(this.removeItem,this);for(var l=k,i=c+k;l<i;l++)this.addItem(l);return true}else return false};this.setPlugins(l);this.setRootNode(a)};this.setItemRenderer=function(a,i){k[a||"default"]=i};this.getItemRenderer=function(a){return k[a]};this.foreach=function(a,i,c,e){var f=new this.ItemRenderer(this.plugins,a);f.setStart(c||0);f.setNb(e||"*");f.render();d.watch("added",
f.render,f);d.watch("deleted",function(c){f.render();this.observers[c]&&this.observers[c].forEach(function(c){d.unwatchValue(c)},this);delete this.observers[c]},this);this.setItemRenderer(i,f)};this.updateStart=function(a,i){var c=this.getItemRenderer(a);return c?(c.setStart(i),true):false};this.updateNb=function(a,i){var c=this.getItemRenderer(a);return c?(c.setNb(i),true):false};this.refresh=function(a){return(a=this.getItemRenderer(a))?(a.render(),true):false};this.bind=function(a,i,c){var c=c||
"",f=a.getAttribute("data-"+this.plugins.name+"_id"),e=c.split("."),b=f||e.shift(),k=f?c:e.join("."),f=g.getNestedProperty(d.get(b),k),h=g.toArray(arguments).slice(3);if(f||f===0||f===false)this.execBinding.apply(this,[a,i,f].concat(h))||j.setAttribute(a,i,f);this.hasBinding(i)||a.addEventListener("change",function(){d.has(b)&&(k?d.update(b,c,a[i]):d.set(b,a[i]))},true);this.observers[b]=this.observers[b]||[];this.observers[b].push(d.watchValue(b,function(c){this.execBinding.apply(this,[a,i,g.getNestedProperty(c,
k)].concat(h))||j.setAttribute(a,i,g.getNestedProperty(c,k))},this))};this.set=function(a){return j.isAcceptedType(a)&&a.name?(d.set(a.name,a.value),true):false};this.form=function i(i){if(i&&i.nodeName=="FORM"){var c=this;i.addEventListener("submit",function(a){g.toArray(i.querySelectorAll("[name]")).forEach(c.set,c);a.preventDefault()},true);return true}else return false};this.addBinding=function(a,c){return a&&typeof a=="string"&&typeof c=="function"?(f[a]=c,true):false};this.execBinding=function(a,
c){return this.hasBinding(c)?(f[c].apply(a,Array.prototype.slice.call(arguments,2)),true):false};this.hasBinding=function(a){return f.hasOwnProperty(a)};this.getBinding=function(a){return f[a]};this.addBindings=function(a){return g.loop(a,function(a,f){this.addBinding(f,a)},this)};this.setModel(e);this.addBindings(a)}});
define("Olives/OObject",["StateMachine","Store","Olives/Plugins","Olives/DomUtils","Tools"],function(b,h,g,j,e){return function(a){var d=function(a){var c=k||document.createElement("div");if(a.template){typeof a.template=="string"?c.innerHTML=a.template.trim():j.isAcceptedType(a.template)&&c.appendChild(a.template);if(c.childNodes.length>1)throw Error("UI.template should have only one parent node");else a.dom=c.childNodes[0];a.plugins.apply(a.dom)}else throw Error("UI.template must be set prior to render");
},f=function c(a,c,f){c&&(f?c.insertBefore(a.dom,f):c.appendChild(a.dom),k=c)},k=null,l=new b("Init",{Init:[["render",d,this,"Rendered"],["place",function(a,b){d(a);f.apply(null,e.toArray(arguments))},this,"Rendered"]],Rendered:[["place",f,this],["render",d,this]]});this.model=a instanceof h?a:new h;this.plugins=new g;this.dom=this.template=null;this.place=function(a,f){l.event("place",this,a,f)};this.render=function(){l.event("render",this)};this.setTemplateFromDom=function(a){return j.isAcceptedType(a)?
(this.template=a,true):false};this.alive=function(a){return j.isAcceptedType(a)?(this.setTemplateFromDom(a),this.place(a.parentNode,a.nextElementSibling),true):false}}});
define("Olives/Plugins",["Tools","Olives/DomUtils"],function(b,h){return function(){var g={},j=function(a){return a.trim()},e=function(a,b,f){b.split(";").forEach(function(b){var d=b.split(":"),b=d[0].trim(),d=d[1]?d[1].split(",").map(j):[];d.unshift(a);g[f]&&g[f][b]&&g[f][b].apply(g[f],d)})};this.add=function(a,b){var f=this;return typeof a=="string"&&typeof b=="object"&&b?(g[a]=b,b.plugins={name:a,apply:function(){return f.apply.apply(f,arguments)}},true):false};this.addAll=function(a){return b.loop(a,
function(a,f){this.add(f,a)},this)};this.get=function(a){return g[a]};this.del=function(a){return delete g[a]};this.apply=function(a){var d;return h.isAcceptedType(a)?(d=h.getNodes(a),b.loop(b.toArray(d),function(a){b.loop(h.getDataset(a),function(b,d){e(a,b,d)})}),a):false}}});
define("Olives/Transport",["Observable","Tools"],function(b,h){return function(g,j){var e=null,a=null,d=new b;this.setIO=function(b){return b&&typeof b.connect=="function"?(a=b,true):false};this.getIO=function(){return a};this.connect=function(b){return typeof b=="string"?(e=a.connect(b),true):false};this.getSocket=function(){return e};this.on=function(a,b){e.on(a,b)};this.once=function(a,b){e.once(a,b)};this.emit=function(a,b,d){e.emit(a,b,d)};this.request=function(a,b,d,h){var c=Date.now()+Math.floor(Math.random()*
1E6),g=function(){d&&d.apply(h||null,arguments)};e[b.__keepalive__?"on":"once"](c,g);b.__eventId__=c;e.emit(a,b);if(b.__keepalive__)return function(){e.emit("disconnect-"+c);e.removeListener(c,g)}};this.listen=function(a,b,e,g){var c=a+"/"+b.path,j,m;d.hasTopic(c)||(h.mixin({method:"GET",__keepalive__:true},b),m=this.request(a,b,function(a){d.notify(c,a)},this));j=d.watch(c,e,g);return function(){d.unwatch(j);d.hasTopic(c)||m()}};this.getListenObservable=function(){return d};this.setIO(g);this.connect(j)}});
define("Olives/UI-plugin",["Olives/OObject","Tools"],function(b,h){return function(g){var j={};this.place=function(e,a){if(j[a]instanceof b)j[a].place(e);else throw Error(a+" is not an OObject UI in place:"+a);};this.set=function(e,a){return typeof e=="string"&&a instanceof b?(j[e]=a,true):false};this.setAll=function(b){h.loop(b,function(a,b){this.set(b,a)},this)};this.get=function(b){return j[b]};this.setAll(g)}});