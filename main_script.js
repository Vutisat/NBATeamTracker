
var state = ""
var localTeam = ""
var latitude = ""
var longitude = ""
var full_kml = ""
function getTeam() {
	//httpReq.setRequestHeader('Access-Control-Allow-Headers', '*');
	var response
	var num = parseInt(document.getElementById("zip").value)
	//alert(num.length);
	//Error Checking
	if(isNaN(num)){
		alert("Please enter a numeric value.");
	}
	if(num.toString().length != 5){
		alert("A valid zipcode conatins 5 digits!");
	}

	getZipInfo(num);

	//Checking for correct answer
	document.getElementById("zip").value = num
	response = ""

		//This function calls an API to interpret the ZIP code for information
		function getZipInfo(input_zip){
						var zip_api = ("https://www.zipcodeapi.com/rest/js-U8EC3iiDDZSpUxdbJI02DXbm7h9ZmtngC1SGkbkXacn5JBgtjhvXfHjmYtmlWJBz/info.json/" + input_zip + "/degrees");
						console.log("sending API request to find ZIP info...");
						$.ajax({
						    type: "GET",
						    crossDomain: true,
						    url: zip_api,
						    //They have padding so jsonp works
						    dataType: "json",
						    success: processData,
						    error: function(){ alert("Something went wrong, are you sure you entered a legitimate zipcode?");; }
						});

						function processData(data)
						{	
							console.log("Here's the location result from the ZIP code: ");
							console.log(data);
							//var obj = JSON.parse(data);
							var obj = JSON.stringify(data);
							var obj2 = JSON.parse(obj);
		

							//Got the state info, now calling lambda
						    state = obj2.state
						    latitude = obj2.lat
						    longitude = obj2.lng

						    //Generate kml info for the zip code location
						    generate_kml();

						    console.log("The state of the ZIP code is: " + state);
						    //console.log(latitude);
						    //console.log(longitude);
						    callLambda(obj2);
						}
		}

		//------------
		//Call lambda function to finds the team by state
		function callLambda(state2){
			
				xhr = new XMLHttpRequest();
				var url = "https://uq3v5l2ll5.execute-api.us-east-1.amazonaws.com/prod/getLocalNBATeam";
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-type", "application/json");
				xhr.onreadystatechange = function () { 
				    if (xhr.readyState == 4 && xhr.status == 200) {
				        var json = JSON.parse(xhr.responseText);
				        //Got the state from lambda, now going to display map and show team
				        console.log("The team is: " + json.substring(7, 10));
				        localTeam = json.substring(7, 10)
				        build_team_string(localTeam);
				        
				    }
				}
				//console.log(state);
				var data = JSON.stringify({"key1": state});
				xhr.send(data);	
		}
		//------------

		function build_team_string(team){
			console.log("Generating link to most popular team (" + team +")...")
			if(team == "ATL"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="ATL.html"> The Atlanta Hawks!</a>');
			}else if(team == "BOS"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="BOS.html"> The Boston Celtics!</a>');
			}else if(team == "CHA"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="CHA.html"> The Charlotte Hornets!</a>');
			}else if(team == "CHI"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="CHI.html"> The Chicago Bulls!</a>');
			}else if(team == "CLE"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="CLE.html"> The Cleveland Cavaliers!</a>');
			}else if(team == "DEN"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="DEN.html"> The Denver Nuggest!</a>');
			}else if(team == "LAL"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="LAL.html"> The Los Angelis Lakers!</a>');
			}else if(team == "MEM"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="MEM.html"> The Memphis Grizzlies!</a>');
			}else if(team == "MIN"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="MIN.html"> The Minnestoa TimberWolves!</a>');
			}else if(team == "NOP"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="NOP.html"> The New Orleans Pelicans!</a>');
			}else if(team == "NYK"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="NYK.html"> The New York Knicks!</a>');
			}else if(team == "OKC"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="OKC.html"> The Oklahoma City Thunder!</a>');
			}else if(team == "PHI"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="PHI.html"> The Philadelphia 76ers!</a>');
			}else if(team == "POR"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="POR.html"> The Portland Trailbrazers!</a>');
			}else if(team == "UTA"){
				$("#local_team").html("The most popular team in " + state +' is: <a href="UTA.html"> The Utah Jazz!</a>');
			}
		}

		function generate_kml(lang, long){
			full_kml = '<?xml version="1.0" encoding="UTF-8"?>\n';
			full_kml += '	<kml xmlns="http://www.opengis.net/kml/2.2">\n'
			full_kml += '	<Placemark> \n				   <name>Simple placemark</name>\n				    <description>This is the location from the zip code entered</description> \n				    <Point>';
			full_kml +=	 '<coordinates>' + latitude + ',' + longitude + ',0</coordinates>\n'
			full_kml += '			    </Point>\n	</Placemark>\n</kml>';
			console.log("KML generated: \n" + full_kml);

			//This following generate a button for users to download the KML
			document.getElementById("kml_download").style.display = "initial";
			var text_area = '<textarea name="text">' + full_kml + '</textarea>'
			$("#kml_download").html('KML was generated from the ZIP code given: </br>' + text_area + '</br> <button type="button" class="btn btn-success" onClick="download();">Download KML</button>');
		}

	}

function download() {
		  var element = document.createElement('a');
		  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + full_kml);
		  element.setAttribute('download', 'generated_kml.kml');

		  element.style.display = 'none';
		  document.body.appendChild(element);

		  element.click();

		  document.body.removeChild(element);
		}