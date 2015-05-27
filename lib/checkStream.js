var checkIfValidHeader = function *(hexes, stream){
  return yield function(cb){
    stream.on('data', function(data){
      var validHex = hexes.replace(/\s+/g, '').toLowerCase().split(',');
      var chunk    = data.toString('hex'); 
      if(chunk.length > 15) chunk = chunk.substring(0,8);
      validHex.forEach(function(hex){
        var hasOther = hex.indexOf(chunk);
        if(hasOther === 0) cb(null, true);
      });
      cb(null, false); 
    });
  };
}

module.exports.checkIfValidHeader = checkIfValidHeader;