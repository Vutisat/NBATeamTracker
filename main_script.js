
var state = ""
var localTeam = ""
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
						//console.log(zip_api);
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
							console.log("Here's the location result from the ZIP code: " + data);
							//var obj = JSON.parse(data);
							var obj = JSON.stringify(data);
							var obj2 = JSON.parse(obj);
		

							//Got the state info, now calling lambda
						    state = obj2.state
						    console.log("The state of the ZIP code is: " + state);
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
			if(team == "ATL"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="ATL.html"> The Atlanta Hawks!</a>");
			}else if(team == "BOS"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="BOS.html"> The Boston Celtics!</a>");
			}else if(team == "CHA"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="CHA.html"> The Charlotte Hornets!</a>");
			}else if(team == "CHI"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="CHI.html"> The Chicago Bulls!</a>");
			}else if(team == "CLE"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="CLE.html"> The Cleveland Cavaliers!</a>");
			}else if(team == "DEN"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="DEN.html"> The Denver Nuggest!</a>");
			}else if(team == "LAL"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="LAL.html"> The Los Angelis Lakers!</a>");
			}else if(team == "MEM"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="MEM.html"> The Memphis Grizzlies!</a>");
			}else if(team == "MIN"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="MIN.html"> The Minnestoa TimberWolves!</a>");
			}else if(team == "NOP"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="NOP.html"> The New Orleans Pelicans!</a>");
			}else if(team == "NYK"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="NYK.html"> The New York Knicks!</a>");
			}else if(team == "OKC"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="OKC.html"> The Oklahoma City Thunder!</a>");
			}else if(team == "PHI"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="PHI.html"> The Philadelphia 76ers!</a>");
			}else if(team == "POR"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="POR.html"> The Portland Trailbrazers!</a>");
			}else if(team == "UTA"){
				$("#local_team").html("The most popular team in " + state +" is: <a href="UTA.html"> The Utah Jazz!</a>");
			}
		}

	}