import React from 'react'
import Header from '../../components/Header/Header'
import Banner from './Banner/Banner'
import Products from './Products/Products'
import Reviews from './Reviews/Reviews'

const Home = () => {
    return (
        <div>
           <Header />
           <Banner />
           <Products />
           <Reviews />
        </div>
    )
}

export default Home
