const { genSaltSync, hashSync } = require("bcrypt");
module.exports = {
  postGentoken: async (data, callBack) => {
    if (
      data.user == process.env.USER &&
      data.password == process.env.PASSWORD
    ) {
      const salt = genSaltSync(10);
      const results = {
        user: process.env.USER,
        password: hashSync(process.env.PASSWORD, salt),
      };
      return callBack(null, results);
    } else {
      const error = {
        info: "Invalid user & password",
      };
      return callBack(error);
    }
  },
};
