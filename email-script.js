video = document.getElementById('video');
var morseString = "";


var MORSE_CODE = {".-": "a", "-...":"b", "-.-.": "c", "-..": "d", ".":"e", "..-.":"f", "--.":"g", "....":"h", 
"..":"i", ".---":"j", "-.-":"k", ".-..":"l", "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", 
"...":"s", "-":"t", "..-":"u", "...-":"v", ".--":"w", "-..-":"x", "-.--":"y", "--..":"z", ".----":"1", "..---":"2", 
"...--":"3", "....-":"4", ".....":"5", "-....":"6", "--...":"7", "---..":"8", "----.":"9", "-----":"0", "|":" "};

var decodeMorse = function(morseCode){
  var words = (morseCode).split('  ');
  var letters = words.map((w) => w.split(' '));
  var decoded = [];

  for(var i = 0; i < letters.length; i++){
    decoded[i] = [];
    for(var x = 0; x < letters[i].length; x++){
        if(MORSE_CODE[letters[i][x]]){
            decoded[i].push( MORSE_CODE[letters[i][x]] );
        }
    }
  }

  return decoded.map(arr => arr.join('')).join(' ');
}

function sendEmail(morseString) {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "mariussurvilapastas@gmail.com",
		Password: "Troleibusas123",
		To: 'msgitara@gmail.com',
		From: "mariussurvilapastas@gmail.com",
		Subject: "Disabled help call",
		Body: decodeMorse(this.morseString),
	})
		.then(function (message) {
		alert("mail sent successfully")
		});
	}

	function buttonclick(){
		var pagebutton= document.getElementById("selfclick");
		pagebutton.click();
	}

	


var auth = false;
Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('/models')]).then(startVideo);

function startVideo(){
	navigator.getUserMedia(
	{video: {} },
	stream => video.srcObject = stream,
	err => console.error(err))
}
let i = 0;
let happiness = 0;
video.addEventListener('play', () => {
	const canvas = faceapi.createCanvasFromMedia(video)
	// document.body.append(canvas);
	const displaySize = {width: video.width, height: video.height}
	faceapi.matchDimensions(canvas, displaySize);
	setInterval(async () => {
		const detections = await faceapi.detectAllFaces(video, 
		new faceapi.TinyFaceDetectorOptions()).
		withFaceLandmarks().withFaceExpressions()
		// const resizedDetections = faceapi.resizeResults(detections, displaySize);
		// canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
		// faceapi.draw.drawDetections(canvas, resizedDetections);
		// faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
		// faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
		var expressions = detections[0].expressions;
		
		// console.log(expressions);
		const landmarkPositions = detections[0].landmarks._positions;
		var leftEye = [];
		var rightEye = [];
		var closedLeft = false;
		var closedRight = false;

		
	
		
		Object.entries(expressions).forEach(([key, value]) => {
			if(key==='happy' && value > 0.7){
				console.log('.');
				morseString+=".";

			}
			else if(key ==='surprised' && value > 0.9){
				morseString+=" ";
				console.log('space');
				
			}

			else if(key ==='angry' && value > 0.7){
				morseString+="-";
				console.log('-');
				
			}
			else if(key ==='sad' && value > 0.3){
			
				// console.log(decodeMorse(morseString));
				buttonclick();
				
			}
		

		


			// 	window.location.href = 'newPage.html';

			});
		
			
			
	}, 1000)
});