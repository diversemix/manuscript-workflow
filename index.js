const Manuscript = require('./manuscript')
const _ = require('lodash')
const args = _.slice(process.argv, 2);

var ms = new Manuscript()

function logState() {
    console.log("STATE: <", ms.workflow.state, ">",
                "ALLOWED:", ms.workflow.transitions())
}

function test() {
    logState()
    ms.workflow.submit()
    logState()
    console.log(ms.workflow)
}

function optionSet(key) {
    return _.some(args, _.method('includes', key));
}

if (optionSet('test')) {
    test()    
}

if (optionSet('dot')) {
    ms.printDotfile()
}
