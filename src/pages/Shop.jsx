import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import { constants } from "./../utils/constants";
import Pagination from "../components/Pagination/Pagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Shop = () => {
  const [filterList, setFilterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [currCategory, setCurrCategory] = useState({ value: "Graphics Card", label: "Graphic Cards" });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  const handlePaginationChange = (active) => setCurrPage(active);

  const handleCategoryChange = (category) => {
    setCurrCategory(category);
    setCurrPage(1);
  };

  const searchHandler = (keyword) => setSearchKeyword(keyword);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedKeyword(searchKeyword), 300);
    return () => clearTimeout(timeout); 
  }, [searchKeyword]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${constants.GET_ALL_PRODUCTS}?page=${currPage}&category=${currCategory.value}&keyword=${debouncedKeyword}`
      );
      setFilterList(response.data.products);
      setTotalPage(response.data.totalPages);
    } catch (error) {
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [currPage, currCategory, debouncedKeyword]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderSkeleton = () => (
    <Row>
      {Array.from({ length: 6 }).map((_, index) => (
        <Col key={index} md={4} className="mb-4">
          <Skeleton height={250} />
          <Skeleton width="80%" />
          <Skeleton width="50%" />
        </Col>
      ))}
    </Row>
  );

  if (error) return <p className="text-danger text-center">Error: {error}</p>;

  return (
    <Fragment>
      <Banner title="Product" />
      <section className="filter-bar">
        <Container className="filter-bar-container">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect name={currCategory.label} setCategory={handleCategoryChange} />
            </Col>
            <Col md={8}>
              <SearchBar inputVal={searchKeyword} handler={searchHandler} />
            </Col>
          </Row>
        </Container>
        <Container>
          {loading ? (
            renderSkeleton()
          ) : (
            <>
              <ShopList productItems={filterList} />
              <Row>
                <Col md={3}></Col>
                <Col style={{ display: "grid", placeItems: "center" }}>
                  <Pagination
                  filterList={filterList}
                    initialNumber={currPage}
                    totalNumbers={totalPage}
                    onActiveChange={handlePaginationChange}
                  />
                </Col>
                <Col md={3}></Col>
              </Row>
            </>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
