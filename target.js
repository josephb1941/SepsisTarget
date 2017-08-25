var debugTarget = false;
var debug = false;


var arrResults = [];
var arrWords = [];

var participantId = "";

var currRing = -1;
var lastWordNum = -1;

var isOverTarget = false;

var mouseXPos = 0;
var mouseYPos = 0;

var checkIntersect = false;



function checkIntersection(aX, aY, aCX, aCY, aR) {
	
   return (Math.pow(aX - aCX, 2) + Math.pow(aY - aCY, 2) < Math.pow(aR, 2));
   
}

function removeAll() {

	$(".cirRing1").removeClass( "highlight" )
	$(".cirRing2").removeClass( "highlight" )
	$(".cirRing3").removeClass( "highlight" )
	$(".cirRing4").removeClass( "highlight" )
	$(".cirRing5").removeClass( "highlight" )



}


function occupationSelected(occupation) {

	survey.occupation = occupation;
	checkSurveyComplete();
	
		
}

function experienceSelected(yearsExperience) {

	survey.yearsExperience = yearsExperience;
	checkSurveyComplete();
	
}

function expertiseSelected() {

	var radios = document.getElementsByName('radExpertise');

		for (var i = 0; i < radios.length; i++) {
			if (radios[i].checked) {
				survey.isExpert = radios[i].value;

			// only one radio can be logically checked, don't check the rest
			break;
    }
}
	
	
	checkSurveyComplete();
	
}


function hideInstructions() {
	
	
	
	$("#dvInstructions").hide();
	
	
}

function checkSurveyComplete() {

	if(survey.isComplete())
		$("#dvDisclosure").show();

}





function submitSurvey() {
	
	if(debug) {
		
		$("#dvSurvey").hide();
	
		$("#dvDisclosure").hide();
		$("#dvMain").show();
		
		return;

		
	}

	var Participants = Parse.Object.extend("Participants");
	
	var participants = new Participants();
	
	participants.set("occupation", survey.occupation);
	participants.set("yearsExperience", survey.yearsExperience);
	
	participants.set("isExpert", survey.isExpert);
	
	// alert(survey.isExpert);
	
	
	participants.save(null, {
	
		success: function(participants) {
		
			// alert('New object created with objectId: ' + participants.id);
			// alert('Saved');
			
			participantId = participants.id;
			$("#dvSurvey").hide();
			
			$("#dvDisclosure").hide();
			$("#dvMain").show();
			
			
		
		},
		error: function(participants, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and message.
		alert('Failed to create new object, with error code: ' + error.message);
	  }
		
	});
	
	// alert("Finished: " + results.id);

	


}


function addResult(wordNum, ringNum) {

	arrResults[wordNum] = ringNum;
	
	checkSubmit();
	
	
	// alert(arrResults.indexOf(-1));



}





function onLoad() {

	
	init();
	// initSurvey();
	// createTarget();
	// addLabels();
	
	arrResults = new Array(15);
	
	arrResults[0] = 0;
	
	for(var i = 1; i < arrResults.length; i++)
		arrResults[i] = -1;
	
	document.getElementById("btnSubmit").disabled = true;
	
	
	
	
	
	if(debugTarget) {
		$("#dvSurvey").hide();
		$("#dvDisclosure").hide();
		$("#dvThankYou").hide();


	}
	else {
		$("#dvMain").hide();
		$("#dvDisclosure").hide();
		$("#dvThankYou").hide();	
		
		
	}
		
	$( "#dvTargetWord" ).droppable( "option", "disabled", true );
	
	
	// $("#dvInstructions").hide();

}

/*
function addLabels() {

	// alert('center me some labels');
	
	// var width = 
	
	// var pos = $('#dvBullseye').offset();
		 
	// var width = $('#dvBullseye').outerWidth();

	// var left = pos.left;
	
	
	var rect = document.getElementById('dvBullseye').getBoundingClientRect();
	
	//alert(rect.right);
	
	document.getElementById('notRelated')
	
	// alert(document.getElementById('dvBullseye').left);
		 
	// var myR = $(this).outerWidth() / 2;
		 
		 
		 
    // var myCX = pos.left + myR;



}
*/


function createTarget() {


//width = $("#web").width();

	// var width = $("#dvTarget").width();
	// var width = $("#dvTarget").offsetWidth;
	
	var myDiv = document.getElementById('dvTarget');
	// var myDiv = document.getElementById('dvBullseye');
	
	var width = myDiv.offsetWidth;
	var height = myDiv.offsetHeight;
	
	
	// var newWidth = ((width - 250) / 2) + "px";
	var newWidth = height + "px";
	
	// alert(newWidth);
	
	document.getElementById('dvTarget').style.paddingLeft = newWidth;
	
	//style.marginLeft = "50px";
	
	
	
	// alert(width);


}



// function drag(ev) {
    // // ev.dataTransfer.setData("text", ev.target.id);
	
	// alert("dragging");
// }

function checkSubmit() {

	


	// alert("Can we submit?");

	// var x = document.getElementById("dvWordBank").childElementCount;
	
	// alert(arrResults.indexOf(-1));
	
	if(arrResults.indexOf(-1) == -1) {
		document.getElementById("btnSubmit").disabled = false;
		
		
	}
	else
		document.getElementById("btnSubmit").disabled = true;
	
	// alert(x);
	

}


function init() {

	var wordBank = document.getElementById('dvWordBank');
	

	
	// $('.dvWord').draggable();
	
	
	
	$("#dvTarget").droppable({
	
	tolerance: "touch",

	over: function( event, ui ) {
	
		// alert("over target");
		isOverTarget = true;
		
	
	},


	drop: function( event, ui ) {
		
			// checkSubmit();
		
		},
		
	out: function( event, ui ) {
	
		isOverTarget = false;
	
	}
	
	
	});
	
	
	$(".cirRing1").droppable({
	

		tolerance: "touch",
	

	drop: function( event, ui ) {
	
		$(this).removeClass( "highlight" );
		checkIntersect = false;
		
	},
	
	over: function( event, ui ) {
		 // $(this).html( "Hover!" );
		 
		 checkIntersect = true;
		 
	
	},

	out: function( event, ui ) {
		$( this ).removeClass( "highlight" );
		
		checkIntersect = false;
	}


});

	
	
	
	
	/*
	$(".cirRing1").droppable({
	
	greedy: true,
	tolerance: "pointer",

	drop: function( event, ui ) {
	
		$(this).removeClass( "highlight" )
		
	},
	over: function( event, ui ) {
		// $(this).html( "Hover!" );
		 
		 var mouseX = event.pageX;
		 var mouseY = event.pageY;
		 
		 // alert(mouseX);
		 
		 // $(this).addClass( "highlight" )
		 // alert('hi');
		 
		 var pos = $(this).position();
		 
		 
		 
		 var myR = $(this).outerWidth() / 2;
		 
		 
		 
         var myCX = pos.left + myR;
         var myCY = pos.top + myR;
		 
		 
		 
		 if (checkIntersection(mouseX, mouseY, myCX, myCY, myR))
         {
             // $(this).addClass( "highlight" )
			 alert('over');
         }
		 
		 // event.stopPropagation();
		// $(this).css("background-color", "yellow");
		// $(this).toggle( "highlight" );
		
			
	

		// alert($(this));
		// alert($(this));
	},

	out: function( event, ui ) {
		$( this )
		.removeClass( "highlight" )
	}


});
*/
/*
	$(".cirRing2").droppable({

	greedy: true,
	tolerance: "pointer",
	drop: function( event, ui ) {
	
		$(this).removeClass( "highlight" )
		
	},

	over: function( event, ui ) {
		
		
		// removeAll();
		
		 $(this).addClass( "highlight" )
		
		
		
		
	},

	out: function( event, ui ) {
		$( this )
		.removeClass( "highlight" )
	}


});


	$(".cirRing3").droppable({

	greedy: true,
	tolerance: "pointer",
	drop: function( event, ui ) {
	
		$(this).removeClass( "highlight" )
		
	},

	over: function( event, ui ) {
		
		
		removeAll();
		// $(this).html( "Hover!" );
		 $(this).addClass( "highlight" )
		// $(this).css("background-color", "yellow");
		// $(this).toggle( "highlight" );
		
			
	

		// alert($(this));
		// alert($(this));
	},

	out: function( event, ui ) {
		$( this )
		.removeClass( "highlight" )
	}


});

	$(".cirRing4").droppable({

	greedy: true,

	tolerance: "pointer",
	drop: function( event, ui ) {

	$(this).removeClass( "highlight" )
	
},

	
	over: function( event, ui ) {
		
		
		removeAll();
		// $(this).html( "Hover!" );
		 $(this).addClass( "highlight" )
		// $(this).css("background-color", "yellow");
		// $(this).toggle( "highlight" );
		
			
	

		// alert($(this));
		// alert($(this));
	},

	out: function( event, ui ) {
		$( this )
		.removeClass( "highlight" )
	}


});

	$(".cirRing5").droppable({

	greedy: true,
	tolerance: "pointer",
	
	drop: function( event, ui ) {

	$(this).removeClass( "highlight" )
	
},

	
	over: function( event, ui ) {
		
		
		removeAll();
		// $(this).html( "Hover!" );
		 $(this).addClass( "highlight" )
		// $(this).css("background-color", "yellow");
		// $(this).toggle( "highlight" );
		
			
	

		// alert($(this));
		// alert($(this));
	},

	out: function( event, ui ) {
		$( this )
		.removeClass( "highlight" )
	}


});
*/

	
	// alert($("#cirRing1"));

	// alert('hello');

	Parse.initialize(
	  "PXNfHJ6ZgtTiKLroGK4gBjKEdsVG8cPQzLOppqCh",
	  "vqX2mhGY0zes8YvPKSMxvu0Sz7Qs8CLphqVParKC"
	);

	Parse.serverURL = 'https://pg-app-jrsgsfl4oyjs0klc20kduakqkwyeih.scalabl.cloud/1/';
	
	//alert('I did stuff');
	
	var Words = Parse.Object.extend("Words");
	
	var words = new Words();
	
	var query = new Parse.Query(Words);
	
	
	
	/*
	//find number of elements
	query.count({
         success: function(number) {
           // There are number instances of MyClass.
           alert(number);
         },
         error: function(error) {
         // error is an instance of Parse.Error.
             
     }
   });
	*/
   
   var allWords = [];
   
   
   
   query.find({
    success: function(feeds){
        // var jsonArray = [];

		// alert('found my words');
		
        for(var i = 0; i < feeds.length; i++) {
           allWords.push(feeds[i].toJSON());
		   
        }

		
		
		doStuff(allWords);
		


    },
    error: function(object, error){
        console.log(error);
    }
});
   
   // alert(allWords.length);
   
   testPromise();
   
   //});
	
	/*
	query.get("S6rT5LTDNk", {
		success: function(words) {
    // The object was retrieved successfully.
		
		var wordID = words.get("WordID");
		
		alert(wordID);
	},
	error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
	}
});*/
	
	
	/*
	// Simple syntax to create a new subclass of Parse.Object.
var GameScore = Parse.Object.extend("GameScore");

// Create a new instance of that class.
var gameScore = new GameScore();

// Alternatively, you can use the typical Backbone syntax.
var Achievement = Parse.Object.extend({
  className: "Achievement"
});
*/
	
	
	
	
	
	

}


function saveStuff() {

// var GameScore = Parse.Object.extend("GameScore");
// var gameScore = new GameScore();

// gameScore.set("score", 1337);
// gameScore.set("playerName", "Sean Plott");
// gameScore.set("cheatMode", false);

// gameScore.save(null, {
  // success: function(gameScore) {
    // // Execute any logic that should take place after the object is saved.
    // alert('New object created with objectId: ' + gameScore.id);
  // },
  // error: function(gameScore, error) {
    // // Execute any logic that should take place if the save fails.
    // // error is a Parse.Error with an error code and message.
    // alert('Failed to create new object, with error code: ' + error.message);
  // }
// });



}



function doStuff(wordObj) {



	// document.getElementById("values").innerHTML  = "";
	arrWords = new Array(wordObj.length);
	
	var wordID = -1;
	var word = "";
	
	for(var i = 0; i < wordObj.length; i++) {
		
		//document.getElementById("values").innerHTML += wordObj[i]["WordID"] + "    " + wordObj[i]["Word"] + "<br>";
		
		wordID = wordObj[i]["WordID"];
		word = wordObj[i]["Word"];
		
		arrWords[wordID] = word;
		
	
	}
	
	

	createWords(arrWords);
	
	

}



function createWords(arrWords) {

	

	var wordBank = document.getElementById('dvWordBank');
	var br = ""; 

	
	
	
	var wordDiv = "";
	
	br = document.createElement("BR");
	wordBank.appendChild(br);
	
	// for(var i  = 0; i < arrWords.length; i++) {
	for(var i  = 1; i < arrWords.length; i++) {
	
		br = document.createElement("BR");
		wordBank.appendChild(br);
	
		wordDiv = document.createElement('DIV');
		wordDiv.className = 'dvWord';
		
		wordDiv.innerHTML = arrWords[i];

		wordBank.appendChild(wordDiv);
	
	}
	var obj = $(".dvWord");
	
	// obj.draggable();
	
	
/*	$('.dvWord').draggable({
	
		drag: function (aEvent, aUi) {

			mouseXPos = aEvent.pageX;
			mouseYPos = aEvent.pageY;
			// var myX = aEvent.pageX;
			// var myY = aEvent.pageY;
			
			
			}});
	*/
	
	// $(".dvWord").droppable({
		// drop: function() { alert("you dropped on me"); }
	// });
	
	
	// $(".dvWord").droppable( "disable" );
	
	$('.dvWord').draggable({
		
		// revert: "invalid",
	
		start: function( event, ui ) {
		
			var word = $(this).html();
			var wordID = arrWords.indexOf(word);
			
			currRing = arrResults[wordID];
		
		},
	
		drag: function (aEvent, aUi) {

		
			if(checkIntersect) {
				
		
			// var myX = aEvent.pageX;
			// var myY = aEvent.pageY;
			
			var myX = aEvent.pageX;
			var myY = aEvent.pageY;
		
			// $(this).html($(this).position().left);
			
			 var myR = $('.cirRing5').outerWidth(true) / 2;
			 var myCX = $('.cirRing5').offset().left + myR;
			 var myCY = $('.cirRing5').offset().top + myR;

		 
	
			removeAll();
			
			if (checkIntersection(myX, myY, myCX, myCY, myR))
			 {
				 // $(this).addClass('touched');
				 
				 // $(".cirRing5").addClass('highlight');
				 $(".cirRing5").addClass('highlight');
				 currRing = 5;
				 
				 return;
				 // alert($('#dvBullseye').width());
				 
			 }
			 
			 myR = $('.cirRing4').outerWidth(true) / 2;
			 myCX = $('.cirRing4').offset().left + myR;
			 myCY = $('.cirRing4').offset().top + myR;
			
			if (checkIntersection(myX, myY, myCX, myCY, myR))
			 {
				 // $(this).addClass('touched');
				 
				 $(".cirRing4").addClass('highlight');
				 
				 currRing = 4;
				 
				 return;
				 // alert($('#dvBullseye').width());
				 
			 }
			  
			 myR = $('.cirRing3').outerWidth(true) / 2;
			 myCX = $('.cirRing3').offset().left + myR;
			 myCY = $('.cirRing3').offset().top + myR;
			
			if (checkIntersection(myX, myY, myCX, myCY, myR))
			 {
				 // $(this).addClass('touched');
				 
				 $(".cirRing3").addClass('highlight');
				 
				 currRing = 3;
				 
				 return;
				 // alert($('#dvBullseye').width());
				 
			 }

			 myR = $('.cirRing2').outerWidth(true) / 2;
			 myCX = $('.cirRing2').offset().left + myR;
			 myCY = $('.cirRing2').offset().top + myR;
			
			if (checkIntersection(myX, myY, myCX, myCY, myR))
			 {
				 // $(this).addClass('touched');
				 
				 $(".cirRing2").addClass('highlight');
				 
				 currRing = 2;
				 
				 return;
				 // alert($('#dvBullseye').width());
				 
			 }

			 myR = $('.cirRing1').outerWidth(true) / 2;
			 myCX = $('.cirRing1').offset().left + myR;
			 myCY = $('.cirRing1').offset().top + myR;
			
			if (checkIntersection(myX, myY, myCX, myCY, myR))
			 {
				 // $(this).addClass('touched');
				 
				 // $(".cirRing1").addClass('highlight');
				 $(".cirRing1").addClass('highlight');
				 
				 currRing = 1;
				 
				 
				 return;
				 // alert($('#dvBullseye').width());
				 
			 }
			 
			 }else {
			 
			 if(isOverTarget) 
				currRing = 0;
			 else
				currRing = -1;

			  }
	
	
		},    
	
			stop: function(event, ui) {
		
				removeAll();

				var word = $(this).html();
				var wordID = arrWords.indexOf(word);
				
				// alert(currRing);
				
				// if(currRing == -1 && isOverTarget)
					// currRing = 0;
				
				addResult(wordID,currRing);
				
				// alert(word);
				
				// arrResults[wordID] = currRing;
				
				
				// console.log(arrResults);
		
				// alert(arrResults.indexOf(-1));

		
				// checkSubmit();


				

				
				

				
		
		
		}

	
	
	});
	
	

	

}





function findStuff() {

var query = new Parse.Query(GameScore);
	
	query.get("xWMyZ4YEGZ", {
		success: function(gameScore) {
		// The object was retrieved successfully.
	},
	
	error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and message.
	}
	});


}



var gotAllObjects = new Promise(
	
	function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            var reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);


function testPromise() {

var isMomHappy = true;

var willIGetNewPhone = new Promise(
    function (resolve, reject) {
        if (isMomHappy) {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone);
        } else {
            var reason = new Error('mom is not happy');
            reject(reason);
        }

    }
);


// call our promise
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            // console.log(fulfilled);
			// alert('yes!');
        })
        .catch(function (error) {
            // ops, mom don't buy it
            // console.log(error.message);
			alert('No!');
        });
}

askMom();

}

/*
var GameScore = Parse.Object.extend("GameScore");
var gameScore = new GameScore();

gameScore.set("score", 1337);
gameScore.set("playerName", "Sean Plott");
gameScore.set("cheatMode", false);

gameScore.save(null, {
  success: function(gameScore) {
    // Execute any logic that should take place after the object is saved.
    alert('New object created with objectId: ' + gameScore.id);
  },
  error: function(gameScore, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    alert('Failed to create new object, with error code: ' + error.message);
  }
});
*/





// function saveTest() {

	// var Results = Parse.Object.extend("Results");
	
	// var results = new Results();
	
	// var arrScores = [1, 2, 3];
	
	// results.set("testResult","Hmmm, test herexxx");
	// results.set("arrayTest", arrScores);
	
	
	// results.save(null, {
	
		// success: function(results) {
		
			// alert('New object created with objectId: ' + results.id);
		
		// },
		// error: function(results, error) {
		// // Execute any logic that should take place if the save fails.
		// // error is a Parse.Error with an error code and message.
		// alert('Failed to create new object, with error code: ' + error.message);
	  // }
		
	// });
	
	// // alert("Finished: " + results.id);

// }



function saveScores() {
	
	if(debug) {
		
		$("#dvMain").hide();
		$("#dvThankYou").show();
		return;
		
		
		
	}

	var Results = Parse.Object.extend("Results");
	
	var results = new Results();
	
	
	
	results.set("arrScores", arrResults);
	results.set("participantId", participantId);
	
	
	
	results.save(null, {
	
		success: function(results) {
		
			// alert('New object created with objectId: ' + results.id);
			// alert('Saved');
			$("#dvMain").hide();
			$("#dvThankYou").show();
		
		},
		error: function(results, error) {
		// Execute any logic that should take place if the save fails.
		// error is a Parse.Error with an error code and message.
		alert('Failed to create new object, with error code: ' + error.message);
	  }
		
	});
	
	// alert("Finished: " + results.id);

}
