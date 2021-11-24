const url = "/api/v1/products";
let imageValue;

const formElement = document.querySelector(".file-form");
const nameElement = document.querySelector("#name");
const priceElement = document.querySelector("#price");
const imageElement = document.querySelector("#image");
const containerDOM = document.querySelector(".container");

imageElement.addEventListener("change", async (e) => {
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const {
      data: {
        image: { src },
      },
    } = await axios.post(`${url}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    imageValue = src;
  } catch (err) {
    imageValue = null;
    console.log(err);
  }
});

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nameValue = e.target.name.value;
  const priceValue = e.target.price.value;
  try {
    await axios.post(`${url}`, {
      name: nameValue,
      price: priceValue,
      image: imageValue,
    });
  } catch (error) {
    console.log(error);
  }
});

async function fetchProducts() {
  try {
    const {
      data: { products },
    } = await axios.get(url);

    const productsDOM = products
      .map((product) => {
        return `<article class="product">
<img src="${product.image}" alt="${product.name}" class="img"/>
<footer>
<p>${product.name}</p>
<span>$${product.price}</span>
</footer>
</article>`;
      })
      .join("");
    containerDOM.innerHTML = productsDOM;
  } catch (error) {
    console.log(error);
  }
}

fetchProducts();
