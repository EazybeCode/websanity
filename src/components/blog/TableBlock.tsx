'use client'

/**
 * Table Block Component
 * Renders data tables with various styles
 */
import React from 'react'

interface TableData {
  headers: string[]
  rows: string[][] | Array<{ cells: string[] }>
  caption?: string
  variant?: 'default' | 'striped' | 'bordered' | 'compact'
}

export const TableBlock: React.FC<{ data: TableData }> = ({ data }) => {
  const { headers = [], rows = [], caption, variant = 'striped' } = data

  // Transform rows to handle both string[][] and {cells: string[]} formats
  // Sanity CMS provides: [{cells: ['a', 'b']}, {cells: ['c', 'd']}]
  // Component expects: [['a', 'b'], ['c', 'd']]
  const normalizedRows = rows.map((row) =>
    Array.isArray(row) ? row : (row as { cells: string[] }).cells
  )

  if (!headers.length || !rows.length) return null

  return (
    <figure className="my-6">
      <div className="overflow-x-auto rounded-xl border border-slate-700/50">
        <table
          className={`w-full border-collapse ${variant === 'striped' ? 'striped' : ''}`}
        >
          <thead>
            <tr className="bg-slate-800/80 border-b border-slate-700">
              {headers.map((header, i) => (
                <th
                  key={i}
                  className="px-4 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-bold text-brand-cyan uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {normalizedRows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${variant === 'striped' && rowIndex % 2 === 0 ? 'bg-slate-800/20' : ''} hover:bg-slate-800/30 transition-colors`}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`px-4 md:px-6 py-3 md:py-4 text-sm md:text-base ${
                      cellIndex === 0
                        ? 'font-semibold text-white'
                        : 'text-slate-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="text-center text-slate-400 text-sm mt-4 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default TableBlock
