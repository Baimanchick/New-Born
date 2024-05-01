import React, { useState } from "react";
import {
  Flex,
  Checkbox,
  Col,
  Row,
  SelectProps,
  AutoComplete,
  Input,
  Button,
  Space,
  Radio,
  RadioChangeEvent,
} from "antd";
import type { GetProp } from "antd";
import { SearchProps } from "antd/lib/input";
import { Colors } from "../../helpers/enums/color.enum";

const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
  checkedValues
) => {
  console.log("checked = ", checkedValues);
};

const getRandomInt = (max: number, min = 0) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query: string) =>
  new Array(getRandomInt(5))
    .join(".")
    .split(".")
    .map((_, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              Found {query} on{" "}
              <a
                href={`https://s.taobao.com/search?q=${query}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {category}
              </a>
            </span>
            <span>{getRandomInt(200, 100)} results</span>
          </div>
        ),
      };
    });

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);
function Delivery() {
  const [value, setValue] = useState(1);
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <Flex vertical={true}>
      <Radio.Group onChange={onChange} value={value}>
        <Row justify={"center"}>
          <Col span={4}>
            <Radio value={1}>Доставка до дома</Radio>
          </Col>
          <Col span={4}>
            <Radio value={2}>Самовывоз</Radio>
          </Col>
        </Row>
      </Radio.Group>
      <Flex style={{ width: "100%", marginTop: "20px" }} gap={10}>
        <AutoComplete
          popupMatchSelectWidth={true}
          options={options}
          onSelect={onSelect}
          style={{ width: "100%" }}
          onSearch={handleSearch}
          size="large"
        >
          <Input
            width={"100%"}
            height={"60px"}
            size="large"
            bordered={false}
            placeholder="how"
            style={{
              backgroundColor: "#F8F8F8",
              borderRadius: 10,
              height: "60px",
            }}
          />
        </AutoComplete>
        <Button
          size={"large"}
          type={"primary"}
          style={{ borderRadius: 10, paddingInline: "40px", height: "60px" }}
        >
          Продолжить
        </Button>
      </Flex>

      <Flex style={{ maxHeight: "200px" }} justify={"center"}>
        cart
      </Flex>
    </Flex>
  );
}

export default Delivery;
