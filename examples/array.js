//Method Find and Filter

//easy mode
let numbers = [12, 25, 37, 40, 55, 60];
find_num = numbers.find((num) => num > 30);
filter_num = numbers.filter((num) => num > 30);
console.log(`Find: ${find_num}`);
console.log(`Filter: ${filter_num} \n`);

//intermediate mode
let products = [
  { id: 1, name: "Laptop", price: 12000 },
  { id: 2, name: "Mouse", price: 500 },
  { id: 3, name: "Keyboard", price: 1500 },
  { id: 4, name: "Monitor", price: 3000 },
];

find_price = products.find((product) => product.price > 2000);
filter_price = products.filter((product) => product.price > 2000);

console.log(`Find: ${JSON.stringify(find_price, null, 2)}`);
console.log(`Filter:\n${JSON.stringify(filter_price, null, 2)} \n`);
