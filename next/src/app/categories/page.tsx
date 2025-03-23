"use client";

import { JSX, useEffect, useState, useMemo } from "react";
import {
    Container,
    Alert,
    Col,
    Row,
    Card,
    CardHeader,
    Table,
} from "react-bootstrap";
import { fetchCategories, CategoriesResponse } from "../../models/category";
import { FaExclamationTriangle } from 'react-icons/fa';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

function renderTable(
    categoriesResponse: CategoriesResponse,
    isLoading: boolean,
): JSX.Element {

    return(
        <div className="w-100">
            {isLoading ? (
                <Skeleton count={10} />
            ) : (
                <Table striped bordered hover className="rounded shadow-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categoriesResponse?.data?.categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default function Page() {
    const [categoriesResponse, setCategoriesResponse] = useState<CategoriesResponse>();
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const renderedTable = useMemo(() => {
        return renderTable(
            categoriesResponse as CategoriesResponse,
            isLoading,
        );
    }, [categoriesResponse, isLoading]);

    useEffect(() => {
        async function loadCategories(): Promise<void> {
            setIsLoading(true);
            const data = await fetchCategories();
            setIsLoading(false);
            setCategoriesResponse(data);
            const err: boolean = categoriesResponse?.success === false;
            setHasError(err);
            setErrorMessage(err ? ((categoriesResponse?.message || categoriesResponse?.message) ?? "") : "");
        }

        loadCategories();
    }, [categoriesResponse?.message, categoriesResponse?.success]);

    useEffect(() => {
        const err: boolean = categoriesResponse?.success === false;
        setHasError(err);
        setErrorMessage(err ? ((categoriesResponse?.message || categoriesResponse?.message) ?? "") : "");
    }, [categoriesResponse]);

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
                    <h2 className="text-center">Categorias</h2>
                    <Card className="mb-3">
                        <CardHeader>
                            A seguir estão todas as categorias cadastradas para produtos.
                        </CardHeader>
                    </Card>
                </Col>

                <Col md={12}>{renderedTable}</Col>
            </Row>
        </Container>
    );
}
