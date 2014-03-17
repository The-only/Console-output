(function() {
	var wrapper = xhong.$('wrapper');
	var console = xhong.$('console');
	var str =
		'<h2><strong>控制台</strong>' + '<a class="close" id="close">X</a></h2>' +
		'<div class="content" id="content">' +
		'</div>';

	console.innerHTML = str;
	var close = xhong.$("close");
	var content = xhong.$("content");

	var consoleobj = {
		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			var self = this;
			xhong.event.addEventListener(document, "keydown", function(event) {
				if (event.ctrlKey && event.keyCode == 123) {
					console.style.display = 'block';
				}
			});
			xhong.event.addEventListener(close, "click", function() {
				console.style.display = 'none';
			});
			xhong.event.addEventListener(console, "mousedown", function(event) {
				//鼠标坐标位置
				var x = event.pageX,
					y = event.pageY;
				var mousemoveHandler = function(event) {
					var winHeight = document.documentElement.clientHeight,
						winWidth = document.documentElement.clientWidth;
					/*console的top  left*/
					var top = console.offsetTop,
						left = console.offsetLeft,
						newX = event.pageX,
						newY = event.pageY;
					if ((left + newX - x) > 0 && (left + newX - x + console.offsetWidth) < winWidth) {
						console.style.left = left + newX - x + "px";

					}
					if ((top + newY - y) > 0 && (top + newY - y + console.offsetHeight) < winHeight) {
						console.style.top = top + newY - y + "px";
					}
					x = newX;
					y = newY;
				};
				xhong.event.addEventListener(console, "mousemove", mousemoveHandler);
				xhong.event.addEventListener(console, "mouseup", function() {
					xhong.event.removeEventListener(console, "mousemove", mousemoveHandler);
				});
				xhong.event.addEventListener(console, "mouseleave", function() {
					xhong.event.removeEventListener(console, "mousemove", mousemoveHandler);
				});
			});
		},
		message: function(message) {

			content.innerHTML += '<p>' + message + '</p>';
			window.console.log(message);
			// 输入过多时，直接先显示最下面的数据
		    content.scrollTop = content.scrollHeight - content.clientHeight;
		}
	}
	consoleobj.init();
	xhong.message = consoleobj.message;
})();