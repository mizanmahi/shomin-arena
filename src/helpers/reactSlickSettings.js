export const slickSettings = {
   dots: true,
   infinite: true,
   autoplay: true,
   autoplaySpeed: 3000,
   speed: 1000,
   pauseOnHover: true,
   slidesToShow: 3,
   slidesToScroll: 3,
   initialSlide: 0,
   arrows: false,
   responsive: [
      {
         breakpoint: 1024,
         settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
         },
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
         },
      },
   ],
};
