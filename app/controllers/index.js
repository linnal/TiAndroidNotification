function doClick(e) {
    alert($.label.text);
}


function startService(){
	var intent = Ti.Android.createServiceIntent({
	    url : 'service.js'
	});
	 
	
	if(!Ti.Android.isServiceRunning(intent)){
		Ti.Android.startService(intent);
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
	checkForIntent();
});


checkForPendingIntent();

$.index.open();
