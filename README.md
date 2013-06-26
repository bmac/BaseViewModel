BaseViewModel
=============

BaseViewModel uses [John Resig's simple javascript inheritance](http://ejohn.org/blog/simple-javascript-inheritance/) to provide a class based method for creating [Knockout.js](http://knockoutjs.com/) viewModels.

MVVM
====
Knockout uses a model view view model pattern.

Examples
========
To transform a JavaScript object (model) to a viewModel just pass the model into a viewModel constructor as the first argument.

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
```

###Add extra state observables to a viewModel
Create a new ViewModel class.
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

###Values outside the defaults dict will not be wrapped in observables.
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


###Simple computed observables?
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
- Models are defined on the backend and provided to the client in a JSON format
- It should be trivial to transform a javascript object from the server into a viewModel knockout can use for databinding
- View models often have extra state these should be easy to define
- View models often have event handeler functions, these should be easy to define
- View models often have computed function these should be easy to define
- The viewModel should be easy to test
