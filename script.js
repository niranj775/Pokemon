async function displayPokemons() {
  try {
    let resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    let data = await resp.json();
    console.log(data.results[0].name);
    createStructure(data);
  } catch (err) {
    console.log(err);
  }
}

function createStructure(data) {
  let container = createElement("div", "container");

  let row = createElement("div", "row");

  function createElement(ele, cname) {
    let element = document.createElement(ele);
    element.setAttribute("class", cname);
    return element;
  }

  data.results.forEach((element) => {
    let col = createElement("div", "col-4  mb-3");

    let card = createElement("div", "card h-100");

    let cardBody = createElement("div", "card-body");

    let h2 = createElement("h2", "card-title");
    h2.innerHTML = element.name;

    let p = createElement("p", "card-text");

    function createElement(ele, cname) {
      let element = document.createElement(ele);
      element.setAttribute("class", cname);
      return element;
    }
    cardBody.append(h2, p);
    card.append(cardBody);
    col.append(card);
    row.append(col);
  });

  container.append(row);
  document.body.append(container);
}

displayPokemons();
