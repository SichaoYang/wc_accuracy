/**
 * jsPsych plugin for showing instructions combining text and image.
 **/

jsPsych.plugins["wc-preset"] = (function() {

    const plugin = {};

    plugin.info = {
        name: 'wc-preset',
        description: '',
        parameters: {
            callback: {
                type: jsPsych.plugins.parameterType.FUNCTION,
                pretty_name: 'Callback Function',
                default: undefined,
                description: 'The function called after preset'
            }
        }
    };

    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = `<div>
            <table>
                <tr>
                    <td>participant:</td>
                    <td><input id="wc-id" type="text" size="20"></td>
                </tr>
                <tr>
                    <td>cbal file:</td>
                    <td><select id="wc-cbal">
                        ${csvs.map((csv, i) => `<option value="${i}">${csv}</option>`).join('')}
                    </select></td>
                </tr>
            </table>
            <button id="wc-preset">Start Experiment</button>          
        </div>`;
        document.querySelector('#wc-preset').addEventListener('click', function () {
            id = document.querySelector('#wc-id').value;
            cbal = parseInt(document.querySelector('#wc-cbal').value);
            display_element.innerHTML = '';
            trial.callback(id);
        });
    };

    return plugin;
})();