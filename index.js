//async await + class
const baseURL = "https://api.api-ninjas.com/v1/quotes";


//class này để gửi request lên server
class Http {
  get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {'X-Api-Key': 'OGl8kMqbLvD78DEngjiKbw==tzLo7DiAQAPXJMYs'},
    }).then((response) => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error(response.statusText)
        }
    })
  } 
}



class Store {
  //tạo instance của Http
  constructor() {
    this.http = new Http();
  }
  //Tạo hàm getRandomQuote
  getRandomQuote() {
    return this.http.get(`${baseURL}`);
  }
};

class RenderUI {
  renderRandomQuote(quoteInfor) {
    const quote = (quoteInfor[0])["quote"];
    const author = (quoteInfor[0])["author"];
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
}

document.querySelector("#newQuote").addEventListener("click", async (event) => {
  const store = new Store();
  const ui = new RenderUI();

//   let randomQuote = await store.getRandomQuote();
//   ui.renderRandomQuote(randomQuote);
//   console.log(randomQuote);
  let randomQuote = await store.getRandomQuote();
  ui.renderRandomQuote(randomQuote);
});



