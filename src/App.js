import React,{useEffect,useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App =() =>{
  const APP_ID="b0d0203d";
  const APP_KEY="0329f10785a4cb7f32eedbdf3af83fa7";
 
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(e.target.value, search);
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="search-form" onSubmit={getSearch}> 
        <input className="search-bar" type="text" placeholder="Lütfen aranacak kelimeyi girin" value={search} onChange={updateSearch}></input>
        <button 
        className="search-button" 
        type="submit" >ARA</button>
      </form>
      <div className="recipes"> 
      {
        recipes.map(recipe =>(
          <Recipe
          key = {recipe.recipe.label}
          title = {recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
          >
          </Recipe>
        ))
      }
      </div>
      
    </div>
  )
}

export default App;
