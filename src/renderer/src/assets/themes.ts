import { Theme } from '@renderer/types/theme';
export const themes: Record<string, Theme> = {
  batman: {
    name: 'Batman',
    coverImages: ["https://wallpaperaccess.com/full/88382.jpg"],
    bgImage:
      "url('https://imgs.search.brave.com/FgHAJvbzSfw8I5gJkMoMW7hdJKSDRMd7D1lOgPtO1Gw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJiYXQuY29t/L2ltZy85Njk5MDY1/LWJhdG1hbi1taW5p/bWFsLWFydHdvcmst/d2FsbHBhcGVyLmpw/Zw')",

    '--primary': '#ffcc00',
    '--bg': '#121212',
    '--text': '#ffffff',
    '--secondary': '#ffcc00',
  },
  spiderman: {
    name: 'Spider-Man',
    coverImages: ["https://wallpaperaccess.com/full/88382.jpg"],
    bgImage:
      "url('https://imgs.search.brave.com/ehpDD7KGLKkQNdUEnzQqXFxMtewJsXbeZS8h1THaPak/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9iLzEvYy84/ODY0NTctY29vbC1t/aW5pbWFsLXNwaWRl/cm1hbi13YWxscGFw/ZXJzLTE5MjB4MTA4/MC5qcGc')",
    '--primary': '#e60012',
    '--bg': '#001f3f',
    '--text': '#ffffff',
    '--secondary': '#e60012',
  },
  power: {
    name: 'power',
    bgImage:
      'url(https://m.gettywallpapers.com/wp-content/uploads/2021/10/Chainsaw-Man-Power-Wallpapers.jpg)',
    coverImages: ["https://wallpaperaccess.com/full/88382.jpg"],
    '--primary': '#B22222',
    '--bg': '#0D0D0D',
    '--text': '#F5F5F5',
    '--secondary': '#e60012',
  },
  tokyo_ghoul: {
    name: 'tokyo_ghoul',
    bgImage:
      'url(https://imgs.search.brave.com/cF5n246tXJ2duihxYssmQ8xfVnaPyPnlMRsUaRwf3uc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvNDQw/LmpwZw)',
    coverImages: ["https://wallpaperaccess.com/full/88382.jpg"],
    '--primary': '#C00000',
    '--bg': '#0A0A0A',
    '--text': '#F0F0F0',
    '--secondary': '#4A4A4A',
  },
};
