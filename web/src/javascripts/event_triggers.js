window.EVENT_TRIGGERS = {};

EVENT_TRIGGERS.downKey = function(charToPress) {
    var eventObject = document.createEvent("HTMLEvents");
    eventObject.initEvent('keypress', true, true);

    if (charToPress === 'ESC') {
        eventObject.keyCode = 27
    } else {
        eventObject.charCode = charToPress.charCodeAt(0);
    }

    eventObject.charCode = charToPress.charCodeAt(0);
    document.dispatchEvent(eventObject);
}

EVENT_TRIGGERS.executeKeyDown = function(keyName) {
    var eventObject = document.createEvent("HTMLEvents");
    eventObject.initEvent('keydown', true, true);

    eventObject.key = 'ArrowUp'

    document.dispatchEvent(eventObject);
}
