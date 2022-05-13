const API_END_POINT =
  "https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products";

const request = async (url) => {
  try {
    const res = await fetch(url);

    if (res.ok) {
      return await res.json();
    }

    throw new Error("요청 실패");
  } catch (error) {
    alert("요청 실패");
  }
};

export const getProducts = async () => {
  const res = await request(API_END_POINT);
  return res;
};

export const getProduct = async (id) => {
  const res = await request(`${API_END_POINT}/${id}`);
  return res;
};
