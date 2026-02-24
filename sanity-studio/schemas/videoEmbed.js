/**
 * 6. VIDEO EMBED
 * For YouTube, Vimeo, Loom videos
 */
export default {
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Loom', value: 'loom' },
          { title: 'Wistia', value: 'wistia' },
          { title: 'Custom / Direct URL', value: 'custom' },
        ],
      },
      initialValue: 'youtube',
    },
    {
      name: 'videoId',
      title: 'Video ID',
      type: 'string',
      description: 'YouTube: e.g., dQw4w9WgXcQ | Vimeo: e.g., 123456789',
      hidden: ({ parent }) => parent?.platform === 'custom',
    },
    {
      name: 'url',
      title: 'Video URL',
      type: 'url',
      description: 'Full video URL (for custom platform)',
      hidden: ({ parent }) => parent?.platform !== 'custom',
    },
    {
      name: 'title',
      title: 'Video Title',
      type: 'string',
      description: 'Accessible title for the video',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'mute',
      title: 'Muted by Default',
      type: 'boolean',
      initialValue: false,
      description: 'Required for autoplay to work',
    },
    {
      name: 'controls',
      title: 'Show Controls',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9 (Widescreen)', value: '16:9' },
          { title: '4:3 (Standard)', value: '4:3' },
          { title: '1:1 (Square)', value: '1:1' },
          { title: '9:16 (Vertical)', value: '9:16' },
          { title: '21:9 (Ultrawide)', value: '21:9' },
        ],
      },
      initialValue: '16:9',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Thumbnail shown before video plays',
    },
  ],
  preview: {
    select: {
      platform: 'platform',
      videoId: 'videoId',
      url: 'url',
    },
    prepare({ platform, videoId, url }) {
      return {
        title: `Video (${platform})`,
        subtitle: videoId || url || 'No video selected',
      };
    },
  },
};
