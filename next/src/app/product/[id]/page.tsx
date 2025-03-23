"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProduct, Product, ProductResponse } from "../../../models/product";
import { FaExclamationTriangle } from 'react-icons/fa';
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {
    Container,
    Alert,
    Col,
    Row,
    Card,
    CardBody,
    CardHeader,
    Button,
    Image,
    Badge
} from "react-bootstrap";
import { toBrl } from "../../../utils/formatter";

export default function ProductPage() {
    const router = useRouter();
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            async function loadProduct(): Promise<void> {
                setIsLoading(true);
                const data: ProductResponse = await fetchProduct(Number(id));
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setHasError(true);
                    setErrorMessage(data.message);
                }
                setIsLoading(false);
            }

            loadProduct();
        }
    }, [id]);

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
                <Col md={8}>
                    <h2 className="text-center mb-4">Detalhes do Produto</h2>
                    {isLoading ? (
                        <Skeleton count={10} />
                    ) : (
                        product && (
                            <Card className="mb-3 shadow-sm">
                                <CardHeader className="bg-primary text-white h5">
                                    {product.name} <Badge bg="secondary">{product.category_name}</Badge>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col md={5} className="text-center">
                                            <Image
                                                src={product.image_url}
                                                alt="Imagem do produto"
                                                style={{ width: "300px", height: "300px", objectFit: "cover" }}
                                                rounded
                                            />
                                        </Col>
                                        <Col md={1} className="d-flex justify-content-center p-0">
                                            <div style={{ borderLeft: "1px solid #ddd", height: "100%" }}></div>
                                        </Col>
                                        <Col md={6}>
                                            <p><strong>ID:</strong> {product.id}</p>
                                            <p><strong>Nome:</strong> {product.name}</p>
                                            <p><strong>Descrição:</strong> {product.description}</p>
                                            <p><strong>Preço:</strong> {toBrl(product.price)}</p>
                                            <Button variant="primary" onClick={() => router.back()}>Voltar</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        )
                    )}
                </Col>
            </Row>
        </Container>
    );
}
