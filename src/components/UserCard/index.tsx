import {
  DeleteOutlined,
  EditOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Card, Space, Typography } from "antd";

import "./styles.css";
import { memo, useState } from "react";

const { Title, Text } = Typography;

export interface userInfo {
  id: number | string;
  name: string;
  email: string;
  username: string;
  website: string;
  phone: string;
}

function UserCard({
  id,
  username,
  name,
  email,
  website,
  phone,
  handleOpenModal,
  handleDeleteUser,
}: userInfo & {
  handleOpenModal: (data: userInfo) => void;
  handleDeleteUser: (id: number | string) => void;
}) {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike((pre) => !pre);
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        className={"userCard"}
        cover={
          <img
            alt="example"
            src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`}
            // src={`https://avatars.dicebear.com/v2/avataaars/${username}.svg?options[mood][]=happy}`}
            className={"avatarProfile"}
          />
        }
        actions={[
          like ? (
            <HeartFilled
              className="iconStyle likeIcon"
              key="like"
              onClick={handleLike}
            />
          ) : (
            <HeartOutlined
              className="iconStyle likeIcon"
              key="like"
              onClick={handleLike}
            />
          ),
          <EditOutlined
            key="edit"
            className="iconStyle"
            onClick={() =>
              handleOpenModal({ id, username, name, email, website, phone })
            }
          />,
          <DeleteOutlined
            key="delete"
            className="iconStyle"
            onClick={() => handleDeleteUser(id)}
          />,
        ]}
      >
        <Title level={4} className="userName">
          {name}
        </Title>
        <Space direction="vertical">
          <Text className="description">
            <MailOutlined /> {email}
          </Text>
          <Text className="description">
            <PhoneOutlined /> {phone}
          </Text>
          <Text className="description">
            <GlobalOutlined /> {website}
          </Text>
        </Space>
      </Card>
    </>
  );
}

export default memo(UserCard);
