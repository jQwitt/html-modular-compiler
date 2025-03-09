export type HTMLComponent = {
	name: string;
	tag: string;
	base: string;
	attributes: { [key: string]: string } | null;
};

export type HTMLComponentMap = {
	[key: string]: HTMLComponent;
};
