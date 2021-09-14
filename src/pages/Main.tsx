import { FC } from 'react';
import MainLayout from '../components/layouts/MainLayout';

import ImgHero from '../assets/images/hero-img.png';

import './main.scss';

const Main: FC = () => {
	return (
		<MainLayout withContainer={false}>
			<section id="hero" className="hero d-flex align-items-center">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 d-flex flex-column justify-content-center">
							<h1 data-aos="fade-up">
								We offer modern solutions for growing your business
							</h1>
							<h2 data-aos="fade-up" data-aos-delay="400">
								We are team of talented designers making websites with Bootstrap
							</h2>
							<div data-aos="fade-up" data-aos-delay="600">
								<div className="text-center text-lg-start">
									<a
										href="#about"
										className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center"
									>
										<span>Get Started</span>
										<i className="bi bi-arrow-right"></i>
									</a>
								</div>
							</div>
						</div>
						<div
							className="col-lg-6 hero-img"
							data-aos="zoom-out"
							data-aos-delay="200"
						>
							<img src={ImgHero} className="img-fluid" alt="" />
						</div>
					</div>
				</div>
			</section>
			<div className="row">
				<iframe
					title="React Maps"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7974.277441188734!2d-79.95773442582485!3d-2.100005072220005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902d0d24d6346495%3A0x7daf7285c40eb9b5!2sPara%C3%ADso%20de%20La%20Flor%2C%20Guayaquil!5e0!3m2!1ses!2sec!4v1631539367648!5m2!1ses!2sec"
					width="100%"
					height="600"
					style={{ border: 0 }}
					loading="lazy"
				></iframe>
			</div>
		</MainLayout>
	);
};

export default Main;
