log("NOtification View..");

var win = Ti.UI.createWindow({
	"backgroundColor": "yellow"
});


function checkForIntent(){
	var _intent = Ti.Android.currentActivity.getIntent();
	log(JSON.stringify(_intent));
	
	if (_intent.hasExtra('payload')) { 
		Ti.API.info("*******found " + intent.getStringExtra('payload')); 
	}
}

function log(msg){
	Ti.API.info(msg);
}


win.addEventListener("open", function(e){ 
	checkForIntent();
});


win.open();
