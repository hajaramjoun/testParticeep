import React, { Component } from 'react'
import { connect } from "react-redux";
import yajadeReducer from "./reducers/moviesReducer";
import { movieActionTypes } from "./reducers/moviesReducer";
import Card from './components/Card';
import Select from "./components/Select";
import Pagination from "./components/pagination";
import { movies$ } from './Utils/movies'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      todosPerPage: 6,
      movies: [],
      categories: [],
      selectedCategories: []
    }
    this.deleteHandler = this.deleteHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPreview = this.handleClickPreview.bind(this);
  }

  componentDidMount() {
    movies$.then(data => {
      this.setState({
        movies: data,
        categories: [...new Set(data.map(entry => entry.category)).values()]
      })
    })
  }

  deleteHandler(id) {
    this.setState({
      movies: this.state.movies.filter(movie => movie.id !== id)
    })
  }
  handleClickNext(e) {
    let movies = this.state.movies.filter((movie) => {

      return this.state.selectedCategories.includes(movie.category) || (this.state.selectedCategories.length === 0)
    
    })
    console.log("next") 
      if(this.state.currentPage === Math.ceil(movies.length / this.state.todosPerPage)){
       console.log("preview")
       return
     }
   // console.log(this.state.pageNumbers)
     this.setState({
      todosPerPage: e.target.id,
       currentPage: this.state.currentPage + 1
     });
   }
handleClickPreview(e) {
      
     if(this.state.currentPage === 1){
       console.log("preveiw")
       return
     }
     console.log(this.state.currentPage -1)
     this.setState({
      todosPerPage: e.target.id,
       currentPage: this.state.currentPage -1
     });
   }

  onChangeHandler(values) {
    this.setState({
      selectedCategories: values
    })
    
     }

  render() {
    const {  currentPage, todosPerPage } = this.state;
// Logic for displaying current todos
const indexOfLastTodo = currentPage * todosPerPage;
const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
let movies = this.state.movies.filter((movie) => {

  return this.state.selectedCategories.includes(movie.category) || (this.state.selectedCategories.length === 0)

})
const currentTodos = movies.slice(indexOfFirstTodo, indexOfLastTodo);


    return (
      <div className='container'>
        <div>
          <Select onChange={this.onChangeHandler} categories={this.state.categories} ></Select>
        </div>
        <div className='row  flex-container'>
          {currentTodos.map(movie => {
            return (
              <div className='col'>
                <Card
                  onDelete={this.deleteHandler}
                  key={movie.id}
                  {...movie}
                />
              </div>
                )
              })}
              
             
        </div>
        <nav aria-label="Page navigation example">
      <ul class="pagination" id="pagination">
                   <li class="page-item"><a class="page-link"  id = "12" onClick={this.handleClickPreview}  href="#">&laquo; &laquo; &laquo; </a></li>
          <li class="page-item"><a class="page-link"  id = "8" onClick={this.handleClickPreview}  href="#">&laquo; &laquo;</a></li>
      <li class="page-item"><a class="page-link" id = "4" onClick={this.handleClickPreview}  href="#">&laquo;</a></li>
                   <li class="page-item"><a class="page-link"  id = "4" onClick={this.handleClickNext} href="#">&raquo;</a></li>
                     <li class="page-item"><a class="page-link" id = "8" onClick={this.handleClickNext} href="#">&raquo;&raquo;</a></li>
                     <li class="page-item"><a class="page-link" id = "12"  onClick={this.handleClickNext} href="#">&raquo;&raquo;&raquo;</a></li>
              
      </ul>
    </nav>
   
      </div>
        )
      }
    }
    
    export default App
