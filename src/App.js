import './App.css';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Home from "./Component/Home";
import Anime from "./Component/Anime";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <div className="title">
          <Link className="text" to="/Home">
            Homeㅤ
          </Link>
          <Link className="text" to="/Anime">
            Daftar Anime
          </Link>
        </div>
      </header>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Anime" exact component={Anime} />
      </Switch>
    </BrowserRouter>
  );
}