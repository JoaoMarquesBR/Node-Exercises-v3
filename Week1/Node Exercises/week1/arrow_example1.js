let add = (x, y) => {
    return x + y;
};


let add2 = (x, y) => x + y;

console.log(add(5, 4));
console.log(add2(5, 4));

//formatting
let x = 10;
let y = 20;
console.log(`${x} plus ${y} is ${add2(x, y)}`);
