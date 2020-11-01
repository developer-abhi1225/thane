const mongoose = require("mongoose");
const { MESSAGES } = require("../constants");
// user schema
const userSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone_no: Number,
  address: String,
  asset: {
    filename: String,
    originalname: String,
    path: String,
  },
});

const UserModel = new mongoose.model("user", userSchema);

UserModel.getUser = (value) => {
  return UserModel.findOne({ ...value });
};

UserModel.addNewUser = async (values) => {
  //Check if same user with same email id exists,
  const duplicateCheck = await UserModel.find({ email: values.email });
  if (duplicateCheck.length) {
    return {
      status: false,
      message: DUPLICATE_USER,
      data: {},
    };
  }

  const response = await UserModel.find().sort({ id: -1 }).limit(1);
  let id = 1;
  if (response.length) {
    id = response[0].id + 1;
  }
  const user = new UserModel({
    id,
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone_no: values.phone_no,
    password: values.password,
    address: values.address,
    asset: values.asset,
  });
  const userSaveResponse = await user.save();
  return {
    status: true,
    message: MESSAGES.USER_CREATE_SUCCESS,
    data: userSaveResponse,
  };
};

UserModel.patchUserDetails = async (id, payload) => {
  try {
    const response = await UserModel.findOne({ id }).updateOne({ ...payload });
    if (response.ok) {
      return {
        status: true,
        message: MESSAGES.USER_UPDATE_SUCCESS,
        data: {},
      };
    } else {
      console.log("user patch failed", response);
      return {
        status: false,
        message: MESSAGES.SOMETHING_WENT_WRONG,
        data: {},
      };
    }
  } catch (err) {
    console.log("user patch failed", err);
    return {
      status: true,
      message: MESSAGES.ITR_SVR_ERR,
      data: {},
    };
  }
};
module.exports = UserModel;
