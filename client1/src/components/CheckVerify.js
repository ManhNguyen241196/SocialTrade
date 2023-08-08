const CheckFunc = (fetchData) => {
  let token;
  if (JSON.parse(localStorage.getItem("token"))) {
    token = JSON.parse(localStorage.getItem("token"));
    return fetchData({ authtoken: token });
  } else {
    token = JSON.parse(localStorage.getItem("tokeGoogle"));
    return fetchData({ authtokenGoogle: token });
  }
};
export default CheckFunc;
