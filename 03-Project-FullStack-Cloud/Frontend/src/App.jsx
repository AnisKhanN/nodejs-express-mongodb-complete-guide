import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost.jsx";
import Feed from "./pages/Feed.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create-post" element={<CreatePost />} />

        <Route path="/feed" element={<Feed />} />

        <Route
          path="*"
          element={
            <h1 style={{ textAlign: "center", marginTop: "50px" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
