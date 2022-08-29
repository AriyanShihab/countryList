/*
step one: crate a list with all the available country name;
append it in a container:
step two: short the names of the country.
step three: add a event lisheter to every element


*/

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const countryContainer = document.getElementById("conuntryListContainer");
    const forSorting = [];
    const sortingNode = Array.from(data);
    sortingNode.sort((a, b) => a.name.common.localeCompare(b.name.common));
    console.log(sortingNode);
    for (const country of sortingNode) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h2 = document.createElement("h2");
      h2.innerHTML = `${country.name.common}`;
      img.setAttribute("src", country.flags.svg);

      div.appendChild(img);
      div.appendChild(h2);
      countryContainer.appendChild(div);
    }

    // forSorting.sort();
    // for (i = 0; i < forSorting.length; i++) {
    //   // div.appendChild(h2);
    //   // countryContainer.appendChild(div);
    // }

    countryContainer.addEventListener("click", (e) => {
      const url = `http://universities.hipolabs.com/search?country=${e.target.innerText}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const versityListContainer = document.getElementById(
            "versityListContainer"
          );
          const versityListHeading = (document.getElementById(
            "versityListHeading"
          ).innerText = ` list of university in ${e.target.innerText}`);
          versityListContainer.innerHTML = "";
          for (versity of data) {
            let { web_pages, name } = versity;
            const div = document.createElement("div");
            div.classList.add("vercityList");
            div.innerHTML = `
            <h2 class="font-semibold  p-2 mt-3">${name}</h2>
        <a href="${web_pages[0]}" class="">website</a>`;
            versityListContainer.appendChild(div);
          }
        })
        .then(() => {
          const finalURL = `https://restcountries.com/v3.1/name/${e.target.innerText}?fullText=true`;
          fetch(finalURL)
            .then((res) => res.json())
            .then((countrys) => {
              const countryDetainls =
                document.getElementById("countryDetainls");
              countryDetainls.innerHTML = "";
              for (countryInfo of countrys) {
                const div = document.createElement("div");
                div.innerHTML = `
                <div class="p-2">
              <img src="${countryInfo.flags.svg}" alt="" />
              <h2>${countryInfo.name.official}</h2>
              <div class="flex justify-between flex-wrap px-2">
                <p>currency</p>
                <p>poppulation</p>
                <p>area</p>
              </div>
            </div>`;
                countryDetainls.appendChild(div);

                console.log(countrys);
              }
            });
        });
    });
  });
