export const THEME_STORAGE_KEY = 'baolam-theme';

// Runs before the first paint. A blocked storage API must not prevent rendering.
export const themeInitScript = `(()=>{let t='dark';try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')t='light'}catch{}document.documentElement.dataset.theme=t;document.documentElement.classList.toggle('dark',t==='dark')})()`;

