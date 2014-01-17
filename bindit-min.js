(function(){window.BindIt={}}).call(this);(function(){BindIt.Logger=console}).call(this);
(function(){var d;d=function(){function d(){this.keys=[];this.values=[];Object.defineProperty(this,"length",{get:function(){return this.keys.length}})}d.prototype.add=function(d,e){var c;c=this.keys.indexOf(d);if(0>c)this.keys.push(d),this.values.push(e);else return this.values[c]=e};d.prototype.remove=function(d){d=this.keys.indexOf(d);if(!(0>d))return this.keys.splice(d,1),this.values.splice(d,1)};d.prototype.clear=function(){this.keys.length=0;return this.values.length=0};d.prototype.get=function(d){d=
this.keys.indexOf(d);return this.values[d]};d.prototype.getKeyByValue=function(d){d=this.values.indexOf(d);return this.keys[d]};d.prototype.length=function(){return this.keys.length};return d}();BindIt.Hash=d}).call(this);
(function(){var d;d=function(){function d(){this.eventHandlers={}}d.prototype.addEventListener=function(d,e){null==this.eventHandlers[d]&&(this.eventHandlers[d]=[]);return this.eventHandlers[d].push(e)};d.prototype.removeEventListener=function(d,e){var c;if(null!=this.eventHandlers[d]&&(c=this.eventHandlers[d].indexOf(e),!(0>c)))return this.eventHandlers[d].splice(c,1)};d.prototype.callEvent=function(d,e){var c,a,b,k,r;if(null!=this.eventHandlers[d]){k=this.eventHandlers[d];r=[];a=0;for(b=k.length;a<
b;a++)c=k[a],r.push(c.apply(this,e));return r}};return d}();window.BindIt.EventDispatcher=d}).call(this);
(function(){var d,f,l,e={}.hasOwnProperty,c=function(a,b){function k(){this.constructor=a}for(var c in b)e.call(b,c)&&(a[c]=b[c]);k.prototype=b.prototype;a.prototype=new k;a.__super__=b.prototype;return a};d=function(a){function b(a,c){var d;this.source=a;null==this.source&&(this.source={});if(this.source instanceof b)return this.source;if(null!=this.source.__bindit_model)return this.source.__bindit_model;if(this.source instanceof Array&&!0!==c)return new BindIt.ModelArray(this.source);b.__super__.constructor.call(this);
Object.defineProperty(this.source,"__bindit_model",{get:function(){return this}.bind(this),enumerable:!1});if(!(this.source instanceof Array))for(d in this.source)l(this,d)}c(b,a);b.prototype.getSource=function(){return this.source};return b}(BindIt.EventDispatcher);f=function(a){return null==a?null:a instanceof Object?new d(a):a};l=function(a,b){if(!a.hasOwnProperty(b))return Object.defineProperty(a,b,{get:function(){var k;k=a.getSource()[b];if(null==k)return null;if(k instanceof Function)return k.bind(a);
k instanceof Object&&(k=new d(k));return k},set:function(k){var c,q;c=a.getSource();q=c[b];k instanceof d&&(k=k.getSource());if(q!==k)return c[b]=k,this.callEvent(d.Events.VALUE_CHANGED,[a,b,f(q),f(k)])},enumerable:!0})};d.processProperty=l;d.Events={VALUE_CHANGED:"value_changed",ARRAY_CHANGED:"array_changed"};window.BindIt.Model=d;window.BindIt.getModel=f;window.BindIt.getSource=function(a){return null==a?null:a instanceof d?a.getSource():a}}).call(this);
(function(){var d,f,l={}.hasOwnProperty,e=function(c,a){function b(){this.constructor=c}for(var k in a)l.call(a,k)&&(c[k]=a[k]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};BindIt.Model.ArrayEvents={INSERTED:"inserted",REMOVED:"removed",APOCALYPTIC:"apocalyptic"};d=function(c){function a(b,k){this.source=b;a.__super__.constructor.call(this,this.source,!0);BindIt.Model.processProperty(this,"length");this.source.selectedItem=0;BindIt.Model.processProperty(this,"selectedItem");
null==k&&(k=!0);!0===k&&(this.source.selectedItems=0,BindIt.Model.processProperty(this,"selectedItems"),this.selectedItems=new BindIt.ModelArray([],!1));f(this);this.addEventListener(BindIt.Model.Events.VALUE_CHANGED,function(b,a,k,c){if("length"===a&&!(k>c))return f(b)})}e(a,c);a.prototype.push=function(b){var a;a=this.getSource().push(BindIt.getSource(b));f(this);this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,[this,BindIt.Model.ArrayEvents.INSERTED,this.getSource().length-1,BindIt.getModel(b)]);
return BindIt.getModel(a)};a.prototype.pop=function(){var b;b=this.getSource().pop();this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,[this,BindIt.Model.ArrayEvents.REMOVED,this.getSource().length,BindIt.getModel(b)]);return BindIt.getModel(b)};a.prototype.concat=function(b){return new BindIt.Model(this.getSource().concat(b))};a.prototype.join=function(b){return this.getSource().join(b)};a.prototype.reverse=function(){var b;b=this.getSource().reverse();this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,
[this,BindIt.Model.ArrayEvents.APOCALYPTIC]);return BindIt.getModel(b)};a.prototype.shift=function(){var b;b=this.getSource().shift();this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,[this,BindIt.Model.ArrayEvents.REMOVED,0,BindIt.getModel(b)]);return BindIt.getModel(b)};a.prototype.slice=function(){return new BindIt.Model(this.getSource().slice.apply(this.getSource(),arguments))};a.prototype.sort=function(){var b;b=this.getSource().sort.apply(this.getSource(),arguments);this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,
[this,BindIt.Model.ArrayEvents.APOCALYPTIC]);return BindIt.getModel(b)};a.prototype.splice=function(){var b;b=this.getSource().splice.apply(this.getSource(),arguments);this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,[this,BindIt.Model.ArrayEvents.APOCALYPTIC]);return BindIt.getModel(b)};a.prototype.unshift=function(b){var a;a=this.getSource().unshift(BindIt.getSource(b));this.callEvent(BindIt.Model.Events.ARRAY_CHANGED,[this,BindIt.Model.ArrayEvents.INSERTED,0,BindIt.getModel(b)]);return BindIt.getModel(a)};
a.prototype.indexOf=function(b){return this.getSource().indexOf(BindIt.getSource(b))};return a}(BindIt.Model);f=function(c){var a,b,k,d;d=[];a=b=0;for(k=c.length-1;0<=k?b<=k:b>=k;a=0<=k?++b:--b)d.push(BindIt.Model.processProperty(c,a));return d};window.BindIt.ModelArray=d}).call(this);
(function(){var d,f={}.hasOwnProperty,l=function(d,c){function a(){this.constructor=d}for(var b in c)f.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};d=function(d){function c(a){var b=this;this.element=a;c.__super__.constructor.call(this);BindIt.DOM.addEventHandler(this.element,"click",function(){return b.callEvent("click",arguments)})}l(c,d);c.prototype.click=function(a){return this.addEventListener("click",a)};return c}(BindIt.EventDispatcher);
BindIt.DOMEventDispatcher=d}).call(this);
(function(){var d,f=function(c,a){return function(){return c.apply(a,arguments)}},l={}.hasOwnProperty,e=function(c,a){function b(){this.constructor=c}for(var k in a)l.call(a,k)&&(c[k]=a[k]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};BindIt.DATA_BIND_ATTRIBUTE="data-bind";BindIt.FORM_BIND_ATTRIBUTE="form-bind";d=function(c){function a(b){this.element=b;this.modelArrayHandler=f(this.modelArrayHandler,this);this.modelHandler=f(this.modelHandler,this);if(null!=this.element.__bindit_view)throw Error("Element should have only one view");
a.__super__.constructor.call(this,this.element);b.__bindit_view=this;this.subscribes=[];this.refreshSubscribes()}e(a,c);a.prototype.getValue=function(b){var a,c;a=this.getModelPath();if(null==a||0===a.length)return null;try{c=eval(a.shift())}catch(d){}for(;0<a.length;){if(null==c)return null;c instanceof BindIt.ModelArray&&(c=c[c.selectedItem]);null!=c&&(c=c[a.shift()])}c instanceof BindIt.ModelArray&&!0!==b&&(c=c[c.selectedItem]);return c};a.prototype.setValue=function(b){var a,c;a=this.getModelPath();
null==a&&(a=[]);for(c=window;1<a.length;){if(null==c)return;c instanceof BindIt.ModelArray&&(c=c[c.selectedItem]);if(null==c)return;c=c[a.shift()]}if(null!=c&&(c instanceof BindIt.ModelArray&&(c=c[c.selectedItem]),null!=c))return c[a[0]]=b};a.prototype.callBindFunction=function(){var b,a,c;a=this.getModelPath();null==a&&(a=[]);c=null;for(b=window;0<a.length&&null!=b;){b instanceof BindIt.ModelArray&&(c=b,b=b[b.selectedItem]);if(null==b)break;c=b;b=b[a.shift()]}if(null!=b&&b instanceof Function)return b.apply(c,
arguments)};a.prototype.getModelPath=function(){var b,a;b=this.element.getAttribute(BindIt.DATA_BIND_ATTRIBUTE);if(null===b)return null;for(a=this.element.parentNode;null!==a;)null!=a.hasAttribute&&a.hasAttribute(BindIt.FORM_BIND_ATTRIBUTE)&&(b=""+a.getAttribute(BindIt.FORM_BIND_ATTRIBUTE)+":"+b),a=a.parentNode;return b.split(":")};a.prototype.modelHandler=function(b,a,c,d){this.refreshSubscribes();return"function"===typeof this.changed?this.changed(this,b,BindIt.Model.Events.VALUE_CHANGED,a,c,d):
void 0};a.prototype.modelArrayHandler=function(b,a,c,d){this.refreshSubscribes();return"function"===typeof this.changed?this.changed(this,b,BindIt.Model.Events.ARRAY_CHANGED,a,c,d):void 0};a.prototype.refreshSubscribes=function(){var b,a,c,d,m,e,g;a=this.getModelPath();null==a&&(a=[]);b=window;for(c=[];0<a.length&&null!=b;){b instanceof BindIt.ModelArray&&(b=b[b.selectedItem],b instanceof BindIt.Model&&c.push(b));if(null==b)break;b=b[a.shift()];b instanceof BindIt.Model&&c.push(b)}this.fillSubscribes(b,
c,!1);a=[];d=[];m=0;for(e=c.length;m<e;m++)b=c[m],0>this.subscribes.indexOf(b)&&d.push(b);g=this.subscribes;m=0;for(e=g.length;m<e;m++)b=g[m],0>c.indexOf(b)&&a.push(b);m=0;for(e=d.length;m<e;m++)b=d[m],b.addEventListener(BindIt.Model.Events.VALUE_CHANGED,this.modelHandler),b instanceof BindIt.ModelArray&&b.addEventListener(BindIt.Model.Events.ARRAY_CHANGED,this.modelArrayHandler);d=0;for(m=a.length;d<m;d++)b=a[d],b.removeEventListener(BindIt.Model.Events.VALUE_CHANGED,this.modelHandler),b instanceof
BindIt.ModelArray&&b.removeEventListener(BindIt.Model.Events.ARRAY_CHANGED,this.modelArrayHandler);return this.subscribes=c};a.prototype.fillSubscribes=function(b,a,c){var d,m;if(null!=b&&b instanceof BindIt.Model&&!(0<=a.indexOf(b)&&c))if(0>a.indexOf(b)&&a.push(b),b instanceof BindIt.ModelArray)for(this.fillSubscribes(b.selectedItems,a,!0),c=0,m=b.length;c<m;c++)d=b[c],this.fillSubscribes(d,a,!0);else{c=[];for(d in b)c.push(this.fillSubscribes(b[d],a,!0));return c}};return a}(BindIt.DOMEventDispatcher);
BindIt.View=d}).call(this);
(function(){var d,f,l,e;BindIt.VIEW_ATTRIBUTE="view";f=function(c){var a;a=c.getAttribute(BindIt.VIEW_ATTRIBUTE);null==a&&(a=BindIt.View.Default[c.tagName.toLowerCase()]);null==a&&(a="BindIt.View");c=BindIt.View;try{c=eval(a)}catch(b){}return c};d=function(c){var a;if(null!=c&&(null==c.__bindit_view&&null!=c.getAttribute)&&(a=c.getAttribute(BindIt.DATA_BIND_ATTRIBUTE),null!=a))return new (f(c))(c)};e=function(c){var a,b,k,r;d(c);if(null!=c.getElementsByTagName){a=c.getElementsByTagName("*");r=[];
b=0;for(k=a.length;b<k;b++)c=a[b],r.push(d(c));return r}};BindIt.DOM={getViewClass:f,createView:d,processElement:e,addEventHandler:function(c,a,b){if(null!=b&&null!=c.addEventListener)return c.addEventListener(a,b)}};BindIt.View.Default={};l=function(){return e(document)};(function(){BindIt.DOM.addEventHandler(window,"load",l);return BindIt.DOM.addEventHandler(window,"DOMSubtreeModified",function(c){return e(c.target)})})()}).call(this);
(function(){var d,f,l,e,c,a=function(b,a){return function(){return b.apply(a,arguments)}};d=function(){function b(c){this.template=c;this.create=a(this.create,this);if(this.template instanceof b)return this.template}b.prototype.create=function(){var b;b=c(this,this.template.tag,arguments);b=null!=b?document.createElement(b):document.createDocumentFragment();l(this,b,arguments);e(this,b,arguments);return b};return b}();l=function(b,a,r){var q,m,e,g,f;m=b.template.attributes;null==m&&(m={});m=c(b,m,
r);f=d.OftenAttributes;e=0;for(g=f.length;e<g;e++)q=f[e],null!=b.template[q]&&(m[q]=b.template[q]);e=[];for(q in m)b=m[q],b=c(this,b,r),e.push(a.setAttribute(q,b));return e};e=function(b,a,d){var q,e,n,g,p;e=c(b,b.template.html,d);n=c(b,b.template.text,d);q=c(b,b.template.child,d);if(1<(null!=e?1:0)+(null!=n?1:0)+(null!=q?1:0))throw Error("Template exception. Only one available: html, text, child");null!=e&&(a.innerHTML=e);null!=n&&(a.innerText=n);if(null!=q){p=[];n=0;for(g=q.length;n<g;n++)e=q[n],
p.push(f(b,a,e,d));return p}};f=function(b,a,c,e){var m,f;m=c;m instanceof Function&&(m=m.apply(b,e));if("string"===typeof m)return a.appendChild(document.createTextNode(m));if(m instanceof Node&&(null!=c[d.TEMPLATE_ID_PROPERTY]&&(a[c[d.TEMPLATE_ID_PROPERTY]]=c),m instanceof Node))return a.appendChild(c);if(m instanceof Object)return b=new d(m),null!=b[d.TEMPLATE_ID_PROPERTY]&&(f=b[d.TEMPLATE_ID_PROPERTY]),null!=b.template[d.TEMPLATE_ID_PROPERTY]&&null==f&&(f=b.template[d.TEMPLATE_ID_PROPERTY]),e=
b.create.apply(m,e),null!=f&&(a[f]=e),a.appendChild(e)};c=function(b,a,c){var d;d=a;a instanceof Function&&(d=a.apply(b,c));return d};d.OftenAttributes=["id","name","class","style","src","href","value",BindIt.DATA_BIND_ATTRIBUTE,BindIt.VIEW_ATTRIBUTE,"item-view","type","form-bind"];d.TEMPLATE_ID_PROPERTY="template-id";BindIt.Template=d}).call(this);
(function(){var d,f,l={}.hasOwnProperty,e=function(c,a){function b(){this.constructor=c}for(var d in a)l.call(a,d)&&(c[d]=a[d]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};d=function(c){function a(b){var c;this.element=b;a.__super__.constructor.call(this,this.element);this.calculateItemView();null!=this.itemView&&("function"===typeof(c=this.itemView).init&&c.init(this),this.itemsSubscribes=new BindIt.Hash,this.itemsElements=[],this.changed())}e(a,c);a.prototype.changed=
function(b,a,c,d,e,f){this.callChanged(a,c,c===BindIt.Model.Events.VALUE_CHANGED?null:d,c===BindIt.Model.Events.VALUE_CHANGED?null:e,c===BindIt.Model.Events.VALUE_CHANGED?d:null,c===BindIt.Model.Events.VALUE_CHANGED?e:null,f);return this.refreshItemsSubscribes()};a.prototype.callChanged=function(b,a,c,d,e,n,g){var p,l,h;h=this.getValue(!0);p=this.itemsSubscribes.get(b);c!==BindIt.Model.ArrayEvents.INSERTED&&c!==BindIt.Model.ArrayEvents.REMOVED&&(d=h.indexOf(p));l=this.itemsElements[d];if(null!=p&&
null!=l&&(d=h.indexOf(p),null!=p&&null!=l))return this.itemView.changed(l,h,d,h.selectedItem===d,0<=h.selectedItems.indexOf(d));if(b===h&&a===BindIt.Model.Events.VALUE_CHANGED){if("length"===e){if(n<g)for(d=h=n,g-=1;n<=g?h<=g:h>=g;d=n<=g?++h:--h)this.element.appendChild(this.createItemElement(b,d));else{for(;null!=this.element.childNodes[g];)h=this.element.childNodes[this.element.childNodes.length-1],this.element.removeChild(h);this.itemsElements.length=g}return}if("selectedItem"===e){this.itemView.changed(this.itemsElements[n],
h,n,!1,0<=h.selectedItems.indexOf(n));this.itemView.changed(this.itemsElements[g],h,g,!0,0<=h.selectedItems.indexOf(n));return}if("selectedItems"===e){b=[];d=0;for(a=n.length;d<a;d++)p=n[d],b.push(p);d=0;for(n=g.length;d<n;d++)p=g[d],b.push(p);if(0<b.length)for(d=g=0,b=b.length-1;0<=b?g<=b:g>=b;d=0<=b?++g:--g)this.itemView.changed(this.itemsElements[d],h,d,d===h.selectedItem,0<=h.selectedItems.indexOf(d));return}if(f(e)&&(d=parseInt(e),l=this.itemsElements[d],null!=g&&null!=l))return this.itemView.changed(l,
h,d,h.selectedItem===d,0<=h.selectedItems.indexOf(d))}if(b===h.selectedItems){if(c===BindIt.Model.ArrayEvents.INSERTED){l=this.itemsElements[g];this.itemView.changed(l,h,g,h.selectedItem===g,0<=h.selectedItems.indexOf(g));return}if(c===BindIt.Model.ArrayEvents.REMOVED){l=this.itemsElements[g];this.itemView.changed(l,h,g,h.selectedItem===g,0<=h.selectedItems.indexOf(g));return}if(a===BindIt.Model.Events.VALUE_CHANGED&&f(e)){this.itemView.changed(this.itemsElements[n],h,n,h.selectedItem===n,0<=h.selectedItems.indexOf(n));
this.itemView.changed(this.itemsElements[g],h,g,h.selectedItem===g,0<=h.selectedItems.indexOf(g));return}}if(b===h&&c===BindIt.Model.ArrayEvents.INSERTED){n=this.createItemElement(b,d);if(h.length>d+1)for(g=p=a=d+1,c=h.length-1;a<=c?p<=c:p>=c;g=a<=c?++p:--p)this.itemView.changed(this.itemsElements[g],h,g,h.selectedItem===g,0<=h.selectedItems.indexOf(g));return d===b.length-1?this.element.appendChild(n):this.element.insertBefore(n,this.element.childNodes[d])}if(b===h&&c===BindIt.Model.ArrayEvents.REMOVED){this.itemsElements.splice(d,
1);if(h.length>d)for(g=b=n=d,p=h.length-1;n<=p?b<=p:b>=p;g=n<=p?++b:--b)this.itemView.changed(this.itemsElements[g],h,g,h.selectedItem===g,0<=h.selectedItems.indexOf(g));return this.element.removeChild(this.element.childNodes[d])}return this.apocalyptic()};a.prototype.calculateItemView=function(){var b;if(this.element.hasAttribute(a.ITEM_VIEW_ATTRIBUTE)){b=this.element.getAttribute(a.ITEM_VIEW_ATTRIBUTE);try{this.itemView=eval(b)}catch(c){BindIt.Logger.warn("BindIt.View.ListView: invalid '"+a.ITEM_VIEW_ATTRIBUTE+
"' attribute",this.element);return}if(null==this.itemView)return BindIt.Logger.warn("BindIt.View.ListView: invalid '"+a.ITEM_VIEW_ATTRIBUTE+"' attribute",this.element)}else BindIt.Logger.warn("BindIt.View.ListView: element hasn't '"+a.ITEM_VIEW_ATTRIBUTE+"' attribute",this.element)};a.prototype.apocalyptic=function(){for(var b,a,c,d,e;null!=this.element.firstChild;)this.element.removeChild(this.element.firstChild);this.itemsElements=[];c=this.getValue(!0);if(null!=c){b=document.createDocumentFragment();
if(0<c.length)for(a=d=0,e=c.length-1;0<=e?d<=e:d>=e;a=0<=e?++d:--d)b.appendChild(this.createItemElement(c,a));return this.element.appendChild(b)}};a.prototype.createItemElement=function(b,a){var c;c=this.itemView.create(b,a,b.selectedItem===a,0<=b.selectedItems.indexOf(a));this.itemsElements.splice(a,0,c);return c};a.prototype.refreshItemsSubscribes=function(){var b,a,c,d,e,f,g;d=this.getValue(!0);if(null!=d){this.itemsSubscribes.clear();g=[];e=0;for(f=d.length;e<f;e++)b=d[e],null!=b?(c=[],this.fillSubscribes(b,
c,!0),g.push(function(){var d,e,g;g=[];d=0;for(e=c.length;d<e;d++)a=c[d],g.push(this.itemsSubscribes.add(a,b));return g}.call(this))):g.push(void 0);return g}};return a}(BindIt.View);f=function(c){return parseInt(c)===c};d.ITEM_VIEW_ATTRIBUTE="item-view";BindIt.View.List=d}).call(this);
(function(){var d,f={}.hasOwnProperty,l=function(d,c){function a(){this.constructor=d}for(var b in c)f.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};d=function(d){function c(a){var b;this.element=a;b=this.element.getAttribute("type")||"undefined";a=c.byType[b.toLowerCase()];if(null!=a&&a instanceof Function)return new a(this.element);BindIt.Logger.warn("Can't find view class for input tag with type '"+b+"'",this.element)}l(c,d);return c}(BindIt.View);
d.byType={};BindIt.View.Input=d;BindIt.View.Default.input=d}).call(this);
(function(){var d,f={}.hasOwnProperty,l=function(d,c){function a(){this.constructor=d}for(var b in c)f.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};d=function(d){function c(a){var b=this;this.element=a;c.__super__.constructor.call(this,this.element);this.setEnabled(this.getValue(!1));this.click(function(){var a;a=b.getValue(!1);if(b.getEnabled(a)){if(a instanceof Function)return b.callBindFunction();if(a.call instanceof Function)return a.call.apply(a)}})}
l(c,d);c.prototype.changed=function(){return this.setEnabled(this.getValue(!1))};c.prototype.setEnabled=function(a){return this.getEnabled(a)?this.element.removeAttribute("disabled"):this.element.setAttribute("disabled","disabled")};c.prototype.getEnabled=function(a){var b;if(null===a)return!1;if(a instanceof Function)return!0;a instanceof Object&&(b=a.enabled);b instanceof Function&&(b=b.apply(a));return!0===b&&(a instanceof Function||a.call instanceof Function)};return c}(BindIt.View);BindIt.View.Button=
d;BindIt.View.Default.button=d;BindIt.View.Default.a=d;BindIt.View.Input.byType.button=d}).call(this);
(function(){var d,f=function(c,a){return function(){return c.apply(a,arguments)}},l={}.hasOwnProperty,e=function(c,a){function b(){this.constructor=c}for(var d in a)l.call(a,d)&&(c[d]=a[d]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};d=function(c){function a(b){this.element=b;this.calculateEvent=f(this.calculateEvent,this);this.elementListener=f(this.elementListener,this);this.keyup=f(this.keyup,this);a.__super__.constructor.call(this,this.element);this.changed();this.calculateEvent("enter");
this.calculateEvent("esc");this.element.onchange=this.elementListener;this.element.onkeyup=this.keyup;this.element.onpaste=this.elementListener}e(a,c);a.prototype.changed=function(){this.setEnabled();return this.setElementValue(this.getValue())};a.prototype.setEnabled=function(){return null!=this.getValue()?this.element.removeAttribute("disabled"):this.element.setAttribute("disabled","disabled")};a.prototype.setElementValue=function(a){a=a||"";if(this.element.value!==a)return this.element.value=a};
a.prototype.keyup=function(a){this.elementListener();13===a.keyCode&&"function"===typeof this.enter&&this.enter(a);if(27===a.keyCode)return"function"===typeof this.esc?this.esc(a):void 0};a.prototype.elementListener=function(){if(this.element.value!==this.getValue())return this.setValue(this.element.value)};a.prototype.calculateEvent=function(a){var c,d,e,f,l=this;if(this.element.hasAttribute(a)){f=this.element.getAttribute(a);c=f.lastIndexOf(".");c=0>c?"window":c=f.substr(0,c);try{return d=eval(f),
e=eval(c),this[a]=function(a){if(null!=d&&d instanceof Function)return d.apply(e,[l,a])}}catch(g){}}};return a}(BindIt.View);BindIt.View.Text=d;BindIt.View.Default.textarea=d;BindIt.View.Input.byType.text=d;BindIt.View.Input.byType.password=d;BindIt.View.Input.byType.hidden=d;BindIt.View.Input.byType.email=d;BindIt.View.Input.byType.search=d;BindIt.View.Input.byType.tel=d;BindIt.View.Input.byType.color=d;BindIt.View.Input.byType.range=d;BindIt.View.Input.byType.number=d;BindIt.View.Input.byType.url=
d;BindIt.View.Input.byType.time=d;BindIt.View.Input.byType.month=d;BindIt.View.Input.byType.week=d;BindIt.View.Input.byType.date=d;BindIt.View.Input.byType.datetime=d;BindIt.View.Input.byType["datetime-local"]=d}).call(this);
(function(){var d,f={}.hasOwnProperty,l=function(d,c){function a(){this.constructor=d}for(var b in c)f.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};d=function(d){function c(a){c.__super__.constructor.call(this,a);this.subscribe();this.changed()}l(c,d);c.prototype.changed=function(){this.setElementValue(!0===this.getValue());return this.setElementEnabled(!0===this.getValue()||!1===this.getValue())};c.prototype.subscribe=function(){var a=this;return this.element.onchange=
function(){return a.setValue(a.getElementValue())}};c.prototype.getElementValue=function(){return this.element.checked};c.prototype.setElementValue=function(a){return this.element.checked=a};c.prototype.setElementEnabled=function(a){return a?this.element.removeAttribute("disabled"):this.element.setAttribute("disabled","")};return c}(BindIt.View);BindIt.View.Checkbox=d;BindIt.View.Input.byType.checkbox=d}).call(this);
(function(){var d,f,l={}.hasOwnProperty,e=function(c,a){function b(){this.constructor=c}for(var d in a)l.call(a,d)&&(c[d]=a[d]);b.prototype=a.prototype;c.prototype=new b;c.__super__=a.prototype;return c};f=function(){function c(){}c.prototype.init=function(a){return a.element.onchange=function(){var b;b=a.getValue(!0);if(null!=b)return b.selectedItem=parseInt(a.element.value)}};c.prototype.create=function(a,b,c){var d;d=document.createElement("option");d.innerHTML=a[b];d.setAttribute("value",b);this.setSelected(d,
a,b,c);return d};c.prototype.changed=function(a,b,c,d){a.innerHTML=b[c];return this.setSelected(a,b,c,d)};c.prototype.setSelected=function(a,b,c,d){return d?a.setAttribute("selected",""):a.removeAttribute("selected")};return c}();f.instance=new f;d=function(c){function a(b){this.element=b;a.__super__.constructor.call(this,this.element)}e(a,c);a.prototype.calculateItemView=function(){return this.itemView=f.instance};return a}(BindIt.View.List);d.ItemView=f;BindIt.View.Select=d;BindIt.View.Default.select=
d}).call(this);
(function(){var d,f={}.hasOwnProperty,l=function(d,c){function a(){this.constructor=d}for(var b in c)f.call(c,b)&&(d[b]=c[b]);a.prototype=c.prototype;d.prototype=new a;d.__super__=c.prototype;return d};d=function(d){function c(a){var b=this;this.element=a;c.__super__.constructor.call(this,this.element);this.element.onchange=function(){return b.setValue(b.element.getAttribute(c.VALUE_ATTRIBUTE))};this.changed()}l(c,d);c.prototype.changed=function(){var a,b;b=this.getValue(!1);a=this.element.getAttribute(c.VALUE_ATTRIBUTE);this.setElementEnabled(null!=
b);return this.setElementChecked(b===a)};c.prototype.setElementEnabled=function(a){return a?this.element.removeAttribute("disabled"):this.element.setAttribute("disabled","")};c.prototype.setElementChecked=function(a){return a?this.element.setAttribute("checked",""):this.element.removeAttribute("checked")};return c}(BindIt.View);d.VALUE_ATTRIBUTE="value";BindIt.View.Radio=d;BindIt.View.Input.byType.radio=d}).call(this);
