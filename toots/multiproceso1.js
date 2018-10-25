//const { spawn } = require('child_process');
var init = 10;
console.time('loop');
function proceso() {
    while (true) {
        console.log("HOLA MUNDO");
    }
}
const spawn = require('threads').spawn;
const threadsuma = spawn((data, done) => {
    //console.log(init);
    let suma = 0;
    data.forEach(element => {
        suma = element + suma;
    });
    done(suma);
});

threadsuma.send([1, 2, 3, 4, 5, 6, 7, 8, 9])
    // The handlers come here: (none of them is mandatory)
    .on('message', function (response) {
        console.log(response);
        threadsuma.kill();
    })
    .on('error', function (error) {
        console.error('Worker errored:', error);
    })
    .on('exit', function () {
        console.log('Worker has been terminated.');
    });
console.timeEnd('loop');