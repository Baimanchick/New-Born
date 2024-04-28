import React, { useState } from "react";
import { Col, Flex, Form, Input, Radio, RadioChangeEvent, Row } from "antd";
import InputMask from "react-input-mask";

function Payment({}) {
  const [state, setState] = useState({
    card_number: "",
    date: "",
    cvc: "",
  });
  const [value, setValue] = useState(1);
  const onChangeRadio = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Form>
      <Radio.Group
        onChange={onChangeRadio}
        value={value}
        style={{ width: "100%" }}
      >
        <Row justify={"center"} align={"middle"}>
          <Col span={8}>
            <Radio value={1}>Оплата картой</Radio>
          </Col>
          <Col span={8}>
            <Radio value={2}>Наличными курьеру</Radio>
          </Col>
        </Row>
      </Radio.Group>

      <Row style={{ marginBottom: 20 }}>
        <Col span={24}>
          <InputMask
            mask="9999 9999 9999 9999"
            placeholder="Enter card number"
            value={state.card_number}
            onChange={onChange}
            children={
              <Input
                name={"card_number"}
                style={{ height: 60, backgroundColor: "#F8F8F8" }}
                bordered={false}
                type="tel"
              />
            }
          />
        </Col>
      </Row>
      <Row gutter={12}>
        <Col span={12}>
          <InputMask
            mask="99/99"
            placeholder="MM/YY"
            value={state.date}
            onChange={onChange}
            children={
              <Input
                name={"date"}
                style={{ height: 60, backgroundColor: "#F8F8F8" }}
                bordered={false}
                type="tel"
              />
            }
          />
        </Col>
        <Col span={12}>
          {" "}
          <InputMask
            mask="999"
            placeholder="000"
            value={state.cvc}
            onChange={onChange}
            children={
              <Input
                name={"cvc"}
                style={{ height: 60, backgroundColor: "#F8F8F8" }}
                bordered={false}
                type="tel"
              />
            }
          />
        </Col>
      </Row>
    </Form>
  );
}

export default Payment;
