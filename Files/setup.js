

function Initialize() {
	window.localStorage.setItem("isInitialized", "true");
	window.localStorage.setItem("fontSize", "12");
	window.localStorage.setItem("isLocked", "false");
	window.localStorage.setItem("format", "dd.mm.yyyy");
	window.localStorage.setItem("backgroundColor", "#000000");
	window.localStorage.setItem("backgroundOpacity", "0.51");
	window.localStorage.setItem("fontOpacity", "0.51");
	window.localStorage.setItem("fontColor", "#000000");
	window.localStorage.setItem("positionX", "100");
	window.localStorage.setItem("positionY", "200");
};

function updateClock() {
	window.localStorage.setItem("updateClock", JSON.stringify(new Date()));
}


overwolf.settings.registerHotKey("showSettings", function (arg) {
	if (arg.status == "success") 
	{
		overwolf.windows.obtainDeclaredWindow("setup", function(result){
			if (result.status == "success"){
				console.log(result);
				if(result.window.isVisible == false) {
					overwolf.windows.restore(result.window.id);
				} else {
					overwolf.windows.minimize(result.window.id);
				}
			}
		});
	}
}.bind(this));
$(document).ready(function(){
	if(window.localStorage.getItem("isInitialized") == null) 
	{
		Initialize();
	}
	
	$("#fontSizeSliderText").text(window.localStorage.getItem("fontSize") + "px");
	$( "#fontSizeSlider" ).slider({
		min: 4,
		max: 128,
		range: false,
		value: window.localStorage.getItem("fontSize"),
		change: function(event, ui) {
			var val = $("#fontSizeSlider").slider("value");
			window.localStorage.setItem("fontSize", val);
			$("#fontSizeSliderText").text(val + "px");
			updateClock();
		}
	});


	$("#fontOpacitySliderText").text(window.localStorage.getItem("fontOpacity") + "%");

	$( "#fontOpacity" ).slider({
		min: 0,
		max: 100,
		range: false,
		value: parseInt(window.localStorage.getItem("fontOpacity")),
		change: function(event, ui) {
			var val = $("#fontOpacity").slider("value");
			window.localStorage.setItem("fontOpacity", val);
			$("#fontOpacitySliderText").text(val + "%");
			updateClock();
		}
	});

	
	$("#backgroundOpacitySliderText").text(window.localStorage.getItem("backgroundOpacity") + "%");

	$( "#backgroundOpacity" ).slider({
		min: 0,
		max: 100,
		range: false,
		value: parseInt(window.localStorage.getItem("backgroundOpacity")),
		change: function(event, ui) {
			var val = $("#backgroundOpacity").slider("value");
			window.localStorage.setItem("backgroundOpacity", val);
			$("#backgroundOpacitySliderText").text(val + "%");
			updateClock();
		}
	});

	$( "#tabs" ).tabs();

	$("#positionX").spinner({
		change: function(event, ui) {
			var val = $("#positionX").spinner("value");
			window.localStorage.setItem("positionX", val);
			updateClock();
		}
	});
	$("#positionX").spinner("value", window.localStorage.getItem("positionX"));
	$("#positionY").spinner({
		change: function(event, ui) {
			var val = $("#positionY").spinner("value");
			window.localStorage.setItem("positionY", val);
			updateClock();
		}
	});
	$("#positionY").spinner("value", window.localStorage.getItem("positionY"));

	$("#format").val(window.localStorage.getItem("format"));

	$("#format").change(function() {
			window.localStorage.setItem("format", $("#format").val());
			updateClock();
	});

	$("#fontColor").val(window.localStorage.getItem("fontColor"));

	$("#fontColor").change(function() {
			window.localStorage.setItem("fontColor", $("#fontColor").val());
			updateClock();
	});


	$("#backgroundColor").val(window.localStorage.getItem("backgroundColor"));

	$("#backgroundColor").change(function() {
			window.localStorage.setItem("backgroundColor", $("#backgroundColor").val());
			updateClock();
	});

	$("#fontFamily").val(window.localStorage.getItem("fontFamily"));

	$("#fontFamily").change(function() {
			window.localStorage.setItem("fontFamily", $("#fontFamily").val());
			updateClock();
	});
	
	$("#formatButtonSet").buttonset();

	$("#fontBold").prop("checked", window.localStorage.getItem("fontBold") == "true");
	$('#fontBold').button( "refresh" );
    $("#fontBold").change(
	function(event, ui) {
		var val = $("#fontBold").prop("checked");
		window.localStorage.setItem("fontBold", val);
		$('#fontBold').button( "refresh" );
		updateClock();
	});

	$("#fontItalic").prop("checked", window.localStorage.getItem("fontItalic") == "true");
	$('#fontItalic').button( "refresh" );
    $("#fontItalic").change(
	function(event, ui) {
		var val = $("#fontItalic").prop("checked");
		window.localStorage.setItem("fontItalic", val);
		$('#fontItalic').button( "refresh" );
		updateClock();
	});

	$("#fontUnderline").prop("checked", window.localStorage.getItem("fontUnderline") == "true");
	$('#fontUnderline').button( "refresh" );
    $("#fontUnderline").change(
	function(event, ui) {
		var val = $("#fontUnderline").prop("checked");
		window.localStorage.setItem("fontUnderline", val);
		$('#fontUnderline').button( "refresh" );
		updateClock();
	});

	$("#fontShadow").prop("checked", window.localStorage.getItem("fontShadow") == "true");
	$('#fontShadow').button( "refresh" );
    $("#fontShadow").change(
	function(event, ui) {
		var val = $("#fontShadow").prop("checked");
		window.localStorage.setItem("fontShadow", val);
		$('#fontShadow').button( "refresh" );
		updateClock();
	});
	overwolf.games.onGameInfoUpdated.addListener(function(gameinfo) {
	
		overwolf.windows.obtainDeclaredWindow("clock", function(result){
			if (result.status == "success"){
				if(gameinfo.gameInfo.isInFocus == true) {
					overwolf.windows.restore(result.window.id, null);
				} else {
					//overwolf.windows.minimize(result.window.id, null);
				}
			}
		});

	});
});