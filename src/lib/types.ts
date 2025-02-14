export type HTMLComponent = {
  name: string;
  base: string;
  attributes: { [key: string]: string } | null;
};

export type HTMLComponentMap = {
  [key: string]: HTMLComponent;
};
