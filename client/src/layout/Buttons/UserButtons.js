import { Link } from 'react-router-dom';
import { Lock, Read, Unlock } from '../../assets/icons';

const InnerDiv = ({ handler, children, dark, bg }) =>
	children ? (
		<div
			className={`button ${dark && 'dark'}`}
			style={{ backgroundColor: `${bg && 'bg'}` }}
			onClick={handler ? handler : (e) => console.log(e, handler)}>
			<span>{children}</span>
			<svg>
				<polyline
					className='o1'
					points='0 0, 150 0, 150 55, 0 55, 0 0'></polyline>
				<polyline
					className='o2'
					points='0 0, 150 0, 150 55, 0 55, 0 0'></polyline>
			</svg>
		</div>
	) : (
		<>
			{'   '}
			<span>
				<Read size={19} />
			</span>
		</>
	);

export const Button = ({ children, url, dark, bg, isButton, handler }) => {
	return typeof isButton == 'undefined' ? (
		<Link to={url && url}>
			<InnerDiv dark={dark} bg={bg}>
				{children}
			</InnerDiv>
		</Link>
	) : (
		<InnerDiv dark={dark} bg={bg} handler={handler}>
			{children}
		</InnerDiv>
	);
};

export const LockButton = ({ isLocked, handler }) => {
	return <span onClick={handler}>{isLocked ? <Lock /> : <Unlock />}</span>;
};
