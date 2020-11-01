import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Form,
  Input,
  notification,
  Row,
  Upload,
  Col,
  Modal,
} from "antd";
import { APIURL } from "../../../Constants/apiUrl";
import {
  createUser,
  uploadProfilePitcure,
  uploadProfilePitcureSuccess,
  uploadProfilePitcureFail,
} from "../Actions";
import smallLogo from "../../../Assets/logo-small.png";
import TextArea from "antd/lib/input/TextArea";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  MobileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const UPLOAD_URL = `${APIURL}user/upload`;

class Signup extends Component {
  validateConfirmPass = (rule, value, callback) => {
    const password = this.props.form.getFieldValue("password");
    if (password && password !== value) {
      callback("Password doesnot match");
    }
    callback();
  };

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createUser(values);
      }
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.auth.createStatus !== prevProps.auth.createStatus &&
      this.props.auth.createStatus
    ) {
      notification.success({ message: "User created successfully" });
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className={"login-container"}>
        <Row type={"flex"} justify={"space-around"}>
          <Card
            className={"login"}
            bordered
            title={
              <Row
                type={"flex"}
                justify={"space-between"}
                className={"login__header"}
              >
                <img className={"header__logo"} src={smallLogo} />
                <span className={"header__signup"}>
                  Already have an account ?{" "}
                </span>
                <Button
                  type={"link"}
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  {" "}
                  Sign In{" "}
                </Button>
              </Row>
            }
          >
            <Form
              onSubmit={this.submit}
              colon={false}
              hideRequiredMark={true}
              className={"login__form"}
            >
              {/* ---------------------ROW 1 --------------------- */}
              <Row gutter={30}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"First Name"}>
                    {this.props.form.getFieldDecorator("first_name", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter first name.",
                        },
                      ],
                    })(<Input prefix={<UserOutlined />} />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Last Name"}>
                    {this.props.form.getFieldDecorator("last_name", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter last name.",
                        },
                      ],
                    })(<Input prefix={<UserOutlined />} />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* ---------------------ROW 2 --------------------- */}
              <Row gutter={30}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Email"}>
                    {this.props.form.getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter e-mail address.",
                        },
                      ],
                    })(<Input type={"email"} prefix={<MailOutlined />} />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Phone Number"}>
                    {this.props.form.getFieldDecorator("phone_no", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter phone number.",
                        },
                      ],
                    })(<Input type={"number"} prefix={<MobileOutlined />} />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* ---------------------ROW 3 --------------------- */}
              <Row gutter={30}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Password"}>
                    {this.props.form.getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter password.",
                        },
                        {
                          min: 8,
                          message: "Password must be atleast of 8 characters",
                        },
                      ],
                    })(<Input type={"password"} prefix={<LockOutlined />} />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Confirm password"}>
                    {this.props.form.getFieldDecorator("confirm_password", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter password.",
                        },
                        {
                          validator: this.validateConfirmPass,
                        },
                      ],
                    })(<Input type={"password"} prefix={<LockOutlined />} />)}
                  </Form.Item>
                </Col>
              </Row>
              {/* ---------------------ROW 4 --------------------- */}
              <Row gutter={30}>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Address"}>
                    {this.props.form.getFieldDecorator("address", {
                      rules: [
                        {
                          required: true,
                          message: "Please enter address.",
                        },
                      ],
                    })(<TextArea />)}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Form.Item label={"Profile pitcure"}>
                    {this.props.form.getFieldDecorator("asset", {
                      initialValue: {},
                    })(<Input type={"hidden"} />)}
                  </Form.Item>
                  <Upload
                    multiple={false}
                    beforeUpload={(file) => {
                      this.props.uploadProfilePitcure();
                    }}
                    onChange={({ file }) => {
                      if (file.percent === 100) {
                        try {
                          this.props.form.setFieldsValue({
                            asset: file.response?.data,
                          });
                          this.props.uploadProfilePitcureSuccess();
                        } catch (err) {
                          console.log("after upload err", err);
                        }
                      }
                    }}
                    action={UPLOAD_URL}
                  >
                    <Button>
                      <UploadOutlined />
                      Upload a profile pitcure
                    </Button>
                  </Upload>
                </Col>
              </Row>

              <Row className={"form__signin"}>
                <Form.Item>
                  <Button
                    className={"signin__button"}
                    loading={this.props.auth.loading}
                    type={"primary"}
                    htmlType={"submit"}
                  >
                    Signup
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Card>
        </Row>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { auth: state.auth };
}

const mapDispatchToProps = {
  createUser,
  uploadProfilePitcure,
  uploadProfilePitcureSuccess,
  uploadProfilePitcureFail,
};

const asd = Form.create()(Signup);
export default connect(mapStateToProps, mapDispatchToProps)(asd);
