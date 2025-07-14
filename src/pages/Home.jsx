import BannerSlider from '../components/Home/BannerSlider';
import MiniAbout from '../components/Home/MiniAbout';
import MiniServices from '../components/Home/MIniServices';
import MiniPricing from '../components/Home/MIniPricing';
import Team from '../components/Team';
import Testimonials from '../components/Home/Testimonials';
import MessageSection from '../components/MessageSection';
import Stats from '../components/Stats';

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
            <section className='w-11/12 md:w-10/12 lg:w-11/12 mx-auto'>
                <MiniPricing></MiniPricing>
            </section>
            <section className='w-11/12 mx-auto'>
                <Stats></Stats>
            </section>
            <section className='w-11/12 mx-auto'>
                <Team></Team>
            </section>
            <section className='w-11/12 mx-auto'>
                <Testimonials></Testimonials>
            </section>
            <section className='w-11/12 mx-auto'>
                <MessageSection></MessageSection>
            </section>

        </div>
    );
};

export default Home;