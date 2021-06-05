import React from 'react';
import { motion } from 'framer-motion';
import { Seo } from '../helpers';
import { Footer } from '../layout/';
import Card from '../sections/learn/Card';
import AdminButtons from '../layout/Buttons/AdminButtons';

const Learn = () => {
	return (
		<motion.div
			exit={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}>
			<Seo title='Learn' meta={[{ name: 'robots', content: 'index follow' }]} />
			<div className='container learn-container'>
				<AdminButtons type='Add' url='/addcard' data={{ name: 'Courses' }} />
				<div className='flex'>
					<Card />
				</div>
			</div>
			<Footer />
		</motion.div>
	);
};

export default Learn;
