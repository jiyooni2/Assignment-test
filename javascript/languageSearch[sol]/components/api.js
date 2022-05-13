const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=";

const request = async (url) => {
  try {
    const res = await fetch(url);

    if (res.ok) {
      const json = await res.json();
      return json;
    }

    throw new Error("요청에 실패함");
  } catch (error) {
    alert("요청에 실패");
  }
};

export const fetchLanguages = async (keyword) => {
  const res = await request(`${API_END_POINT}${keyword}`);
  return res;
};
