const parseTag = (html: string) => {
	const raw = html.slice(html.indexOf('<' + 1), html.indexOf(' '));

	if (raw.length) {
		return raw;
	}

	return 'div';
};

export default parseTag;
