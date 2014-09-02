/** @const */
var SNAPSHOT_COLLECTION = 'snapshots';
var RAW_COLLECTION      = 'raw';


/**
 * Database
 */
var DB = function() {
  if (!process.env['ORCHESTRATE_TOKEN']) {
    console.log('Orchestrate.io token missing. Please set ORCHESTRATE_TOKEN env variable.');
    process.exit(1);
  }
  
  this.token       = process.env['ORCHESTRATE_TOKEN'];
  this.orchestrate = require('orchestrate')(this.token);
};


/** API */
DB.prototype = {
  
  /**
   * Store snapshot
   */
  store: function(snapshot) {
    return this.orchestrate.post(SNAPSHOT_COLLECTION, snapshot);
  },
  
  
  /**
   * Store raw snapshot
   */
  storeRaw: function(raw) {
    return this.orchestrate.post(RAW_COLLECTION, raw);
  }
  
};



/** Export */
module.exports = DB = new DB();