import React from 'react';
import './Error.scss';
import error from './../../Assets/Images/error.png';

const Error = () => {
	return (
		<>
			<div className='container'>
				<section className='error'>
					<img
						className='error__img'
						src={error}
						alt='Error'
						width={500}
						height={194}
					/>
					<h2 className='error__heading'>Page not found - 404</h2>
					<p className='error__text'>
						This page not found (deleted or never exists).Try a
						phrase in search box or back to home and start again.
					</p>
					<a className='error__link' href='/'>
						TAKE ME HOME!
					</a>
				</section>
			</div>
		</>
	);
};

export default Error;
