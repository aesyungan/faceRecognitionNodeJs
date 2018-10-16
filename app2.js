const fr = require('face-recognition');
const detector = fr.FaceDetector();
const win = new fr.ImageWindow();
const recognizer = fr.FaceRecognizer();
const path = require('path');
const {
    drawRects,
    getAppdataPath
  } = require('./commons');
//carga el modelo
const dataPath = path.resolve(__dirname, './models');
const trainedModelFile = `model.json`;
const trainedModelFilePath = path.resolve(dataPath, trainedModelFile);
recognizer.load(require(trainedModelFilePath));

//imagen para reconocer
let testFoto = fr.loadImage('img/personas.jpg');
//resize
const minPxSize = 307200;//vga

console.log("col->"+testFoto.cols+" rows ->"+testFoto.rows+" total->"+testFoto.cols * testFoto.rows);
  if ((testFoto.cols * testFoto.rows) < minPxSize) {
    testFoto = fr.resizeImage(testFoto, minPxSize / (testFoto.cols * testFoto.rows));
    console.log("resize img");
  }
//const faceImagesTest = detector.detectFaces(testFoto);
const faceRects = detector.locateFaces(testFoto).map(res => res.rect);
const faces = detector.getFacesFromLocations(testFoto, faceRects, 150);
  win.setImage(testFoto);
  drawRects(win, faceRects);
  const unknownThreshold = 0.6
  faceRects.forEach((rect, i) => {
    const prediction = recognizer.predictBest(faces[i], unknownThreshold);
    //win.addOverlay(rect, `${prediction.className} (${prediction.distance})`);
    win.addOverlay(rect, `${prediction.className} \n (${prediction.distance})`);
    
    console.log(rect);
    console.log(prediction);
  });
fr.hitEnterToContinue();

