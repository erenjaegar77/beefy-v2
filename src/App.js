import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/header";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import './App.css'

const Home = React.lazy(() => import(`./features/home`));
const Vault = React.lazy(() => import(`./features/vault`));
const Stats = React.lazy(() => import(`./features/stats`));

const PageNotFound = () => {
    return <div>Page not found.</div>;
}

export default function App() {
    const [isNightMode, setNightMode] = React.useState(false);
    const theme = createMuiTheme({
        palette: {
            type: (isNightMode ? "dark" : "light"),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header isNightMode={isNightMode} setNightMode={() => setNightMode(!isNightMode)} />
                <React.Suspense fallback={<div className="loader"/>}>
                    <Switch>
                        <Route exact path="/" key={Date.now()}>
                            <Home />
                        </Route>
                        <Route strict sensitive exact path="/stats">
                            <Stats />
                        </Route>
                        <Route strict sensitive exact path="/vault/:network/:id">
                            <Vault />
                        </Route>
                        <Route>
                            <PageNotFound />
                        </Route>
                    </Switch>
                </React.Suspense>
            </Router>
        </ThemeProvider>
    );
}