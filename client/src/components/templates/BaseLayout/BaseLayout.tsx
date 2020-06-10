import React, { FC, ReactNode } from "react";
import { Container } from "react-bootstrap";
import { Header } from "../../molecules/Header";

const BaseLayout: FC = ({ children }) => (
    <Container fluid>
        <Header />
        <main>{children}</main>
    </Container>
);

export default BaseLayout;
