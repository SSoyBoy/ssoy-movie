// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaG92ojnDfjJYxoOs5l4I_tbJozIEDRqI",
  authDomain: "ssoy-movie.firebaseapp.com",
  projectId: "ssoy-movie",
  storageBucket: "ssoy-movie.appspot.com",
  messagingSenderId: "964471019712",
  appId: "1:964471019712:web:d3c4ecf5c1fa2392407525",
  measurementId: "G-X6DX6LNJQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast.success("Đăng ký thành công!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Đăng nhập thành công!");
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

const addToWatchlist = async (
  movieId,
  title,
  thumb_url,
  year,
  content,
  slug
) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Bạn cần đăng nhập để có thể theo dõi!");
      return;
    }

    const watchlistRef = collection(db, "watchlist");
    await addDoc(watchlistRef, {
      userId: user.uid,
      movieId,
      title,
      thumb_url,
      year,
      content,
      slug,
    });
    toast.success("Đã theo dõi!");
  } catch (error) {
    console.error("Lỗi khi thêm vào danh sách theo dõi: ", error);
    toast.error("Không thêm được vào danh sách theo dõi!");
  }
};

const getWatchlist = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      toast.error("Bạn cần phải đăng nhập để xem danh sách theo dõi của bạn!");
      return [];
    }
    const q = query(
      collection(db, "watchlist"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(q);
    const watchlist = querySnapshot.docs.map((doc) => doc.data());
    return watchlist;
  } catch (error) {
    console.error("Lỗi khi tải danh sách theo dõi: ", error);
    toast.error("Không thể tải danh sách theo dõi!");
    return [];
  }
};

const deleteFromWatchList = async (movieId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      toast.error("Bạn cần phải đăng nhập để xóa khỏi danh sách theo dõi!");
      return;
    }

    const watchlistRef = collection(db, "watchlist");
    const q = query(
      watchlistRef,
      where("userId", "==", user.uid),
      where("movieId", "==", movieId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("Không tìm thấy phim trong danh sách theo dõi của bạn");
      return;
    }
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "watchlist", docSnapshot.id));
      toast.success("Đã xóa khỏi danh sách theo dõi!");
    });
  } catch (error) {
    console.error("Lỗi khi xóa khỏi danh sách theo dõi: ", error);
    toast.error("Không thể xóa khỏi danh sách theo dõi");
  }
};

export {
  auth,
  provider,
  signup,
  login,
  logout,
  db,
  addToWatchlist,
  getWatchlist,
  deleteFromWatchList,
};
