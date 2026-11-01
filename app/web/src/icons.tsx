// Icons used in the Figma file (Lucide set), as inline SVG.
import type { SVGProps } from "react";

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true,
});

export const IssueIcon = ({ size = 18 }) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>
);
export const PrIcon = ({ size = 18 }) => (
  <svg {...base(size)}><circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><path d="M6 9v12" /></svg>
);
export const BoxIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
);
export const DownToLineIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M12 17V3" /><path d="m6 11 6 6 6-6" /><path d="M19 21H5" /></svg>
);
export const RefreshIcon = ({ size = 16, className = "" }) => (
  <svg {...base(size)} className={className}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></svg>
);
export const ChevronLeft = ({ size = 14 }) => <svg {...base(size)}><path d="m15 18-6-6 6-6" /></svg>;
export const ChevronRight = ({ size = 14 }) => <svg {...base(size)}><path d="m9 18 6-6-6-6" /></svg>;
export const SortIcon = ({ dir }: { dir: "asc" | "desc" | null }) => (
  <svg {...base(12)}>
    {dir === null && <><path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" /></>}
    {dir === "asc" && <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>}
    {dir === "desc" && <><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></>}
  </svg>
);
export const SettingsIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M20 7h-9" /><path d="M14 17H5" /><circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" /></svg>
);
export const InboxIcon = ({ size = 20 }) => (
  <svg {...base(size)}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
);
export const AlertIcon = ({ size = 18 }) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
);
export const CheckIcon = ({ size = 16 }) => <svg {...base(size)}><path d="M20 6 9 17l-5-5" /></svg>;
export const ExternalIcon = ({ size = 11 }) => <svg {...base(size)}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg>;

/** The bell glyph from Figma "Shared / Notification bell", split into body and clapper. */
export const BellGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="bell-glyph">
    <path className="bell-body" d="M2.44596 11.4947C2.34798 11.6021 2.28332 11.7357 2.25984 11.8792C2.23637 12.0226 2.25509 12.1698 2.31373 12.3029C2.37237 12.4359 2.46841 12.549 2.59015 12.6284C2.71189 12.7079 2.8541 12.7502 2.99947 12.7503H14.9997C15.1451 12.7504 15.2873 12.7082 15.4091 12.6289C15.5309 12.5496 15.6271 12.4366 15.6859 12.3037C15.7447 12.1707 15.7636 12.0236 15.7403 11.8801C15.717 11.7366 15.6525 11.603 15.5547 11.4955C14.5572 10.4671 13.4997 9.3743 13.4997 5.99977C13.4997 4.80619 13.0256 3.66151 12.1816 2.81752C11.3377 1.97354 10.1931 1.49939 8.99959 1.49939C7.80609 1.49939 6.66148 1.97354 5.81755 2.81752C4.97361 3.66151 4.4995 4.80619 4.4995 5.99977C4.4995 9.3743 3.44123 10.4671 2.44596 11.4947Z" />
    <path className="bell-clapper" d="M7.70006 15.7506C7.83172 15.9786 8.02108 16.168 8.24911 16.2996C8.47713 16.4313 8.73579 16.5006 8.99909 16.5006C9.26239 16.5006 9.52105 16.4313 9.74907 16.2996C9.9771 16.168 10.1665 15.9786 10.2981 15.7506" />
  </svg>
);

export const BrandSymbol = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true">
    <rect width="30" height="30" rx="6" fill="#315BDE" />
    <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.047 14.703C20.0955 16.0419 19.7311 17.3632 19.0032 18.488C18.2753 19.6127 17.2191 20.4864 15.9779 20.9906C14.7366 21.4948 13.3704 21.605 12.0644 21.3064C10.7583 21.0078 9.57571 20.3148 8.67687 19.3214C7.77803 18.3279 7.20644 17.0821 7.03961 15.7528C6.87278 14.4235 7.11878 13.075 7.74425 11.8902C8.36973 10.7055 9.34441 9.74173 10.5362 9.12966C11.7279 8.51759 13.079 8.28682 14.4064 8.46863" strokeWidth="1.1875" />
      <path d="M12.9219 18.2656V12.625M12.9219 15.5938C15.8906 15.5938 17.375 14.7031 17.375 12.9219" strokeWidth="1.03906" />
    </g>
    <g fill="white">
      <circle cx="12.9219" cy="18.2656" r="1.1875" /><circle cx="12.9219" cy="12.3281" r="1.1875" /><circle cx="17.375" cy="12.625" r="1.1875" />
      <path d="M19.75 6.98438C20.0865 8.42917 20.9771 9.31979 22.4219 9.65625C20.9771 9.99271 20.0865 10.8833 19.75 12.3281C19.4135 10.8833 18.5229 9.99271 17.0781 9.65625C18.5229 9.31979 19.4135 8.42917 19.75 6.98438Z" />
    </g>
  </svg>
);
