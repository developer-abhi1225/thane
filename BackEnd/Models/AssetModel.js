const mongoose = require("mongoose");

// asset schema
const assetSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
});

const AssetModel = new mongoose.model("asset", assetSchema);

AssetModel.assetLog = (value) => {
  const asset = new AssetModel({
    filename: value.filename,
    originalname: value.originalname,
    path: value.path,
  });
  return asset.save();
};

module.exports = AssetModel;
