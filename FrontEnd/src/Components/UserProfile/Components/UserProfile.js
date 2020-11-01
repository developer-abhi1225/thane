import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Col, Upload, Button, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  patchUserDetails,
  updateUserDetails,
  fetchUserDetails,
} from "../Actions/index";
import UserDetails from "./UserDetails";
import { APIURL } from "../../../Constants/apiUrl";
import "../index.css";
const imageURL = `${APIURL}static/`;
const UPLOAD_URL = `${APIURL}user/upload`;

class UserProfile extends Component {
  componentDidMount() {
    const id = localStorage.getItem("token");
    if (id) {
      this.props.fetchUserDetails({ id });
    } else {
      this.props.history.push("./login");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.patchStatus !== prevProps.patchStatus &&
      this.props.patchStatus !== null
    )
      if (this.props.patchStatus) {
        this.props.fetchUserDetails({ id: this.props.userDetails.id });
        notification.success({ message: "Record updated successfully." });
      } else {
        notification.success({ message: "Failed to update record." });
      }
    {
    }
  }

  logout = () => {
    localStorage.clear("token");
    this.props.history.push("./login");
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      address,
      phone_no,
      password,
      id,
      asset,
    } = this.props.userDetails;

    return (
      <Card
        bordered={true}
        title={"User Profile"}
        extra={<Button onClick={this.logout}> Logout </Button>}
      >
        <Row gutter={30}>
          <Col lg={16} md={18} sm={12}>
            <Row gutter={30}>
              <UserDetails
                userId={id}
                label={"First Name"}
                value={first_name}
                post_key={"first_name"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
              <UserDetails
                userId={id}
                label={"Last Name"}
                value={last_name}
                post_key={"last_name"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
              <UserDetails
                userId={id}
                label={"E-mail"}
                value={email}
                post_key={"email"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
              <UserDetails
                userId={id}
                label={"Address"}
                value={address}
                post_key={"address"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
              <UserDetails
                userId={id}
                label={"Phone Number"}
                value={phone_no}
                post_key={"phone_no"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
              <UserDetails
                userId={id}
                label={"Password"}
                value={password}
                post_key={"password"}
                patchStatus={this.props.patchStatus}
                fetchUserDetails={this.props.fetchUserDetails}
                patchUserDetails={this.props.patchUserDetails}
              />
            </Row>
          </Col>
          <Col lg={8} md={8} sm={12} className={"uploadImage"}>
            <Upload.Dragger
              listType="picture-card"
              onChange={({ file }) => {
                console.log("file", file);
                if (file.percent === 100) {
                  console.log("Patching");
                  try {
                    const { filename, originalname, path } = file.response.data;
                    this.props.patchUserDetails({
                      id: this.props.userDetails.id,
                      payload: { asset: { filename, originalname, path } },
                    });
                  } catch (err) {
                    console.log("after upload err", err);
                  }
                }
              }}
              action={UPLOAD_URL}
              showUploadList={false}
            >
              {asset ? <img src={`${imageURL}${asset.filename}`} /> : ""}
              <p style={{ marginTop: "30px" }}>Upload a new profile pitcure</p>
            </Upload.Dragger>
          </Col>
        </Row>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.auth.userDetails,
    patchStatus: state.userProfile.patchStatus,
  };
};

const mapDispatchToProps = {
  updateUserDetails,
  patchUserDetails,
  fetchUserDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
