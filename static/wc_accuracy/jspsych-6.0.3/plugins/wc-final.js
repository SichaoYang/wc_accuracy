/**
 * jspsych-html-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["wc-final"] = (function () {

    var plugin = {};

    plugin.info = {
        name: 'wc-final',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The HTML string to be displayed'
            },
            participant: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Participant index',
                default: null,
                description: 'The index number of the participant'
            }
        }
    };

    plugin.trial = function (display_element, trial) {

        // save experiment data
        saver.save(jsPsych.data.get().filter({trial_type: 'wc-trial'}).values(), trial.participant);

        display_element.innerHTML = `<div>${trial.stimulus}</div>`;
    };

    return plugin;
})();
