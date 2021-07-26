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

    let image = createElement("img", "card-img-top");

    let h4 = createElement("h4", "card-title");
    h4.innerHTML = element.name.toUpperCase();

    let weight = createElement("p", "card-text");
    let abilities = createElement("p", "card-text");
    abilities.innerHTML = "ABILITIES";
    let moves = createElement("p", "card-text");
    moves.setAttribute("class", "");
    moves.innerHTML = "MOVES";

    pokemonData(element.url);

    async function pokemonData(url) {
      try {
        let resp = await fetch(url);
        let data = await resp.json();

        image.setAttribute("src", `${data.sprites.front_default}`);

        weight.innerHTML = `WEIGHT:${data.weight}`;
        data.abilities.forEach((ele) => {
          let allAbility = document.createElement("li");
          allAbility.innerHTML = ele.ability.name;
          abilities.append(allAbility);
        });

        data.moves.forEach((ele) => {
          let allMoves = document.createElement("li");
          allMoves.innerHTML = ele.move.name;
          moves.append(allMoves);
        });
      } catch (err) {
        console.log(err);
      }
    }

    function createElement(ele, cname) {
      let element = document.createElement(ele);
      element.setAttribute("class", cname);
      return element;
    }
    cardBody.append(image, h4, weight, abilities, moves);
    card.append(cardBody);
    col.append(card);
    row.append(col);
  });

  container.append(row);
  document.body.append(container);
}

displayPokemons();
