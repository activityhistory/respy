//Create and hide main window
var mainWindow = Ti.UI.currentWindow;
mainWindow.setTitle('Respy');
mainWindow.setWidth(1020);
mainWindow.setHeight(800);

var currentScreenshot = 0;
var interval = null;
var playing = false;

function showData(){

	//Open the database first
	var db = Ti.Database.openFile(Ti.Filesystem.getFile(Ti.Filesystem.getUserDirectory(), '.selfspy/selfspy.sqlite'));       

	//Select from Table
	//var out = db.execute("DELETE FROM stocks WHERE qty>102");
	var rows = db.execute("SELECT * FROM process");
	while (rows.isValidRow()) {
		alert('The process is '+rows.fieldByName('name'));
		rows.next();    
	}

	//Release memory
	rows.close();
	db.close();

}

function load_images(imgs){

	imgW = 1000;
    imgH = parseInt(imgW/1.6)
    
    var svg = d3.select("#image").append("svg")
        .attr("width", imgW)
        .attr("height", imgH);
            
    var svgimg = svg.append("svg:image")
		.attr("xlink:href", "file://" + window.selfspy_directory+ "/screenshots/" + imgs[currentScreenshot])
		.attr("width", imgW)
		.attr("height", imgH)
		.attr("id", "mainImg");
	
 	var label = d3.select("#image").append("p")
 		.attr("id", "label")
 		.text(parse_date(imgs[0]));
	
	var sliderDiv = d3.select("#image").append("div")
            .attr("id", "slider")
            .style("margin-top", "10px");
				
	//create jQuery slider
	$(function() {$( "#slider" ).slider({ max: imgs.length-1 });});
	
	$("#slider").slider({ slide: function(event, ui){
		//Change image
		var i = $("#slider").slider("value");
		$("#mainImg").attr("href", "file://" + window.selfspy_directory+ "/screenshots/" + imgs[i]);
		label.text(parse_date(imgs[i]));
		currentScreenshot = i;
	}}); 
	
	var playPause = d3.select("#controls").append("button")
		.attr("id", "playButton")
		.text("Play")
		.on("click", togglePlay);

}

function togglePlay(){

	if (playing){
		d3.select("#playButton").text("Play");
		playing = false;
		clearInterval(interval);
	}
	
	else{
		d3.select("#playButton").text("Pause");
		playing = true;
		interval = setInterval(function(){play()}, 500);
	}	
}

function play(){
	currentScreenshot += 1;
	$("#slider").slider("value", currentScreenshot);
	$("#mainImg").attr("href", "file://" + window.selfspy_directory+ "/screenshots/" + imgs[currentScreenshot]);
	d3.select("#label").text(parse_date(imgs[currentScreenshot]));
}

function parse_date(img_date){
	year = "20"+img_date.slice(0,2);
	month = img_date.slice(2,4);
	day = img_date.slice(4,6);
	hour = img_date.slice(7,9);
	minute = img_date.slice(9,11);
	second = img_date.slice(11,13);
	dt = month + "/" + day + "/" + year + " - " + hour + ":" + minute + ":" + second;
	return dt;
}


//TODO get interval to start after popup is closed
//setInterval(function(){showPopup()}, 1*60*1000);

//showData();
//mainWindow.hide();