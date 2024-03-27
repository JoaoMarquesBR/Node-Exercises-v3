//Arrow functions Example 2 
let setValues = (id, name, age) => ({ id: id, name: name, age: age });

let students = setValues(1, "Joao", 20);

console.log(students)
console.log(`Student ${students.name} is ${students.age} years old`);