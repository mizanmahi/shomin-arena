import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Banner from './Banner/Banner';
import BottomFooter from './BottomFooter/BottomFooter';
import Newsletter from './Newsletter/Newsletter';
import Products from './Products/Products';
import Reviews from './Reviews/Reviews';
import TopBar from './TopBar/TopBar';

const Home = () => {
   return (
      <div>
         <TopBar />
         <Header />
         <Banner />
         <Products />
         <Reviews />
         <Newsletter />
         <Footer />
         <BottomFooter />
      </div>
   );
};

export default Home;
