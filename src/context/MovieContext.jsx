import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, getWatchlist } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const urlImage = "https://img.ophim.live/uploads/movies/";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState([]);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user && pathname === "/login") {
        navigate("/");
      }
    });
  }, [pathname]);

  const fetchCountry = async () => {
    const response = await axios.get(
      "https://ophim1.com/v1/api/quoc-gia/?page=1"
    );
    setCountry(response.data.data.items);
  };

  const fetchCategories = async () => {
    const response = await axios.get(
      "https://ophim1.com/v1/api/the-loai/?page=1"
    );
    setCategories(response.data.data.items);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const watchListData = await getWatchlist();
          setWatchList(watchListData);
        } catch (error) {
          console.error("Lỗi khi tải danh sách theo dõi:", error);
        }
      }
      setLoading(false);
    });

    fetchCountry();
    fetchCategories();

    return () => unsubscribe();
  }, []);

  const value = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    urlImage,
    user,
    setUser,
    loading,
    setLoading,
    watchList,
    setWatchList,
    categories,
    setCategories,
    country,
    setCountry,
  };

  return (
    <MovieContext.Provider value={value}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
