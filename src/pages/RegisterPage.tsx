import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Input, Typography } from "antd";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";

import styles from "./auth.module.scss";
import { Colors } from "../helpers/enums/color.enum";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import openNotification from "../components/Notification/Notification";
function Register({ }) {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.user !== null)

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);
  console.log(form.getFieldsValue());

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Flex justify={"center"} align={"center"} className={styles.form}>
      <Form
        style={{ width: "100%" }}
        form={form}
        layout={"vertical"}
        name="normal_login"
        requiredMark={false}
        onFinish={onFinish}
        autoComplete={"off"}
      >
        <Typography.Title style={{ fontWeight: 1000, color: Colors.BLUE }}>
          Регистрация
        </Typography.Title>
        <Form.Item
          label={"E-mail"}
          name="email"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            placeholder="E-mail"
            type={"email"}
          />
        </Form.Item>
        <Form.Item
          label={"Имя"}
          name="name"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            type={"text"}
            placeholder="Имя"
          />
        </Form.Item>
        <Form.Item
          label={"Пароль"}
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          style={{ marginBottom: "150px" }}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Flex justify={"space-between"}>
          <Button
            type={"link"}
            icon={<ArrowLeftOutlined />}
            style={{ fontSize: "16px" }}
            onClick={handleGoBack}
          >
            Назад
          </Button>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Flex>
      </Form>
    </Flex>
  );
}

export default Register;
