# check-header-hex
This repository checks for valid file headers; the function is a generator, so you need to yield.

##Usage
    npm install check-header-hex
    var check    = require('check-header-hex');
    var stream   = fs.createReadStream(file.path);  // or data stream
    var validHex = '25504446,FFD8FFE1, FFD8FFE0, FFD8FFFE, 89504E47'; // This can be an individual hex or comma delimited;
    var isValid  = yield check.checkIfValidHeader(validHex, stream); 

The function returns true or false. 

