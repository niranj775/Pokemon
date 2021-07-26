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

    let weight = createElement("p", "card-text");
    let abilities = createElement("p", "card-text");
    let p3 = createElement("p", "card-text");

    pokemonData(element.url);

    async function pokemonData(url) {
      try {
        let resp = await fetch(url);
        let data = await resp.json();
        weight.innerHTML = `Weight:${data.weight}`;
        abilities.innerHTML = data.abilities[0].ability.name.toUpperCase();
        p3.innerHTML = data.moves[0].move.name.toUpperCase();
      } catch (err) {
        console.log(err);
      }
    }

    function createElement(ele, cname) {
      let element = document.createElement(ele);
      element.setAttribute("class", cname);
      return element;
    }
    cardBody.append(h4, weight, abilities, p3);
    card.append(cardBody);
    col.append(card);
    row.append(col);
  });

  container.append(row);
  document.body.append(container);
}

displayPokemons();
