import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const rawClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: true,
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

const builder = imageUrlBuilder(rawClient)

export function urlFor(source: any) {
  return builder.image(source)
}
