const fs = require('fs');

// //Sync...
// fs.writeFileSync('./text.txt', 'First FS module code.');

// // Async...
// fs.writeFile('./text.txt', 'Second FS module code.', (err) => {});

// const results = fs.readFileSync('./contacts.txt', 'utf-8');
// console.log(results);

// fs.readFile('./contacts.txt', 'utf-8', (err, res) => {
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log(res);
//   }
// });

// Async code/ functions always take a callback with them to perform tasks that are related to that asyc task
// js gives the task to corresponding api, after completion of that, it runs what is in the callback
// just like a promise, and .then() 

fs.appendFileSync('./contacts.txt', "\nRahul: +91 9191919191");  //sync- blocks all further code until this finishes

fs.appendFile('./contacts.txt', "\nSagar: +91 9090909090", (err) => {});   // async - initates the writing task and moves forward

fs.appendFileSync('./text.txt', new Date().getDate().toLocaleString());  //sync- blocks all further code until this finishes
