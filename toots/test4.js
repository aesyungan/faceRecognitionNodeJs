console.time('loop');
suma = async (a, b) => {
    return await a + b;
}
resta = async (a, b) => {
    return await a - b;
}
multiplicacion = async (a, b) => {
    return await a * b;
}
suma(2, 2).then(res => console.log('suma->' + res));
resta(2, 2).then(res => console.log('resta->' + res));
multiplicacion(3, 3).then(res => console.log('multiplicacion->' + res));
console.timeEnd('loop');

