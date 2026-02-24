/**
 * SANITY CMS CONTENT TYPES - Complete Export
 *
 * Add all these content types to your Sanity Studio's schema.js
 */

export { default as table } from './table.js';
export { default as accordion } from './accordion.js';
export { default as callout } from './callout.js';
export { default as codeBlock } from './codeBlock.js';
export { default as imageGallery } from './imageGallery.js';
export { default as videoEmbed } from './videoEmbed.js';
export { default as buttonCTA } from './buttonCTA.js';
export { default as quote } from './quote.js';
export { default as fileDownload } from './fileDownload.js';
export { default as comparisonTable } from './comparisonTable.js';

// All content types list for reference
export const contentTypesList = [
  { name: 'table', title: 'Table Format', description: 'For data tables, comparisons' },
  { name: 'accordion', title: 'Accordion / FAQ', description: 'Collapsible content sections' },
  { name: 'callout', title: 'Callout Box', description: 'Highlighted info boxes' },
  { name: 'codeBlock', title: 'Code Block', description: 'Syntax-highlighted code' },
  { name: 'imageGallery', title: 'Image Gallery', description: 'Multiple images in grid/carousel' },
  { name: 'videoEmbed', title: 'Video Embed', description: 'YouTube, Vimeo, Loom videos' },
  { name: 'buttonCTA', title: 'Button / CTA', description: 'Call-to-action buttons' },
  { name: 'quote', title: 'Quote / Testimonial', description: 'Quotes with author info' },
  { name: 'fileDownload', title: 'File Download', description: 'PDF, document downloads' },
  { name: 'comparisonTable', title: 'Comparison Table', description: 'Product/feature comparisons' },
];
