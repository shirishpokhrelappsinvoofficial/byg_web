import React, { Component } from "react";

class ImageZoom extends Component {
  state = {
    backgroundImage: `url(${this.props.src})`,
    backgroundPosition: "0% 0%",
  };

  handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    this.setState({ backgroundPosition: `${x}% ${y}%` });
  };
  render() {
    return (
      <figure
        onMouseMove={this.handleMouseMove}
        style={{
          backgroundImage: `url(${encodeURI(this.props.src)})`,
          backgroundPosition: this.state.backgroundPosition,
        }}
      >
        <img src={this.props.src} alt="" />
      </figure>
    );
  }
}

export default ImageZoom;
