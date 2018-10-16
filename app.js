const fr = require('face-recognition');
const correa1 = fr.loadImage('img/correa1.jpg');
const correa2 = fr.loadImage('img/correa2.jpg');
const testFoto = fr.loadImage('img/correatest.jpg');
const juan = fr.loadImage('img/juan.jpg');
const alfonso = fr.loadImage('img/alfonso.jpg');
const win = new fr.ImageWindow();
// display image

// drawing the rectangle into the displayed image
//win.addOverlay(rectangle)

// pause program until key pressed
const detector = fr.FaceDetector();
//const faceRectangles = detector.locateFaces(correa1);
const faceImagesCorrea1 = detector.detectFaces(correa1);
const faceImagesCorrea2 = detector.detectFaces(correa2);
const facesImagesCorrea =Array.prototype.concat(faceImagesCorrea1,faceImagesCorrea2);
const faceImagesJuan = detector.detectFaces(juan);
const faceImageAlfonso = detector.detectFaces(alfonso);
const faceImagesTest = detector.detectFaces(testFoto);
console.log("img correa ->"+facesImagesCorrea.length);
const recognizer = fr.FaceRecognizer();
// const numJitters = 15;
// recognizer.addFaces(facesImagesCorrea, 'Rafael Correa', numJitters);
// recognizer.addFaces(faceImagesJuan, 'Juan PErez', numJitters);
// recognizer.addFaces(faceImageAlfonso, 'Aljonso deldago', numJitters);

recognizer.addFaces(facesImagesCorrea, 'Rafael Correa' );
recognizer.addFaces(faceImagesJuan, 'Juan PErez' );
recognizer.addFaces(faceImageAlfonso, 'Aljonso deldago' );
// const predictions = recognizer.predict(testFoto);
//reconoce por todas las images que tenga y muestra la prediccion de todos
console.log("todas las predicciones -> \n");
const predictions = recognizer.predict(faceImagesTest[0]);
console.log(predictions)
//la mejor prediccion
console.log("la mejor prediccion -> \n");
const bestPrediction = recognizer.predictBest(faceImagesTest[0]);
console.log(bestPrediction);
//fr.hitEnterToContinue();
//guardar los faces guardados
const fs = require('fs');
const modelState = recognizer.serialize();
fs.writeFileSync('models/model.json', JSON.stringify(modelState));