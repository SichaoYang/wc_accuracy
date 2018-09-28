/**
 * Random code generator
 */
const codeGen = (function () {
    return {
        /** generates a unique code according to the participant id */
        genCode: function(id) {
            //create random code for final message
            //start code creation script
            function randLetter() {
                const a_z = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                const int = Math.floor((Math.random() * a_z.length));
                const rand_letter = a_z[int];
                return rand_letter;
            };

            const secretCode = "CrossPC"; // this is the 'key'
            let code = "";

            for (let i = 0; i < 7; i++){
                code = code.concat(randLetter());
            };

            code = code.concat(secretCode);

            for (let i = 0; i < 10; i++){
                code = code.concat(randLetter());
            }
            //end code creation script

            return code;
        }
    }
})();