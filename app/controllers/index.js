function doClick(e) {
    alert($.label.text);
}


var serviceIntent;
function startService(){
	serviceIntent = Ti.Android.createServiceIntent({
	    url : 'service.js'
	});


	if(!Ti.Android.isServiceRunning(serviceIntent)){
		Ti.Android.startService(serviceIntent);
	}
}


function checkForIntent(){
	var _intent = Ti.Android.currentActivity.getIntent();
	log(JSON.stringify(_intent));

	if (_intent.hasExtra('payload')) {
		Ti.API.info("*******found " + intent.getStringExtra('payload'));
	}
}


function checkForPendingIntent(){
	var platformTools = require('bencoding.android.tools').createPlatform();
	var isInForeground = platformTools.isInForeground();
	if(isInForeground){
		log("CHECK INTENT");
		var activity = Ti.Android.currentActivity;
		var intent = activity.intent;
		log(JSON.stringify(intent));

		if (intent.hasExtra('payload')) {
			log("*******found " + intent.getStringExtra('payload'));
		}
	}


	log("PAYLOAD " + Alloy.Globals.payload);
}

function log(msg){
	Ti.API.info(msg);
}


$.index.addEventListener("open", function(e){
    startService();
});

$.index.addEventListener("focus", function(e){
    require('notification').newIntent(function(intent) {

        console.warn("new intent!");

        if(intent.hasExtra("payload")) {
            console.warn("*******found " + intent.getStringExtra('payload'));
            alert(intent.getStringExtra('payload'));
            Ti.Android.stopService(serviceIntent);
        }

    });

});

//checkForPendingIntent();

$.index.open({
    exitOnClose: false
});
