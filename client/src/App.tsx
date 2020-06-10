import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Home, Post, Create } from "./pages";
import { BaseLayout } from "./components/templates/BaseLayout";

function App() {
    return (
        <Router>
            <BaseLayout>
                <main>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/create" component={Create} />
                        <Route path="/:slug" component={Post} />
                    </Switch>
                </main>
            </BaseLayout>
        </Router>
    );
}

export default App;
