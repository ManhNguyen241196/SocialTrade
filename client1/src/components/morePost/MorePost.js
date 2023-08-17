import axios from "axios";
import "./morePost.css";
import { Menu, Modal, message } from "antd";
import { useEffect, useState } from "react";
import ModalEdit from "./modalEdit/ModalEdit";
import { useQueryClient } from "@tanstack/react-query";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Edit", "edit"),
  {
    type: "divider",
  },
  getItem("Delete", "delete"),
];

const MorePost = ({ setShowMore, post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  //refetch page
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  }, [isModalOpen]);

  //edit post
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const editHandle = () => {
    setIsModalOpen(true);
    console.log("click edit");
  };

  // delete post
  async function deleteHandle() {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài viết này chứ?"
    );
    if (confirmDelete) {
      try {
        const result = await axios.delete(
          "http://localhost:8800/api/post?postId=" + post._id
        );
        message.success("Xóa bài viết thành công", 1);
      } catch (error) {
        console.log(error);
      }
    }
  }

  //click 3 dots
  const onClick = (e) => {
    if (e.key === "edit") {
      editHandle();
    }
    if (e.key === "delete") {
      deleteHandle();
      setShowMore(false);
    }
  };

  return (
    <>
      <div className="morePost">
        <Menu
          onClick={onClick}
          style={{
            width: 100,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
        />
      </div>

      <Modal
        title="Edit Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalEdit post={post} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </>
  );
};

export default MorePost;
