import React, { useState, useEffect } from "react";
import { Col, Form, Input, Button, notification } from "antd";
import { EditOutlined } from "@ant-design/icons";

function onSubmit(e, props) {
  e.preventDefault();
  props.form.validateFields((err, values) => {
    if (!err) {
      let payload = values;
      props.patchUserDetails({ id: props.userId, payload });
    }
  });
}

function UserDetails(props) {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [showForm, setShowForm] = useState(false);
  return (
    <Col lg={12} md={12} sm={12} className={"userdetails__col"}>
      <React.Fragment>
        <b>{props.label}</b>
        {showForm ? (
          <React.Fragment>
            <Form layout={"inline"} onSubmit={(e) => onSubmit(e, props)}>
              <Form.Item>
                {props.form.getFieldDecorator(`${props.post_key}`, {
                  initialValue: props.value,
                })(<Input />)}
              </Form.Item>
              <Form.Item>
                <Button onClick={(e) => setShowForm(false)}> Cancel </Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType={"submit"} type={"primary"}>
                  {" "}
                  Save{" "}
                </Button>
              </Form.Item>
            </Form>
          </React.Fragment>
        ) : (
          <div
            onMouseLeave={(e) => setShowEditIcon(false)}
            onMouseEnter={(e) => setShowEditIcon(true)}
          >
            <span>{props.value}</span>
            {showEditIcon && (
              <EditOutlined
                className={"editicon"}
                onClick={(e) => {
                  setShowForm(true) && setShowEditIcon(false);
                }}
              />
            )}
          </div>
        )}
      </React.Fragment>
    </Col>
  );
}

const patchForm = Form.create()(UserDetails);
export default patchForm;
