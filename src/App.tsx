import React from "react";
import { Nav } from "react-bootstrap";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Home, Post } from "./pages";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Nav activeKey="/">
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/create">Create New</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/:slug" component={Post} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
