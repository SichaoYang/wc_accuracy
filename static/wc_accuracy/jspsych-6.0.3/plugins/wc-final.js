/**
 * jsPsych plugin for saving the data and then stopping on the thank you page.
 **/

jsPsych.plugins["wc-final"] = (function () {

    const plugin = {};

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
        const data = jsPsych.data.get().filter({test_part: 'target'}).values();
        console.log(data);
        saver.save(data, trial.participant);

        display_element.innerHTML = `<div>${trial.stimulus}</div>`;
    };

    return plugin;
})();
