import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import jwt_decode from "jwt-decode";

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
  //login with google button
  function handleCredentialResponse(response) {
    console.log("token  ", response.credential);
    const decodeJwt = jwt_decode(response.credential);
    console.log("userinfor ", decodeJwt.sub);
    addUser(decodeJwt.sub);
    localStorage.setItem("tokeGoogle", JSON.stringify(response.credential));
    addToken(null);
  }
  useEffect(() => {
    const btnGG = document.querySelector(".google-btn");
    window.google.accounts.id.initialize({
      client_id:
        "802068907259-r3qgq0evk47f7n4bmpdqihqg0hubk83d.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });

    const createBtnGg = () => {
      if (btnGG && btnGG.children.length === 0) {
        const googleLoginWrapper = document.createElement("div");
        btnGG.appendChild(googleLoginWrapper);
        window.google.accounts.id.renderButton(googleLoginWrapper, {
          width: "200",
          theme: "filled_blue",
        });
      }
    };
    if (show) {
      createBtnGg();
    }
  }, []);

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
              required
              pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}"
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label htmlFor="password">PASSWORD</label>
            <input
              minLength={6}
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

            <div class="google-btn">
              {/* onClick={handleOpenGoogle}> */}
              {/* <div class="google-icon-wrapper">
                <img
                  class="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p class="btn-text">
                <b>Sign in with google</b>
              </p> */}
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
