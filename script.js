async function displayPokemons() {
  try {
    let resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
    let data = await resp.json();
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

    let h4 = createElement("h4", "card-title");
    h4.innerHTML = element.name.toUpperCase();

    let p1 = createElement("h4", "card-text");
    let p2 = createElement("h4", "card-text");
    let p3 = createElement("h4", "card-text");

    pokemonData(element.url);

    async function pokemonData(url) {
      try {
        let resp = await fetch(url);
        let data = await resp.json();
        p1.innerHTML = data.weight;
        p2.innerHTML = data.abilities[0].ability.name;
      } catch (err) {
        console.log(err);
      }
    }

    function createElement(ele, cname) {
      let element = document.createElement(ele);
      element.setAttribute("class", cname);
      return element;
    }
    cardBody.append(h4, p1, p2, p3);
    card.append(cardBody);
    col.append(card);
    row.append(col);
  });

  container.append(row);
  document.body.append(container);
}

displayPokemons();
