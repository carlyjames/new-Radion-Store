import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../../Styles/styles.css";
import SvgWineBottle1 from "../lotties/Svg";


import Typography from "@mui/material";
import { Button } from "@mui/material";
import { CarouselItem } from "react-bootstrap";

// import { ArrowForwardIos } from "@mui/icons-material";

import { ArrowForwardRounded } from "@mui/icons-material";

const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };



  return (
    <div className="banner">
      <div>
        <Carousel
          pause="hover|false"
          controls={false}
          interval={8000}
          fade={false}
          className=""
        >
          <Carousel.Item>
            <div className="slide-container first-slide-container">
              <Carousel.Caption className="slide-holder first-slide-holder">
                <div className="slide-caption first-slide-caption">
                  {/* <h1>the best flavours </h1> */}

                  {/* <p className="slider-caption text-green-500">
                  Wine has not fat and no cholesterol, so you can indulge in a glass or two guilt-free!
                  </p> */}
                  {/* <div className="d-flex">

                    <Button variant="outlined" className="slider-btn ">
                      Learn More
                      <ArrowForwardRounded className="mx-2 carousel-btn-arrow" />
                      <div className="btn-overlay"></div>
                    </Button>

                    <Button variant="outlined" className="slider-btn mx-2">
                      Start Shopping
                      <ArrowForwardRounded className="mx-2 carousel-btn-arrow" />
                      <div className="btn-overlay"></div>
                    </Button>

                  </div> */}
                </div>
                {/* <div className="wine-bottle"></div> */}

              </Carousel.Caption>
            </div>
          </Carousel.Item>







        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
