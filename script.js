video = document.getElementById('video');
matuoklis = document.getElementById('matuoklis');

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
video.addEventListener('play', ()=>{
	const canvas = faceapi.createCanvasFromMedia(video)
	// document.body.append(canvas);
	const displaySize = {width: video.width, height: video.height}
	faceapi.matchDimensions(canvas, displaySize);
	setInterval(async () => {
		const detections = await faceapi.detectAllFaces(video, 
		new faceapi.TinyFaceDetectorOptions()).
		withFaceLandmarks().withFaceExpressions()
		const resizedDetections = faceapi.resizeResults(detections, displaySize);
		canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
		// faceapi.draw.drawDetections(canvas, resizedDetections);
		// faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
		// faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
		const expressions = detections[0].expressions;
		const landmarkPositions = detections[0].landmarks._positions;
		var leftEye = [];
		var rightEye = [];
		var closedLeft = false;
		var closedRight = false;
		for(let i = 37;i <= 42; i++){
			leftEye.push(landmarkPositions[i]);
		}
		
		let firstLeftEyeY = 0;
		let leftEyeY = 0;
		
		// let leftStarterY = leftEye[0]._y * 6;

		for(let i = 0;i < leftEye.length; i++){
			leftEyeY += leftEye[i]._y;
		}
		leftEyeY /= leftStarterY; 
		
		if(leftEyeY < 1.03){
			closedLeft = true;
		}

		// for(let i = 43;i <= 48; i++){
		// 	rightEye.push(landmarkPositions[i]);
		// }
		
		// let rightEyeY = 0;
		// let rightStarterY = rightEye[0]._y * 6;

		// for(let i = 0;i < rightEye.length; i++){
		// 	rightEyeY += rightEye[i]._y;
		// }
		// rightEyeY /= rightStarterY; 
		
		// if(rightEyeY < 1.03){
		// 	closedRight = true;
		// }
		
		// console.log(leftEyeY, rightEyeY);

		// if(closedRight == true){
		// 	// window.location.href = 'About.html';
		// 	console.log('uzmerkei');
		// }

		// if(closedLeft == true){
		// 	window.location.href = 'Contact.html';

		// }

		// angry: 0.0000011151292937938706
		// disgusted:
		// 1.0118585969109972
		// e-8
		// fearful:
		// 3.967896944345739
		// e-8
		// happy: 0.0000020260943074390525
		// neutral: 0.000022489386537927203
		// sad: 0.9999743700027466
		// surprised:
		// 3.897886458048561


		

		Object.entries(expressions).forEach(([key, value]) => {
			if(key==='happy'){
				matuoklis.value = parseInt(value*100);
			}
			if(key==='happy' && value > 0.9){
				console.log('Youre happy!');
				happiness++;
			}
			if(happiness>=10){
				auth = true;
			}

			if(auth){
				window.location.href = 'newPage.html';
			}
			});
			
		
	}, 1000)
});