/*

To commit changes with co-author just create file named pair.json which should contain username, email of the pair. If email is private you can specify the github mail which will look like <username@users.noreply.github.com>. 

Format of pair.json
{
	"name": "Github Username",
	"email": "github email if email"
}

you can run the file as follows,

node gitpair.js --message="Your commit message here"

you can add it to package.json and use npm for run

"commit": "node gitpair.js"

npm run commit --message="Your commit message here"

*/

// Package to run terminal commands
let { exec } = require('child_process');

// Package for check os
let os = require('os');

// Pair details file importing
let pair = require('./pair.json');

// For output for commands run on terminal
let log = (err, stdout, stderr) => console.log(stdout);

// Running command based on OS
if (os.type() === 'Windows_NT') {
	exec(`git commit -m \"%npm_config_message%\" -m \"Co-authored-by: ${pair.name} <${pair.email}>\"`, log);
} else {
	exec(`git commit -m \"$npm_config_message\" -m \"Co-authored-by: ${pair.name} <${pair.email}>\"`, log);
}

