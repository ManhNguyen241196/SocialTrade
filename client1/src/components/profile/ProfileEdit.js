import axios from "axios";
import "./profileEdit.css";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Select } from "antd";

const ProfileEdit = ({ userId, stateSubmit, handleOk, oldData }) => {
  const { currentUser } = useContext(UserContext);

  const [sex, setSex] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [imgAvata, setImgAvata] = useState("");
  const [imgWall, setImgWall] = useState("");

  const [urlAvata, setUrlAvata] = useState("");
  const [urlWall, setUrlWall] = useState("");

  const [dataUpdate, setDataUpdate] = useState({
    imageAvata:
      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg",
    imageWall:
      "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-avatar-vector-isolated-on-white-background-png-image_1694546.jpg",
    sex: "None",
    website: "",
    address: "",
    bio: "",
  });

  //show old data
  useEffect(() => {
    if (oldData) {
      setAddress(oldData.address);
      setWebsite(oldData.website);
      setSex(oldData.sex);
      setUrlAvata(oldData.imageAvata);
      setUrlWall(oldData.imageWall);
    }
  }, [oldData]);

  //update form khi nhap data moi
  useEffect(() => {
    setDataUpdate({
      imageAvata: urlAvata,
      imageWall: urlWall,
      sex: sex,
      website: website,
      address: address,
      bio: "",
      currentUser: currentUser,
    });
  }, [urlAvata, urlWall, sex, website, address]);

  // chuyen img thanh dinh dang Base64
  useEffect(() => {
    if (imgAvata) {
      let readerAvata = new FileReader();
      readerAvata.readAsDataURL(imgAvata);

      readerAvata.onloadend = function () {
        setUrlAvata(readerAvata.result);
      };
    }
  }, [imgAvata]);

  useEffect(() => {
    if (imgWall) {
      let readerWall = new FileReader();
      readerWall.readAsDataURL(imgWall);

      readerWall.onloadend = function () {
        setUrlWall(readerWall.result);
      };
    }
  }, [imgWall]);

  //getdata from input
  const handleChange = (value) => {
    setSex(value);
  };
  const handleChangeInputAdd = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeInputWebsite = (e) => {
    setWebsite(e.target.value);
  };

  useEffect(() => {
    if (stateSubmit) {
      handleOk(dataUpdate);
    }
  }, [stateSubmit]);

  return (
    <>
      <form className="FormEdit">
        <div className="row">
          <label>Sex:</label>
          <Select
            defaultValue="None"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "Girl",
                label: "Girl",
              },
              {
                value: "Boy",
                label: "Boy",
              },
            ]}
          />
        </div>
        <div className="row">
          <label>Address:</label>
          <input onChange={handleChangeInputAdd} value={address}></input>
        </div>
        <div className="row">
          <label>Website:</label>
          <input onChange={handleChangeInputWebsite} value={website} />
        </div>
        <div className="row row_img">
          <div className="labelRow">
            <label id="lableAvata" htmlFor="avataFile">
              Avata:
            </label>
            <input
              type="file"
              id="avataFile"
              name="avataFile"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setImgAvata(e.target.files[0])}
            />
          </div>
          {imgAvata ? (
            <img
              id="avataImg"
              src={URL.createObjectURL(imgAvata)}
              alt="avata image"
              width="100"
              height="100"
            ></img>
          ) : (
            <img
              id="avataImg"
              src={urlAvata}
              alt="avata image"
              width="100"
              height="100"
            ></img>
          )}
        </div>
        <div className="row row_img">
          <div className="labelRow">
            <label htmlFor="wallFile">Wallpaper:</label>
            <input
              type="file"
              id="wallFile"
              name="wallFile"
              accept=".png,.jpeg,.jpg"
              onChange={(e) => setImgWall(e.target.files[0])}
            />
          </div>
          {imgWall ? (
            <img
              src={URL.createObjectURL(imgWall)}
              alt="wall image"
              width="100"
              height="100"
            ></img>
          ) : (
            <img src={urlWall} alt="wall image" width="100" height="100"></img>
          )}
        </div>
      </form>
    </>
  );
};

export default ProfileEdit;
