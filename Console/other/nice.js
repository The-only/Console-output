(function() {
    var outPut;
    var closeWindow;
    var viewPort;
    var consoleWindow = {
        init: function() {
            viewPort = this.generateConsole();
            outPut = QNR.$("console_Display");
            closeWindow = QNR.$("console_closeWindow");
            this.initEvent();
        },
        initEvent: function() {
            var me = this;
            QNR.event.addEventListener(document, "keydown", function(e) {
                me.keydownCtrlEventHandler(e);
            });
            QNR.event.addEventListener(viewPort, "mousedown", function(e) {
                var maxElemX = document.documentElement.clientWidth - viewPort.offsetWidth;
                var maxElemY = document.documentElement.clientHeight - viewPort.offsetHeight;
                var fixElem_pointx = e.clientX - viewPort.offsetLeft;
                var fixElem_pointy = e.clientY - viewPort.offsetTop;
                var mousemoveHandler = function(e) {
                    var left = e.clientX - fixElem_pointx; //指针距离viewPort左边界的距离
                    var top = e.clientY - fixElem_pointy; //指针距离viewPort上边界的距离   
                    me.judgeBorderandDrag(left, top, maxElemX, maxElemY);
                };
                var mouseupHandler = function(e) {
                    QNR.event.removeEventListener(document, "mousemove", mousemoveHandler);
                };
                QNR.event.addEventListener(document, "mousemove", mousemoveHandler);
                QNR.event.addEventListener(document, "mouseup", mouseupHandler);
            });
            QNR.event.addEventListener(closeWindow, "click", function(e) {
                me.closeConsole();
            });
        },
        keydownCtrlEventHandler: function(event) {
            if (event.ctrlKey && event.keyCode == 123) {
                if (!judge) {
                    this.openConsole();
                } else {
                    this.closeConsole();
                }
            }
        },
        judgeBorderandDrag: function(left, top, maxElemX, maxElemY) {
            if (left < 0) {
                left = 0;
            }
            if (left > maxElemX) {
                left = maxElemX;
            }
            top = top < 0 ? 0 : top;
            top = top > maxElemY ? maxElemY : top;
            viewPort.style.left = left + "px";
            viewPort.style.top = top + "px";
        },
        closeConsole: function() {
            viewPort.style.display = "none";
            judge = false;
        },
        openConsole: function() {
            viewPort.style.display = "block";
            judge = true;
        },
        generateConsole: function() {
            var console_div = document.createElement("div");
            console_div.setAttribute("id", "console_FixedElement");
            var inner_div = '<p class = "console_title"><span class="console_title_1">控制台'+
            '</span><a id="console_closeWindow">╳</a></p><div class="output" id ="console_Display">'+
            '</div>';
            console_div.innerHTML = inner_div;
            document.getElementsByTagName("body")[0].appendChild(console_div);
            return QNR.$("console_FixedElement");
        },
        message: function(message) {
            var consoleOutput = QNR.$("console_Display");
            if (judge) {
                var para = document.createElement("p");
                para.innerHTML = message;
                consoleOutput.appendChild(para);
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        }
    };
    consoleWindow.init();
    QNR.message = consoleWindow.message;
})();