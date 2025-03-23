import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavbarCollapse } from "react-bootstrap";
import { NavbarBrand } from "react-bootstrap";
import { NavbarToggle } from "react-bootstrap";
import { cookies } from 'next/headers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Produtos API',
    description: 'Um frontend em Next.js para a API de produtos',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const ck = await cookies();
    const logged = ck.get("Authorization") !== undefined;

    return (
        <html lang="en">
            <body>
                <Navbar expand="lg" bg="primary" className="mb-3">
                    <Container>
                        <NavbarBrand href="/" className="text-white">Produtos API</NavbarBrand>
                        <NavbarToggle aria-controls="basic-navbar-nav" className="bg-white" />
                        <NavbarCollapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink href="/products" className="text-white">Produtos</NavLink>
                                <NavLink href="/categories" className="text-white">Categorias</NavLink>
                                {logged && <NavLink href="/logout" className="text-white">Sair</NavLink>}
                                {!logged &&  <NavLink href="/login" className="text-white">Login</NavLink>}
                                {!logged && <NavLink href="/signup" className="text-white">Registrar</NavLink>}
                            </Nav>
                        </NavbarCollapse>
                    </Container>
                </Navbar>
                { children }
                <div className="mb-5"></div>
            </body>
        </html>
    );
}


