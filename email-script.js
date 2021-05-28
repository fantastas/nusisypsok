matuoklis = document.getElementById('matuoklis');
morzesKodas = document.getElementById('morzesKodas');
space = document.getElementById('space');
dot = document.getElementById('dot');
bruksnys = document.getElementById('bruksnys');
video = document.getElementById('video');
backspace = document.getElementById('backspace');
letter = document.getElementById('letter');
var morseString = "";
var MORSE_CODE = {
	".-": "a",
	"-...": "b",
	"-.-.": "c",
	"-..": "d",
	".": "e",
	"..-.": "f",
	"--.": "g",
	"....": "h",
	"..": "i",
	".---": "j",
	"-.-": "k",
	".-..": "l",
	"--": "m",
	"-.": "n",
	"---": "o",
	".--.": "p",
	"--.-": "q",
	".-.": "r",
	"...": "s",
	"-": "t",
	"..-": "u",
	"...-": "v",
	".--": "w",
	"-..-": "x",
	"-.--": "y",
	"--..": "z",
	".----": "1",
	"..---": "2",
	"...--": "3",
	"....-": "4",
	".....": "5",
	"-....": "6",
	"--...": "7",
	"---..": "8",
	"----.": "9",
	"-----": "0",
	"|": " "
};


function showImage(id) {
	var img = document.getElementById(id);
	img.style.visibility = 'visible';
	img.style.display = 'block';

}

var decodeMorse = function (morseCode) {
	var words = (morseCode).split('  ');
	var letters = words.map((w) => w.split(' '));
	var decoded = [];

	for (var i = 0; i < letters.length; i++) {
		decoded[i] = [];
		for (var x = 0; x < letters[i].length; x++) {
			if (MORSE_CODE[letters[i][x]]) {
				decoded[i].push(MORSE_CODE[letters[i][x]]);
			}
		}
	}

	return decoded.map(arr => arr.join('')).join(' ');
}

function getEmail() {
	email = document.getElementById('email').value;
	message = document.getElementById('message').value;
	setCookie('email', email, 30);
	setCookie('message', message, 30);
	console.log(document.cookie);
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

function sendEmail(morseString) {
	var message = decodeMorse(this.morseString);
	message = message.substr(0, message.length - 1);
	Email.send({
			Host: "smtp.gmail.com",
			Username: "mariussurvilapastas@gmail.com",
			Password: "Troleibusas123",
			To: getCookie('email'),
			From: "mariussurvilapastas@gmail.com",
			Subject: "Disabled help call",
			Body: message,
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
	faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo);
console.log(getCookie('email'));

function startVideo() {

	navigator.getUserMedia({
			video: {}
		},
		stream => video.srcObject = stream,
		err => console.error('unable to start video'))
}
let i = 0;

video.addEventListener('play', () => {

	setInterval(async () => {
		const detections = await faceapi.detectAllFaces(video,
			new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
		var expressions = detections[0].expressions;

		dot.style.visibility = 'hidden';
		bruksnys.style.visibility = 'hidden';
		space.style.visibility = 'hidden';
		backspace.style.visibility = 'hidden';
		letter.style.visibility = 'hidden';


		Object.entries(expressions).forEach(([key, value]) => {

			if (key === 'happy' && value > 0.7) {
				showImage('dot');
				morseString += ".";
				morzesKodas.value = morseString;
				matuoklis.value = decodeMorse(morseString);

			} else if (key === 'surprised' && value > 0.9) {
				morseString += " ";
				showImage('space');
				morzesKodas.value = morseString;
				matuoklis.value = decodeMorse(morseString);


			} else if (key === 'angry' && value > 0.6) {
				showImage('bruksnys');
				morseString += "-";
				morzesKodas.value = morseString;
				matuoklis.value = decodeMorse(morseString);


			} else if (key === 'sad' && value > 0.6) {
				showImage('backspace');

				var index = morseString.split(" ");

				index = index.slice(0, index.length - 1);
				morseString = index.join(" ");
				matuoklis.value = decodeMorse(morseString);
				morzesKodas.value = morseString;
			} else if (matuoklis.value.substr(matuoklis.value.length - 1) == 'w') {
				morseString.substr(0, morseString.length - 1);
				showImage('letter');
				buttonclick();

			}

		});
	}, 1000)
});