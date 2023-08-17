import axios from "axios";
import "./modalEdit.css";
import { useContext, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";
import { UserContext } from "../../../context/UserContext";
import { useQueryClient } from "@tanstack/react-query";
const ModalEdit = ({ post, setIsModalOpen }) => {
  const { currentUser } = useContext(UserContext);

  const [imgAvata, setImgAvata] = useState(null);
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    setContent(post.content);
    setImgUrl(post.image);
  }, [post]);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  //upload Form data to mongoDb
  const fetchAddPost = async (fileImg) => {
    let dataPost = {
      user: currentUser,
      content: content,
      image: fileImg.name,
    };

    try {
      const result = await axios.put(
        "http://localhost:8800/api/post?postId=" + post._id,
        dataPost
      );
      // hien thong bo post thanh cong
      message.success(
        " Updatet hanh cong. Reload lại trang để update thay đổi",
        1,
        () => {
          setContent("");
          setImgAvata(null);
        }
      );
      setIsLoading(false);
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    } catch (error) {
      console.log(error);
      message.error("update post that bai", 1);
    }
  };
  //upload image to GCS
  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newFile;
    if (imgAvata) {
      // Create new file so we can rename the file. vì khi up lên store sẽ giữa nguyên tên file của file up lên.Lấy tên theo post cái đó
      //để sau truy vấn cho dễ
      let blob = imgAvata.slice(0, imgAvata.size, "image/jpeg");
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
        console.log("edit post thanh cong");
        fetchAddPost(newFile);
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchAddPost({ name: "" });
    }
  };
  function removeImage() {
    setImgAvata(null);
    setImgUrl("");
  }

  return (
    <>
      <div className="EditArea">
        <div className="row">
          <TextArea
            value={content}
            showCount
            style={{
              overflow: "scroll",
              height: 120,
              resize: "none",
            }}
            onChange={onChange}
            placeholder="disable resize"
          />
        </div>
        <div className="row">
          <input
            type="file"
            id="imgPostInput"
            name="imgPost"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setImgAvata(e.target.files[0])}
          />
          <div className="image_area">
            {imgAvata ? (
              <img
                id="imgPost"
                src={URL.createObjectURL(imgAvata)}
                alt="post image"
                width="250"
              ></img>
            ) : (
              <img
                id="imgPost"
                src={
                  imgUrl
                    ? `https://storage.googleapis.com/postssocialtrade/${post.image}`
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019"
                }
                alt="post image"
                width="250"
              ></img>
            )}

            <i onClick={removeImage} class="fas fa-times-circle fa-lg"></i>
          </div>
        </div>
        <button disabled={isLoading} onClick={submitHandler}>
          {isLoading ? "Loading..." : "Update"}
        </button>
      </div>
    </>
  );
};

export default ModalEdit;
