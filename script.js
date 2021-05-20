video = document.getElementById('video');
matuoklis = document.getElementById('matuoklis');

// tevas = document.getElementById('tevas');
// var c = tevas.children;
// console.log(c[0]);

function changeDiv(id){
	tevas = document.getElementById('tevas');
	var c = tevas.children;
	div =  document.getElementById(id);
	for(let i = 0; i< c.length; i++){
		c[i].style.visbility = "hidden";
		c[i].style.display = 'none';
	 }
	
	div.style.visbility = "visible";
	div.style.display = 'flex';
}





function sendEmail(morseString) {
	Email.send({
		Host: "smtp.gmail.com",
		Username: "mariussurvilapastas@gmail.com",
		Password: "Troleibusas123",
		To: 'msgitara@gmail.com',
		From: "mariussurvilapastas@gmail.com",
		Subject: "Disabled help call",
		Body: "man reikalinga pagalba",
	})
		.then(function (message) {
		alert("mail sent successfully")
		});
	}

	function buttonclick(){
		var pagebutton= document.getElementById("selfclick");
		pagebutton.click();
	}

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
	// const canvas = faceapi.createCanvasFromMedia(video)
	// document.body.append(canvas);
	// const displaySize = {width: video.width, height: video.height}
	// faceapi.matchDimensions(canvas, displaySize);
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
		
		Object.entries(expressions).forEach(([key, value]) => {
			if(key==='happy'){
				matuoklis.value = parseInt(value*100);
			}
			if(key==='happy' && value > 0.9){
				buttonclick();
				return;
			}

			else if(key ==='surprised' && value > 0.9){
				window.location.href = 'email.html';
				
			}
		
			});
		
			
			
	}, 1000)
});


window.addEventListener("load", function(){
	setTimeout(function(){ 	
		overlay = document.getElementById('overlay');
		overlay.style.display = "none"; }, 3000);

	
	});

