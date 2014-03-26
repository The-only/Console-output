if(typeof window.xhong === "undefined"){
	window.xhong = {};
}

xhong.$ = function(id){
	return document.getElementById(id);
};

xhong.event = {
	addEventListener: function(elem, type, fun){
		if(elem.addEventListener){
			elem.addEventListener(type,fun,false);
		} else if(elem.attachEvent){
			elem.attachEvent('on'+type,fun);
		} else{
			elem["on"+type] = fun;
		}
	},
	removeEventListener: function(elem, type, fun){
		if(elem.removeEventListener){
			elem.removeEventListener(type, fun, false);
		} else if(elem.detachEvent){
			elem.detachEvent("on"+type, fun);
		} else{
			elem["on"+type] = null;
		}
	},
	event: function(event){
		return event ? event : window.event;
	},
	keyCode:function(event){
		if(window.event){
			return event.keyCode;
		}else{
			return event.which;
		}
	},
	pageX: function(event){
		return event.pageX === undefinded ?
			event.clientX + (document.body.scrollLeft||document.documentElement.scrollLeft)
			:event.pageY;
	},
	pageY: function(event){
		return event.pageY === undefinded ?
			event.clientY + (document.body.scrollTop||document.documentElement.scrollTop)
			:event.pageY;
	}
};
