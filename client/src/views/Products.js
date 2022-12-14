import React, { useContext, useEffect } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Col,
    Container,
    Dropdown,
    ListGroup,
    Row,
    Spinner,
} from 'react-bootstrap';
import ProductList from '../components/home/ProductList';
import listIcon from '../assets/list.svg';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByName } from '../store/actions/productAction';

const Products = () => {
    const { productName } = useParams();

    
    const dispatch = useDispatch();
    useEffect(() => dispatch(getProductsByName(productName)), [productName]);
    const products = useSelector((state) => state.product.products);
    const productLoading = useSelector((state) => state.product.productLoading);
    let body = null;

    if (productLoading) {
        body = (
            <div>
                <div className="spinner-container">
                    <Spinner animation="border" variant="info" />
                </div>
            </div>
        );
    } else {
        body = (
            <>
                <div className="grid-wide my-5">
                    <Breadcrumb className="">
                        <BreadcrumbItem>
                            <Link to="/home">Trang chủ</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to="/home">Sản phẩm</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Kết quả tìm kiếm {` "${productName}"`}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Row>
                        <Col xs={2}>
                            <ListGroup className="font-weight-bolder">
                                <ListGroup.Item variant="danger" active>
                                    <img
                                        src={listIcon}
                                        alt="List Icon"
                                        height="24"
                                        width="24"
                                        className="mr-3"
                                    />
                                    Danh mục
                                </ListGroup.Item>
                                <ListGroup.Item
                                    variant="success"
                                    action
                                    className="home__list-category"
                                    // className="font-weight-bolder  "
                                >
                                    <p className="ml-3 mb-0">Tất Cả</p>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    variant="success"
                                    action
                                    className="home__list-category"
                                    as="button"
                                    // onClick={onClickFilter('dry')}
                                >
                                    <p className="ml-3 mb-0">Thức Ăn</p>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    variant="success"
                                    action
                                    className="home__list-category"
                                >
                                    <p className="ml-3 mb-0">Đồ Uống</p>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    variant="success"
                                    action
                                    className="home__list-category"
                                >
                                    <p className="ml-3 mb-0">Đồ Khô</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col xs={10}>
                            <Container fluid className="sort-product-home ">
                                <Row>
                                    <Col xs={2}>
                                        <p className="mt-3 font-weight-bolder">
                                            Sắp xếp theo
                                        </p>
                                    </Col>
                                    <Col xs={8}>
                                        <Button
                                            variant="outline-success"
                                            className="font-weight-bolder mt-2 "
                                        >
                                            Bán chạy
                                        </Button>
                                        <Button
                                            variant="outline-success"
                                            className="font-weight-bolder mt-2 ml-4 "
                                        >
                                            Liên quan
                                        </Button>{' '}
                                        <Button
                                            variant="outline-success"
                                            className="font-weight-bolder mt-2 ml-3 "
                                        >
                                            Mới nhất
                                        </Button>{' '}
                                        <Dropdown
                                            className="my-2 ml-4 product-sort-dropdown"
                                            size="lg"
                                        >
                                            <Dropdown.Toggle
                                                variant="outline-success"
                                                id="dropdown-basic"
                                                className="font-weight-bolder"
                                            >
                                                Giá
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">
                                                    Giá từ thấp đến cao
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">
                                                    Giá từ cao đến thấp
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Container>
                            <Row className="my-2">
                                {products.map((product) => (
                                    <Col
                                        xs={3}
                                        key={product._id}
                                        className="my-2"
                                    >
                                        <ProductList product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
    return <>{body}</>;
};

export default Products;
