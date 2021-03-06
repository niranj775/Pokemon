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

  let title = createElement(
    "div",
    "font-weight-bold d-flex justify-content-center"
  );
  title.innerHTML = `<h1>POKEMON API</h1>`;

  let row = createElement("div", "row");

  function createElement(ele, cname) {
    let element = document.createElement(ele);
    element.setAttribute("class", cname);
    return element;
  }

  data.results.forEach((element) => {
    let col = createElement(
      "div",
      "col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4  mb-3"
    );

    let card = createElement("div", "card h-100");

    let cardBody = createElement("div", "card-body");

    let image = createElement("img", "card-img-top");

    let h4 = createElement(
      "h4",
      "card-title bg-dark text-light d-flex justify-content-center"
    );
    h4.innerHTML = element.name.toUpperCase();

    let weight = createElement("p", "card-text bg-light");

    let abilities = createElement("p", "card-text bg-light");
    abilities.innerHTML = "ABILITIES";

    let moves = createElement("p", "card-text bg-light");

    moves.innerHTML = "MOVES";

    pokemonData(element.url);

    async function pokemonData(url) {
      try {
        let resp = await fetch(url);
        let data = await resp.json();

        image.setAttribute("src", `${data.sprites.front_default}`);

        weight.innerHTML = `WEIGHT: ${data.weight}`;
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

  container.append(title, row);
  document.body.append(container);
}

displayPokemons();
