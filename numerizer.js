
// Import the filesystem module
const fs = require("fs");

let rawdata = fs.readFileSync('src/imgs/set.json');
let parsed = JSON.parse(rawdata);

const extension = ".png"
  
let directory_name = "src/imgs/" + parsed["set"] + "/";
  
// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);

let data = {
  num_images: filenames.length
}

let path = directory_name + "/../images.json"


try {
  fs.writeFileSync(path, JSON.stringify(data))
} catch (err) {
  console.error(err)
}

  
console.log("\nFilenames in directory:");
filenames.forEach((file) => {
    console.log("File:", file);
});

for (let index = 0; index < filenames.length; index++) {
  const file = filenames[index];
  const old_name = directory_name + file;
  const new_name = directory_name + index + extension;
  console.log(`Renaming ${old_name} to ${new_name}`)
  fs.rename(old_name, new_name, (error) => {
    if (error) {
        
      // Show the error 
      console.log(error);
    }
    else {
    
      // List all the filenames after renaming
      console.log(index);
    }
  })
}

filenames.forEach((file, index) => {

});