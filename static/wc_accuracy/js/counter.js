/**
 * Participant index generator
 */
const counter = (function () {
    return {
        /**
         * wrapper: select one of the counting methods below
         * @param callback - the callback function to use the participant id
         */
        count: function(callback) {
            this.count_rnd(callback);
        },
        /** count by internal synchronous php-file io */
        count_php: function(callback) {
            $.ajax(
                {
                    url:	"/static/wc_accuracy/php/counter.php",
                    type:	"POST",
                    success: function(data) {
                        console.log(data);
                        callback(data);
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log("ajax error");
                        console.log(textStatus)
                        console.log(errorThrown);
                    },
                }
            );
        },
        /** count by external api */
        count_api: function(callback) {
            const counter_url = "http://123.207.148.121:12345/?cmd=increase";  // on Sichao's server
            $.get(counter_url, callback);
        },
        /** count by time */
        count_rnd: function(callback) {
            const time = (new Date()).getTime();  // milliseconds passed since midnight on January 1st, 1970.
            callback(time);  // unique in roughly a month
        }
    }
})();