import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication";
import Navigation from "./routes/navigation/navigation.component";

const App = () => {

  const Shop = () => {
    return <h1>This is Shop page</h1>
  }

  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>

        <Route index element={<Home />} />
        <Route path="shop" element={<Shop/>} />
        <Route path="auth" element={<Authentication/>} />

      </Route>
    </Routes>
  );
};

export default App;
