import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import MoviesModel from "./pages/MovieModel";
import MovieDetail from "./pages/MovieDetail";
import SearchBar from "./components/SearchBar";
import WatchMovie from "./pages/WatchMovie";
import { useEffect } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WatchList from "./pages/WatchList";

function RedirectToHome() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === "/login";

  return (
    <>
      {!isLoginPage && <NavBar />}
      {!isLoginPage && <SearchBar />}
      <div
        className={`bg-[#000] overflow-hidden min-h-[80vh] ${
          isLoginPage ? "" : "py-20"
        }`}
      >
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trang-chu" element={<Home />} />
          <Route
            path="/phim-bo"
            element={<MoviesModel title={"Phim bộ"} slug={"phim-bo"} />}
          />
          <Route
            path="/phim-le"
            element={<MoviesModel title={"Phim lẻ"} slug={"phim-le"} />}
          />
          <Route
            path="/tv-shows"
            element={<MoviesModel title={"Tv show"} slug={"tv-shows"} />}
          />
          <Route
            path="/hoat-hinh"
            element={<MoviesModel title={"Anime"} slug={"hoat-hinh"} />}
          />
          <Route
            path="/the-loai/:id"
            element={<MoviesModel title={"Thể loại"} />}
          />
          <Route
            path="/quoc-gia/:id"
            element={<MoviesModel title={"Quốc gia"} />}
          />
          <Route
            path="/tim-kiem"
            element={<MoviesModel title={"Tìm kiếm"} />}
          />
          <Route
            path="/loc-phim"
            element={<MoviesModel title={"Lọc phim"} />}
          />
          <Route path="/chi-tiet/:id" element={<MovieDetail />} />
          <Route path="/xem-phim/:id" element={<WatchMovie />} />
          <Route path="/phim-yeu-thich" element={<WatchList />} />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </div>
      {!isLoginPage && (
        <div className="bg-[#181818]">
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
