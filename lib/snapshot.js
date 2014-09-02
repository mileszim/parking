/** Dependencies */
var request = require('request');
var Promise = require('bluebird');
Promise.promisifyAll(require("request"));


/** @const */
var PARKING_URL = 'https://webfarm.chapman.edu/parkingservice/parkingservice/counts';



/**
 * Snapshot
 */
var Snapshot = function(raw) {
  this.raw = raw;
  this.contents;
};


/** API */
Snapshot.prototype = {
  
  process: function() {
    var snapshot = {
      timestamp: new Date()
    };
    this.raw.Structures.forEach(function(structure) {
      var name = structure.Name.toLowerCase();
      snapshot[name] = {
        timestamp: eval('new ' + structure.Timestamp.replace(/\//g,'')),
        capacity:  structure.Capacity,
        available: structure.CurrentCount,
        levels: []
      };
      structure.Levels.forEach(function(level) {
        if (level.SystemName !== 'All') {
          snapshot[name].levels.push({
            name:      level.FriendlyName,
            capacity:  level.Capacity,
            available: level.CurrentCount
          });
        }
      });
    });
    return snapshot;
  }

};



/** Class Methods */
Snapshot.request = function() {
  return request.getAsync(PARKING_URL);
};

Snapshot.create = Promise.method(function() {
  return Snapshot.request().spread(function(res, body) {
    return new Snapshot(JSON.parse(body));
  });
});



/** Export */
module.exports = Snapshot;