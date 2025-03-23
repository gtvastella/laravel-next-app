"use client";

import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert , Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";

export default function Home() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('no_auth') === 'true') {
            setShowAlert(true);
        }
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    {showAlert && (
                        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
                            Essa página necessita de autenticação. <Link href="/login">Clique aqui para fazer login.</Link>.
                        </Alert>
                    )}
                </Col>
            </Row>

            <Row>
                <Col>

                    <h1>Bem-vindo</h1>
                    <p>
                        Esse é um sistema básico em React Next.js para exibir produtos, categorias,
                        utilizar autenticação e outros conceitos principais de frontend. Utilize os menus Produtos, Categorias, Login e Registrar para navegar pelo sistema. As rotas produtos e categorias são protegidas.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
