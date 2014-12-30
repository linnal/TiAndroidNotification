/**
 * @see https://gist.github.com/muka/d4afae20a5732f3937e8
 */

var notificationCounter = 0;
module.exports.launch = function(options) {

    options = options || {};

    if( !options.contentTitle ||
        !options.contentText ||
        !options.tickerText) {
        console.warn("Cancelled notification due to missing data");
        return;
    }

    var packageName= Ti.App.id;
    var className = 'org.appcelerator.titanium.TiActivity';

    // Intent object to launch the application
    var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_MAIN
        , className : className
        , packageName: packageName
    });

    intent.flags |=

                    // If set, this activity will become the start of a new task on this history stack.
                    // A task (from the activity that started it to the next task activity) defines an atomic group
                    // of activities that the user can move to. Tasks can be moved to the foreground and background;
                    // all of the activities inside of a particular task always remain in the same order.
                    Ti.Android.FLAG_ACTIVITY_NEW_TASK

                    //  If set, and this activity is either being started in a new task or bringing
                    //  to the top an existing task, then it will be launched as the front door of the task.
                    | Ti.Android.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED

                    // If set, and the activity being launched is already running in the current task,
                    // then instead of launching a new instance of that activity, all of the other activities
                    // on top of it will be closed and this Intent will be delivered to the (now on top) old
                    // activity as a new Intent.
                    | Ti.Android.FLAG_ACTIVITY_CLEAR_TOP

                    // If set, the activity will not be launched if it is already
                    // running at the top of the history stack.
                    | Ti.Android.FLAG_ACTIVITY_SINGLE_TOP

                    // Can be set by the caller to indicate that this Intent is coming from a
                    // background operation, not from direct user interaction.
                    | Ti.Android.FLAG_FROM_BACKGROUND

                    // A flag you can enable for debugging: when set, log messages will be printed
                    // during the resolution of this intent to show you what has been found
                    // to create the final resolved list.
                    | Ti.Android.FLAG_DEBUG_LOG_RESOLUTION
    ;
    intent.addCategory(Ti.Android.CATEGORY_LAUNCHER);

    if(options.intentParams) {
        var _ekeys = Object.keys(options.intentParams);
        (_ekeys && _ekeys.length) && _ekeys.forEach(function(k) {
            var val = options.intentParams[k];
            if(val !== null && val.toString) {
                try {
                    intent.putExtra(k, val.toString());
                }
                catch(e) {
                    console.error("Cannot add extras ", k);
                    console.error(e);
                }
            }
        });
    }

    var pending = Ti.Android.createPendingIntent({
        intent : intent,
        type : Ti.Android.PENDING_INTENT_FOR_ACTIVITY,
        // updates only extras, triggering newintent
        flags: Ti.Android.FLAG_UPDATE_CURRENT,
    });

    var notification = Ti.Android.createNotification({
        contentIntent: pending
        , contentTitle : options.contentTitle || ''
        , contentText : options.contentText || ''
        , tickerText : options.tickerText || ''
        , when : options.when || new Date()
        , icon: Ti.App.Android.R.drawable.appicon
        , flags : Ti.Android.ACTION_DEFAULT | Ti.Android.FLAG_AUTO_CANCEL | Ti.Android.FLAG_SHOW_LIGHTS
        , defaults: Ti.Android.DEFAULT_LIGHTS
    });

    notificationCounter++;
    var nId = options.id || notificationCounter;
    Ti.Android.NotificationManager.notify(nId, notification);
};

module.exports.showNotification = function(params) {

    params = params || {};

    var _ = require('alloy/underscore');
    var n = {};

    var fake = {
        contentTitle: "TEST",
        contentText: "This is a test",
        tickerText: "Is this a test?",
        intentParams: {
            test: "prova",
            pippo: "pluto"
        }
    };

    _.extend(n, fake, params);


    module.exports.launch(n);
};

var __once = false;
module.exports.newIntent = function(then) {

    if(!__once) {
        __once = true;

        Ti.Android.currentActivity.addEventListener("newintent", function(ev) {
            var intent = ev.intent;
            then && then(intent);
        });
    }

};