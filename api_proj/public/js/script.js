// const request = require('request');
const { findFood } = document.forms;

findFood.addEventListener("submit", async (e) => {
  e.preventDefault();
  receptions.innerHTML = "";
  const myRecipe = { title: findFood.title.value }; //is it q?
  const res = await fetch(
    `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes&q=${myRecipe.title}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": "b741c52e30mshb4314f07a291063p176c5ajsn4adea92c6605",
      },
    }
  );

  renderReceptions((await res.json()).results);
  findFood.title.value = "";
});

function renderReceptions(rceptions) {
  const insertInfo = `
  <div class="title_resep">
  !!name!!
</div>
<video controls preload="metadata" poster="!!thumbnail_url!!">
  <source type="video/mp4" src="!!original_video_url!!">  
</video>

`;
  rceptions.forEach((el) => {
    const wrapperResep = document.createElement("div");
    wrapperResep.classList.add("wrapper_resep");
    let str = insertInfo;
    for (let key in el) {
      str = str.split("!!" + key + "!!").join(el[key]);
    }
    console.log(el);
    wrapperResep.innerHTML = str;
    receptions.append(wrapperResep);
  });
}
