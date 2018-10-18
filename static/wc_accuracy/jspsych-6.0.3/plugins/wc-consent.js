/**
 * jsPsych plugin for requiring consent before the experiment starts.
 **/

jsPsych.plugins['wc-consent'] = (function () {

    const plugin = {};

    plugin.info = {
        name: 'wc-consent',
        parameters: {
            info: {
                type: jsPsych.plugins.parameterType.HTML_STRING,
                pretty_name: 'Consent Information',
                default: null,
                description: 'The information given to the participants for their informed consent'
            }
        }
    };

    plugin.trial = function (display_element, trial) {
        display_element.innerHTML = `<div>${trial.info}` +
            `<p><input type="checkbox" id="consent_checkbox" />I agree to take part in this study.</p>` +
            `<button type="button" id="start">Start Experiment</button></div>`;

        display_element.querySelector('#start').addEventListener('click', finish);

        function finish() {
            if ($('#consent_checkbox').is(':checked')) {
                display_element.innerHTML = '';
                jsPsych.finishTrial({});
            } else {
                alert("If you wish to participate, you must check the box next to 'I agree to participate in this study.'");
            }
        }
    };

    return plugin;
})();
