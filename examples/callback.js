// Penulisan Fungsi
//1. function nama_function() {}
function run1() {
  console.log("Running 1");
}

//callback function
function runSomething1(callback) {
  callback();
}
runSomething1(run1);

//2. anonymous function
// tidak menggunakan nama_fungsi
// mendeklarasikan variabel untuk menampung fungsi
const run2 = function () {
  console.log("Running 2a");
};

//callback function
function runSomething2a(callback) {
  callback();
}
runSomething2a(run2);

//atau

function runSomething2b(callback) {
  callback();
}

runSomething2b(function () {
  console.log("Running 2b");
});

//3. arrow function
// tidak ada reserve word "function"
// tidak menggunakan nama_fungsi
// menggunakan "=>"
// mendeklarasikan variabel untuk menampung fungsi
const run3 = () => {
  console.log("Running 3a");
};

//callback function
function runSomething3a(callback) {
  callback();
}

runSomething3a(run3);

//atau
function runSomething3b(callback) {
  callback();
}

runSomething3b(() => console.log("Running 3b"));
