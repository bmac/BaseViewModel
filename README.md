BaseViewModel
=============

A useful way to create knockout viewModels.


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
