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
    InputGroup,
} from "react-bootstrap";
import { register, RegisterResponse } from "../../auth/user";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaExclamationTriangle, FaFont, FaCheck } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [registerResponse, setRegisterResponse] = useState<RegisterResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setFeedbackMessage("");
        try {
            const result = await register(name, email, password, confirmPassword);
            setRegisterResponse(result);
            setFeedbackMessage(result.message);
        } catch {
            setFeedbackMessage("Erro inesperado. Tente novamente.");
        }
    }, [name, email, password, confirmPassword]);

    useEffect(() => {
        if (!registerResponse) return;

        setIsLoading(false);
    }, [registerResponse]);

    const isRegistered = registerResponse?.success;

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card bg="light">
                        <CardBody>
                            <h2 className="text-center">Registrar</h2>

                            {registerResponse && !isLoading && (
                                <Alert variant={registerResponse.success ? "success" : "danger"}>
                                    {registerResponse.success ? <FaCheck className="me-2" /> : <FaExclamationTriangle className="me-2" />}
                                    {feedbackMessage}
                                    {registerResponse.success && (
                                        <Button variant="link" onClick={() => router.push("/login")} className="p-0 ms-2">Clique aqui para fazer login</Button>
                                    )}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
                                ) : (
                                    <FormGroup controlId="formName" className="mt-3">
                                        <FormLabel>Nome</FormLabel>
                                        <InputGroup>
                                            <InputGroup.Text><FaFont /></InputGroup.Text>
                                            <FormControl
                                                type="text"
                                                placeholder="Digite seu nome"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                                autoComplete="name"
                                                disabled={isRegistered}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                )}

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
                                                disabled={isRegistered}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                )}
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
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
                                                disabled={isRegistered}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                )}

                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
                                ) : (
                                    <FormGroup controlId="formBasicPasswordConfirm" className="mt-3">
                                        <FormLabel>Confirmar Senha</FormLabel>
                                        <InputGroup>
                                            <InputGroup.Text><FaLock /></InputGroup.Text>
                                            <FormControl
                                                type="password"
                                                placeholder="Digite sua senha novamente"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                autoComplete="current-password"
                                                disabled={isRegistered}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                )}
                                {isLoading ? (
                                    <Skeleton height={38} width="100%" className="mt-3" />
                                ) : (
                                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={isRegistered}>
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
