//Create and hide main window
var mainWindow = Ti.UI.currentWindow;
mainWindow.setTitle('Respy');
mainWindow.setWidth(1020);
mainWindow.setHeight(680);

// //Create child window for experience sampling
// var popup = mainWindow.createWindow('app://popup.html');
// popup.setHeight(100);
// popup.setWidth(250);
// popup.setTitle('')
// popup.open();

function showPopup(){
	popup.show()
}

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
		.attr("xlink:href", "file://" + window.selfspy_directory+ "/screenshots/" + imgs[0])
		.attr("width", imgW)
		.attr("height", imgH)
		.attr("id", "mainImg");
	
// 	var label = d3.select("#image").append("p")
// 		.text(toString)
	
	var sliderDiv = d3.select("#image").append("div")
            .attr("id", "slider")
            .style("margin-top", "10px");
				
	//create jQuery slider
	$(function() {$( "#slider" ).slider({ max: imgs.length-1 });});
	
	$("#slider").slider({ slide: function(event, ui){
        
		//Change image
		var i = $("#slider").slider("value");
		$("#mainImg").attr("href", "file://" + window.selfspy_directory+ "/screenshots/" + imgs[i]);
		
	}}); 

}

function parse_date(img_date){
	
}


//TODO get interval to start after popup is closed
//setInterval(function(){showPopup()}, 1*60*1000);

//showData();
//mainWindow.hide();