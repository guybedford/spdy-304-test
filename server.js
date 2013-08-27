var fs = require('fs');
var spdy = require('spdy');


spdy.createServer({

  key: fs.readFileSync('keys/server.key'),
  cert: fs.readFileSync('keys/server.crt'),
  ca: fs.readFileSync('keys/server.csr')

}, function(req, res) {

  if (req.url == '/page1') {
    res.push('/some-file.css', {
      eTag: 'asdf',
      'cache-control': 'max-age=10, public'
    }, function(err, stream) {
      if (err)
        return;
      stream.on('error', function(){});
      stream.end('h1 { color: red; }');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<!doctype html><link rel="stylesheet" href="/some-file.css"></link><h1>hello world</h1><a href="/page2">Page 2</a>');
  }
  else if (req.url == '/page2') {
    res.push('/some-file.css', {
      eTag: 'asdf',
      'cache-control': 'max-age=10, public'
    }, function(err, stream) {
      if (err)
        return;
      stream.on('error', function(){});
      stream.end('h1 { color: blue; }');
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<!doctype html><link rel="stylesheet" href="/some-file.css"></link><h1>Page 2</h1><a href="/page1">Page 1</a>');
  }

}).listen(5050);