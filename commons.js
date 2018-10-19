const path = require('path');
const cv = require('opencv4nodejs');
exports.drawRects = (win, rects) =>
  rects.forEach(rect => win.addOverlay(rect));

exports.rescaleRect = (rect, f) =>
  new fr.Rect(rect.left * f, rect.top * f, rect.right * f, rect.bottom * f);


const dataPath = path.resolve(__dirname, './models');
//const appdataPath = path.resolve(__dirname, './appdata')

exports.getDataPath = () => dataPath;

//otros
const pngPrefix = 'data:image/jpeg;base64,';
const jpgPrefix = 'data:image/png;base64,';

exports.decodeFromBase64 = (base64DataString) => {
  const base64Data = base64DataString.replace(pngPrefix, '').replace(jpgPrefix, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const img = cv.imdecode(buffer);
  return img;
};

exports.encodeJpgBase64 = (img) => {
  return cv.imencode('.jpg', img).toString('base64');
}

exports.loadBase64=(fr,base64encoded)=>{
  const base64data = base64encoded.replace('data:image/jpeg;base64','')
  .replace('data:image/png;base64','').replace('data:image/webp;base64','');
  const buffer = Buffer.from(base64data, 'base64');
  const image = cv.imdecode(buffer);
  const cvImage = fr.CvImage(image)
  return cvImage;
  }

exports.base64_encode=(file)=> {
      return fs.readFileSync(file, 'base64');
  }