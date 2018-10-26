/**
 * jsPsych plugin for showing instructions combining text and image.
 **/

jsPsych.plugins["wc-survey"] = (function() {

    const plugin = {};

    plugin.info = {
        name: 'wc-survey',
        description: '',
        parameters: {
        }
    };

    plugin.trial = function(display_element, trial) {
        display_element.innerHTML = `<div>
            Your answer to these questions is greatly appreciated.<br><br>
            <table>
                <tr>
                    <td>What is your age?</td>
                    <td>
                        <input id="wc-survey-age" type="number" min="0">
                        <input id="wc-survey-age-na" type="checkbox">Prefer not to say
                    </td>
                </tr>
                <tr>
                    <td>What is your gender?</td>
                    <td>
                        <input name="wc-survey-gender" type="radio" value="M">Male
                        <input name="wc-survey-gender" type="radio" value="F" checked>Female
                        <input name="wc-survey-gender" type="radio" value="O">Other
                        <span id="wc-survey-gender-other" style="visibility:hidden">
                            <input id="wc-survey-gender-text" type="text" maxlength="30" size="20" placeholder="Please specify">
                        </span>
                    </td>
                </tr>
                <tr>
                    <td>Are you in the US?</td>
                    <td>
                        <input name="wc-survey-us" type="radio" value="yes" checked>Yes
                        <input name="wc-survey-us" type="radio" value="no">No or prefer not to say
                    </td>
                </tr>
                <tr id="wc-survey-inUS" style="visibility:visible">
                    <td>What is your location?</td>
                    <td>
                        City:<input id="wc-survey-city" type="text" maxlength="30" size="20" placeholder="City name"><br>
                        State:<select id="wc-survey-state">
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </td>
                </tr>
            </table>
            <button id="wc-survey-submit">Submit</button>          
        </div>`;
        document.querySelectorAll('input[name="wc-survey-gender"]').forEach(function (elem) {
            elem.addEventListener('change', function () {
                if (document.querySelector('input[name="wc-survey-gender"]:checked').value === "O")
                    document.querySelector('#wc-survey-gender-other').style.visibility = "visible";
                else
                    document.querySelector('#wc-survey-gender-other').style.visibility = "hidden";
            });
        });

        document.querySelectorAll('input[name="wc-survey-us"]').forEach(function (elem) {
            elem.addEventListener('change', function () {
                if (document.querySelector('input[name="wc-survey-us"]:checked').value === "yes")
                    document.querySelector('#wc-survey-inUS').style.visibility = "visible";
                else
                    document.querySelector('#wc-survey-inUS').style.visibility = "hidden";
            });
        });
        document.querySelector('#wc-survey-submit').addEventListener('click', function () {
            let age    = document.querySelector('#wc-survey-age').value;
            let no_age = document.querySelector('#wc-survey-age-na').checked;
            let gender = document.querySelector('input[name="wc-survey-gender"]:checked').value;
            let other  = document.querySelector('#wc-survey-gender-text').value;
            let inUS   = document.querySelector('input[name="wc-survey-us"]:checked').value;
            let city   = document.querySelector('#wc-survey-city').value;
            let state  = document.querySelector('#wc-survey-state').value;

            if (no_age) {
                age = -1;
            } else if (age === "") {
                alert('Please enter your age or check the box next to "Prefer not to say".');
                return;
            }
            if (inUS === "no") {
                city = state = "NA";
            }
            display_element.innerHTML = '';
            jsPsych.data.addProperties({
                age: age,
                gender: gender,
                gender_other: other,
                inUS: inUS,
                city: city,
                state: state
            });
            jsPsych.finishTrial({});
        });
    };

    return plugin;
})();