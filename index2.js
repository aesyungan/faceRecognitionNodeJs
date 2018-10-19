var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); //inicia socket
var port = process.env.PORT || 3000;
var Log = require("log"),
    log = new Log('debug');
const fs = require('fs');
/*INIT config face */
const cv = require('opencv4nodejs')
//const fr = require('face-recognition');
const fr = require('face-recognition').withCv(cv);
const detector = fr.FaceDetector();
const win = new fr.ImageWindow();
const recognizer = fr.FaceRecognizer();
const path = require('path');
const {
    drawRects,
    getDataPath,
    decodeFromBase64,
    loadBase64
} = require('./commons');
//carga el modelo
//const dataPath = path.resolve(__dirname, './models');
const trainedModelFile = `model.json`;
const trainedModelFilePath = path.resolve(getDataPath(), trainedModelFile);
recognizer.load(require(trainedModelFilePath));

//imagen para reconocer
//et testFoto = fr.loadImage('img/personas.jpg');
//resize
const minPxSize = 307200;//vga
/*END config face  */
app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    res.redirect('index.html');
    //res.send("app");
});
//socket on escucha --- emit envia
var i = 0;
io.on('connection', function (socket) { //ejecuta al declarar io();
    console.log("se conecto un usuario");

    socket.on('stream', function (imagen) { //esta escuchando si algien emita un estream
        i++;
        //console.log(imagen);
        const base64text = imagen;//Base64 encoded string

        const base64data = base64text.replace('data:image/webp;base64', '')
            .replace('data:image/png;base64', '');//Strip image type prefix
        const buffer = Buffer.from(base64data, 'base64');
        const img = cv.imdecode(buffer); //Image is now represented as Mat

        console.log('detecting faces for query image');
        const detections = detectFaces(img, 150);

        const drawImg = img.copy()
        // mark faces with distance > 0.6 as unknown
        const unknownThreshold = 0.6;
        detections.forEach((det) => {
            const { rect, face } = det;
            const cvFace = fr.CvImage(face);
            const prediction = recognizer.predictBest(cvFace, unknownThreshold);

            const text = `${prediction.className} (${prediction.distance})`;
            const blue = new cv.Vec(255, 0, 0);
            drawRectWithText(drawImg, rect, text, blue);

            // console.log(prediction);
            //cv.imshow(`image_${i})`, drawImg);
            //  cv.waitKey(1)

        });
        // convert Mat to base64 encoded jpg image
        const outBase64 = cv.imencode('.jpg', drawImg).toString('base64'); // Perform base64 encoding
        socket.broadcast.emit('sendImagen', "data:image/webp;base64," + outBase64); //envia a todos ese stream
        console.log(i);
    });
    //capture img 
    socket.on('capture', function (data) {
        //  console.log(data);
        //console.log();
        var cvImage = loadBase64(fr, data.img);
        let imageRgb = fr.cvImageToImageRGB(cvImage);

        const detector = fr.FaceDetector();
        const faceImages = detector.detectFaces(imageRgb);
        if (faceImages.length > 0) {
            recognizer.addFaces(faceImages, data.nombre);

            let data2 = { correct: true, sms: "Registro correcto" };
            socket.broadcast.emit('smscapture', data2);
            console.log("registro correcto...");
        } else {

            let data2 = { correct: false, sms: "No se detecto ningun rostro" };
            socket.broadcast.emit('smscapture', data2);
            console.log("no existe imagen de cara");

        }

        // const modelState = recognizer.serialize();
        // fs.writeFileSync('models/model.json', JSON.stringify(modelState));

        //socket.broadcast.emit('capturesms', "Se registro Correctamente");

    });
});
//escuchar en puerto
server.listen(port, () => {
    log.info('servidor escuchando en puerto %s', port);
});


/*otras funciones */
// opencv way to detect faces, faster but not as precise
const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const minDetections = 5;

function detectFaces(img, faceSize) {
    const { objects, numDetections } = classifier.detectMultiScale(img.bgrToGray())
    return objects
        .filter((_, i) => minDetections <= numDetections[i])
        .map(rect => ({
            rect,
            face: img.getRegion(rect).resize(faceSize, faceSize)
        }))
}


function drawRectWithText(image, rect, text, color) {
    const thickness = 2
    image.drawRectangle(
        new cv.Point(rect.x, rect.y),
        new cv.Point(rect.x + rect.width, rect.y + rect.height),
        color,
        cv.LINE_8,
        thickness
    )

    const textOffsetY = rect.height + 20
    image.putText(
        text,
        new cv.Point(rect.x, rect.y + textOffsetY),
        cv.FONT_ITALIC,
        0.6,
        color,
        thickness
    )
}