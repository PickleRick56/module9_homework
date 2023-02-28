document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("myCat") !== null) {
    const storedLinks = localStorage.getItem("myCat").split(" ");
    for (const link of storedLinks) {
      const img = document.createElement("img");
      img.src = link;
      img.width = 100;
      document.body.appendChild(img);
    }
  }
});

const button = document.querySelector("button");

button.addEventListener("click", () => {
  const val1 = document.querySelector("#number1").value;
  const val2 = document.querySelector("#number2").value;

  const pageValid = val1 < 11 && val1 > 0;
  const limitValid = val2 < 11 && val2 > 0;
  const isValid = pageValid && limitValid;

  if (isValid) {
    fetch(`https://picsum.photos/v2/list?page=${val1}&limit=${val2}`)
      .then((response) => response.json())
      .then((data) => {
        const allImages = document.querySelectorAll("img");
        for (const image of allImages) {
          document.body.removeChild(image);
        }

        localStorage.removeItem("myCat");
        for (const { download_url } of data) {
          const storedLinks = localStorage.getItem("myCat");
          localStorage.setItem(
            "myCat",
            storedLinks !== null
              ? `${localStorage.getItem("myCat")} ${download_url}`
              : download_url
          );
          const img = document.createElement("img");
          img.src = download_url;
          img.width = 100;
          document.body.appendChild(img);
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  } else {
    if (!pageValid) {
      console.log("Номер страницы вне диапазона от 1 до 10");
    }

    if (!pageValid) {
      console.log("Лимит вне диапазона от 1 до 10");
    }
  }
});
