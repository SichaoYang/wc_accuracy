/**
 * Experiment data saver
 */
const saver = (function () {
    return {
        /**
         * wrapper: select a data saving methods below or use "/static/common/js/lcnl-helpers.js"
         * @param json - the json object to be saved
         * @param id - the index of the participant producing the data
         */
        save: function(raw_data, id) {
            const data = [];
            raw_data.forEach(function(item, index) {
                data.push({
                    participant: id,
                    trial: index + 1,
                    word_position: 1,
                    word: item.word1,
                    response: item.word1_response,
                    rt: item.rt
                });
                data.push({
                    participant: id,
                    trial: index + 1,
                    word_position: 2,
                    word: item.word2,
                    response: item.word2_response,
                    rt: item.rt
                });
            });
            if (onLCNL)
                sendJSONData(data, id);  // /static/common/js/lcnl-helpers.js
            else
                this.save2csv(data);
        },

        /** send the json object to a php script to append it to a csv file */
        save2csv: function(json) {
            $.ajax(
                {
                    url:	"/static/wc_accuracy/php/json2csv.php",
                    type:	"POST",
                    data:	JSON.stringify(json),
                    contentType:	"application/json",
                    success: function(data, textStatus, jqXHR){
                        console.log(textStatus, data);
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log("ajax error");
                        console.log(textStatus)
                        console.log(errorThrown);
                    },
                }
            );
        }
    }
})();