const AssetModel = require("../../Models/AssetModel");
const UserModel = require("../../Models/UserModel");
const { MESSAGES, CODES } = require("../../constants");
const { isEmpty } = require("lodash");

const userProfilePitcureUploadController = async (req, res) => {
  try {
    if (req.file && req.file.path) {
      console.log("File uploaded ");
      const { originalname, filename, path } = req.file;
      const response = await AssetModel.assetLog({
        originalname,
        filename,
        path,
      });
      res.send({
        status: CODES.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: response,
      });
    }
  } catch (err) {
    console.log("err", err);
    res.send({ status: 500, data: "Internal Server Error" });
  }
};

const pathUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { payload } = req.body;
    const response = await UserModel.patchUserDetails(id, payload);
    if (response.status) {
      res.send({
        status: CODES.SUCCESS,
        message: MESSAGES.USER_UPDATE_SUCCESS,
      });
    } else {
      res.send({
        status: CODES.FAIL,
        message: MESSAGES.FAIL,
        data: response.message,
      });
    }
  } catch (err) {
    res.send({ status: CODES.FAIL, message: MESSAGES.ITR_SVR_ERR, data: err });
    console.log("error while patching record", err.message);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await UserModel.getUser({ id });
    if (!isEmpty(response)) {
      res.send({
        status: CODES.SUCCESS,
        message: MESSAGES.SUCCESS,
        data: response,
      });
    } else {
      res.send({ status: CODES.FAIL, message: MESSAGES.FAIL, data: {} });
    }
  } catch (err) {
    res.send({ status: CODES.FAIL, message: MESSAGES.FAIL, data: {} });
    console.log("error while patching record", err.message);
  }
};

module.exports = {
  userProfilePitcureUploadController,
  pathUserDetails,
  getUserDetails,
};
