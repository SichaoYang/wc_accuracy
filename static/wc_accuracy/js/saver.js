/**
 * Experiment data saver
 */
const saver = (function () {
    return {
        /**
         * wrapper: select a data saving methods below or use "/static/common/js/lcnl-helpers.js"
         * @param json - the json object to be saved
         * @param participant - the index of the participant producing the data
         */
        save: function(raw_data, participant) {
            const json = [];
            raw_data.forEach(function(item, index) {
                json.push({
                    participant: participant,
                    trial: index + 1,
                    word_position: 1,
                    word: item.word1,
                    response: item.word1_response,
                    rt: item.rt
                });
                json.push({
                    participant: participant,
                    trial: index + 1,
                    word_position: 2,
                    word: item.word2,
                    response: item.word2_response,
                    rt: item.rt
                });
            });
            if (isLCNL)     sendJSONData(json, participant);  // /static/common/js/lcnl-helpers.js
            else if (isPHP) this.save2csv(json);
            else            this.save_blob(json);

        },

        /** send the json object to a php script to append it to a csv file */
        save_php: function(json) {
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
        },

        /** save data to a csv file */
        save_blob: function(data) {
            this.saveTextToFile(this.json2csv(data), "result.csv");
        },

        // copied from jsPsych: save text file on local drive
        saveTextToFile: function(textstr, filename) {
            const blobToSave = new Blob([textstr], {
                type: 'text/plain'
            });
            const blobURL = window.URL.createObjectURL(blobToSave);
            const display_element = jsPsych.getDisplayElement();
            display_element.insertAdjacentHTML('beforeend',
                '<a id="jspsych-download-as-text-link" style="display:none;"' +
                'download="'+filename+'" href="'+blobURL+'">click to download</a>');
            document.getElementById('jspsych-download-as-text-link').click();
        },

        // https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
        json2csv: function(json) {
            const replacer = (key, value) => value === null ? '' : value; // handle null values
            const header = Object.keys(json[0]);
            let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
            csv.unshift(header.join(','));
            return csv.join('\r\n');
        }
    }
})();