var judge = false;
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement /*, fromIndex */ ) {
    'use strict';
    if (this === null) {
      throw new TypeError();
    }
    var n, k, t = Object(this),
      len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }
    n = 0;
    if (arguments.length > 1) {
      n = Number(arguments[1]);
      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n !== 0 && n != Infinity && n != -Infinity) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }
    if (n >= len) {
      return -1;
    }
    for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  };
}

if (!Array.prototype.reverse) {
  Array.prototype.reverse = function() {
    var res = [];
    for (var i = this.length - 1; i >= 0; i--) {
      res.push(this[i]);
    }
    return res;
  };
}

if (typeof window.QNR === 'undefined') {
  window.QNR = {};
}

QNR.$ = function(id) {
  return document.getElementById(id);
};
QNR.getTag = function(tag) {
  return document.getElementsByTagName(tag);
};

QNR.event = {
  addEventListener: function(elem, type, fn) {
    if (window.addEventListener) {
      elem.addEventListener(type, fn);
    } else {
      elem.attachEvent('on' + type, fn);
    }
  },
  removeEventListener: function(elem, event, fn) {
    if (typeof elem.removeEventListener == "function") {
      elem.removeEventListener(event, fn, false);
    } else
      elem.detachEvent("on" + event, fn);
  },
  normaliseEvent: function(event) {
    if (!event.stopPropagation) {
      event.stopPropagation = function() {
        this.canceBubble = true;
      };
      event.preventDefault = function() {
        this.returnValue = false;
      };
    }
    if (!event.stop) {
      event.stop = function() {
        this.stopPropagation();
        this.preventDefault();
      };
    }
    if (event.srcElement && !event.target)
      event.target = event.srcElement;
    if ((event.toElement || event.fromElement) && !event.relatedTarget) //  ????
      event.relatedTarget = event.toElement || event.fromElement;
    if (event.clientX !== undefined && event.pageX === undefined) {
      event.pageX = event.clientX + document.body.scrollLeft;
      event.pageY = event.clientY + document.body.scrollTop;
    }
    if (event.type == "keydown") {
      if (event.charCode === 0 || event.charCode === undefined) {
        event.character = String.fromCharCode(event.keyCode);
      } else
        event.character = String.fromCharCode(event.charCode);
    }
  },
  doClick: function(linkId) {
    if (document.createEvent) {
      var evObj = document.createEvent('MouseEvents');
      evObj.initEvent('click', true, false);
      linkId.dispatchEvent(evObj);
    } else if (document.createEventObject) {
      linkId.fireEvent('onclick');
    }
  }
};

QNR.Tools = {
  forEach: function(array, action) {
    for (var i = 0; i < array.length; i++) {
      action(array[i]);
    }
  },
  map: function(array, action) {
    var result = [];
    this.forEach(array, function(element) {
      result.push(action(element));
    });
    return result;
  },
  filter: function(array, test) {
    var result = [];
    this.forEach(array, function(element) {
      if (test(element))
        result.push(element);
    });
    return result;
  }
};