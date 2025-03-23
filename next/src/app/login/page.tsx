"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    FormGroup,
    Card,
    CardBody,
    FormLabel,
    FormControl,
    Alert,
    InputGroup
} from "react-bootstrap";
import { login, LoginResponse } from "../../auth/user";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaExclamationTriangle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try {
            const result = await login(email, password);
            setLoginResponse(result);
        } catch {
            setErrorMessage("Erro inesperado. Tente novamente.");
        }
    }, [email, password]);

    useEffect(() => {
        if (!loginResponse) return;

        setIsLoading(false);

        if (loginResponse.success) {
            router.push("/products");
            router.refresh();

        } else {
            setErrorMessage(loginResponse.message ?? "Erro ao fazer login");
        }
    }, [loginResponse, router]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card bg="light">
                        <CardBody>
                            <h2 className="text-center">Login</h2>

                            {errorMessage && !isLoading && (
                                <Alert variant="danger">
                                    <FaExclamationTriangle className="me-2" />
                                    {errorMessage}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
                                ) : (
                                    <FormGroup controlId="formBasicEmail" className="mt-3">
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                                            <FormControl
                                                type="email"
                                                placeholder="Digite seu email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                autoComplete="email"
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                )}
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3"/>
                                ) : (
                                <FormGroup controlId="formBasicPassword" className="mt-3">
                                    <FormLabel>Senha</FormLabel>
                                            <InputGroup>
                                            <InputGroup.Text><FaLock /></InputGroup.Text>
                                            <FormControl
                                                type="password"
                                                placeholder="Digite sua senha"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                autoComplete="current-password"
                                                />
                                                </InputGroup>
                                </FormGroup>
                                        )}
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
                                ) : (
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Entrar
                                </Button>
                                )}
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
