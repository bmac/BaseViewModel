BaseViewModel
=============

A useful way to create knockout viewModels.

Assumptions
===========
Models are defined on the backend and provided to the client in a JSON format.
It should be trivial to transform a javascript object from the server into a viewModel knockout can use for databinding.
View models often have extra state these should be easy to define.
View models often have event handeler functions, these should be easy to define.
View models often have computed function these should be easy to define.
The viewModel should be easy to test.

Examples
========
Create a new ViewModel class.
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
