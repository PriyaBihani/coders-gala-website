import React from 'react';
import { NavLink } from 'react-router-dom';
import { isClient } from '../../helpers';

const SignedInLinks = () => {
	return (
		<div>
			<ul className='navbar-nav ml-auto py-4 py-md-0'>
				<li className='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
					<NavLink to='/home' className='nav-link'>
						Home
					</NavLink>
				</li>
				<li className='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
					<NavLink to='/about' className='nav-link'>
						About
					</NavLink>
				</li>
				<li className='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
					<NavLink
						className='nav-link '
						to='/learn'
						role='button'
						aria-expanded='false'>
						Learn
					</NavLink>
					<div className='dropdown-menu'></div>
				</li>

				<li className='nav-item pl-4 pl-md-0 ml-0 ml-md-4'>
					<a
						onClick={() => {
							isClient && localStorage.clear();
						}}
						href='/'
						type='button'
						className='nav-link'>
						LogOut
					</a>
				</li>
			</ul>
		</div>
	);
};

export default SignedInLinks;
