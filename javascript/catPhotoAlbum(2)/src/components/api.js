const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }

    throw new Error("요청 실패");
  } catch (error) {
    alert("retry");
  }
};

export const getRootNodes = async () => {
  const res = await request(API_END_POINT);
  console.log(res);
  return res;
};

export const getNodes = async (nodeId) => {
  const res = await request(`${API_END_POINT}/${nodeId}`);
  return res;
};
