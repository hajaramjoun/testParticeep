import { movies$ } from '../Utils/movies'


const stateInit = {
  
  liked: false,
  movies: [],
  categories: [],
  selectedCategories: []
  
};



export const movieActionTypes = {
  UpdateMovies: "movie/UpdateMovies",

};

export default (state = stateInit, action) => {
  

  switch (action.type) {
  
   
    //MAJ des movies  
    case movieActionTypes.UpdateMovies:
   console.log(movies$)
          
    default:
      return state;
  }
}