import { AutoComplete, Input, SelectProps } from "antd";
import { SearchModalProps } from "./Navbar.props";
import styles from "./navbar.module.scss";
import "../../styles/antd.scss";
import { useState } from "react";
import { Product } from "../../helpers/interfaces/product.interface";
import { useAppDispatch } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../store/features/products/productSlice";

function SearchModalMobile({ isVisible, onClose }: SearchModalProps) {
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchAntd = async (value: string) => {
    setSearchValue(value)
    if (value.trim() !== "") {
      const resultAction = await dispatch(searchProducts(value.trim()));
      if (searchProducts.fulfilled.match(resultAction)) {
        const searchResults = resultAction.payload as unknown as Product[];
        setOptions(
          searchResults.map((product) => ({
            value: product.name,
            label: (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                  handleCloseModal();
                }}
              >
                <span style={{ cursor: "pointer" }}>
                  <strong>Найдено:</strong> {product.name}
                </span>
              </div>
            ),
          }))
        );
      } else {
        setOptions([]);
      }
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value: string) => {
    setSearchValue("")
    // console.log(value);

  };

  const handleSearch = (value: string) => {
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleStopClose = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.modalBackground}
      style={{ display: isVisible ? "flex" : "none" }}
      onClick={handleCloseModal}
    >
      <AutoComplete
        popupMatchSelectWidth={325}
        options={options}
        size="large"
        style={{ marginTop: 80, borderRadius: "20px" }}
        onSelect={onSelect}
        onSearch={handleSearchAntd}
        onClick={handleStopClose}
        value={searchValue}
      >
        <Input.Search
          style={{ width: 325 }}
          className={styles.input_modal}
          placeholder="Я ищу…"
          onSearch={handleSearch}
          enterButton
        />
      </AutoComplete>
    </div>
  );
}

export default SearchModalMobile;
