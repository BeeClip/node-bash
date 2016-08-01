var commands = require("./commands")
// Output a prompt
process.stdout.write('prompt > ');
// This is not a unique line
// This is not a unique line
// The stdin 'data' event fires after a user types in a line
function done(output, cmdList) {
  process.stdout.write(output + '\nprompt >');
}

process.stdin.on('data', function (data) {
  var arguments = data.toString().trim().split(' ');
  var pipeArg = data.toString().trim().split(/\s*\|\s*/g);
  var args = console.log('ls bash.js | head | tail | cat'.split(/\s*\|\s*/g));
  console.log(pipeArg);
  var cmd = arguments[0]; // remove the newline
  var file = arguments.slice(1).join(" ");

  if (Object.keys(commands).includes(cmd)) {
    commands[cmd](file, done);
  } else {
    throw "That is not a valid command";
  }
});
