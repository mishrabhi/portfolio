let form = document.querySelector("#contactForm");
let respPara = document.querySelector("#resp");

function submitForm(e) {
  e.preventDefault();
  let data = {
    name: document.querySelector("#name").value,
    email: document.querySelector("#ExampleInputEmail").value,
    description: document.querySelector("#description").value,
  };
  fetch("http://localhost:3100/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-apikey": "f02032c1-3099-45df-b7b9-f18d86c633f8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      respPara.innerText = "Contact Submitted Successfully";
      respPara.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      respPara.innerText = "Something went wrong";
      respPara.style.color = "red";
      form.reset();
    });
}
form.addEventListener("submit", submitForm);
