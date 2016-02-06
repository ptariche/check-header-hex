'use strict';

let fs       = require('fs');
let co       = require('co');
let check    = require('../lib/checkStream');

const VALID_HEX = '25504446,FFD8FFE1, FFD8FFE0, FFD8FFFE, 89504E47';

let start = function () {
  co( function *() {
    let streamJPG        = fs.createReadStream('./example.jpg');
    let isValid          = yield check.checkIfValidHeader(VALID_HEX, streamJPG);

    let streamTXT        = fs.createReadStream('./bad.txt');
    let shouldNotBeValed = yield check.checkIfValidHeader(VALID_HEX, streamTXT);

    console.log('example.jpg:', isValid);
    console.log('bad.txt:', shouldNotBeValed);

  }).catch(function (err) {
    console.error(err);
  });

};

start();
