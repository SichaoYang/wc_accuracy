/*
 * jsPsych plugin for showing instructions combining text and image.
 */

jsPsych.plugins["instruction"] = (function() {

    var plugin = {};

    plugin.info = {
        name: 'instruction',
        description: '',
        parameters: {
            image: {
                type: jsPsych.plugins.parameterType.IMAGE,
                default: undefined,
                description: 'The image to be displayed'
            },
            choices: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                array: true,
                default: jsPsych.ALL_KEYS,
                description: 'The keys the subject is allowed to press to respond to the stimulus.'
            },
            prompt_above: {
                type: jsPsych.plugins.parameterType.STRING,
                default: undefined,
                description: 'Any content here will be displayed above the instructional image.'
            },
            prompt_below: {
                type: jsPsych.plugins.parameterType.STRING,
                default: undefined,
                description: 'Any content here will be displayed below the instructional image.'
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'How long to show trial before it ends.'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        let keyboardListener;
        let new_html = '<img src="'+trial.image+'">';

        // add prompt above the image
        if (trial.prompt_above !== null) new_html = '<p>' + trial.prompt_above + '</p>' + new_html;

        // add prompt below the image
        if (trial.prompt_below !== null) new_html = new_html + '<p>' + trial.prompt_below +'</p>';

        // draw
        display_element.innerHTML = new_html;

        // function to end trial when it is time
        const end_trial = function() {

            // kill any remaining setTimeout handlers
            jsPsych.pluginAPI.clearAllTimeouts();

            // kill keyboard listeners
            if (typeof keyboardListener !== 'undefined') {
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }

            // clear the display
            display_element.innerHTML = '';

            // move on to the next trial
            jsPsych.finishTrial({});
        };

        // start the response listener
        if (trial.choices != jsPsych.NO_KEYS) {
            keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                callback_function: end_trial,
                valid_responses: trial.choices,
                rt_method: 'date',
                persist: false,
                allow_held_key: false
            });
        }

        // end trial if trial_duration is set
        if (trial.trial_duration !== null) {
            jsPsych.pluginAPI.setTimeout(function () {
                end_trial();
            }, trial.trial_duration);
        }
    };

    return plugin;
})();

