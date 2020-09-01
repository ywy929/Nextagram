import React, { useState, useEffect } from 'react';
import {
  Carousel, CarouselItem,
  CarouselControl, CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import axios from 'axios'

const ImageCarousel = ({data}) => {
  const [userPic, setUserPic] = useState([])
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/api/v1/images/${data}`)
      .then(result => {
        setUserPic(result.data)
      })
      .catch(error => {
        console.log('ERROR: ', error)
      })
    }, [data])

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === userPic.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? userPic.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = userPic.map((item) => {
    return (
      <CarouselItem style={{width:"100%"}}
        onExiting={() => setAnimating(false)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img style={{width:"100%"}} src={item.url} alt={item.altText} />
        <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous} style={{width:"50%"}}>
      <CarouselIndicators items={userPic} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default ImageCarousel;