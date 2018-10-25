console.time('loop');

// esperar = async (item) => {
//     let suma = 0;
//     for (let index = 0; index < 1000000000000000000000000000000; index++) {
//         suma = suma + index;
//     }
//     console.log("complete" + item);

//     // return i;
// }
// let list = [1, 2, 3, 4, 5, 6];
// list.forEach(async (item) => {
//     console.log("item ->" + item);
//     esperar(item);

// });
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
}
asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        console.log("index->" + index);
         callback(array[index], index, array)
    }
    // return new Promise((resolve, reject) => {
    //     resolve("complete");
    // });
    return "complete";
}
asyncForEach([1, 2, 3], async (num) => {
     ejecutarAlgo(num);
    console.log(num);


}).then(data => {
    console.log("termino foreach->" + data);
});
console.timeEnd('loop'); 