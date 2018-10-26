/**
 * jsPsych plugin for binding multiple sliders to a single image stimulus.
 **/

let dragged = 0;  // If the sliders have been dragged
function drag(id) {
    if ((dragged |= id) === 3) document.querySelector('#wc_accuracy-next').style.visibility = "visible";
}

jsPsych.plugins['wc-trial'] = (function () {

    const plugin = {};

    plugin.info = {
        name: 'wc-trial',
        description: '',
        parameters: {
            stimulus: {
                type: jsPsych.plugins.parameterType.IMAGE,
                pretty_name: 'Stimulus',
                default: undefined,
                description: 'The image to be displayed'
            },
            min: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Min slider',
                default: 0,
                description: 'Sets the minimum value of the slider.'
            },
            max: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Max slider',
                default: 100,
                description: 'Sets the maximum value of the slider',
            },
            start: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Slider starting value',
                default: 50,
                description: 'Sets the starting value of the slider',
            },
            step: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'Step',
                default: 1,
                description: 'Sets the step of the slider'
            },
            labels: {
                type: jsPsych.plugins.parameterType.KEYCODE,
                pretty_name: 'Labels',
                default: [],
                array: true,
                description: 'Labels of the slider.',
            },
            button_label: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Button label',
                default: 'Continue',
                array: false,
                description: 'Label of the button to advance.'
            },
            prompt: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Prompt',
                default: '',
                description: 'Any content here will be displayed above the sliders.'
            },
            word1: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Word1',
                default: '',
                description: 'The word below the first slider.'
            },
            word2: {
                type: jsPsych.plugins.parameterType.STRING,
                pretty_name: 'Word2',
                default: '',
                description: 'The word below the second slider.'
            },
            dom_word: {
                type: jsPsych.plugins.parameterType.INT,
                pretty_name: 'dom_word',
                default: 1
            },
            sec_is_foil: {
                type: jsPsych.plugins.parameterType.BOOL,
                pretty_name: 'sec_is_foil',
                default: false
            },
            trial_duration: {
                type: jsPsych.plugins.parameterType.INT,
                default: null,
                description: 'How long to show trial before it ends.'
            }
        }
    };

    plugin.trial = function (display_element, trial) {
        function slider_div(id) {
            let slider_div = `<div class="jspsych-image-slider-response-container" style="position:relative;">
                <input type="range" value="${trial.start}" min="${trial.min}" max="${trial.max}"
                step="${trial.step}" style="width: 100%;" id="wc_accuracy-slider${id}" onmouseup="drag(${id})">
                <div>`;
            for (let j = 0; j < trial.labels.length; j++) {
                const width = 100 / (trial.labels.length - 1);
                const left_offset = (j * (100 / (trial.labels.length - 1))) - (width / 2)+1.52;
                slider_div += `<div style="display: inline-block; position: absolute; left: ${left_offset}%; text-align: center; width: ${width}%;">
                    <span style="text-align: center; font-size: 80%;">${trial.labels[j]}</span>
                </div>`;
            }
            slider_div += '</div></div>';

            return slider_div;
        }

        const div = document.createElement("div");
        div.style.margin = "100px 0px;";
        const img = new Image();
        img.onload = function () {
            div.appendChild(img);
            div.innerHTML += `<p>${trial.prompt}</p>
            ${slider_div("1")}<p><strong>${trial.word1}</strong></p>
            ${slider_div("2")}<p><strong>${trial.word2}</strong></p>
            <button id="wc_accuracy-next" class="jspsych-btn" style="visibility:hidden">${trial.button_label}</button>`;
            display_element.appendChild(div);

            const response = {
                rt: null,
                word1_response: null,
                word2_response: null
            };

            display_element.querySelector('#wc_accuracy-next').addEventListener('click', function () {
                const endTime = (new Date()).getTime();  // measure response time
                response.rt = endTime - startTime;
                response.word1_response = display_element.querySelector('#wc_accuracy-slider1').value;
                response.word2_response = display_element.querySelector('#wc_accuracy-slider2').value;
                if (trial.sec_is_foil) {
                    if (trial.dom_word !== 2 && response.word2_response > 15) {
                        alert("Are you sure about that? One of your ratings does not seem accurate.");
                        return;
                    } else if (trial.dom_word !== 1 && response.word1_response > 15) {
                        alert("Are you sure about that? One of your ratings does not seem accurate.");
                        return;
                    }
                }
                end_trial();
            });

            function end_trial() {
                dragged = 0;

                jsPsych.pluginAPI.clearAllTimeouts();

                // save data
                const trial_data = {
                    "img": trial.stimulus,
                    "word1": trial.word1,
                    "word2": trial.word2,
                    "rt": response.rt,
                    "word1_response": response.word1_response,
                    "word2_response": response.word2_response,
                    "dom_word": trial.dom_word,
                    "dominant": trial.dom_word === 1 ? trial.word1 : trial.word2
                };

                display_element.innerHTML = '';

                // next trial
                console.log(trial_data);
                jsPsych.finishTrial(trial_data);
            }

            // end trial if trial_duration is set
            if (trial.trial_duration !== null) {
                jsPsych.pluginAPI.setTimeout(function () {
                    end_trial();
                }, trial.trial_duration);
            }

            const startTime = (new Date()).getTime();
        };
        img.src = img_dir + trial.stimulus;
    };

    return plugin;
})();
