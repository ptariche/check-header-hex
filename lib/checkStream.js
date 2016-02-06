'use strict';

let checkIfValidHeader = function (hexes, stream) {
  return new Promise ( function (resolve, reject) {
    if (!stream || stream === null || stream === undefined) throw new Error('There is no stream');
    stream.on('data', function (data) {
      try {
        let validHex = (hexes instanceof Array) ? hexes : hexes.replace(/\s+/g, '').toLowerCase().split(',');
        let chunk    = data.toString('hex');
        if (!chunk || chunk === undefined || chunk === null) resolve(false);
        if (chunk.length > 15) chunk = chunk.substring(0, 8);
        validHex.forEach(function (hex) {
          let hasOther = hex.indexOf(chunk);
          if (hasOther === 0) resolve(true);
        });

        resolve(false);
      } catch (err) {
        console.error(err.stack);
        resolve(false);
      }
    });

    stream.on('error', function (data) {
      console.error(data);
      resolve(false);
    });

    stream.on('end', function () {
      resolve(false);
    });
  });
};

module.exports.checkIfValidHeader = checkIfValidHeader;
