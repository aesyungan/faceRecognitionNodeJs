console.time('loop');
//ejemplo con promise
const spawn = require('threads').spawn;

const thread = spawn((data) => {
    // Remember that this function will be run in another execution context.
    // suma = (a, b) => {
    //     return a + b;
    // }
    return new Promise(resolve => {
        console.log("(" + data.a + "-" + data.b + ")");
        resolve(data.a + data.b);
    })
});
let lst = [];
for (let index = 0; index < 2; index++) {
    lst.push(index);
}
lst.forEach(async item => {
    console.log("item->" + item);
    const t=thread;
     t
        .send({ a: item, b: item })
        // The handlers come here: (none of them is mandatory)
        .on('message', (response) => {
            console.log(response);
            thread.kill();
        });
});

console.timeEnd('loop');