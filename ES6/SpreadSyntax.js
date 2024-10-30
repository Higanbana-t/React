const oldArray = [1, 2, 3];
const newArray = [...oldArray, 4, 5];
console.log(newArray); 
const oldObject = {
    name: 'Dương Minh Trí'
  };
  
  const newObject = {
    ...oldObject,
    age: 4
  };
  
  console.log(newObject); 