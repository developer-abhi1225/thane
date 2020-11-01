const mongodbUrl = `${process.env.MONGODBURL}${process.env.MONGODBNAME}`;
console.log("mongodbUrl", mongodbUrl);
const MESSAGES = {
  ITR_SVR_ERR: "Internal Server Error",
  SUCCESS: "Success",
  FAIL: "fail",
  USER_CREATE_SUCCESS: "User created successfully",
  USER_UPDATE_SUCCESS: "User updated successfully",
  DUPLICATE_USER: "Please use a different email address",
  SOMETHING_WENT_WRONG: "Something went wrong. Please try again later.",
};
const CODES = {
  SUCCESS: 200,
  FAIL: 500,
  CREATE_SUCCESS: 201,
};
module.exports = {
  mongodbUrl,
  MESSAGES,
  CODES,
};
