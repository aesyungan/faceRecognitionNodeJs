console.time('loop');

var crearDatos = async (nombre) => {
    return await new Promise((resolve, reject) => {
        if (nombre == "") {
            reject("el nombre esta basio");
        } else {
            console.log("se completo el nombre");
            resolve({ name: nombre });
        }

    });
}
var crearNumeros = async (apellido) => {
    return await new Promise((resolve, reject) => {
        console.log("se completo el numero");
        resolve([1, 2, 3, 4, 5]);
    });
}
// crearDatos("alex").then(data=>{
// console.log(data);
// }).catch(err=>console.log("error->"+err));
crearDatos("alex");
crearNumeros();
// Promise.all([crearDatos('alex'), crearNumeros()]).then(res => {
//     res.forEach(res1 => {
//         console.log(res1);
//     });
//     console.log(res[0].name);
// });


// Promise.race(crearNumeros()).then(res => {
//     res.forEach(res1 => {
//         console.log(res1);
//     });
// });
// function printString(string){
//     setTimeout(
//       () => {
//         console.log(string)
//       }, 
//       Math.floor(Math.random() * 100) + 1
//     )
//   }
// async function printAll(){
//     await printString("A")
//     await printString("B")
//     await printString("C")
//   }
//   printAll()
console.log("complete....");
console.timeEnd('loop'); 