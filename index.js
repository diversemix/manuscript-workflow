/*
 * https://github.com/jakesgordon/javascript-state-machine
 */
var StateMachine = require('javascript-state-machine')

class Manuscript {

    constructor() {
        
        // Define what happens on the transitions
        this.actions = {
            onSubmit: function() { console.log("Action Submit")},
            onStartQC: function() { console.log("Action QC")},
            onRequestUpdate: function() { console.log("Action Request Update")},
            onUpdateSubmission: function() { console.log("Action Update Submission")},
            onAssignDE: function() { console.log("Action Assign Deputy Editor")},
        }

        this.transitions = [
            { from: 'Created',          to: 'Submitted',            name: 'submit' },
            { from: 'Submitted',        to: 'AwaitingQC',           name: 'notifyStaff',      auto: true },
            { from: 'AwaitingQC',       to: 'QCInProgress',         name: 'startQC' },
            { from: 'QCInProgress',     to: 'UpdateRequested',      name: 'requestUpdate' },
            { from: 'UpdateRequested',  to: 'AwaitingUpdate',       name: 'notifySubmitter',            auto: true },
            { from: 'AwaitingUpdate',   to: 'UpdateComplete',       name: 'sendUpdate' },
            { from: 'UpdateComplete',   to: 'AwaitingQC',           name: 'notifyStaff',                   auto: true },
            { from: 'QCInProgress',     to: 'DEAssigned',           name: 'assignDE' },
            { from: 'DEAssigned',       to: 'AwaitingDEAssess',     name: 'notifyDE',                   auto: true },
            { from: 'AwaitingDEAssess', to: 'DEStartAssessment',    name: 'startDEAssessment' },
            { from: 'DEStartAssessment',to: 'SEAssigned',           name: 'assignSE' },
            { from: 'SEAssigned',       to: 'AwaitingSEAssess',     name: 'notifySE',                   auto: true },
            { from: 'AwaitingSEAssess', to: 'SEStartAssessment',    name: 'startSEAssessment' },
            { from: 'SEStartAssessment',to: 'REAssigned',           name: 'assignRE' },
            { from: 'REAssigned',       to: 'AwaitingConsultation',    name: 'notifyRE',                   auto:true },
            { from: 'AwaitingConsultation',to: 'REConsultation',       name: 'startConsultation' },
            { from: 'REConsultation',   to: 'SEStartAssessment',    name: 'endConsultation'},
            { from: 'SEStartAssessment',to: 'SEWriteLetter',        name: 'writeLetter' },
            { from: 'SEWriteLetter',    to: 'SendInitialDecision',  name: 'sendLetter' },
        ]

        this.workflow = new StateMachine({
            init: 'Created',
            transitions: this.transitions,
            methods: this.actions
        })
    }

    printDotfile() {
        console.log('digraph {')

        this.transitions.map( function(item) { 
            var style = '';
            if (item.auto) {
                style = ', penwidth=3.0, color=red'
            }
            console.log(item.from, '->', item.to, '[label=', item.name, style, '];') 
        })
        
        console.log('}')
    }
}  

function test(ms) {
    ms.workflow.submit()
    ms.workflow.startQC()
    ms.workflow.requestUpdate()
    ms.workflow.updateSubmission()
    ms.workflow.assignDE()
}

var ms = new Manuscript()

// test(ms)

ms.printDotfile()