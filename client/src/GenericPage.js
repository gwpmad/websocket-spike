import React, { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

const slotData = [
  { title: 'Lion',
    src: 'https://www.ompe.org/wp-content/uploads/2016/10/proteger-lion-roi-animaux.jpg',
    offsetMiddle: null,
  },
  { title: 'Monkey',
    src: 'https://static.scientificamerican.com/sciam/cache/file/381CAC9C-0218-4E87-A9495AB3B0057912_source.png?w=590&h=800&C58484F3-9096-4905-98A3DF50A97807CF',
    offsetMiddle: null,
  },
  { title: 'Giraffe',
    src: 'https://i1.wp.com/kidzfeed.com/wp-content/uploads/2019/10/Giraffe-Facts-For-Kids.jpg?w=640&ssl=1',
    offsetMiddle: null,
  },
  { title: 'Hippopotamus',
    src: 'https://d27ucmmhxk51xv.cloudfront.net/media/english/illustration/hippopotamus.jpg?version=1.1.96',
    offsetMiddle: null,
  }
];

const linkStyle = {
  border: '5px solid mediumaquamarine',
  padding: '9px',
  font: 'bold 18px Arial',
  'background-color': '#EEEEEE',
  color: '#333333',
  'font-size': '32px',
  'text-decoration': 'none',
};

export default () => {
  const [slots, setSlots] = useState(slotData);
  const [currentSlotTitle, setCurrentSlotTitle] = useState('');

  useEffect(() => {
    document.title = 'Scroll through the animals!';
    const slotsWithOffsets = [].map.call(document.getElementsByClassName('generic-page__slot'), ({ offsetTop, offsetHeight }, idx) => {
      const slot = slotData[idx];
      return {
        ...slot,
        offsetMiddle: offsetTop + (offsetHeight / 2),
      }
    });
    setSlots(slotsWithOffsets);
  }, []);

  useEffect(() => {
    const checkWhereUserHasScrolled = debounce(() => {
      const { scrollTop, clientHeight } = document.documentElement;
      const viewportBottom = scrollTop + clientHeight;
      const slotScrolledTo = slots.find(({ offsetMiddle }) => scrollTop <= offsetMiddle && viewportBottom > offsetMiddle);
      if (slotScrolledTo) setCurrentSlotTitle(slotScrolledTo.title);
    }, 200);

    window.addEventListener('scroll', checkWhereUserHasScrolled);
    return () => window.removeEventListener('scroll', checkWhereUserHasScrolled);
  }, [slots]);

  useEffect(() => {
    if (currentSlotTitle) fetch(`/user-scrolls/${currentSlotTitle}`, { method: 'POST' });
  }, [currentSlotTitle]);

  const toSlot = ({ title, src }) => 
    <div className="generic-page__slot">
      <h1>{title}</h1>
      <img src={src} />
    </div>;

  return <div className="generic-page__container">
    <a href="/scroll-listener" target="_blank" className="generic-page__tracking-link">Track scrolling</a>
    {slots.map(toSlot)}
  </div>
}