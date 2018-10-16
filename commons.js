const path = require('path');
exports.drawRects = (win, rects) =>
  rects.forEach(rect => win.addOverlay(rect));

exports.rescaleRect = (rect, f) =>
  new fr.Rect(rect.left * f, rect.top * f, rect.right * f, rect.bottom * f);


const dataPath = path.resolve(__dirname, './models');
//const appdataPath = path.resolve(__dirname, './appdata')

exports.getDataPath = () => dataPath;