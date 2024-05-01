import React, { useEffect, useState } from "react";
import { Button as ButtonAntd, Flex, Form, Input, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import styles from "./auth.module.scss";
import { Colors } from "../../helpers/enums/color.enum";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../store/features/auth/authSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { Button } from "../Button/Button";
function Register({}) {
  const [form] = Form.useForm();
  const [clientReady, setClientReady] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setClientReady(true);
  }, []);

  const onFinish = (values: any) => {
    dispatch(register(values));
    console.log("Received values of form: ", values);
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
          Регистрация
        </Typography.Title>
        <Form.Item
          label={"Имя"}
          name="name"
          style={{ marginBottom: "16px" }}
          rules={[{ required: true, message: "Пожалуйста заполните Имя!" }]}
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
            type={"email"}
          />
        </Form.Item>
        <Form.Item
          label={"Пароль"}
          name="password"
          style={{ marginBottom: 8 }}
          rules={[{ required: true, message: "Пожалуйста введите Пароль!" }]}
        >
          <Input
            autoComplete={"off"}
            style={{ height: "60px", backgroundColor: Colors.LIGHT_GREY }}
            bordered={false}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Link to={"/auth"}>Уже есть аккаунт?</Link>
        </Form.Item>

        <Form.Item shouldUpdate style={{ marginTop: 60, marginBottom: 0 }}>
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

export default Register;
