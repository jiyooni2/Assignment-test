const API_END_POINT =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev/languages?keyword=";

export const request = async (keyword) => {
  try {
    if (!keyword) {
      return [];
    }
    const res = await fetch(`${API_END_POINT}${keyword}`);
    return await res.json();
  } catch (error) {
    alert("retry");
  }
};
