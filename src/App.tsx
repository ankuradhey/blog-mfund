import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/home";

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <nav>
                        <Link to="/">
                            <h2>Blog</h2>
                        </Link>
                    </nav>
                </header>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

export default App;
