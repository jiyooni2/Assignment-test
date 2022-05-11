const API = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  try {
    const result = await fetch(`${API}/${nodeId ? nodeId : ""}`);
    return result.json();
  } catch (error) {
    return error;
  }
};
