import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google"; //Login with google

const Login = () => {
  const { addUser, addToken, currentUser } = useContext(UserContext);
  let show = false;
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
      return;
    }
  }, [currentUser]);

  //--------------------------------------------------KIEU MOI----------------------
  const responseMessage = (response) => {
    console.log("token  ", response.credential);
    const decodeJwt = jwt_decode(response.credential);
    console.log("userinfor ", decodeJwt.sub);
    addUser(decodeJwt.sub);
    localStorage.setItem("tokeGoogle", JSON.stringify(response.credential));
    addToken(null);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  //login with password user
  const handleClick = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      let res = await axios.post(
        "http://localhost:8800/api/user/login",
        inputs
      );
      addToken(res.data.token);
      addUser(res.data.userId); //them user vao State ban đầu vì chỉ khi login thành công thì mới tạo ra dk chuỗi token.
      //kể từ đó trở về sau nếu xét token thất bại userId sẽ được thay thế bằng null và sẽ tự update hiển thị nhờ vào usecontext
      if (res.data.userId) {
        message.success("Login thanh cong", 1, () => {
          setInputs({
            email: "",
            password: "",
          });
        });
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      setErr(err);
      message.error(err.response.data);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <div className="login-content">
      {(show = true)}
      <h1 className="type_writer">Welcome to SociTrade</h1>
      <div className="form-v7-content">
        <div className="login-form-left"></div>
        <form className="form-detail" id="myform" onSubmit={handleClick}>
          <div className="form-row">
            <label htmlFor="email">E-MAIL</label>
            <input
              type="text"
              name="email"
              id="your_email"
              className="input-text"
              value={inputs.email}
              required
              pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">PASSWORD</label>
            <input
              minLength={6}
              value={inputs.password}
              type="password"
              name="password"
              id="password"
              className="input-text"
              required
              onChange={handleChange}
            />
          </div>

          <div className="login-form-row-last">
            <input
              disabled={isLoading}
              type="submit"
              name="register"
              className="login"
              value="Login"
            />
            <div className="google-btn">
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </div>
          </div>
          <p className="last-text">
            Creat an account? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
