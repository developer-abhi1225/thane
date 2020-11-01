const isEmpty = require("lodash/isEmpty");
const { MESSAGES, CODES } = require("../../constants");
const UserModel = require("../../Models/UserModel");

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await UserModel.getUser({ email, password });
    if (response) {
      return res.send({
        status: CODES.SUCCESS,
        message: "user found",
        data: response,
      });
    }
    return res.send({
      status: CODES.FAIL,
      message: "User not found",
      data: {},
    });
  } catch (err) {
    console.log("err", err);
    return res.send({
      status: CODES.FAIL,
      message: MESSAGES.ITR_SVR_ERR,
      data: err,
    });
  }
};

const SignUpController = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_no,
      password,
      address,
      asset,
    } = req.body;
    const dataToSave = {
      first_name,
      last_name,
      email,
      phone_no,
      password,
      address,
      asset,
    };
    const response = await UserModel.addNewUser(dataToSave);
    if (!isEmpty(response)) {
      if (response.status === false) {
        return res.send({
          status: CODES.FAIL,
          message: response.message,
          data: {},
        });
      }
      return res.send({
        status: CODES.CREATE_SUCCESS,
        message: "User Created Successfully",
        data: response,
      });
    }
  } catch (err) {
    console.log("err", err);
    res.send({
      status: CODES.FAIL,
      message: MESSAGES.ITR_SVR_ERR,
      data: err.message,
    });
  }
};

module.exports = {
  LoginController,
  SignUpController,
};
