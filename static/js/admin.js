const btn = document.querySelector("#contactList");

btn.addEventListener("click", (e) => {
  console.log(e);
  if (e.target != "button") return;
  alert("I am clicked");
});
