"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../auth/user";
import { Alert, Container, Row, Col, Card, CardBody } from "react-bootstrap";
import { BaseResponse } from '../../utils/api';


export default function LogoutPage() {
    const router = useRouter();
    const [feedback, setFeedback] = useState<string>("Realizando logout, aguarde.");

    useEffect(() => {
        const performLogout = async () => {
            const response: BaseResponse = await logout();
            if (response.success) {
                router.push("/");
                router.refresh();
            } else {
                setFeedback(response.message);
            }
        };

        performLogout();
    }, [router]);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card bg="light">
                        <CardBody>
                            <h2 className="text-center">Logout</h2>
                            <Alert variant={feedback === "Realizando logout, aguarde." ? "info" : "danger"}>
                                {feedback}
                            </Alert>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
