
function multiply(a, b = 8) {
    return a / b;
  }
  
console.log(multiply(10, 2)); 
  
console.log(multiply(16)); 
function member(name) {
  name = name || "abcd";
  return name;
}
console.log(member()); /* ouput: Guess */
console.log(member("Tran Trong Truong")); /* ouput: "Dương Minh Trí" */
