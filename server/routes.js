/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  var api = require('./api/api');
  // Insert routes below
  app.use('/api/things', require('./api/thing'));

  app.get('/api/currentweektendancy', api.currentWeekTendancy);
  app.get('/api/globaltendance', api.globalTendance);
  app.get('/api/currentnodestate', api.currentNodeState);
  app.get('/api/todaytendance', api.todayTendance);
  app.get('/api/maintenancestate', api.maintenanceState);


  app.post('/api/savepacket', api.savePacket);


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
