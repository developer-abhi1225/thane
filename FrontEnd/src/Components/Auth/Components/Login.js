import React, { Component } from "react";
import { Button, Card, Form, Input, notification, Row } from "antd";
import { connect } from "react-redux";
import { userLogin } from "../Actions";
import "../index.css";
import smallLogo from "../../../Assets/logo-small.png";

class Login extends Component {
  constructor() {
    super();
  }

  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userLogin(values);
      }
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.auth.loginStatus) {
      notification.success({ message: "Login Successfull" });
      this.props.history.push("/profile");
    } else if (this.props.auth.loginStatus === false) {
      notification.error({
        message: "Something went wrong. Please try again later",
      });
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
              <div className={"login__header"}>
                <img className={"header__logo"} src={smallLogo} />
                <span className={"header__signup"}>
                  Don't have an account ?{" "}
                  <Button
                    type={"link"}
                    onClick={() => {
                      this.props.history.push("/signup");
                    }}
                  >
                    {" "}
                    Sign Up{" "}
                  </Button>
                </span>
              </div>
            }
          >
            <Form
              onSubmit={this.submit}
              className={"login__form"}
              colon={false}
            >
              <Form.Item label={"Email"}>
                {this.props.form.getFieldDecorator("email", {
                  rules: [
                    {
                      required: true,
                      message: "Email must be present.",
                    },
                  ],
                })(<Input type={"email"} placeholder={"Enter your e-mail"} />)}
              </Form.Item>
              <Form.Item label={"Password"}>
                {this.props.form.getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Password must be present.",
                    },
                    {
                      min: 8,
                      message: "Password must be atleast of 8 characters",
                    },
                  ],
                })(
                  <Input
                    type={"password"}
                    placeholder={"Enter your password"}
                  />
                )}
              </Form.Item>
              <Row className={"form__signin"}>
                <Form.Item>
                  <Button
                    className={"signin__button"}
                    loading={this.props.auth.loading}
                    type={"primary"}
                    htmlType={"submit"}
                  >
                    {" "}
                    Sign In{" "}
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

const loginForm = Form.create({ name: "loginForm" })(Login);
const mapStatetoProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = {
  userLogin,
};
export default connect(mapStatetoProps, mapDispatchToProps)(loginForm);
