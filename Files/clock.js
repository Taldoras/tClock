
function getDateTime(){
	var currentdate = new Date(); 
    document.getElementById('timeFrame').innerHTML = currentdate.format(window.localStorage.getItem("format"));
};

function initClock() 
{
	document.getElementById('timeFrame').style.fontSize = window.localStorage.getItem("fontSize") + "px";
	document.getElementById('timeFrame').style.color = window.localStorage.getItem("fontColor");
	document.getElementById('timeFrame').style.opacity = parseInt(window.localStorage.getItem("fontOpacity")) / 100.00;
	document.getElementById('timeFrame').style.fontWeight = window.localStorage.getItem("fontBold") == "true" ? "bold" : "normal";
	document.getElementById('timeFrame').style.fontStyle = window.localStorage.getItem("fontItalic") == "true" ? "italic" : "normal";
	document.getElementById('timeFrame').style.textDecorationLine = window.localStorage.getItem("fontUnderline") == "true" ? "underline" : "none";
	document.getElementById('timeFrame').style.textShadow =  window.localStorage.getItem("fontShadow") == "true" ? "1px 1px 2px #000000" : "none";
	document.getElementById('timeFrame').style.fontFamily =  window.localStorage.getItem("fontFamily");
	var color = window.localStorage.getItem("backgroundColor");
	var rgbaCol = 'rgba(' + parseInt(color.slice(-6,-4),16)
    + ',' + parseInt(color.slice(-4,-2),16)
    + ',' + parseInt(color.slice(-2),16)
    +',' + parseInt(window.localStorage.getItem("backgroundOpacity")) / 100.00 + ')';

	document.getElementById('content').style.backgroundColor = rgbaCol;
	overwolf.windows.getCurrentWindow(function(result){
		overwolf.windows.changePosition(result.window.id, parseInt(window.localStorage.getItem("positionX")), parseInt(window.localStorage.getItem("positionY")));
		overwolf.windows.changeSize(result.window.id, parseInt($("#timeFrame").width())+1, parseInt($("#timeFrame").height()));
	});
};

function getWindowId() {
	overwolf.windows.getCurrentWindow(function(result){
		return result.window.id;
	});
};

function handleEvent(event) {
	console.log(event);
	switch(event.key) {
		case 'updateClock':
			initClock();
			break;
	}
};

$(document).ready(function(){
	getDateTime();
	initClock();
	window.setInterval(function() {
		getDateTime();
	}, 1000);
	window.addEventListener('storage', handleEvent, false);
	overwolf.games.onGameInfoUpdated.addListener(function(gameinfo) {
	
		overwolf.windows.obtainDeclaredWindow("clock", function(result){
			if (result.status == "success"){
				initClock();
			}
		});

	});
});