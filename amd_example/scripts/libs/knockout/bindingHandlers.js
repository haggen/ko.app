define(['knockout'], function (ko) {
    ko.bindingHandlers['test'] = {
        init: function (element, valueAccessor) {
            console.log("test init");
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                console.log("test dispose");
            });
        }
    };
});
