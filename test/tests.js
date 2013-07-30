module('BaseViewModel Tests');

test('BaseViewModel should convert the properties of the first argument to observables on viewModel', 4, function(){
    var model = {id: 2, list: [1, 2, 3]};
    var viewModel = new BaseViewModel(model);

    equal(typeof viewModel.id, 'function');
    equal(viewModel.id(), 2);
    equal(typeof viewModel.list.push, 'function', 'viewModel.list should have array functions');
    deepEqual(viewModel.list(), [1, 2, 3]);
});

test('BaseViewModel should convert the properties of the defaults object to observables', 2, function(){
    var TestViewModel = BaseViewModel.extend({
        defaults: {
            foo: 'foo',
            bar: [1, 2, 3]
        }
    });
    var viewModel = new TestViewModel();

    equal(viewModel.foo(), 'foo');
    deepEqual(viewModel.bar(), [1, 2, 3]);
});


test('Properties of the first argument should override default properties', 1, function(){
    var TestViewModel = BaseViewModel.extend({
        defaults: {
            foo: 'foo'
        }
    });
    var viewModel = new TestViewModel({foo: 'bar'});

    equal(viewModel.foo(), 'bar');
});

test('BaseViewModel should convert the properties of the computed object to computed functions', 1, function(){
var TestViewModel = BaseViewModel.extend({
        computed: {
            loudFoo: function() {
                return this.foo().toUpperCase() + '!';   
            }
        }
    });
    var viewModel = new TestViewModel({foo: 'foo'});

    equal(viewModel.loudFoo(), 'FOO!');
});

test('toModel will only expose properties on the original model', 3, function(){
    var TestViewModel = BaseViewModel.extend({
        defaults: {
            foo: 'foo'
        }
    });
    var viewModel = new TestViewModel({bar: 'baz'});

    equal(viewModel.toModel().foo, undefined);
    equal(viewModel.toModel().bar, 'baz');
    deepEqual(Object.keys(viewModel.toModel()), ['bar']);
});
