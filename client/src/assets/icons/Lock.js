import React from 'react';

export const Lock = ({ size = 33, color = '#DC143C', handler }) => {
	return (
		<svg
			onClick={handler}
			xmlns='http://www.w3.org/2000/svg'
			width='43'
			height='43'
			viewBox='0 0 24 24'
			fill='none'
			stroke={color}
			stroke-width='2'
			stroke-linecap='round'
			stroke-linejoin='round'>
			<rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect>
			<path d='M7 11V7a5 5 0 0 1 10 0v4'></path>
		</svg>
	);
};

export const Unlock = ({ size = 33, color = '#00FF00' }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='43'
		height='43'
		viewBox='0 0 24 24'
		fill='none'
		stroke={color}
		stroke-width='2'
		stroke-linecap='round'
		stroke-linejoin='round'>
		<rect x='3' y='11' width='18' height='11' rx='2' ry='2'></rect>
		<path d='M7 11V7a5 5 0 0 1 9.9-1'></path>
	</svg>
);
