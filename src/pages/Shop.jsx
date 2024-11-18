import {Col, Container, Row} from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import {Fragment, useEffect, useState} from "react";
import axios from 'axios';
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import {constants} from './../utils/constants';
import Pagination from "../components/Pagination/Pagination";
import {safePreventDefault} from "react-slick/lib/utils/innerSliderUtils"; // Make sure this path is correct

const Shop = () => {
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currPage, setCurrPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [currCategory, setCurrCategory] = useState({ value: "Graphics Card", label: "Graphic Cards" });
    const [currKeyword, setCurrKeyword] = useState("");

    const handlePaginationChange = (active) => {
        setCurrPage(active);
    };

    const handleCategoryChange = (category) => {
        setCurrCategory(category);
        setCurrPage(1);
    }

    const searchHandler = (keyword) => {
        console.log(keyword)
        setCurrKeyword(keyword);
        setCurrPage(1);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading state
            try {
                const response = await axios.get(`${constants.GET_ALL_PRODUCTS}?page=${currPage}&category=${currCategory.value}&keyword=${currKeyword}`); // Use the constant for the endpoint
                setFilterList(response.data.products);
                setTotalPage(response.data.totalPages)// Assuming products are in response.data.products
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchProducts();
    }, [currPage, currCategory, currKeyword]);

    useWindowScrollToTop();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Fragment>
            <Banner title="Product"/>
            <section className="filter-bar">
                <Container className="filter-bar-container">
                    <Row className="justify-content-center">
                        <Col md={4}>
                            <FilterSelect name={currCategory.label} setCategory={handleCategoryChange}/>
                        </Col>
                        <Col md={8}>
                            <SearchBar inputVal={currKeyword} handler={searchHandler}/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <ShopList productItems={filterList}/>
                    <Row>
                        <Col md={3}></Col>
                        <Col style={{
                            display: 'grid',
                            placeItems: 'center'
                        }}>
                            <Pagination initialNumber={currPage} totalNumbers={totalPage} onActiveChange={handlePaginationChange}/>
                        </Col>
                        <Col md={3}></Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    );
};

export default Shop;
