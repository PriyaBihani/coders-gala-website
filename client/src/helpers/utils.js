export const scrollTo = (element) => {
	isClient &&
		window.scroll({
			behavior: 'smooth',
			left: 0,
			top: element.offsetTop,
		});
};

export const isClient =
	typeof window !== 'undefined' && window.document ? true : false;

export const formatDate = (
	date,
	options = {
		minute: 'numeric',
		hour: 'numeric',
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}
) => {
	try {
		return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
	} catch (error) {
		return error.message;
	}
};
