import { Link } from "react-router-dom";
import "./Register.css";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    comfirm_password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClick = async (event) => {
    event.preventDefault();
    if (inputs.comfirm_password !== inputs.password) {
      message.error("password confirm chưa chính xác ");
    } else {
      try {
        setIsLoading(true);
        let res = await axios.post(
          "http://localhost:8800/api/user/register",
          inputs
        );
        // Work with the response...
        if (res.data) {
          console.log(res.data);

          // da ng ki thanh cong -> auto create profile
          try {
            let responseProfile = await axios.post(
              "http://localhost:8800/api/profile",
              {
                user: res.data.id,
                name: res.data.name,
                imageAvata: "",
                imageWall: "",
                sex: "None",
                website: "",
                address: "",
                bio: "",
                followers: [],
                following: [],
              }
            );

            console.log("tao thanh cong", responseProfile.data);
          } catch (err) {
            console.log(err);
          }

          setIsLoading(false);
          message.success("DAng ki thanh cong", 1, () => {
            setInputs({
              name: "",
              email: "",
              password: "",
            });
            navigate("/login");
          });
        }
      } catch (err) {
        setErr(err);
        message.error(err.response.data);
      }
    }
  };
  return (
    <div className="page-content">
      <h1 className="type_writer">Welcome to SociTrade</h1>
      <div className="form-v7-content">
        <div className="form-left"></div>
        <form className="form-detail" id="myform" onSubmit={handleClick}>
          <div className="form-row">
            <label htmlFor="name">USERNAME</label>
            <input
              type="text"
              name="name"
              id="username"
              required
              className="input-text"
              minLength={6}
              onChange={handleChange}
            />
          </div>
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
          <div className="form-row">
            <label htmlFor="comfirm_password">CONFIRM PASSWORD</label>
            <input
              onChange={handleChange}
              minLength={6}
              type="password"
              name="comfirm_password"
              id="comfirm_password"
              className="input-text"
              required
            />
          </div>
          <div className="form-row-last">
            <input
              disabled={isLoading}
              type="submit"
              name="register"
              className="register"
              value="Register"
            />
            <p>
              Or<Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
