import React from 'react';

// Original, shared monoline SVG controls. Decorative by default; labels live on controls.
function icon(name, d) {
  function Icon({ size = 24, strokeWidth = 1.75, ...props }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}><path d={d} /></svg>;
  }
  Icon.displayName = name;
  return Icon;
}
export const AlertCircle = icon('AlertCircle', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v6m0 3v1');
export const Armchair = icon('Armchair', 'M6 12V4h12v8M3 10v9h18v-9M3 15h18M6 19v3m12-3v3');
export const ArrowLeft = icon('ArrowLeft', 'M20 12H4m6-6-6 6 6 6');
export const ArrowRight = icon('ArrowRight', 'M4 12h16m-6-6 6 6-6 6');
export const ArrowUpRight = icon('ArrowUpRight', 'M6 18 18 6M6 6h12v12');
export const Banknote = icon('Banknote', 'M2 5h20v14H2Zm10 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM5 11v2m14-2v2');
export const Bell = icon('Bell', 'M4 17h16l-2-4V9a6 6 0 0 0-12 0v4Zm5 4h6');
export const Bus = icon('Bus', 'M5 3h14v16H5Zm0 9h14M8 6h8M7 19v3m10-3v3M8 15h1m6 0h1');
export const Calendar = icon('Calendar', 'M4 5h16v16H4ZM8 2v6m8-6v6M4 10h16');
export const CalendarCheck = icon('CalendarCheck', 'M4 5h16v16H4ZM8 2v6m8-6v6M4 10h16m-12 5 3 3 5-5');
export const Check = icon('Check', 'm5 12 4 4L19 6');
export const CheckCircle2 = icon('CheckCircle2', 'M20 10v2a8 8 0 1 1-5-8M8 11l4 4 9-10');
export const ChevronLeft = icon('ChevronLeft', 'm15 5-7 7 7 7');
export const ChevronRight = icon('ChevronRight', 'm9 5 7 7-7 7');
export const ClipboardList = icon('ClipboardList', 'M8 4H4v18h16V4h-4M8 2h8v5H8Zm0 9h8m-8 5h8');
export const Clock = icon('Clock', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v6h4');
export const DollarSign = icon('DollarSign', 'M12 2v20m5-16H9a4 4 0 0 0 0 8h6a4 4 0 0 1 0 8H6');
export const ExternalLink = icon('ExternalLink', 'M13 3h8v8m0-8L10 14M9 4H3v17h17v-6');
export const Eye = icon('Eye', 'M2 12c5-9 15-9 20 0-5 9-15 9-20 0Zm10-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z');
export const EyeOff = icon('EyeOff', 'm3 3 18 18M8 5c6-2 11 2 14 7l-3 4M3 8l-1 4c4 7 10 9 15 6');
export const Filter = icon('Filter', 'M3 5h18l-7 8v7l-4-2v-5Z');
export const HelpCircle = icon('HelpCircle', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM9 8c0-3 6-3 6 0 0 2-3 2-3 5m0 3v1');
export const Key = icon('Key', 'M7 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm3 7 11 11m-4-4 3-3m-6 3 3-3');
export const LayoutDashboard = icon('LayoutDashboard', 'M3 3h7v11H3Zm11 0h7v6h-7ZM3 18h7v3H3Zm11-5h7v8h-7Z');
export const LayoutGrid = icon('LayoutGrid', 'M3 3h7v7H3Zm11 0h7v7h-7ZM3 14h7v7H3Zm11 0h7v7h-7Z');
export const Loader2 = icon('Loader2', 'M21 12a9 9 0 1 1-9-9');
export const Lock = icon('Lock', 'M5 10h14v11H5Zm3 0V6a4 4 0 0 1 8 0v4m-4 5v3');
export const LogOut = icon('LogOut', 'M10 3H3v18h7m-1-9h12m-5-5 5 5-5 5');
export const Mail = icon('Mail', 'M3 5h18v14H3Zm0 0 9 8 9-8');
export const MapPin = icon('MapPin', 'M12 22S4 14 4 9a8 8 0 0 1 16 0c0 5-8 13-8 13Zm0-16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z');
export const Menu = icon('Menu', 'M4 6h16M4 12h16M4 18h16');
export const MessageSquare = icon('MessageSquare', 'M3 3h18v14H9l-6 5Zm4 5h10M7 12h7');
export const Moon = icon('Moon', 'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z');
export const Navigation = icon('Navigation', 'm3 10 18-7-7 18-3-8Z');
export const Pause = icon('Pause', 'M7 4v16M17 4v16');
export const Phone = icon('Phone', 'M7 3H4v4c0 7 6 13 13 13h3v-4l-5-2-2 2c-3-1-5-3-6-6l2-2Z');
export const Play = icon('Play', 'm7 3 14 9-14 9Z');
export const Plus = icon('Plus', 'M12 4v16M4 12h16');
export const Quote = icon('Quote', 'M3 6h7v7H6v5H3Zm11 0h7v7h-4v5h-3Z');
export const RefreshCw = icon('RefreshCw', 'M3 10a9 9 0 0 1 16-5l2 3M21 3v5h-5M21 14a9 9 0 0 1-16 5l-2-3M3 21v-5h5');
export const RotateCcw = icon('RotateCcw', 'M3 10a9 9 0 1 1 2 8M3 3v7h7');
export const Save = icon('Save', 'M3 3h15l3 3v15H3Zm4 0v6h9V3M7 21v-7h10v7');
export const Search = icon('Search', 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 6 6');
export const Send = icon('Send', 'm3 3 18 9-18 9 3-9Zm3 9h15');
export const Settings = icon('Settings', 'M4 7h16M4 17h16M8 3v8m8 2v8');
export const Shield = icon('Shield', 'M12 22S4 14 4 9a8 8 0 0 1 16 0c0 5-8 13-8 13Zm0-16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z');
export const ShieldCheck = icon('ShieldCheck', 'M20 10v2a8 8 0 1 1-5-8M8 11l4 4 9-10');
export const Star = icon('Star', 'm12 2 3 7 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z');
export const Sun = icon('Sun', 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-7v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2');
export const Trash2 = icon('Trash2', 'M3 6h18M5 6l1 15h12l1-15M9 6V3h6v3m-5 4v7m4-7v7');
export const Truck = icon('Truck', 'M2 5h12v12H2Zm12 5h4l4 4v3h-8M5 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm13 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z');
export const User = icon('User', 'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 21v-3c0-5 16-5 16 0v3');
export const Wrench = icon('Wrench', 'M4 7h16M4 17h16M8 3v8m8 2v8');
export const X = icon('X', 'm6 6 12 12M18 6 6 18');
