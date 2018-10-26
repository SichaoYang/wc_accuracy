/**
 * jsPsych plugin for saving the data and then stopping on the thank you page.
 **/

jsPsych.plugins["wc-final"] = (function () {

    const plugin = {};

    plugin.info = {
        name: 'wc-final',
        description: '',
        parameters: {}
    };

    plugin.trial = function (display_element, trial) {

        // save experiment data
        const data = jsPsych.data.get().filter({test_part: 'target'}).values();

        wc.data().save(data);

        const div = document.createElement("div");
        div.innerHTML = `<div><p>Thank you for your participation.`;
        if (isTurk) div.innerHTML += ` Your unique code is:</p>\`<p style = 'font-size:40px'>${code}`;
        div.innerHTML += `</p></div>`;

        display_element.appendChild(div);
    };

    return plugin;
})();
