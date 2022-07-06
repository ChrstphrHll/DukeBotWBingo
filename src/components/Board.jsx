import "./Board.css"
import React, { Component } from 'react';
import seedrandom from "seedrandom";
import ImagesTotal from "../imgs/images";
import BlurredUpImage from "./BlurredUpImage";
import config from "../constants"

function importAll(r) {
  let images = {};
  r.keys().map((item, index) =>  images[item.replace('./', '')] = r(item) );
  return images;
}

const images = Object.values(importAll(require.context("../imgs/targets", false, /\.(png|jpe?g|svg)$/)));
const small_images = Object.values(importAll(require.context("../imgs/low_res", false, /\.(png|jpe?g|svg)$/)));


class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size : props.size,
      board : []
    }
  }

  intervalClamp(min, max, value) { // min and max included 
    return Math.floor(value * (max - min + 1) + min)
  }

  get_num_images() {
    return ImagesTotal["num_images"]
  }

  get_imgs(seed) {
    let imgs = []
    let rng = seedrandom(seed)
    for (let index = 0; index < this.props.size ** 2; index++) {      
      // Get an image that hasn't been selected yet 
      // currently inelegant :( as it could run forever
      let image_index = -1;
      while (imgs.includes(image_index) || image_index === -1) {
        let current_bit = rng()
        image_index = this.intervalClamp(0, this.get_num_images() - 1, current_bit)
      }
      imgs.push(image_index)
    }
    return imgs;
  }

  componentDidMount() {
    this.generate_board()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seed !== this.props.seed) {
      this.generate_board()
    }
  }

  generate_board(){
    this.setState({
      board: this.get_imgs(this.props.seed)
    });
  }
  
  render_square(id) {
    return <div key={id} 
            className='square' 
            onClick={ () => { this.open_img(images[this.state.board[id]]) }}>
              {this.get_img(this.state.board[id])}
           </div>
  }

  get_img(path) {
    return <BlurredUpImage small={small_images[path]} large={images[path]} />
  }

  open_img(image) {
    window.open(config["url"] + image)
  }

  render() { 
    // Iterating thru the rows
    let board = []
    for (let row_index = 0; row_index < this.props.size; row_index++) {
      let row_elements = []
      // Iterating thru the cols
      for (let col_index = 0; col_index < this.props.size; col_index++) {
        // Make the thing
        const current_element = this.render_square(this.props.size * row_index + col_index)

        // Add it to the row
        row_elements.push(current_element)
      }
      // Add the row to the board
      const row = <div className='row' key={row_index}>{row_elements}</div>
      board.push(row)
    }
    return (
      <div className="board">{board}</div>
    );
  }
}
 
export default Board;