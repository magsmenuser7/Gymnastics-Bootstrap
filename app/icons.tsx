const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Arrow = () => <svg {...base}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const Phone = () => <svg {...base}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>;
export const Mail = () => <svg {...base}><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m22 7-10 6L2 7" /></svg>;
export const Pin = () => <svg {...base}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
export const Menu = () => <svg {...base}><path d="M4 8h16M4 16h16" /></svg>;
export const Close = () => <svg {...base}><path d="M18 6 6 18M6 6l12 12" /></svg>;
export const Left = () => <svg {...base}><path d="m15 18-6-6 6-6" /></svg>;
export const Right = () => <svg {...base}><path d="m9 18 6-6-6-6" /></svg>;
