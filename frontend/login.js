const form = document.getElementById("login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken); //창을 닫고 나서도 token유지
  //window.sessionStorage.setItem("token", accessToken); 창을 닫으면 token 날아감
  alert("로그인 되었습니다.");

  window.location.pathname = "/";
};

form.addEventListener("submit", handleSubmit);
