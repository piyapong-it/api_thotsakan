const {
    postGentoken
} = require("./auth.service");

const { compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    login: (req, res) => {
        const body = req.body
        postGentoken(body, (err, results) => {
            if (err) {
                return res.status(500).send(JSON.stringify({ success: false, info: err.info }));
            }
            const result = compareSync(body.password, results.password);
            if(result){
                const jsonToken = sign({result: results}, process.env.TOKEN_KEYID,{
                    expiresIn: "1d"
                });
                return res.status(200).send(JSON.stringify({ 
                    success: true, 
                    info: "login successfully",
                    user: results.user,
                    password: results.password,
                    token: jsonToken 
                }));
            }
        });

    }
}