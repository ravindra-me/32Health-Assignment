import { useCallback, useEffect, useState } from "react";
import { fetchUserData } from "../../service";
import { ActionKeys, useUsersContext } from "../../context/createContext";
import { Button, Card, Col, Form, Modal, Row } from "antd";
import UserCard, { userInfo } from "../UserCard";

import { Skeleton } from "antd";
import EditUserProfile from "../EditUserProfile";
import { User } from "../../context/users.types";

function Users() {
  const { userData, dispatch } = useUsersContext();
  const [userEditInfo, setUserEditInfo] = useState<userInfo | null>(null);
  const [form] = Form.useForm();

  const handleOpenModal = useCallback((data: any) => {
    setUserEditInfo(data);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserData();
        dispatch({
          type: ActionKeys.SET_DATA,
          payload: {
            data: data,
            isLoading: false,
          },
        });
      } catch (error) {
        dispatch({
          type: ActionKeys.SET_DATA,
          payload: {
            data: [],
            isLoading: false,
            error: error,
          },
        });
      }
    })();
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();

      const updateValues = userData.data.map((e) => {
        if (e.id === userEditInfo?.id) {
          return {
            ...e,
            ...values,
          };
        }
        return e;
      });
      dispatch({
        type: ActionKeys.SET_DATA,
        payload: { data: updateValues as User[] },
      });

      handleOpenModal(null);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  }, []);

  const handleDeleteUser = useCallback((id: number | string) => {
    const updateValues = userData.data.filter((e) => e.id !== id);
    dispatch({
      type: ActionKeys.SET_DATA,
      payload: { data: updateValues as User[] },
    });
  }, []);

  return (
    <>
      <Row gutter={[24, 24]} key={"users"}>
        {userData.isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Col xs={24} lg={6} xl={6} sm={12} key={index}>
                <SkeltonLoading key={index} />
              </Col>
            ))
          : userData?.data?.map((user) => {
              return (
                <Col xs={24} lg={6} xl={6} sm={12} key={user.id}>
                  <UserCard
                    id={user.id}
                    name={user.name}
                    username={user.username}
                    email={user.email}
                    website={user.website}
                    phone={user.phone}
                    handleOpenModal={handleOpenModal}
                    handleDeleteUser={handleDeleteUser}
                  />
                </Col>
              );
            })}
      </Row>
      {!!open && (
        <Modal
          onClose={() => handleOpenModal(null)}
          onCancel={() => handleOpenModal(null)}
          title="Basic Modal"
          open={!!userEditInfo}
          children={<EditUserProfile values={userEditInfo} form={form} />}
          classNames={{
            footer: "modelFooter",
            header: "modelHeader",
            content: "modelContent",
            body: "modelBody",
          }}
          footer={[
            <Button key={"cancel"}>Cancel</Button>,
            <Button type="primary" key={"submit"} onClick={handleSubmit}>
              ok
            </Button>,
          ]}
        />
      )}
    </>
  );
}

const SkeltonLoading = () => {
  return (
    <Card
      style={{ width: "100%" }}
      className={"userCard"}
      cover={<Skeleton className="avatarProfile likeIcon" key="like" />}
      actions={[
        <Skeleton.Button className="iconStyle likeIcon" key="like" />,
        <Skeleton.Button className="iconStyle likeIcon" key="like" />,
        <Skeleton.Button className="iconStyle likeIcon" key="like" />,
      ]}
    >
      <Skeleton />
    </Card>
  );
};

export default Users;
