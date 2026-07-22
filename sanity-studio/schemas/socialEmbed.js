/**
 * SOCIAL / POST EMBED
 * Embed a LinkedIn, X (Twitter), Instagram, YouTube, TikTok, Vimeo or Spotify
 * post by pasting the platform's embed code (the <iframe>…</iframe> snippet).
 * The frontend extracts the iframe `src`, verifies the host, and renders it
 * safely — it never injects the raw HTML.
 */
export default {
  name: 'socialEmbed',
  title: 'Social / Post Embed',
  type: 'object',
  fields: [
    {
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      rows: 5,
      description:
        'Paste the post’s embed code. On LinkedIn: open the post → … menu → "Embed this post" → copy the <iframe> code. Also works for YouTube, X/Twitter, Instagram, TikTok, Vimeo and Spotify. A plain URL works too for iframe-friendly links.',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
      description: 'Shown centered under the embed.',
    },
    {
      name: 'align',
      title: 'Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'center',
    },
  ],
  preview: {
    select: { embedCode: 'embedCode', caption: 'caption' },
    prepare({ embedCode, caption }) {
      let host = ''
      const m =
        (embedCode || '').match(/src=["']([^"']+)["']/) ||
        (embedCode || '').match(/https?:\/\/[^\s"'<>]+/)
      try {
        if (m) host = new URL(m[1] || m[0]).hostname.replace(/^www\./, '')
      } catch (e) {
        // ignore malformed URLs in the preview
      }
      return {
        title: caption || 'Post Embed',
        subtitle: host || 'Paste an embed code',
      }
    },
  },
}
