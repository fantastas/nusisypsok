video = document.getElementById('video');
matuoklis = document.getElementById('matuoklis');


function changeDiv(id) {
	tevas = document.getElementById('tevas');
	var c = tevas.children;
	div = document.getElementById(id);
	for (let i = 0; i < c.length; i++) {
		c[i].style.visbility = "hidden";
		c[i].style.display = 'none';
	}

	div.style.visbility = "visible";
	div.style.display = 'flex';
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getEmail() {
	email = document.getElementById('email').value;
	message = document.getElementById('message').value;
	setCookie('email', email, 30);
	setCookie('message', message, 30);
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}





async function sendEmail(morseString) {
	await Email.send({
			Host: "smtp.gmail.com",
			Username: "mariussurvilapastas@gmail.com",
			Password: "Troleibusas123",
			To: getCookie('email'),
			From: "mariussurvilapastas@gmail.com",
			Subject: "Disabled help call",
			Body: getCookie('message'),
		})
		.then(function (message) {
			alert("mail sent successfully")
		});
}

function buttonclick() {
	var pagebutton = document.getElementById("selfclick");
	pagebutton.click();
	window.location.href = 'home.html';

}

Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);

function startVideo() {
	navigator.getUserMedia({
			video: {}
		},
		stream => video.srcObject = stream,
		err => console.error(err))
}
let i = 0;
let happiness = 0;
video.addEventListener('play', () => {
	setInterval(async () => {
		const detections = await faceapi.detectAllFaces(video,
			new faceapi.TinyFaceDetectorOptions()).
		withFaceLandmarks().withFaceExpressions()
		var expressions = detections[0].expressions;




		Object.entries(expressions).forEach(([key, value]) => {
			if (key === 'happy') {
				matuoklis.value = parseInt(value * 100);
			}
			if (key === 'happy' && value > 0.99) {
				buttonclick();
				return;
			} else if (key === 'surprised' && value > 0.99) {
				window.location.href = 'email.html';

			}

		});



	}, 1000)
});


window.addEventListener("load", function () {
	setTimeout(function () {
		overlay = document.getElementById('overlay');
		overlay.style.display = "none";
	}, 2000);


});





// const landmarkPositions = detections[0].landmarks._positions;
// var leftEye = [];
// var rightEye = [];
// var closedLeft = false;
// var closedRight = false;


// for(let i = 38;i <= 42; i++){
// 	if(i == 40){
// 		continue;
// 	}
// 	leftEye.push(landmarkPositions[i]._x);
// }
// console.log(leftEye);

// let leftEyeY = 0;
// let leftStarterY = leftEye[0]._y * 4;

// for(let i = 0;i < leftEye.length; i++){
// 	leftEyeY += leftEye[i]._y;
// }
// leftEyeY /= leftStarterY; 
// console.log(leftEyeY);

// if(leftEyeY < 1.017){
// 	closedLeft = true;
// 	morseString+=".";
// 	console.log('.');
// }

////////////////////////////////////////////////
// for(let i = 44;i <= 48; i++){
// 	if(i == 46){
// 		continue;
// 	}
// 	rightEye.push(landmarkPositions[i]);
// }

// let rightEyeY = 0;
// let rightStarterY = rightEye[0]._y * 4;

// for(let i = 0;i < rightEye.length; i++){
// 	rightEyeY += rightEye[i]._y;
// }
// rightEyeY /= rightStarterY; 
// console.log(rightEyeY);

// if(rightEyeY < 1.15){
// 	closedRight = true;
// 	morseString+="-";
// 	console.log('-');

// }