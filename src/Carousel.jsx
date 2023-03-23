import { useEffect, useState } from 'react';
import { shortList, list, longList } from './/data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);
  const prevSlide = () => {
    return setCurrentPerson(
      (currentPerson - 1 + people.length) % people.length
    );
  };
  const nextSlide = () => {
    return setCurrentPerson((currentPerson + 1) % people.length);
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className='slider-container'>
      {people.map((person, index) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            style={{
              transform: `translateX(${100 * (index - currentPerson)}%)`,
              opacity: index === currentPerson ? 1 : 0,
              visibility: index === currentPerson ? 'visible' : 'hidden',
            }}
            className='slide'
            key={id}
          >
            <img src={image} alt={name} className='person-img' />
            <h5 className='name'>{name}</h5>
            <p className='title'>{title}</p>
            <p className='text'>{quote}</p>
            <FaQuoteRight className='icon' />
          </article>
        );
      })}
      <button className='prev' type='button' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button className='next' type='button' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
