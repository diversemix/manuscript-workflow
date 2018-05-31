/*
 * https://github.com/jakesgordon/javascript-state-machine
 */
const StateMachine = require('javascript-state-machine')

class Manuscript {

    constructor() {
        
        // Define what happens on the transitions
        this.actions = {
            onSubmit: () => { console.log('onSubmit()')},
            onNotifyStaff: () => { console.log('onNotifyStaff()')},
            onStartQC: () => { console.log('onStartQC()')},
            onRequestChanges: () => { console.log('onRequestChanges()')},
            onNotifySubmitter: () => { console.log('onNotifySubmitter()')},
            onSendsChanges: () => { console.log('onSendsChanges()')},
            onNotifyStaff: () => { console.log('onNotifyStaff()')},
            onMarkQCComplete: () => { console.log('onMarkQCComplete()')},
            onAssignDE: () => { console.log('onAssignDE()')},
            onNotifyDE: () => { console.log('onNotifyDE()')},
            onStartDEAssm: () => { console.log('onStartDEAssm()')},
            onMarkDEAssmComplete: () => { console.log('onMarkDEAssmComplete()')},
            onGenerateTemplate: () => { console.log('onGenerateTemplate()')},
            onAssignSE: () => { console.log('onAssignSE()')},
            onNotifySE: () => { console.log('onNotifySE()')},
            onReassignSE: () => { console.log('onReassignSE()')},
            onStartSEAssm: () => { console.log('onStartSEAssm()')},
            onMarkSEAssmComplete: () => { console.log('onMarkSEAssmComplete()')},
            onGenerateTemplate: () => { console.log('onGenerateTemplate()')},
            onMakeDecision: () => { console.log('onMakeDecision()')},
            onSendRejectLetter: () => { console.log('onSendRejectLetter()')},
            onSendEncourageLetter: () => { console.log('onSendEncourageLetter()')},            
        }

        this.transitions = [
            { from: 'Started',              to: 'Submitted',            name: 'submit'              }, 
            { from: 'Submitted',            to: 'AwaitingQC',           name: 'notifyStaff'         , auto: true }, 
            { from: 'AwaitingQC',           to: 'QCInProgress',         name: 'startQC'                 }, 
            { from: 'QCInProgress',         to: 'ChangesRequested',     name: 'requestChanges'      }, 
            { from: 'ChangesRequested',     to: 'AwaitingChanges',      name: 'notifySubmitter'     , auto: true }, 
            { from: 'AwaitingChanges',      to: 'ChangesComplete',      name: 'sendsChanges'        }, 
            { from: 'ChangesComplete',      to: 'AwaitingQC',           name: 'notifyStaff'         , auto: true }, 
            { from: 'QCInProgress',         to: 'QCComplete',           name: 'markQCComplete'      , auto: true }, 
            { from: 'QCComplete',           to: 'DEAssigned',           name: 'assignDE'            }, 
            { from: 'DEAssigned',           to: 'AwaitingDEAssm',       name: 'notifyDE'            , auto: true}, 
            { from: 'AwaitingDEAssm',       to: 'DEAssmInProgress',     name: 'startDEAssm'         }, 
            { from: 'DEAssmInProgress',     to: 'DEAssmComplete',       name: 'markDEAssmComplete'  }, 
            { from: 'DEAssmComplete',       to: 'DraftLetter',          name: 'generateTemplate'    }, 
            { from: 'DEAssmComplete',       to: 'SEAssigned',           name: 'assignSE'            }, 
            { from: 'SEAssigned',           to: 'AwaitingSEAssm',       name: 'notifySE'            , auto: true}, 
            { from: 'AwaitingSEAssm',       to: 'SEAssigned',           name: 'reassignSE'          }, 
            { from: 'AwaitingSEAssm',       to: 'SEAssmInProgress',     name: 'startSEAssm'         }, 
            { from: 'SEAssmInProgress',     to: 'SEAssmComplete',       name: 'markSEAssmComplete'  }, 
            { from: 'SEAssmComplete',       to: 'DraftLetter',          name: 'generateTemplate'    }, 
            { from: 'DraftLetter',          to: 'Decision',             name: 'makeDecision'        }, 
            { from: 'Decision',             to: 'Rejected',             name: 'sendRejectLetter'    }, 
            { from: 'Decision',             to: 'Encouraged',           name: 'sendEncourageLetter' }, 
        ]

        this.workflow = new StateMachine({
            init: 'Started',
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

module.exports = Manuscript
