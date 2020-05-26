"use strict";

/* jshint esversion:6*/
function User(name) {
  this.name = name;
}
var hd = new User("xuhaibing");
console.dir(hd);
console.log(hd.__proto__.constructor == User);
console.log(hd.constructor == User);