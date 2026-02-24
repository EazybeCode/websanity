/**
 * 5. IMAGE GALLERY
 * For product showcases, screenshots, team photos
 */
export default {
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
          },
        ],
      }],
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid (Auto)', value: 'grid' },
          { title: 'Grid (2 Columns)', value: 'grid-2' },
          { title: 'Grid (3 Columns)', value: 'grid-3' },
          { title: 'Grid (4 Columns)', value: 'grid-4' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel / Slider', value: 'carousel' },
          { title: 'Horizontal Scroll', value: 'scroll' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'size',
      title: 'Image Size',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'medium',
    },
    {
      name: 'enableLightbox',
      title: 'Enable Lightbox',
      type: 'boolean',
      description: 'Open images in fullscreen modal on click',
      initialValue: true,
    },
    {
      name: 'caption',
      title: 'Gallery Caption',
      type: 'string',
      description: 'Optional caption for the entire gallery',
    },
  ],
  preview: {
    select: {
      images: 'images',
      layout: 'layout',
    },
    prepare({ images, layout }) {
      return {
        title: `Image Gallery (${layout})`,
        subtitle: `${images?.length || 0} images`,
      };
    },
  },
};
