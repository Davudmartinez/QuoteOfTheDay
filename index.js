//async await + class
const baseURL = "https://api.api-ninjas.com/v1/quotes";
//class này để gửi request lên server
class Http {
  get(url) {
    return fetch(url, {
      method: "GET",
      headers: { "X-Api-Key": "OGl8kMqbLvD78DEngjiKbw==tzLo7DiAQAPXJMYs" },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    });
  }
}
//Class Store dùng để get nội dung đầy đủ bao gồm Quote, Author, Category
//Nhưng do hiện tại tôi chỉ hiển thị quote và author nên sẽ không dùng category <3
class Store {
  //tạo instance của Http
  constructor() {
    this.http = new Http();
    //lưu giá trị hiện tại
    this.currentQuote = null;
  }
  //Tạo hàm getRandomQuote
  async getRandomQuote() {
    this.currentQuote = await this.http.get(`${baseURL}`);
    return this.currentQuote;
  }
}
//Class RenderUI dùng để hiển thị nội dung lên UI(không hiển thị category (rảnh sẽ làm))
class RenderUI {
  renderRandomQuote(quoteInfor) {
    const quote = quoteInfor[0]["quote"];
    const author = quoteInfor[0]["author"];
    let htmlContent = `
        <h2 class="h2_title">Quote of the day</h2>
        <div class="block__quote">
            <blockquote class="blockquote_content" id="quote">
                ${quote}
            </blockquote>
            <span class="span_author" id="author">${author}</span>
        </div>
        `;

    //chỉ thay thế nội dung của quote và author
    document.querySelector("#quote").textContent = quote;
    document.querySelector("#author").textContent = author;
  }
  renderTweet(quoteInfor) {
    const quote = quoteInfor[0]["quote"];
    const author = quoteInfor[0]["author"];

    window.open(
      `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
      "Tweet Window",
      "width=600, height=300"
    );
    document.querySelector("#quote").textContent;
    document.querySelector("#author").textContent;
  }
}

//hàm khởi tạo câu đạo lí của mình
// const tweet = () => {
//   const quote = document.querySelector("#quote").textContent;
//   const author = document.querySelector("#author").textContent;

//   window.open(
//     `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
//     "Tweet Window",
//     "width=600, height=300"
//   );
// };
//------------------------------------------MAIN EVENT---------------------------------------------------
document.querySelector("#newQuote").addEventListener("click", async (event) => {
  //tạo instance của Store và RenderUI
  const store = new Store();
  const ui = new RenderUI();
  //Nhận data và hiển thị lên UI
  let randomQuote = await store.getRandomQuote();
  ui.renderRandomQuote(randomQuote);

  //lưu giá trị quote lại cho Link
  document.querySelector("#Link").dataset.quote = JSON.stringify(randomQuote);
});

document.querySelector("#Link").addEventListener("click", async (event) => {
  const ui = new RenderUI();
  const quoteData = document.querySelector("#Link").dataset.quote;
  if (quoteData) {
    ui.renderTweet(JSON.parse(quoteData));
  } else {
    alert("Click New Quote rồi mới coi duoc cau đạo lí được ");
  }
});
//chưa README
//chưa Deloy lên  
