import { Link } from "react-router-dom";
import Slider from "react-slick";

const FlavourSlider = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        dots: false,
        draggable: true,
        pauseOnHover: true,
        arrows: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div class="flavour-active">
            <Slider {...settings}>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        pinata
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        Chocolate
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        BLACK FOREST
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        BUTTERSCOTCH
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        VANILLA
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        RED VELVET
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        FRUIT
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        FOUNDANT
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        KIDS
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        kit kat
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        oreo
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        mango
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        pinata
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        Chocolate
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        BLACK FOREST
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        BUTTERSCOTCH
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        VANILLA
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        RED VELVET
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        FRUIT
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        FOUNDANT
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        KIDS
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        kit kat
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        oreo
                    </Link>
                </div>
                <div class="flavour-items">
                    <Link to="/sub-category" class="main-btn primary-btn">
                        mango
                    </Link>
                </div>
            </Slider>
        </div>
    )
}
export default FlavourSlider;