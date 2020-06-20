import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { Home, Post, Create } from "./pages";
import { BaseLayout } from "./components/templates/BaseLayout";

function App() {
    return (
        <Router>
            <ToastProvider>
                <BaseLayout>
                    <main>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/create" component={Create} />
                            <Route exact path="/edit/:slug" component={Create} />
                            <Route exact path="/:slug" component={Post} />
                        </Switch>
                    </main>
                </BaseLayout>
            </ToastProvider>
        </Router>
    );
}

export default App;
