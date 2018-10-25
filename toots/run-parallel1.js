console.time('loop');
ejecutarAlgo = async (num) => {
    let tam = 1;
    if (num == 1) {
        tam = 10000000000;
    }
    if (num == 2) {
        tam = 5000000000;
    }
    if (num == 3) {
        tam = 2000000000;
    }
    let suma = 0;
    for (let index = 0; index < tam; index++) {
        suma = suma + index;
    }
    console.log("complete->" + num);
}
var parallel = require('run-parallel');
[1, 2, 3].forEach(element => {

    parallel([
        function (callback) {
            setTimeout(function () {
                num=element;
                let tam = 1;
                if (num == 1) {
                    tam = 10000000000;
                }
                if (num == 2) {
                    tam = 5000000000;
                }
                if (num == 3) {
                    tam = 2000000000;
                }
                let suma = 0;
                for (let index = 0; index < tam; index++) {
                    suma = suma + index;
                }
                console.log("complete->" + num);
               // ejecutarAlgo();
                callback(null, 'one' + element)
            }, 1000)
        }
    ],
        // optional callback
        function (err, results) {
            console.log(results);
        })
});

console.timeEnd('loop');