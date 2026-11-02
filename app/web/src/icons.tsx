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
export const SignOutIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
);
export const XIcon = ({ size = 14 }) => <svg {...base(size)}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>;
export const PlugIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" /></svg>
);
export const FolderGitIcon = ({ size = 16 }) => (
  <svg {...base(size)}><circle cx="12" cy="13" r="2" /><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="M14 13h3" /><path d="M7 13h3" /></svg>
);
export const ListIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M10 12h11" /><path d="M10 18h11" /><path d="M10 6h11" /><path d="M4 10h2" /><path d="M4 6h1v4" /><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" /></svg>
);
export const UsersIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
export const GitHubIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
export const SparklesIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /></svg>
);
export const TrashIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
);
export const EyeIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" /><circle cx="12" cy="12" r="3" /></svg>
);
export const EyeOffIcon = ({ size = 16 }) => (
  <svg {...base(size)}><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);
export const PlusIcon = ({ size = 14 }) => <svg {...base(size)}><path d="M5 12h14" /><path d="M12 5v14" /></svg>;
export const UserIcon = ({ size = 14 }) => <svg {...base(size)}><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>;
export const XCircleIcon = ({ size = 14 }) => <svg {...base(size)}><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>;
export const CheckCircleIcon = ({ size = 14 }) => <svg {...base(size)}><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>;
