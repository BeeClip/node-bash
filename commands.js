var exports = module.exports;
var fs = require('fs');
var request = require('request');

module.exports.pwd = function(file, done) {
  done(module.paths[0]);
}

module.exports.date = function(file, done){
  done(String(new Date()));
}

module.exports.ls = function(file, done) {
  fs.readdir('.', function(err, files) {
    if (err) throw err;

    done(files.toString().split(',').join('\n'));
  });
}

module.exports.echo = function(file, done) {
  done(file);
}

module.exports.cat = function(file, done) {
  //var fileName = './' + file
  //console.log(file);
  fs.readFile(file, function(err, lines) {
    if (err) throw err;
    done(lines)
  });
}

module.exports.head = function(file, done) {
  //prints first 5 lines
  fs.readFile(file, function(err, lines){
    if(err) throw err;
    var firstFive = lines.toString().split("\n").slice(0,6).join("\n");
    done(firstFive);
  });
}

module.exports.tail = function(file, done) {
  fs.readFile(file, function(err, lines){
    if(err) throw err;
    var lastFive = lines.toString().split("\n").slice(-5).join("\n");
    done(lastFive);
  });
}

module.exports.sort = function(file, done) {
  fs.readFile(file, function(err, lines) {
    if (err) throw err;
    var fileLines = lines.toString().split("\n").sort().join("\n");
    done(fileLines);
  });
}

module.exports.wc = function(file, done) {
  fs.readFile(file, function(err, lines) {
    if (err) throw err;
    var fileLines = lines.toString().split("\n");
    done("Line Count: " + String(fileLines.length));
  });

}

module.exports.uniq = function(file, done) {
  fs.readFile(file, function(err, lines) {
    if (err) throw err;
    var fileLines = lines.toString().split("\n");
    var uniqLines = [];
    for(var line of fileLines) {
      if(!uniqLines.includes(line)) uniqLines.push(line);
    }
    done(uniqLines.join("\n"));
  });

}

module.exports.curl = function(webDomain, done) {
  request(webDomain, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    done(body) // Show the HTML for the Google homepage.
  }
})
}
