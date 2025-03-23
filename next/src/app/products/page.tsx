"use client";

import { JSX, useEffect, useState } from "react";
import Link from 'next/link';
import {
    Container,
    Alert,
    Col,
    Row,
    Form,
    Card,
    CardBody,
    CardHeader,
    Table,
    Pagination,
    Button,
    Image,
    InputGroup
} from "react-bootstrap";
import { fetchProducts, ProductsResponse } from "../../models/product";
import { fetchCategories, Category, CategoriesResponse } from "../../models/category";
import { FaExclamationTriangle, FaEye, FaSearch, FaFilter } from 'react-icons/fa';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { toBrl } from "../../utils/formatter";

function renderTable(
    productsResponse: ProductsResponse,
    isLoading: boolean,
    setCurrentPage: (page: number) => void,
    setPerPage: (perPage: number) => void,
    currentPage: number,
    currentPerPage: number,
    total: number,
    totalPages: number
): JSX.Element {

    return (
        <div className="w-100">
            {isLoading ? (
                <Skeleton count={10} />
            ) : (
                <Table striped bordered hover className="rounded shadow-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Imagem</th>
                            <th>Categoria</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsResponse?.data?.products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{toBrl(product.price)}</td>
                                <td>
                                    <Image
                                        src={product.image_url}
                                        alt="Imagem do produto"
                                        style={{ width: "50px", height: "auto", transition: "transform 0.2s" }}
                                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.5)")}
                                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                                        rounded
                                    />
                                </td>
                                <td>{product.category_name}</td>
                                <td className="text-center">
                                    <Link href={`/product/${product.id}`} passHref>
                                        <Button variant="primary" size="sm">
                                            <FaEye />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <div className="d-flex justify-content-end align-items-center mt-3">
                <span>Exibindo {productsResponse?.data?.products.length} de {total} registros</span>
                <div className="d-flex align-items-center ms-3">
                    <Form.Label className="me-2 mb-0">Exibir por página:</Form.Label>
                    <Form.Control
                        as="select"
                        value={currentPerPage}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="me-3"
                        style={{ width: "auto" }}
                    >
                        <option value={5}>5</option>
                        <option value={15}>15</option>
                        <option value={50}>50</option>
                    </Form.Control>
                </div>
                <Pagination className="mb-0">
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    );
}

export default function Page() {
    const [productsResponse, setProductsResponse] = useState<ProductsResponse>();
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [searchParam, setSearchParam] = useState<string | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadProducts(): Promise<void> {
            setIsLoading(true);
            const data = await fetchProducts(currentPage, perPage, selectedCategory?.id, searchParam);
            if (currentPage > data.data.totalPages) {
                setCurrentPage(1);
            } else {
                setProductsResponse(data);
            }
            setIsLoading(false);
        }

        loadProducts();
    }, [currentPage, perPage, selectedCategory, searchParam]);

    useEffect(() => {
        async function loadCategories(): Promise<void> {
            setIsLoading(true);
            const data = await fetchCategories();
            setCategoriesResponse(data);
        }

        loadCategories();
    }, []);

    useEffect(() => {
        const err: boolean = productsResponse?.success === false || categoriesResponse?.success === false;
        setHasError(err);
        setErrorMessage(err ? ((productsResponse?.message || categoriesResponse?.message) ?? "") : "");
    }, [productsResponse, categoriesResponse]);

    if (hasError) {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <Alert variant="danger">
                            <FaExclamationTriangle /> {errorMessage}
                        </Alert>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <h2 className="text-center">Produtos</h2>
                    <Card className="mb-3">
                        <CardHeader>
                            Utilize os filtros para refinar sua pesquisa. Altere o número de registros exibidos por página e/ou página atual.
                        </CardHeader>

                        <CardBody className="d-flex">
                            <InputGroup className="me-3 w-75">
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Buscar por nome ou descrição"
                                    onBlur={(e) => setSearchParam((e.target as HTMLInputElement).value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setSearchParam((e.target as HTMLInputElement).value);
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                            </InputGroup>
                            <InputGroup className="w-25">
                                <InputGroup.Text>
                                    <FaFilter />
                                </InputGroup.Text>
                                <Form.Control
                                    as="select"
                                    disabled={isLoading}
                                    value={selectedCategory?.id || ""}
                                    onChange={(e) => setSelectedCategory(categoriesResponse?.data?.categories.find(category => category.id === Number(e.target.value)))}
                                >
                                    <option value="">Todas as Categorias</option>
                                    {categoriesResponse?.data?.categories?.map((category, index) => (
                                        <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </InputGroup>
                        </CardBody>
                    </Card>
                </Col>

                <Col md={12}>
                    {renderTable(
                        productsResponse as ProductsResponse,
                        isLoading,
                        setCurrentPage,
                        setPerPage,
                        currentPage,
                        perPage,
                        productsResponse?.data?.total || 0,
                        productsResponse?.data?.totalPages || 1
                    )}
                </Col>
            </Row>
        </Container>
    );
}
