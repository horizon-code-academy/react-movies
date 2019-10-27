import React from "react";
import { Button } from "reactstrap";
import MovieCard from "../MovieCard";
import AddMovieModal from "../modals/AddMovieModal";
import MyPagination from "../MyPagination";

class MoviesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      moviesNb: 0,
      pagesNb: 0,
      pageLength: 4,
      currentPage: 1
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `http://localhost:5000/films/${this.state.currentPage}`
    );
    const content = await response.json();
    this.setState({
      movies: content.docs,
      moviesNb: content.total,
      pagesNb: content.pages
    });
  }

  next = () => {
    if (this.state.currentPage < this.state.pagesNb)
      this.setState({ currentPage: this.state.currentPage + 1 }, () =>
        this.refresh()
      );
  };

  prev = () => {
    if (this.state.currentPage > 1)
      this.setState({ currentPage: this.state.currentPage - 1 }, () =>
        this.refresh()
      );
  };

  goTo = page => {
    this.setState({ currentPage: page }, () => this.refresh());
  };

  refresh = async () => {
    const response = await fetch(
      `http://localhost:5000/films/${this.state.currentPage}`
    );
    const content = await response.json();
    this.setState({
      movies: content.docs,
      moviesNb: content.total,
      pagesNb: content.pages
    });
  };

  toggleAdd = () => {
    this.setState({ isAddOpen: !this.state.isAddOpen });
  };

  render() {
    return (
      <div className="container">
        <div
          className="mt-5 mb-5"
          style={{ display: "flex", placeContent: "space-between" }}
        >
          <div>
            <Button color="success" onClick={() => this.toggleAdd()}>
              <span role="img" aria-label="add">
                ➕ 
              </span>{" "}
              Add movie
            </Button>
            <AddMovieModal
              isOpen={this.state.isAddOpen}
              toggle={this.toggleAdd}
              refresh={this.refresh}
            />
          </div>
          <div>
            <MyPagination
              moviesNb={this.state.moviesNb}
              currentPage={this.state.currentPage}
              pagesNb={this.state.pagesNb}
              next={this.next}
              prev={this.prev}
              goTo={this.goTo}
            />
          </div>
        </div>
        <div className="row">
          {this.state.movies === null ? (
            <h3 className="col text-center">Loading...</h3>
          ) : this.state.movies.length === 0 ? (
            <h3 className="col text-center">No movies found...</h3>
          ) : (
            this.state.movies.map(m => (
              <MovieCard key={m._id} movie={m} refresh={this.refresh} />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default MoviesContainer;