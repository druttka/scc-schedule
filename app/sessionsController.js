(function(app){
  
  var SessionsController = function($http){
    var self = this;

    this.times = [];
    this.sessions = [];

    $http.get('sessions.json').success(function(data){
      self.data = data;
      self.times = data.times;
      
      var now = new Date();
      var nowHack = parseInt(now.getHours() + "" + now.getMinutes() + "00");
      
      var set = false;
      self.times.forEach(function(time){
         
        var timeInt = parseInt(time.start.replace(/:/g, ""));
        if (!set && nowHack < timeInt){
          self.onTimeChange(time);
          set = true;
        }
      });
    });
    
  };

  SessionsController.prototype.onTimeChange = function(x){
    var idx = this.times.indexOf(x);
    
    var self = this;
    
    self.sessions.length = 0;
    self.selectedTime = x;

    self.data.sessions[idx].forEach(function(s) { self.sessions.push(s); });
  };

  app.controller('SessionsCtrl', ['$http', SessionsController]);
}(angular.module('app')));
