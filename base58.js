//Alphabet excludes 0,I, and O to avoid confusion
var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";

// base is the length of the alphabet (58 in this case)
var base = alphabet.length;

//converts base 10 integer to base 58 string
function encode(num){
  //intializes an empty string
  var encoded = '';
  //while num is truthy
  while (num){
    //remainder of num % base which num will change each time through the while loop
    var remainder = num % base;
    //this is where num is reset to the the first num/base and rounded up or down
    num = Math.floor(num / base);
    //use remainder as the index of alphabet, change to string and add to empty string
    //next time through loop, remainder will be different because num was reset.
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}

//converts a base 58 string to base 10 integer
function decode(str){
  var decoded = 0;
  while (str){
    var index = alphabet.indexOf(str[0]);
    var power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;
