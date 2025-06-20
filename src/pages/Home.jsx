import React from 'react';
import BannerSlider from '../components/BannerSlider';
import MiniAbout from '../components/MiniAbout';

const Home = () => {
    return (
        <div>
            <section>
                <BannerSlider></BannerSlider>
            </section>
            <section className='w-11/12 mx-auto'>
                <MiniAbout></MiniAbout>
            </section>
        </div>
    );
};

export default Home;