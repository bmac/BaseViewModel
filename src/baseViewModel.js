(function() {
    var observableExtend = function(target, object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                target[key] = createObservable(object[key]);
            }
        }
    };

    var createObservable = function(value) {
        if (Array.isArray(value)) {
            return ko.observableArray(value);
        }
        return ko.observable(value);
    };

    var computedExtend = function(target, object) {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                target[key] = ko.computed(object[key], target);
            }
        }
    };

    var baseViewModel = Class.extend({
        init: function(object) {
            observableExtend(this, this.defaults);
            observableExtend(this, object);
            computedExtend(this, this.computed);
        }        
    });

    window.BaseViewModel = baseViewModel;
}());
