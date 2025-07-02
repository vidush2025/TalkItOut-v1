export const getAuthUser = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("auth");
};

export const logout = () => {
  localStorage.removeItem("auth");
  window.location.href = "/login";
};