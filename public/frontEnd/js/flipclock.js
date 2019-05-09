var Base=function(){};Base.extend=function(_instance,_static){"use strict";var extend=Base.prototype.extend;Base._prototyping=!0;var proto=new this();extend.call(proto,_instance);proto.base=function(){};delete Base._prototyping;var constructor=proto.constructor;var klass=proto.constructor=function(){if(!Base._prototyping){if(this._constructing||this.constructor==klass){this._constructing=!0;constructor.apply(this,arguments);delete this._constructing}else if(arguments[0]!==null){return(arguments[0].extend||extend).call(arguments[0],proto)}}};klass.ancestor=this;klass.extend=this.extend;klass.forEach=this.forEach;klass.implement=this.implement;klass.prototype=proto;klass.toString=this.toString;klass.valueOf=function(type){return(type=="object")?klass:constructor.valueOf()};extend.call(klass,_static);if(typeof klass.init=="function")klass.init();return klass};Base.prototype={extend:function(source,value){if(arguments.length>1){var ancestor=this[source];if(ancestor&&(typeof value=="function")&&(!ancestor.valueOf||ancestor.valueOf()!=value.valueOf())&&/\bbase\b/.test(value)){var method=value.valueOf();value=function(){var previous=this.base||Base.prototype.base;this.base=ancestor;var returnValue=method.apply(this,arguments);this.base=previous;return returnValue};value.valueOf=function(type){return(type=="object")?value:method};value.toString=Base.toString}
this[source]=value}else if(source){var extend=Base.prototype.extend;if(!Base._prototyping&&typeof this!="function"){extend=this.extend||extend}
var proto={toSource:null};var hidden=["constructor","toString","valueOf"];var i=Base._prototyping?0:1;while(key=hidden[i++]){if(source[key]!=proto[key]){extend.call(this,key,source[key])}}
for(var key in source){if(!proto[key])extend.call(this,key,source[key])}}
return this}};Base=Base.extend({constructor:function(){this.extend(arguments[0])}},{ancestor:Object,version:"1.1",forEach:function(object,block,context){for(var key in object){if(this.prototype[key]===undefined){block.call(context,object[key],key,object)}}},implement:function(){for(var i=0;i<arguments.length;i++){if(typeof arguments[i]=="function"){arguments[i](this.prototype)}else{this.prototype.extend(arguments[i])}}
return this},toString:function(){return String(this.valueOf())}});var FlipClock;(function($){"use strict";FlipClock=function(obj,digit,options){if(typeof digit=="object"){options=digit;digit=0}
return new FlipClock.Factory(obj,digit,options)};FlipClock.Lang={};FlipClock.Base=Base.extend({buildDate:'2014-06-03',version:'0.5.5',constructor:function(_default,options){if(typeof _default!=="object"){_default={}}
if(typeof options!=="object"){options={}}
this.setOptions($.extend(!0,{},_default,options))},callback:function(method){if(typeof method==="function"){var args=[];for(var x=1;x<=arguments.length;x++){if(arguments[x]){args.push(arguments[x])}}
method.apply(this,args)}},log:function(str){if(window.console&&console.log){console.log(str)}},getOption:function(index){if(this[index]){return this[index]}
return!1},getOptions:function(){return this},setOption:function(index,value){this[index]=value},setOptions:function(options){for(var key in options){if(typeof options[key]!=="undefined"){this.setOption(key,options[key])}}}})}(jQuery));(function($){"use strict";FlipClock.Face=FlipClock.Base.extend({dividers:[],factory:!1,lists:[],constructor:function(factory,options){this.base(options);this.factory=factory;this.dividers=[]},build:function(){},createDivider:function(label,css,excludeDots){if(typeof css=="boolean"||!css){excludeDots=css;css=label}
var dots=['<span class="'+this.factory.classes.dot+' top"></span>','<span class="'+this.factory.classes.dot+' bottom"></span>'].join('');if(excludeDots){dots=''}
label=this.factory.localize(label);var html=['<span class="'+this.factory.classes.divider+' '+(css?css:'').toLowerCase()+'">','<span class="'+this.factory.classes.label+'">'+(label?label:'')+'</span>',dots,'</span>'];return $(html.join(''))},createList:function(digit,options){if(typeof digit==="object"){options=digit;digit=0}
var obj=new FlipClock.List(this.factory,digit,options);return obj},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0);this.flip(this.factory.original,!1)},addDigit:function(digit){var obj=this.createList(digit,{classes:{active:this.factory.classes.active,before:this.factory.classes.before,flip:this.factory.classes.flip}});obj.$obj.insertBefore(this.factory.lists[0].$obj);this.factory.lists.unshift(obj)},start:function(){},stop:function(){},increment:function(){if(!(this.factory.time.time instanceof Date)){if(!this.factory.countdown){this.factory.time.addSecond()}
else{if(this.factory.time.getTimeSeconds()==0){this.factory.stop()}
else{this.factory.time.subSecond()}}}},flip:function(time,doNotAddPlayClass){var t=this;this.increment();var offset=t.factory.lists.length-time.length;if(offset<0){offset=0}
$.each(time,function(i,digit){i+=offset;var list=t.factory.lists[i];if(list){list.select(digit);if(!doNotAddPlayClass){list.play()}}
else{t.addDigit(digit)}});for(var x=0;x<time.length;x++){if(x>=offset&&t.factory.lists[x].digit!=time[x]){t.factory.lists[x].select(time[x])}}}})}(jQuery));(function($){"use strict";FlipClock.Factory=FlipClock.Base.extend({autoStart:!0,callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},classes:{active:'flip-clock-active',before:'flip-clock-before',divider:'flip-clock-divider',dot:'flip-clock-dot',label:'flip-clock-label',flip:'flip',play:'play',wrapper:'flip-clock-wrapper'},clockFace:'HourlyCounter',defaultClockFace:'HourlyCounter',defaultLanguage:'english',language:'english',lang:!1,original:!1,face:!0,running:!1,time:!1,timer:!1,lists:[],$wrapper:!1,constructor:function(obj,digit,options){if(!options){options={}}
this.lists=[];this.running=!1;this.base(options);this.$wrapper=$(obj).addClass(this.classes.wrapper);this.original=(digit instanceof Date)?digit:(digit?Math.round(digit):0);this.time=new FlipClock.Time(this,this.original,{minimumDigits:options.minimumDigits?options.minimumDigits:0,animationRate:options.animationRate?options.animationRate:1000});this.timer=new FlipClock.Timer(this,options);this.lang=this.loadLanguage(this.language);this.face=this.loadClockFace(this.clockFace,options);if(this.autoStart){this.start()}},loadClockFace:function(name,options){var face,suffix='Face';name=name.ucfirst()+suffix;if(FlipClock[name]){face=new FlipClock[name](this,options)}
else{face=new FlipClock[this.defaultClockFace+suffix](this,options)}
face.build();return face},loadLanguage:function(name){var lang;if(FlipClock.Lang[name.ucfirst()]){lang=FlipClock.Lang[name.ucfirst()]}
else if(FlipClock.Lang[name]){lang=FlipClock.Lang[name]}
else{lang=FlipClock.Lang[this.defaultLanguage]}
return lang},localize:function(index,obj){var lang=this.lang;if(!index){return null}
var lindex=index.toLowerCase();if(typeof obj=="object"){lang=obj}
if(lang&&lang[lindex]){return lang[lindex]}
return index},start:function(callback){var t=this;if(!t.running&&(!t.countdown||t.countdown&&t.time.time>0)){t.face.start(t.time);t.timer.start(function(){t.flip();if(typeof callback==="function"){callback()}})}
else{t.log('Trying to start timer when countdown already at 0')}},stop:function(callback){this.face.stop();this.timer.stop(callback);for(var x in this.lists){this.lists[x].stop()}},reset:function(callback){this.timer.reset(callback);this.face.reset()},setTime:function(time){this.time.time=time;this.flip(!0)},getTime:function(time){return this.time},setCountdown:function(value){var running=this.running;this.countdown=value?!0:!1;if(running){this.stop();this.start()}},flip:function(doNotAddPlayClass){this.face.flip(!1,doNotAddPlayClass)}})}(jQuery));(function($){"use strict";FlipClock.List=FlipClock.Base.extend({digit:0,classes:{active:'flip-clock-active',before:'flip-clock-before',flip:'flip'},factory:!1,$obj:!1,items:[],minimumDigits:0,constructor:function(factory,digit,options){this.factory=factory;this.digit=digit;this.$obj=this.createList();if(digit>0){this.select(digit)}
this.factory.$wrapper.append(this.$obj)},select:function(digit){if(typeof digit==="undefined"){digit=this.digit}
else{this.digit=digit}
var target=this.$obj.find('[data-digit="'+digit+'"]');var active=this.$obj.find('.'+this.classes.active).removeClass(this.classes.active);var before=this.$obj.find('.'+this.classes.before).removeClass(this.classes.before);if(!this.factory.countdown){if(target.is(':first-child')){this.$obj.find(':last-child').addClass(this.classes.before)}
else{target.prev().addClass(this.classes.before)}}
else{if(target.is(':last-child')){this.$obj.find(':first-child').addClass(this.classes.before)}
else{target.next().addClass(this.classes.before)}}
target.addClass(this.classes.active)},play:function(){this.$obj.addClass(this.factory.classes.play)},stop:function(){var t=this;setTimeout(function(){t.$obj.removeClass(t.factory.classes.play)},this.factory.timer.interval)},createList:function(){var html=$('<ul class="'+this.classes.flip+' '+(this.factory.running?this.factory.classes.play:'')+'" />');for(var x=0;x<10;x++){var item=$(['<li data-digit="'+x+'">','<a href="#">','<div class="up">','<div class="shadow"></div>','<div class="inn">'+x+'</div>','</div>','<div class="down">','<div class="shadow"></div>','<div class="inn">'+x+'</div>','</div>','</a>','</li>'].join(''));this.items.push(item);html.append(item)}
return html}})}(jQuery));(function($){"use strict";String.prototype.ucfirst=function(){return this.substr(0,1).toUpperCase()+this.substr(1)};$.fn.FlipClock=function(digit,options){if(typeof digit=="object"){options=digit;digit=0}
return new FlipClock($(this),digit,options)};$.fn.flipClock=function(digit,options){return $.fn.FlipClock(digit,options)}}(jQuery));(function($){"use strict";FlipClock.Time=FlipClock.Base.extend({time:0,factory:!1,minimumDigits:0,constructor:function(factory,time,options){this.base(options);this.factory=factory;if(time){this.time=time}},convertDigitsToArray:function(str){var data=[];str=str.toString();for(var x=0;x<str.length;x++){if(str[x].match(/^\d*$/g)){data.push(str[x])}}
return data},digit:function(i){var timeStr=this.toString();var length=timeStr.length;if(timeStr[length-i]){return timeStr[length-i]}
return!1},digitize:function(obj){var data=[];$.each(obj,function(i,value){value=value.toString();if(value.length==1){value='0'+value}
for(var x=0;x<value.length;x++){data.push(value.charAt(x))}});if(data.length>this.minimumDigits){this.minimumDigits=data.length}
if(this.minimumDigits>data.length){for(var x=data.length;x<this.minimumDigits;x++){data.unshift('0')}}
return data},getDayCounter:function(includeSeconds){var digits=[this.getDays(),this.getHours(!0),this.getMinutes(!0)];if(includeSeconds){digits.push(this.getSeconds(!0))}
return this.digitize(digits)},getDays:function(mod){var days=this.getTimeSeconds()/60/60/24;if(mod){days=days%7}
return Math.floor(days)},getHourCounter:function(){var obj=this.digitize([this.getHours(),this.getMinutes(!0),this.getSeconds(!0)]);return obj},getHourly:function(){return this.getHourCounter()},getHours:function(mod){var hours=this.getTimeSeconds()/60/60;if(mod){hours=hours%24}
return Math.floor(hours)},getMilitaryTime:function(){var date=new Date();var obj=this.digitize([date.getHours(),date.getMinutes(),date.getSeconds()]);return obj},getMinutes:function(mod){var minutes=this.getTimeSeconds()/60;if(mod){minutes=minutes%60}
return Math.floor(minutes)},getMinuteCounter:function(){var obj=this.digitize([this.getMinutes(),this.getSeconds(!0)]);return obj},getTimeSeconds:function(mod){if(this.time instanceof Date){if(this.factory.countdown){if((new Date()).getTime()>this.time.getTime()){this.factory.stop()}
return Math.max(this.time.getTime()/1000-(new Date()).getTime()/1000,0)}else{return(new Date()).getTime()/1000-this.time.getTime()/1000}}else{return this.time}},getSeconds:function(mod){var seconds=this.getTimeSeconds();if(mod){if(seconds==60){seconds=0}
else{seconds=seconds%60}}
return Math.ceil(seconds)},getTime:function(){var date=new Date();var hours=date.getHours();var merid=hours>12?'PM':'AM';var obj=this.digitize([hours>12?hours-12:(hours===0?12:hours),date.getMinutes(),date.getSeconds()]);return obj},getWeeks:function(){var weeks=this.getTimeSeconds()/60/60/24/7;if(mod){weeks=weeks%52}
return Math.floor(weeks)},removeLeadingZeros:function(totalDigits,digits){var total=0;var newArray=[];$.each(digits,function(i,digit){if(i<totalDigits){total+=parseInt(digits[i],10)}
else{newArray.push(digits[i])}});if(total===0){return newArray}
return digits},addSeconds:function(x){this.time+=x},addSecond:function(){this.addSeconds(1)},subSeconds:function(x){this.time-=x},subSecond:function(){this.subSeconds(1)},toString:function(){return this.getTimeSeconds().toString()}})}(jQuery));(function($){"use strict";FlipClock.Timer=FlipClock.Base.extend({callbacks:{destroy:!1,create:!1,init:!1,interval:!1,start:!1,stop:!1,reset:!1},count:0,factory:!1,interval:1000,animationRate:1000,constructor:function(factory,options){this.base(options);this.factory=factory;this.callback(this.callbacks.init);this.callback(this.callbacks.create)},getElapsed:function(){return this.count*this.interval},getElapsedTime:function(){return new Date(this.time+this.getElapsed())},reset:function(callback){clearInterval(this.timer);this.count=0;this._setInterval(callback);this.callback(this.callbacks.reset)},start:function(callback){this.factory.running=!0;this._createTimer(callback);this.callback(this.callbacks.start)},stop:function(callback){this.factory.running=!1;this._clearInterval(callback);this.callback(this.callbacks.stop);this.callback(callback)},_clearInterval:function(){clearInterval(this.timer)},_createTimer:function(callback){this._setInterval(callback)},_destroyTimer:function(callback){this._clearInterval();this.timer=!1;this.callback(callback);this.callback(this.callbacks.destroy)},_interval:function(callback){this.callback(this.callbacks.interval);this.callback(callback);this.count++},_setInterval:function(callback){var t=this;t._interval(callback);t.timer=setInterval(function(){t._interval(callback)},this.interval)}})}(jQuery));(function($){FlipClock.TwentyFourHourClockFace=FlipClock.Face.extend({constructor:function(factory,options){factory.countdown=!1;this.base(factory,options)},build:function(time){var t=this;var children=this.factory.$wrapper.find('ul');time=time?time:(this.factory.time.time||this.factory.time.getMilitaryTime());if(time.length>children.length){$.each(time,function(i,digit){t.factory.lists.push(t.createList(digit))})}
this.dividers.push(this.createDivider());this.dividers.push(this.createDivider());$(this.dividers[0]).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj);$(this.dividers[1]).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj);this._clearExcessDigits();if(this.autoStart){this.start()}},flip:function(time,doNotAddPlayClass){time=time?time:this.factory.time.getMilitaryTime();this.base(time,doNotAddPlayClass)},_clearExcessDigits:function(){var tenSeconds=this.factory.lists[this.factory.lists.length-2];var tenMinutes=this.factory.lists[this.factory.lists.length-4];for(var x=6;x<10;x++){tenSeconds.$obj.find('li:last-child').remove();tenMinutes.$obj.find('li:last-child').remove()}}})}(jQuery));(function($){FlipClock.CounterFace=FlipClock.Face.extend({autoStart:!1,minimumDigits:2,constructor:function(factory,options){factory.timer.interval=0;factory.autoStart=!1;factory.running=!0;factory.increment=function(){factory.countdown=!1;factory.setTime(factory.getTime().getTimeSeconds()+1)};factory.decrement=function(){factory.countdown=!0;var time=factory.getTime().getTimeSeconds();if(time>0){factory.setTime(time-1)}};factory.setValue=function(digits){factory.setTime(digits)};factory.setCounter=function(digits){factory.setTime(digits)};this.base(factory,options)},increment:function(){},build:function(){var t=this;var children=this.factory.$wrapper.find('ul');var lists=[];var time=this.factory.getTime().digitize([this.factory.getTime().time]);if(time.length>children.length){$.each(time,function(i,digit){var list=t.createList(digit,{minimumDigits:t.minimumDigits,});list.select(digit);lists.push(list)})}
$.each(lists,function(i,list){list.play()});this.factory.lists=lists},flip:function(time,doNotAddPlayClass){if(!time){time=this.factory.getTime().digitize([this.factory.getTime().time])}
this.base(time,doNotAddPlayClass)},reset:function(){this.factory.time=new FlipClock.Time(this.factor,this.factory.original?Math.round(this.factory.original):0);this.flip()}})}(jQuery));(function($){FlipClock.DailyCounterFace=FlipClock.Face.extend({showSeconds:!0,constructor:function(factory,options){this.base(factory,options)},build:function(excludeHours,time){var t=this;var children=this.factory.$wrapper.find('ul');var lists=[];var offset=0;time=time?time:this.factory.time.getDayCounter(this.showSeconds);if(time.length>children.length){$.each(time,function(i,digit){lists.push(t.createList(digit))})}
this.factory.lists=lists;if(this.showSeconds){$(this.createDivider('Secs')).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj)}
else{offset=2}
$(this.createDivider('Mins')).insertBefore(this.factory.lists[this.factory.lists.length-4+offset].$obj);$(this.createDivider('Hours')).insertBefore(this.factory.lists[this.factory.lists.length-6+offset].$obj);$(this.createDivider('Days',!0)).insertBefore(this.factory.lists[0].$obj);this._clearExcessDigits();if(this.autoStart){this.start()}},flip:function(time,doNotAddPlayClass){if(!time){time=this.factory.time.getDayCounter(this.showSeconds)}
this.base(time,doNotAddPlayClass)},_clearExcessDigits:function(){var tenSeconds=this.factory.lists[this.factory.lists.length-2];var tenMinutes=this.factory.lists[this.factory.lists.length-4];for(var x=6;x<10;x++){tenSeconds.$obj.find('li:last-child').remove();tenMinutes.$obj.find('li:last-child').remove()}}})}(jQuery));(function($){FlipClock.HourlyCounterFace=FlipClock.Face.extend({clearExcessDigits:!0,constructor:function(factory,options){this.base(factory,options)},build:function(excludeHours,time){var t=this;var children=this.factory.$wrapper.find('ul');var lists=[];time=time?time:this.factory.time.getHourCounter();if(time.length>children.length){$.each(time,function(i,digit){lists.push(t.createList(digit))})}
this.factory.lists=lists;$(this.createDivider('Seconds')).insertBefore(this.factory.lists[this.factory.lists.length-2].$obj);$(this.createDivider('Minutes')).insertBefore(this.factory.lists[this.factory.lists.length-4].$obj);if(!excludeHours){$(this.createDivider('Hours',!0)).insertBefore(this.factory.lists[0].$obj)}
if(this.clearExcessDigits){this._clearExcessDigits()}
if(this.autoStart){this.start()}},flip:function(time,doNotAddPlayClass){if(!time){time=this.factory.time.getHourCounter()}
this.base(time,doNotAddPlayClass)},_clearExcessDigits:function(){var tenSeconds=this.factory.lists[this.factory.lists.length-2];var tenMinutes=this.factory.lists[this.factory.lists.length-4];for(var x=6;x<10;x++){tenSeconds.$obj.find('li:last-child').remove();tenMinutes.$obj.find('li:last-child').remove()}}})}(jQuery));(function($){FlipClock.MinuteCounterFace=FlipClock.HourlyCounterFace.extend({clearExcessDigits:!1,constructor:function(factory,options){this.base(factory,options)},build:function(){this.base(!0,this.factory.time.getMinuteCounter())},flip:function(time,doNotAddPlayClass){if(!time){time=this.factory.time.getMinuteCounter()}
this.base(time,doNotAddPlayClass)},})}(jQuery));(function($){FlipClock.TwelveHourClockFace=FlipClock.TwentyFourHourClockFace.extend({meridium:!1,meridiumText:'AM',build:function(time){var t=this;time=time?time:(this.factory.time.time?this.factory.time.time:this.factory.time.getTime());this.base(time);this.meridiumText=this._isPM()?'PM':'AM';this.meridium=$(['<ul class="flip-clock-meridium">','<li>','<a href="#">'+this.meridiumText+'</a>','</li>','</ul>'].join(''));this.meridium.insertAfter(this.factory.lists[this.factory.lists.length-1].$obj)},flip:function(time,doNotAddPlayClass){if(this.meridiumText!=this._getMeridium()){this.meridiumText=this._getMeridium();this.meridium.find('a').html(this.meridiumText)}
this.base(this.factory.time.getTime(),doNotAddPlayClass)},_getMeridium:function(){return new Date().getHours()>=12?'PM':'AM'},_isPM:function(){return this._getMeridium()=='PM'?!0:!1},_clearExcessDigits:function(){var tenSeconds=this.factory.lists[this.factory.lists.length-2];var tenMinutes=this.factory.lists[this.factory.lists.length-4];for(var x=6;x<10;x++){tenSeconds.$obj.find('li:last-child').remove();tenMinutes.$obj.find('li:last-child').remove()}}})}(jQuery));(function($){FlipClock.Lang.Arabic={'years':'سنوات','months':'شهور','days':'أيام','hours':'ساعات','minutes':'دقائق','seconds':'ثواني'};FlipClock.Lang.ar=FlipClock.Lang.Arabic;FlipClock.Lang['ar-ar']=FlipClock.Lang.Arabic;FlipClock.Lang.arabic=FlipClock.Lang.Arabic}(jQuery));(function($){FlipClock.Lang.Danish={'years':'År','months':'Måneder','days':'Dage','hours':'Timer','minutes':'Minutter','seconds':'Sekunder'};FlipClock.Lang.da=FlipClock.Lang.Danish;FlipClock.Lang['da-dk']=FlipClock.Lang.Danish;FlipClock.Lang.danish=FlipClock.Lang.Danish}(jQuery));(function($){FlipClock.Lang.German={'years':'Jahre','months':'Monate','days':'Tage','hours':'Stunden','minutes':'Minuten','seconds':'Sekunden'};FlipClock.Lang.de=FlipClock.Lang.German;FlipClock.Lang['de-de']=FlipClock.Lang.German;FlipClock.Lang.german=FlipClock.Lang.German}(jQuery));(function($){FlipClock.Lang.English={'years':'Years','months':'Months','days':'Days','hours':'Hours','minutes':'Minutes','seconds':'Seconds'};FlipClock.Lang.en=FlipClock.Lang.English;FlipClock.Lang['en-us']=FlipClock.Lang.English;FlipClock.Lang.english=FlipClock.Lang.English}(jQuery));(function($){FlipClock.Lang.Spanish={'years':'A&#241;os','months':'Meses','days':'D&#205;as','hours':'Horas','minutes':'Minutos','seconds':'Segundo'};FlipClock.Lang.es=FlipClock.Lang.Spanish;FlipClock.Lang['es-es']=FlipClock.Lang.Spanish;FlipClock.Lang.spanish=FlipClock.Lang.Spanish}(jQuery));(function($){FlipClock.Lang.French={'years':'Ans','months':'Mois','days':'Jours','hours':'Heures','minutes':'Minutes','seconds':'Secondes'};FlipClock.Lang.fr=FlipClock.Lang.French;FlipClock.Lang['fr-ca']=FlipClock.Lang.French;FlipClock.Lang.french=FlipClock.Lang.French}(jQuery));(function($){FlipClock.Lang.Italian={'years':'Anni','months':'Mesi','days':'Giorni','hours':'Ore','minutes':'Minuti','seconds':'Secondi'};FlipClock.Lang.it=FlipClock.Lang.Italian;FlipClock.Lang['it-it']=FlipClock.Lang.Italian;FlipClock.Lang.italian=FlipClock.Lang.Italian}(jQuery));(function($){FlipClock.Lang.Latvian={'years':'Gadi','months':'Mēneši','days':'Dienas','hours':'Stundas','minutes':'Minūtes','seconds':'Sekundes'};FlipClock.Lang.lv=FlipClock.Lang.Latvian;FlipClock.Lang['lv-lv']=FlipClock.Lang.Latvian;FlipClock.Lang.latvian=FlipClock.Lang.Latvian}(jQuery));(function($){FlipClock.Lang.Dutch={'years':'Jaren','months':'Maanden','days':'Dagen','hours':'Uren','minutes':'Minuten','seconds':'Seconden'};FlipClock.Lang.nl=FlipClock.Lang.Dutch;FlipClock.Lang['nl-be']=FlipClock.Lang.Dutch;FlipClock.Lang.dutch=FlipClock.Lang.Dutch}(jQuery));(function($){FlipClock.Lang.Russian={'years':'лет','months':'месяцев','days':'дней','hours':'часов','minutes':'минут','seconds':'секунд'};FlipClock.Lang.ru=FlipClock.Lang.Russian;FlipClock.Lang['ru-ru']=FlipClock.Lang.Russian;FlipClock.Lang.russian=FlipClock.Lang.Russian}(jQuery));(function($){FlipClock.Lang.Swedish={'years':'År','months':'Månader','days':'Dagar','hours':'Timmar','minutes':'Minuter','seconds':'Sekunder'};FlipClock.Lang.sv=FlipClock.Lang.Danish;FlipClock.Lang['sv-se']=FlipClock.Lang.Danish;FlipClock.Lang.swedish=FlipClock.Lang.Danish}(jQuery))