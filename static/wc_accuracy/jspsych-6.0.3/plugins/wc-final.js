/**
 * jsPsych plugin for saving the data and then stopping on the thank you page.
 **/

jsPsych.plugins["wc-final"] = (function () {

    const plugin = {};

    plugin.info = {
        name: 'wc-final',
        description: '',
        parameters: {
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
        const code = codeGen.genCode(trial.participant);

        console.log(data);
        saver.save(data, trial.participant, code);

        display_element.innerHTML = `<div><p>Thank you for your participation. Your unique code is:</p>` +
            `<p style = 'font-size: 40px'>${code}</p></div>`;
    };

    return plugin;
})();
