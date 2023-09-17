import axios from "axios";

const fetchNoti = async (
  limit,
  type,
  currentUser,
  methodData,
  methodLoading
) => {
  const queryNoti = {
    limitNoti: limit,
    typeNoti: type,
  };

  try {
    let res = await axios.get(
      `http://localhost:8800/api/notification?limit=${queryNoti.limitNoti}&typeNoti=${queryNoti.typeNoti}&curUser=${currentUser}`
    );

    methodData(res.data);
    methodLoading(false);
  } catch (err) {
    console.log(err);
  }
};

export default fetchNoti;
