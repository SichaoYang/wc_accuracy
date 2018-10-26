/**
 * Library for the wc_accuracy experiment
 */
const wc = (function () {
    return {
        /**
         * generate a unique code for the participant
         * @returns {string} the generated unique code
         */
        gen_code: function() {
            function randLetter() {
                const a_z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const int = Math.floor((Math.random() * a_z.length));
                const rand_letter = a_z[int];
                return rand_letter;
            }

            const secretCode = "wc15a"; // this is the 'key'
            let code = "";

            for (let i = 0; i < 7; i++) code += randLetter();
            code += secretCode;
            for (let i = 0; i < 10; i++) code += randLetter();

            return code;
        },

        /**
         * generate a random integer between 1 and n
         * @param n - the upper limit of the generated random integer
         * @returns {number} the generated random integer
         */
        gen_rndn: function(n) {
            return Math.floor(Math.random() * n);
        },

        participant: function () {
            /** Return the worker ID of the worker completing the HIT inside Mechanical Turk */
            function id_trk(callback) {
                const id = jsPsych.turk.turkInfo().workerId;
                callback(id);
            }

            /** Return a counter value maintained by a php script as id */
            function id_php(callback) {
                $.ajax(
                    {
                        url:	"../php/counter.php",
                        type:	"POST",
                        success: function(data) {
                            console.log(data);
                            callback(data);
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            console.log("ajax error");
                            console.log(textStatus);
                            console.log(errorThrown);
                        }
                    }
                );
            }

            /** Return the current time as id */
            function id_rnd(callback) {
                // const time = (new Date()).getTime();  // milliseconds passed since midnight on January 1st, 1970.
                // callback(time);  // unique in roughly a month
                callback("");
            }

            return {
                id: function(callback) {
                    if (isTurk)     id_trk(callback);
                    else if (isPHP) id_php(callback);
                    else            id_rnd(callback);
                }
            }
        },

        data: function () {
            /** Assemble, clean and reformat the data */
            function make_json(raw_data) {
                const json = [];
                const date = new Date().toString();
                raw_data.forEach(function(item, index) {
                    json.push({
                        workerID: id,
                        code: code,
                        completion_time: date,
                        cbal: cbal,
                        trial: index + 1,
                        img: item.img,
                        word_position: 1,
                        word: item.word1,
                        dominant: item.dominant,
                        is_dominant: item.dom_word === 1 ? 1 : 0,
                        response: item.word1_response,
                        rt: item.rt,
                        time_elapsed: item.time_elapsed,
                        age: item.age,
                        gender: item.gender,
                        gender_other: item.gender_other,
                        inUS: item.inUS,
                        city: item.city,
                        state: item.state
                    });
                    json.push({
                        workerID: id,
                        code: code,
                        completion_time: date,
                        cbal: cbal,
                        trial: index + 1,
                        img: item.img,
                        word_position: 2,
                        word: item.word2,
                        dominant: item.dominant,
                        is_dominant: item.dom_word === 2 ? 1 : 0,
                        response: item.word2_response,
                        rt: item.rt,
                        time_elapsed: item.time_elapsed,
                        age: item.age,
                        gender: item.gender,
                        gender_other: item.gender_other,
                        inUS: item.inUS,
                        city: item.city,
                        state: item.state
                    });
                });
                return json;
            }

            // https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
            function json2csv(json) {
                const replacer = (key, value) => value === null ? '' : value; // handle null values
                const header = Object.keys(json[0]);
                let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
                csv.unshift(header.join(','));
                return csv.join('\n');
            }

            /** send the json object to a php script to append it to a csv file */
            function save_php(json) {
                $.ajax(
                    {
                        url:	"../php/json2csv.php",
                        type:	"POST",
                        data:	JSON.stringify(json),
                        contentType:	"application/json",
                        success: function(data, textStatus, jqXHR){
                            console.log(textStatus, data);
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            console.log("ajax error");
                            console.log(textStatus);
                            console.log(errorThrown);
                        },
                    }
                );
            }

            /** save data to a csv file */
            function save_blob(csv_str) {
                const filename = "result.csv";
                const blobToSave = new Blob([csv_str], {
                    type: 'text/plain',
                    endings: 'native'
                });
                const blobURL = window.URL.createObjectURL(blobToSave);
                jsPsych.getDisplayElement().insertAdjacentHTML('beforeend',  // create a invisible <a> for download
                    `<a id="download" style="display:none;" download="${filename}" href="${blobURL}"></a>`);
                document.getElementById('download').click();
            }

            return {
                save: function(raw_data) {
                    const json = make_json(raw_data);
                    console.log(json);
                    if (isLCNL)     sendJSONData(json, id);  // /static/common/js/lcnl-helpers.js
                    else if (isPHP) save_php(json);
                    else            save_blob(json2csv(json));

                }
            }
        }
    }
})();