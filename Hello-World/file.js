const fs = require('fs');
const os = require('os');

console.log(os.cpus().length);

// sync  ... blocking
// fs.writeFileSync("./test.txt", "Hey, there");

// async   .... non-blocking
// fs.writeFile("./test.txt", "hello world async\n", (err) => {});


// sync
// const result = fs.readFileSync("./contacts.txt", "utf-8");
// console.log(result);


// without sync 
// const result = fs.readFile("./contacts.txt", "utf-8");
// console.log(result);


// fs.readFile("./contacts.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//      console.log(result);
//     }
// });


// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());



// fs.appendFileSync("./test.txt", `${Date.now()} hey there\n `);

// fs.cpSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt");

// console.log(fs.statSync("./test.txt").isFile());
fs.mkdirSync("my-docss/a/b", {recursive : true});

