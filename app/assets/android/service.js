Ti.API.info(" ======= STARTIGN SERVICE ======== ");

start();

function testNotification(){
	var packageName= Ti.App.id;
	var className = 'uh.tutorial.notification.TutorialnotificationActivity';
	 
	// Intent object to launch the application
	var intent = Ti.Android.createIntent({
	    action: Ti.Android.ACTION_MAIN
	    , className : className
	    , packageName: packageName
	});
	 
	intent.flags |=
					Ti.Android.FLAG_ACTIVITY_NEW_TASK
	 				| Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED
					| Ti.Android.FLAG_ACTIVITY_CLEAR_TOP
	 				| Ti.Android.FLAG_ACTIVITY_SINGLE_TOP
					| Ti.Android.FLAG_FROM_BACKGROUND
					| Ti.Android.FLAG_DEBUG_LOG_RESOLUTION
	;
	intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
	
	intent.putExtra("payload", "May the force be with you!");
	
	
	
	var activity = Ti.Android.currentActivity;
	var pending = Ti.Android.createPendingIntent({
		activity:activity,
	    intent : intent,
	    type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
	    // updates only extras, triggering newintent
	    flags: Ti.Android.FLAG_UPDATE_CURRENT,
	});
	 
	var notification = Ti.Android.createNotification({
	    contentIntent: pending
	    , contentTitle : "Title"
	    , contentText : "Text"
	    , tickerText : "tickerText"
	    , when : new Date()
	    , icon: Ti.App.Android.R.drawable.appicon
	    , flags : Ti.Android.ACTION_DEFAULT | Ti.Android.FLAG_AUTO_CANCEL | Ti.Android.FLAG_SHOW_LIGHTS
	    , defaults: Ti.Android.DEFAULT_LIGHTS
	});
	
	Ti.Android.NotificationManager.notify((new Date()).getTime(), notification);
}


function start(){
	Ti.API.info("test notification");
	testNotification();
	
	setTimeout(function(){
		start();
	}, 5000);
}
