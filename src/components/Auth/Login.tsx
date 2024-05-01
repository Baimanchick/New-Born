import React, { useEffect, useState } from "react";
import {
  Button as ButtonAntd,
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./auth.module.scss";
import { Colors } from "../../helpers/enums/color.enum";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { checkToken, login, userMe } from "../../store/features/auth/authSlice";
import { Button } from "../Button/Button";
function Login({}) {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = async (values: any) => {
    await dispatch(login(values));
    await dispatch(userMe()).then(() => navigate("/"));
  };
  return (
    <Flex justify={"flex-end"} align={"center"} className={styles.form}>
      <Form
        style={{ width: "100%" }}
        form={form}
        layout={"vertical"}
        name="normal_login"
        requiredMark={false}
        onFinish={onFinish}
        autoComplete={"off"}
      >
        <Typography.Title
          className={styles.form_title}
          style={{ fontWeight: 1000, color: Colors.BLUE }}
        >
          Авторизация
        </Typography.Title>

        <Form.Item
          label={"E-mail"}
          name="email"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Пожалуйста введите E-mail!" }]}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          label={"Пароль"}
          name="password"
          rules={[{ required: true, message: "Пожалуйста введите Пароль!" }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item shouldUpdate style={{ marginTop: "170px", marginBottom: 0 }}>
          {() => (
            <Flex justify={"space-between"} align={"center"}>
              <ButtonAntd
                type={"link"}
                icon={<ArrowLeftOutlined />}
                style={{ fontSize: "16px" }}
                onClick={handleGoBack}
              >
                Назад
              </ButtonAntd>
              <Button
                size={"large"}
                appearance={"yellow"}
                htmlType="submit"
                disabled={
                  !clientReady ||
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length)
                    .length
                }
              >
                Подтвердить
              </Button>
            </Flex>
          )}
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default Login;
