BaseViewModel
=============

BaseViewModel uses [John Resig's simple javascript inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) to provide a class based method for creating [Knockout.js](http://knockoutjs.com/) viewModels.

MVVM
====
Knockout uses a Model View ViewModel design pattern. This is how I see the role of MVVM when working with knockout and BaseViewModel.

Model - A model is a Plain Old JavaScript Object object usally (but not always) generated by parsing some 
json from a server side REST API. The model contains all the state for an object that an application may 
want to persist

View - The is the dom (or HTML) on the page that a user interacts with. Knockout takes care of binding the 
values in the dom to the ViewModel. 

ViewModel - A ViewModel is an object that wraps the model and decorates the model extra properties 
that corespond to UI only state and logic. BaseViewModel make it east to convert models into ViewModels.

Examples
========
To transform a JavaScript object (model) to a ViewModel just pass the model into a ViewModel constructor as the first argument.

```javascript
var userModel = {
  email: 'example@example.com',
  dateJoined: 1110862800000 // Unix time for March 15, 2005
};
var viewModel = new BaseViewModel(userModel);
viewModel.email(); // example@example.com
viewModel.dateJoined(); // 1110862800000
```

###Complex models
BaseViewModel never wraps objects in observables instead it will recursively check all of the object's propertues to 
find numeric, string, or array values to wrap in observables.
```javascript
var userModel = {
  email: 'example@example.com',
  dateJoined: 1110862800000, // Unix time for March 15, 2005
  roll: {
    name: 'admin'
  }
};
var viewModel = new BaseViewModel(userModel);
viewModel.roll.name(); // 'admin'

```

###Create a new ViewModel class.
You can create new ViewModel classes by calling extend on an existing ViewModel class object. This will create a new
ViewModel class object that is a prototype of its parent ViewModel class. You can call a parent's function
from within a child function by calling this._super();. The `init` function is always called when a class is 
instantiated. If you override this function remember to call this._super() so BaseViewModel can finish setting
everything up.
```javascript
var UserViewModel = BaseViewModel.extend({
  // init is the contructor function
  init: function(model) {
    // if you overwite function in a parent class you can call the parent function using _super
    this._super(model);
  },
  // other functions can be defined here
  noop: function() {}
});

var user = new UserViewModel(userModel);
```

###Add extra state observables to a ViewModel
Similar to backbone.js BaseViewModel lets you specify properties in a defaults
object to create extra observable properties on the ViewModel when it is instantiated.
```javascript
var UserViewModel = BaseViewModel.extend({
  defaults: {
    expandDropdown: false,
    showIcons: true
  },
  // init is the contructor function
  init: function(model) {
    // if you overwite function in a parent class you can call the parent function using _super
    this._super(model);
  },
  // other functions can be defined here
  noop: function() {}
});

var userModel = {
  email: 'example@example.com',
  dateJoined: 1110862800000 // Unix time for March 15, 2005
};
var viewModel = new UserViewModel(userModel);
viewModel.email(); // example@example.com
viewModel.expandDropdown(); // false
viewModel.showIcons(); // true
```

###Values outside the defaults object will not be wrapped in observables.
```javascript
var UserViewModel = BaseViewModel.extend({
  resourceUri: '/api/user/'
  // init is the contructor function
  init: function(model) {
    // if you overwite function in a parent class you can call the parent function using _super
    this._super(model);
  },
  // other functions can be defined here
  noop: function() {}
});

var userModel = {
  email: 'example@example.com',
  dateJoined: 1110862800000 // Unix time for March 15, 2005
};
var viewModel = new UserViewModel(userModel);
viewModel.resourceUri; // '/api/user/'
```


###Computed observables
Functions and objects found inside the `computed` object will be automatically wrapped in ko.computed functions
and added as proterties to the ViewModel.
```javascript
var UserViewModel = BaseViewModel.extend({
  computed: {
    gravatarUrl: function() {
      var hash = md5(this.email().trim().toLowerCase());
      return 'http://www.gravatar.com/avatar/' + hash;
    }
  },
  // init is the contructor function
  init: function(model) {
    // if you overwite function in a parent class you can call the parent function using _super
    this._super(model);
  },
  // other functions can be defined here
  noop: function() {}
});

var userModel = {
  email: 'example@example.com',
  dateJoined: 1110862800000 // Unix time for March 15, 2005
};
var viewModel = new UserViewModel(userModel);
viewModel.gravatarUrl(); // 'http://www.gravatar.com/avatar/7306a21d8e9bdae642aa57606d8393f4'
```

Assumptions
===========
- It should be trivial to transform a javascript object from the server into a viewModel knockout can use for databinding
- View models often have extra state these should be easy to define
- View models often have event handeler functions, these should be easy to define
- View models often have computed function these should be easy to define
- The viewModel should be easy to test without binding them to html
