import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './../Modal/Modal';

let Header = () => {
	return (
		<>
			<nav className='navbar bg-body-tertiary d-flex'>
				<div className='container'>
					<ul className='nav w-100 justify-content-between align-items-center'>
						<li>
							<Link className='nav-link' to={'/'}>
								MarketShop
							</Link>
						</li>
						<li>
							<Link className='nav-link' to={'/categories'}>
								Menu
							</Link>
						</li>
						<li>
							<button
								className='btn btn-primary nav-item'
								type='button'
								data-bs-toggle='offcanvas'
								data-bs-target='#offcanvasWithBothOptions'
								aria-controls='offcanvasWithBothOptions'>
								Orders
							</button>
							<Modal />
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Header;
