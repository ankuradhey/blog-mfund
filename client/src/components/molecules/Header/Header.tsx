import React, { FC } from "react";
import { Nav, Navbar } from "react-bootstrap";
import * as S from "./Header.styled";

const Header = () => {
    return (
        <S.Header>
            <Navbar>
                <Nav activeKey="/" className="justify-content-left">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/create">Create</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </S.Header>
    );
};

export default Header;
