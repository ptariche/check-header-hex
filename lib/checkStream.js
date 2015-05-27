var checkIfValidHeader = function *(hexes, stream){
  return yield function(cb){
    if(!stream || stream === null || stream === undefined) throw new Error('There is no stream');
    stream.on('data', function(data){
      try {
        var validHex = hexes.replace(/\s+/g, '').toLowerCase().split(',');
        var chunk    = data.toString('hex'); 
        if(!chunk || chunk === undefined || chunk === null) cb(null, false);
        if(chunk.length > 15) chunk = chunk.substring(0,8);
        validHex.forEach(function(hex){
          var hasOther = hex.indexOf(chunk);
          if(hasOther === 0) cb(null, true);
        });
        cb(null, false); 
      } catch(err){
        console.log("CheckStream Error:");
        console.error(err.stack);
        cb(null, false); 
      }
    });
    stream.on('error', function(data){
      cb(null, false); 
    });
    stream.on('end', function() {
      cb(null, false);
    });
  };
}

module.exports.checkIfValidHeader = checkIfValidHeader;