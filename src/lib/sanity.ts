import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

const rawClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,  // CDN-cached requests don't count toward API quota
  apiVersion: '2024-01-01',
  perspective: 'published',
})

// Wrap the client so .fetch() never throws during build — returns null on error
export const sanityClient = {
  ...rawClient,
  fetch: async <T = any>(query: string, params?: Record<string, any>): Promise<T | null> => {
    try {
      return await rawClient.fetch<T>(query, params as any)
    } catch (error) {
      console.warn('Sanity fetch failed:', (error as Error).message)
      return null
    }
  },
}

// Draft client for preview mode — fetches unpublished content
const rawDraftClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_TOKEN,
})

export const sanityDraftClient = {
  ...rawDraftClient,
  fetch: async <T = any>(query: string, params?: Record<string, any>): Promise<T | null> => {
    try {
      return await rawDraftClient.fetch<T>(query, params as any)
    } catch (error) {
      console.warn('Sanity draft fetch failed:', (error as Error).message)
      return null
    }
  },
}

const builder = createImageUrlBuilder({
  projectId: '5awzi0t4',
  dataset: 'production',
})

export function urlFor(source: any) {
  return builder.image(source)
}
