import React, { useState } from "react";
import { assets } from "../assets/assets";
import { login, signup, auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { IoLogoGoogle } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const Login = () => {
  const [signState, setSignState] = useState("Đăng Nhập");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);

  const navigate = useNavigate();

  const userAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Đăng Nhập") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  const handleSignInWithGG = async (event) => {
    event.preventDefault();
    try {
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("email", user.email);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Đăng nhập với Google thất bại!");
    }
  };

  return loading ? (
    <div className="w-full h-screen flex items-center justify-center">
      <img className="w-16" src={assets.netflix_spinner} alt="" />
    </div>
  ) : (
    <div
      className="login h-screen px-4 md:px-[6%] py-5 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(#0000007e, #0000007e), url('${assets.background_banner}')`,
      }}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo_ssoy}
        className="w-36 cursor-pointer"
        alt=""
      />
      <div className="login-form w-full max-w-[450px] bg-black bg-opacity-75 p-10 sm:p-14 m-auto rounded-lg text-white">
        <h1 className="text-3xl font-semibold mb-7">{signState}</h1>
        <form>
          {signState === "Đăng Ký" ? (
            <input
              className="w-full h-[50px] bg-[#333] text-white my-3 border-none outline-none rounded py-4 px-5 text-base font-medium"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Tên của bạn"
            />
          ) : (
            <>
              <div className="w-full flex flex-wrap justify-center items-center">
                <div
                  onClick={handleSignInWithGG}
                  className="border-2 rounded-full border-white border-solid h-10 w-10 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                >
                  <IoLogoGoogle className="text-white h-4 w-4 hover:scale-105" />
                </div>
                <div
                  onClick={handleSignInWithGG}
                  className="border-2 rounded-full border-white border-solid h-10 w-10 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                >
                  <FaTwitter className="text-white hover:scale-105" />
                </div>
                <div
                  onClick={handleSignInWithGG}
                  className="border-2 rounded-full border-white border-solid h-10 w-10 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                >
                  <FaFacebookF className="text-white hover:scale-105" />
                </div>
              </div>
              <div className="w-full flex justify-center items-center py-1">
                <p className="flex items-center w-5 h-[1px] bg-white mr-1"></p>
                <p className="text-xs">Hoặc</p>
                <p className="flex items-center w-5 h-[1px] bg-white ml-1"></p>
              </div>
            </>
          )}

          <input
            className="w-full h-[50px] bg-[#333] text-white my-3 border-none outline-none rounded py-2 sm:py-4 px-3 sm:px-5 text-base font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <div className="relative">
            <input
              className="w-full h-[50px] bg-[#333] text-white my-3 !pr-12 border-none outline-none rounded py-2 sm:py-4 px-3 sm:px-5 text-base font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={!isShowPass ? "password" : "text"}
              placeholder="Mật khẩu"
            />
            <div className="absolute top-0 bottom-0 right-3 flex items-center">
              {!isShowPass ? (
                <FaEye
                  onClick={() => setIsShowPass(true)}
                  className="text-white w-6 cursor-pointer select-none"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setIsShowPass(false)}
                  className="text-white w-6 cursor-pointer select-none"
                />
              )}
            </div>
          </div>
          <button
            className="w-full border-none outline-none p-2 sm:p-4 bg-[#e50914] text-white rounded text-base font-medium mt-5 cursor-pointer"
            onClick={userAuth}
            type="submit"
          >
            {signState}
          </button>
          <div className="flex items-center justify-between text-[#b3b3b3] text-sm py-2">
            <div className="remember clear-start flex items-center gap-1">
              <input type="checkbox" />
              <label htmlFor="">Nhớ mật khẩu</label>
            </div>
            <p>Cần hỗ trợ?</p>
          </div>
        </form>
        <div className="form-switch mt-10 text-[#737373]">
          {signState === "Đăng Nhập" ? (
            <div className="flex items-center">
              <p>Chưa có tài khoản?</p>
              <span
                className="ml-1.5 text-white font-medium cursor-pointer"
                onClick={() => {
                  setSignState("Đăng Ký");
                }}
              >
                Đăng Ký Ngay
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <p>Đã có tài khoản?</p>
              <span
                className="ml-1.5 text-white font-medium cursor-pointer"
                onClick={() => {
                  setSignState("Đăng Nhập");
                }}
              >
                Đăng Nhập Ngay
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
