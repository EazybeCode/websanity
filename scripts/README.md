# Sanity Content Scripts

This directory contains scripts for managing Sanity CMS content.

## Add Coexistence Product Page

The `add-coexistence-page.ts` script creates a comprehensive product page for the Coexistence feature in your Sanity CMS.

### Prerequisites

1. **Sanity API Token**: You need an API token with Editor permissions
   - Go to [Sanity Manage](https://sanity.io/manage)
   - Select your project: `5awzi0t4`
   - Navigate to **API** > **Tokens**
   - Click **Add API token**
   - Name: `Content Creation Token`
   - Permissions: **Editor**
   - Copy the generated token

### Setup

1. **Create a `.env` file** in the project root (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. **Add your Sanity API token** to the `.env` file:
   ```
   SANITY_API_TOKEN=your_actual_token_here
   ```

### Running the Script

Execute the script using the npm command:

```bash
npm run add-coexistence
```

Or with the environment variable inline:

```bash
SANITY_API_TOKEN="your-token" npm run add-coexistence
```

### What the Script Does

The script creates a new `productPage` document in Sanity with the ID `coexistence-product-page` containing:

- **Hero Section**: Main headline, subheadline, CTAs, and trust badges
- **Problem Section**: Two-column layout showing the impossible choice businesses face
- **Solution Section**: 4 key value propositions with icons
- **How It Works**: 4-step process with numbered steps
- **Features Grid**: 6 detailed features in grid layout
- **Comparison Table**: Feature comparison across 3 solutions
- **Use Cases**: 5 industry-specific use cases
- **Testimonials**: 3 customer testimonials (with placeholders)
- **FAQ Section**: 7 frequently asked questions with answers

### Schema Requirements

This script assumes your Sanity schema includes the following document types:

- `productPage`
- `heroSection`
- `problemSection`
- `featureSection`
- `stepsSection`
- `comparisonSection`
- `useCasesSection`
- `testimonialSection`
- `faqSection`

If these schemas don't exist in your Sanity Studio, you'll need to create them first.

### Customization

To modify the content:

1. Open `scripts/add-coexistence-page.ts`
2. Update the `coexistencePageContent` object
3. Run the script again to update the content in Sanity

### Troubleshooting

**Error: SANITY_API_TOKEN environment variable is required**
- Make sure you've created a `.env` file with your token
- Or pass the token inline: `SANITY_API_TOKEN="token" npm run add-coexistence`

**Error: Document type 'productPage' does not exist**
- You need to add the schema definitions to your Sanity Studio
- Contact your Sanity Studio administrator

**Error: Unauthorized**
- Check that your API token has Editor permissions
- Verify the token is correct and not expired

### Next Steps

After successfully running the script:

1. Go to your Sanity Studio
2. Navigate to the Coexistence product page
3. Replace placeholder testimonial names/companies with real data
4. Add images/icons as needed
5. Publish the page

### Support

For issues with:
- The script itself: Check the console output for error messages
- Sanity permissions: Visit [Sanity Manage](https://sanity.io/manage/project/5awzi0t4)
- Schema definitions: Contact your Sanity Studio administrator
