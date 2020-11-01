import React from "react";
import UserProfile from "./UserProfile";
import { Layout } from "antd";

const { Footer, Header, Content } = Layout;

function UserProfileView(props) {
  return (
    <Layout className={"layout"}>
      <Header className={"layout__header"}></Header>
      <Content className={"layout__content"}>
        <UserProfile {...props} />
      </Content>
    </Layout>
  );
}

export default UserProfileView;
