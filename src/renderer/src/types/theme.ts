export type Theme = {
  name: string;
  bgImage: string;
  coverImages: string[];
  [key: `--${string}`]: string;
};
