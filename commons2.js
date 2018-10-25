const spawn = require('threads').spawn;

exports.thread = spawn((data) => {
    //funciones
    // let i=data.i;
    // let cv = data.cv;
    // let recognizer = data.recognizer;
    // let fr = dada.fr;
    // let socket=data.socket;
    // let imagen = data.imagen;
    // const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
    // detectFaces = (img, faceSize) => {
    //     const { objects, numDetections } = classifier.detectMultiScale(img.bgrToGray())
    //     return objects
    //         .filter((_, i) => minDetections <= numDetections[i])
    //         .map(rect => ({
    //             rect,
    //             face: img.getRegion(rect).resize(faceSize, faceSize)
    //         }))
    // }
    // //end funciones
    // const base64text = imagen;//Base64 encoded string

    // const base64data = base64text.replace('data:image/webp;base64', '')
    //     .replace('data:image/png;base64', '');//Strip image type prefix
    // const buffer = Buffer.from(base64data, 'base64');
    // const img = cv.imdecode(buffer); //Image is now represented as Mat

    // console.log('detecting faces for query image');
    // const detections = detectFaces(img, 150);

    // const drawImg = img.copy()
    // // mark faces with distance > 0.6 as unknown
    // const unknownThreshold = 0.6;
    // detections.forEach((det) => {
    //     const { rect, face } = det;
    //     const cvFace = fr.CvImage(face);
    //     const prediction = recognizer.predictBest(cvFace, unknownThreshold);

    //     const text = `${prediction.className} (${prediction.distance})`;
    //     const blue = new cv.Vec(100, 100, 154);
    //     drawRectWithText(drawImg, rect, text, blue);

    //     // console.log(prediction);
    //     //cv.imshow(`image_${i})`, drawImg);
    //     //  cv.waitKey(1)

    // });
    // // convert Mat to base64 encoded jpg image
    // const outBase64 = cv.imencode('.jpg', drawImg).toString('base64'); // Perform base64 encoding
    // socket.broadcast.emit('sendImagen', "data:image/webp;base64," + outBase64); //envia a todos ese stream
    
    return new Promise(resolve => {
        resolve(i);
    });
});