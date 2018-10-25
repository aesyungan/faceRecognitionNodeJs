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

forCustom = async(array) => {
    array.forEach(async (item) => {
        console.log(item);
        setTimeout(() => {
            ejecutarAlgo(item);
        }, 0)
    });
    return "for complete";
}

forCustom([1,2,3]).then(data=>{
    console.log(data);
});

console.timeEnd('loop');