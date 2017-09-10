/*
  *target: tab切换的内容框架id,
  *control: tab切换的操作容器id,
  *type: 触发事件类型，click,mouseover...
  *auto：自动切换
  *current: 默认显示指定tab
  *stay: 停留时间,与auto配合使用
*/
var $ = function(id){
	return document.getElementById(id);
}
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn);
	}else{
		obj.attachEvent("on" + type,fn);
	}
}
function TabModule(arg){

	// 设置默认显示模块
	var controls = $(arg.control).getElementsByTagName("li");
	controls[arg.current].className = "current";
	var pannels = $(arg.target).getElementsByTagName("div");
	[].forEach.call(pannels,function(pannel){
		pannel.style.display = "none";
	});
	pannels[arg.current].style.display = "block";

	var that = this;
	var len = controls.length;

	// 事件触发时切换
	for(var i = 0; i < controls.length; i++){
		(function(i){
			addEvent(controls[i],arg.type,function(){
				clearInterval(timer);
				that.change(i,controls,pannels);
		    })
		    addEvent(controls[i],"mouseleave",function(){
		    	// arg.current = i;
		    	timer = that.auto(len,controls,pannels,arg.stay,i);
		    })
		})(i)
	}

	// 设置自动切换
	var timer;
	if(arg.auto){
		timer = this.auto(len,controls,pannels,arg.stay,arg.current);
	}
}
TabModule.prototype = {
	change: function(ind,controls,pannels){
		[].forEach.call(controls,function(control){
			control.className = "";
		});
		controls[ind].className = "current";

		[].forEach.call(pannels,function(pannel){
			pannel.style.display = "none";
		});
		pannels[ind].style.display = "block";
	},
	auto: function(len,controls,pannels,stay,current){
		var times = current,that = this;
		return setInterval(function(){
			if (times >= len - 1) {
				times = 0;
				that.change(times,controls,pannels);
				return false;
			}
			times = times + 1;
			that.change(times,controls,pannels);
		},stay)
	}
}