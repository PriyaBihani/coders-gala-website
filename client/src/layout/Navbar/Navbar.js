import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setDisplayMode } from '../../actions/ui';
import { isClient } from '../../helpers';

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
import SignedOutLinks from './SignedOutLinks';
import SignedInLinks from './SignedInLinks';
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// logo imports
import Logo from '../../assets/img/cgTransparent.PNG';

const Navbar = ({ auth, ui, setDisplayMode }) => {
	// -------------------------------------------------
	const [navbarExpanded, setnavbarExpanded] = useState(false);
	const [switched, setswitched] = useState(false);

	useEffect(() => {
		document.querySelector('body').classList.add(ui.displayMode);
		console.log(ui.displayMode);
		if (ui.displayMode === 'dark') {
			setswitched(true);
		}
	}, [setswitched, ui.displayMode]);

	// Getting the current mode from local storage
	if (isClient) {
		let mode = 'light';

		mode = localStorage.getItem('mode');

		if (mode === 'dark') {
			document.querySelector('body').classList.add('dark');
		} else {
			document.querySelector('body').classList.remove('dark');
		}
	}

	//

	// const links = <SignedOutLinks />;

	return (
		<div className='navigation-wrap bg-light start-header start-style'>
			<div className='container'>
				<Accordion>
					<Row>
						<Col>
							<nav className='navbar navbar-expand-md navbar-light'>
								<Link to='/'>
									<img
										style={{
											fontSize: isClient && window.innerHeight >= 767 ? '2rem' : '1.2rem',
										}}
										className='nav-logo'
										src={Logo}
										alt=''
									/>
								</Link>
								<div
									id='switch'
									onClick={() => {
										setDisplayMode();
										setswitched(!switched);
									}}
									className={`switch float-right ${switched ? 'switched' : ''
										}`}>
									<div
										style={{
											backgroundColor:
												ui.displayMode === 'dark' ? '#111' : '#f1f1f1',
										}}
										id='circle'>
										<img
											className='mode-icon'
											style={{ width: '20px' }}
											src={
												ui.displayMode === 'dark'
													? 'https://www.svgrepo.com/show/3158/moon.svg'
													: 'https://www.svgrepo.com/show/83726/sun.svg'
											}
											alt=''
										/>
									</div>
								</div>
								<div className='points-box '>
									<div>
										<span className='points-text'> Points </span>
										<span>
											<img
												alt="CG Points"
												src='https://image.flaticon.com/icons/svg/715/715709.svg'
												className='points-img'
											/>
										</span>
										<span> {auth.user && auth.user.points} </span>
									</div>
								</div>

								<div className='signed-links'>
									{auth.isAuthenticated && auth.isAuthenticated ? (
										<>
											<SignedInLinks />
										</>
									) : (
										<SignedOutLinks />
									)}
								</div>

								<Accordion.Toggle
									className='nav-btn'
									onClick={() => {
										setnavbarExpanded(!navbarExpanded);
									}}
									as={Button}
									variant='link'
									eventKey='5'>
									<a
										className='navbar-toggler'
										type='button'
										data-target='#navbarSupportedContent'
										aria-controls='navbarSupportedContent'
										aria-expanded={navbarExpanded}
										aria-label='Toggle navigation'>
										<span className='navbar-toggler-icon'></span>
									</a>
								</Accordion.Toggle>
								<Accordion.Collapse
									className=' '
									id='navbarSupportedContent'
									eventKey='5'>
									<div>
										{auth.user && auth.user.userId ? (
											<SignedInLinks />
										) : (
											<SignedOutLinks />
										)}
									</div>
								</Accordion.Collapse>
							</nav>
						</Col>
					</Row>
				</Accordion>
			</div>
		</div>
	);
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		ui: state.ui,
	};
};

export default connect(mapStateToProps, { setDisplayMode })(Navbar);
