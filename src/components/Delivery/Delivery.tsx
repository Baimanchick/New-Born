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
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log("onSelect", value);
  };

  return (
    <Flex vertical={true}>
      <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
        <Row justify={"center"}>
          <Col span={4}>
            <Checkbox value="Доставка">Доставка до дома</Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox value="Самовывоз">Самовывоз</Checkbox>
          </Col>
        </Row>
      </Checkbox.Group>
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
