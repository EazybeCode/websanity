/**
 * Sanity Schema Index
 * This file imports all schemas for the Sanity Studio
 */

import table from './table.js'
import accordion from './accordion.js'
import callout from './callout.js'
import codeBlock from './codeBlock.js'
import imageGallery from './imageGallery.js'
import videoEmbed from './videoEmbed.js'
import socialEmbed from './socialEmbed.js'
import buttonCTA from './buttonCTA.js'
import quote from './quote.js'
import fileDownload from './fileDownload.js'
import comparisonTable from './comparisonTable.js'
import author from './author.js'
import blogCategory from './blogCategory.js'
import partner from './partner.js'

export default [
  // Document types
  author,
  blogCategory,
  partner,
  // Object types (used within arrays/fields)
  table,
  accordion,
  callout,
  codeBlock,
  imageGallery,
  videoEmbed,
  socialEmbed,
  buttonCTA,
  quote,
  fileDownload,
  comparisonTable,
]
