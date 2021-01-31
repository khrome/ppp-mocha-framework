var should = require('chai').should();
var mocha = require('./mocha');
var moduleName = require('./package').name;

var testBody = `it('my description', function(){
    var blah = 5;
    return blah;
})`;

var testHTML = `<div id="mocha"></div>
        <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
        <script src="https://cdn.rawgit.com/chaijs/chai/4.2.0/chai.js"></script>
        <script>
            console.log("DEPS");
        </script>
        <script>mocha.setup({ui:'bdd', reporter: 'json-stream'})</script>
        <script>
                it('my description', function(){
    var blah = 5;
    return blah;
})

        </script>
        <script>
            mocha.checkLeaks();
            mocha.globals([]);
            mocha.run();
        </script>`;

var depBlock = 'console.log("DEPS");'

var testFn = function(){
    var blah = 5;
    return blah;
}


describe(moduleName, function(){

    it('can render a test body', function(done){
        var b = mocha.testBody('my description', testFn);
        b.trim().should.equals(testBody);
        done();
    });

    it('can render an html wrapper', function(done){
        var b = mocha.testHTML('my description', testFn, depBlock);
        b.trim().should.equals(testHTML);
        done();
    });
});

//promises made mocha super awesome! :P.
var unhandledRejectionExitCode = 0;

process.on("unhandledRejection", function(reason){
    unhandledRejectionExitCode = 1;
    throw reason;
});

process.prependListener("exit", function(code){
    if(code === 0) process.exit(unhandledRejectionExitCode);
});
// /super awesome
