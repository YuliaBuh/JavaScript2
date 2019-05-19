'use strict'

const str = document.getElementById("textOne").innerHTML; 
const regexp = /\B'/g;
let str2 = str.replace(regexp, '"');
document.getElementById("textTwo").innerHTML = str2;

