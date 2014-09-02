/** Dependencies */
var db       = require('./db.js');
var Snapshot = require('./snapshot.js');


/** @const */
var INTERVAL = 10;



/**
 * Parking
 */
function Parking() {
  // Get timestamp
  var timestamp = new Date();
  
  if (!(timestamp.getSeconds() % INTERVAL)) {
    Snapshot.create()
    .then(function(snapshot) {
      db.store(snapshot.process()).then(function(entry) {
        console.log('Saved snapshot ' + timestamp);
      });
      return snapshot;
    })
    .then(function(snapshot) {
      db.storeRaw(snapshot.raw).then(function(entry) {});
    })
    .catch(function(error) {
      console.log(error);
    });
  }
};


setInterval(Parking, 1000);