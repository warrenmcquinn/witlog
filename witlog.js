if (Meteor.isClient) {
  Template.hello.greeting                             = function () {
    return "Welcome to witlog.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !                            == 'undefined')
        console.log("You pressed the button");
    }


  });
    var mic                                           = new Wit.Microphone(document.getElementById("microphone"));
    var info                                          = function (msg) {
      document.getElementById("info").innerHTML       = msg;
    };
    mic.onready                                       = function () {
      info("Microphone is ready to record");
    };
    mic.onaudiostart                                  = function () {
      info("Recording started");
    };
    mic.onaudioend                                    = function () {
      info("Recording stopped, processing started");
    };
    mic.onerror                                       = function (err) {
      info("Error: " + err);
    };
    mic.onresult                                      = function (intent, entities) {
      var r                                           = kv("intent", intent);
        console.log(intent+" "+entities);
      for (var k in entities) {
        var e                                         = entities[k];

        if (!(e instanceof Array)) {
          r +                                         = kv(k, e.value);
        } else {
          for (var i                                  = 0; i < e.length; i++) {
            r +                                       = kv(k, e[i].value);
          }
        }
      }

      document.getElementById("result").innerHTML     = r;
    };
    mic.connect("O5FLWRIOBZLPKDOGTAU5GL4KCKIXXUHK");


    function kv (k, v) {
      if (toString.call(v) !                          == "[object String]") {
        v                                             = JSON.stringify(v);
      }
      return k + "                                    =" + v + "\n";
    }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
