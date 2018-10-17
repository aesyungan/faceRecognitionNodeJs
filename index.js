var express = require("express");
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server); //inicia socket
var port = process.env.PORT || 3000;
var Log = require("log"),
    log = new Log('debug');
const fs = require('fs');
/*INIT config face */
const fr = require('face-recognition');
const detector = fr.FaceDetector();
const win = new fr.ImageWindow();
const recognizer = fr.FaceRecognizer();
const path = require('path');
const {
    drawRects,
    getDataPath,
    decodeFromBase64
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
        let imgApp=fr.CvImage(decodeFromBase64(imagen));
        let faceRects = detector.locateFaces(imgApp).map(res => res.rect);
        let faces = detector.getFacesFromLocations(imgApp, faceRects, 150);
        
        win.setImage(imgApp);
        drawRects(win, faceRects);
        let unknownThreshold = 0.6
        faceRects.forEach((rect, i) => {
            const prediction = recognizer.predictBest(faces[i], unknownThreshold);
            //win.addOverlay(rect, `${prediction.className} (${prediction.distance})`);
            win.addOverlay(rect, `${prediction.className} \n (${prediction.distance})`);
            
            console.log(rect);
            console.log(prediction);
        });
        //fs.writeFileSync('img'+i+".jpg", imagen);
        socket.broadcast.emit('sendImagen', imagen); //envia a todos ese stream
    });
});
//escuchar en puerto
server.listen(port, () => {
    log.info('servidor escuchando en puerto %s', port);
});