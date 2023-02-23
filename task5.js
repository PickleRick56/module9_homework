const button = document.querySelector("button");

button.addEventListener("click", () => {
  const val1 = document.querySelector("#number1").value;
  const val2 = document.querySelector("#number2").value;
  

  if (
    ((val1 < 1 || val1 > 10) && (val2 < 1 || val2 > 10)) ||
    (isNaN(val1) && isNaN(val2))
  ) {
    console.log("Номер страницы и лимит вне диапазона от 1 до 10");
    return;
  }

  if (val1 < 1 || val1 > 10 || isNaN(val1)) {
    console.log("Номер страницы вне диапазона от 1 до 10");
    return;
  }

  if (val2 < 1 || val2 > 10 || isNaN(val2)) {
    console.log("Лимит вне диапазона от 1 до 10");
    return;
  }

  fetch(`https://picsum.photos/v2/list?page=${val1}&limit=${val2}`)
    .then((response) => {
      console.log(response);
      return response.json();

      // document.querySelector("img").src = response.url;
    })
    .then((data) => {
      console.log(data);
      for (let a of data) {
        console.log(a.url);
        const img = document.createElement("img");
        img.src = a.url;
        document.body.appendChild(img);
      }
    })
    .catch(() => {
      console.log("error");
    });
});
