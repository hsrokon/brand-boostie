import React from 'react';
import BannerSlider from '../components/Home/BannerSlider';
import MiniAbout from '../components/Home/MiniAbout';
import MiniServices from '../components/Home/MIniServices';

const Home = () => {
    return (
        <div>
            <section>
                <BannerSlider></BannerSlider>
            </section>
            <section className='w-11/12 mx-auto'>
                <MiniAbout></MiniAbout>
            </section>
            <section className='w-11/12 mx-auto'>
                <MiniServices></MiniServices>
            </section>
        </div>
    );
};

export default Home;