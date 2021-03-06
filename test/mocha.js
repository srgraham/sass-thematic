var assert = require('assert');
var Mocha = require('mocha');
var mocha = new Mocha();

// Add custom assertions:
assert.contain = function(a, b) {
  if (a.indexOf(b) == -1) {
    assert.fail(a, b, 'expected to contain');
  }
};

assert.doesNotContain = function(a, b) {
  if (a.indexOf(b) != -1) {
    assert.fail(a, b, 'expected not to contain');
  }
};

assert.match = function(val, rx) {
  if (!rx.test(val)) {
    assert.fail(val, rx, 'expected to match');
  }
};

assert.doesNotMatch = function(val, rx) {
  if (rx.test(val)) {
    assert.fail(val, rx, 'expected not to match');
  }
};

mocha.reporter('dot');
mocha.addFile('test/ast-unit');
mocha.addFile('test/ast-statements');
mocha.addFile('test/ast-resolutions');
mocha.addFile('test/ast-paths');
mocha.addFile('test/ast-data');
mocha.addFile('test/ast-taxonomy');
mocha.addFile('test/thematic');
mocha.addFile('test/reduce');
mocha.addFile('test/render');

mocha.run(function(failures) {
  process.on('exit', function() {
    process.exit(failures);
  });
});
