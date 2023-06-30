import React, { Component } from "react";
import Slider from "react-slick";
// import ReactImageZoom from 'react-image-zoom';
import ImageZoom from "../imageZoom";
import Image from "next/image";
import arrowUp from "../../public/assets/img/arrow_up.png";
import arrowDown from "../../public/assets/img/arrow_down.png";

const prop = {
  width: 400,
  height: 450,
  zoomWidth: 600,
  zoomPosition: "original",
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image src={arrowDown} alt={"down arrow"} height={50} width={50} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image src={arrowUp} alt={"up arrow"} height={50} width={50} />
    </div>
  );
}
export default class AsNavFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null,
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  render() {
    const settings = {
      infinite: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };
    return (
      <div className="product-details-image" style={{ width: "100%" }}>
        <div className="product-image">
          {/* <i className="fa fa-angle-up"></i> */}
          <div className="product-image-active-1">
            <Slider
              asNavFor={this.state.nav2}
              ref={(slider) => (this.slider1 = slider)}
              dots={false}
              arrows={false}
              infinite={true}
            >
              {this.props.images.map((data) => {
                return (
                  <div key={data.name} className="single-image">
                    {/* <ReactImageZoom img={data.name} {...prop} /> */}
                    <ImageZoom src={data.name} />
                    {/* <img src={data.name} alt="" /> */}
                  </div>
                );
              })}
              {/* {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-image">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-image">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-image">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-image">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
 */}
            </Slider>
          </div>
        </div>
        <div className="product-thumb-image">
          <div className="product-thumb-image-active-1">
            <Slider
              asNavFor={this.state.nav1}
              ref={(slider) => (this.slider2 = slider)}
              slidesToShow={this.props.images.length >= 4 ? 3 : 1}
              swipeToSlide={true}
              focusOnSelect={true}
              vertical={true}
              arrows={true}
              draggable={true}
              dots={false}
              adaptiveHeight={false}
              {...settings}
            >
              {this.props.images.map((data) => {
                return (
                  <div className="single-thumb">
                    <img src={data.name} alt={data.name} title={data.name} />
                  </div>
                );
              })}
              {/* {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-thumb">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-thumb">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }

                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-thumb">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            }
                            {
                                this.props.images.map(data => {
                                    return (
                                        <div className="single-thumb">
                                            <img src={data.name} alt="" />
                                        </div>
                                    )
                                })
                            } */}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}
