import "./share.css";

import { useContext, useRef, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import EmojiPicker from "emoji-picker-react";
import { UserContext } from "../../context/UserContext";

export default function Share() {
  const [emojiShow, setEmojiShow] = useState(false);
  const desc = useRef();
  const [file, setFile] = useState(null);
  const { currentAvata, currentUser } = useContext(UserContext);

  const fetchAddPost = async (fileImg) => {
    let dataPost = {
      user: currentUser,
      content: desc.current.value,
      image: fileImg.name,
    };
    try {
      const result = await axios.post(
        "http://localhost:8800/api/post",
        dataPost
      );

      // hien thong bo post thanh cong
      message.success("post thanh cong", 1, () => {
        desc.current.value = "";
        setFile(null);
      });
    } catch (error) {
      console.log(error);
      message.error("post that bai", 1);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let newFile;
    if (file) {
      // Create new file so we can rename the file. vì khi up lên store sẽ giữa nguyên tên file của file up lên.Lấy tên theo post cái đó
      //để sau truy vấn cho dễ
      let blob = file.slice(0, file.size, "image/jpeg");
      newFile = new File([blob], `${uuidv4()}_post.jpeg`, {
        type: "image/jpeg",
      });
      // Build the form data thứ này sẽ được gửi đi kèm về server
      console.log(newFile.name);
    }
    if (newFile) {
      let formData = new FormData();
      formData.append("imgfile", newFile);
      try {
        const result = await axios.post(
          "http://localhost:8800/api/upload",
          formData
        );
        fetchAddPost(newFile);
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchAddPost({ name: "" });
    }
  };

  //add emoji
  const emojiHandle = () => {
    setEmojiShow(!emojiShow);
  };
  const EmojiClick_handle = (event, emojiObject) => {
    desc.current.value = desc.current.value + emojiObject.target.innerText;
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentAvata
                ? currentAvata
                : "https://d2w9rnfcy7mm78.cloudfront.net/8040974/original_ff4f1f43d7b72cc31d2eb5b0827ff1ac.png?1595022778?bc=0"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind ?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />

        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <span className="shareCancelImg" onClick={() => setFile(null)}>
              <i class="fas fa-window-close"></i>
            </span>
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <i className="fas fa-images"></i>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <i className="fas fa-tags"></i>
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption" onClick={emojiHandle}>
              <i className="fas fa-smile"></i>
              <span className="shareOptionText">Feelings</span>
              {emojiShow && (
                <div className="emojiArea">
                  <EmojiPicker
                    emojiStyle="native"
                    onEmojiClick={EmojiClick_handle}
                  />
                </div>
              )}
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
