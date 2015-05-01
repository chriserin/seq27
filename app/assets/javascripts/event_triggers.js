window.EVENT_TRIGGERS = {};

EVENT_TRIGGERS.downKey = function(charToPress) {
    var eventObject = document.createEvent("HTMLEvents");
    eventObject.initEvent('keypress', true, true);
    eventObject.charCode = charToPress.charCodeAt(0);
    document.dispatchEvent(eventObject);
}
