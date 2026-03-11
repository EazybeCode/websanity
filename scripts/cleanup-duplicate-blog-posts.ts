/**
 * Cleanup Duplicate Blog Posts in Sanity CMS
 *
 * This script identifies and resolves duplicate blog posts by:
 * 1. Finding posts with duplicate slugs
 * 2. For each duplicate, keeping the most recent/relevant version
 * 3. Deleting the older/duplicate drafts
 *
 * SAFETY: Always dry-run first before actual deletions
 */

import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5awzi0t4',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skSZVkNDe8k5TuJi2Tld6H34XcnMqKi7lilBvkqb3yPyKf3oHEhohk2SnEqBLAYdYvCvfQxtcmjXuBEJcYE4MvfiIfl8ypfuAxnYp3aL2R12HWxewdfKkH3rywCejLzWdY8lxT4ggzXlqFTQZSdMzYEiG59ImYozOfuNBw5PuANtxQp28tSA'
});

interface BlogPost {
  _id: string;
  _rev: string;
  title: string;
  slug: string;
  language: string;
  translationGroupId: string;
  publishedAt: string | null;
}

interface DuplicateGroup {
  slug: string;
  posts: BlogPost[];
  toDelete: string[];
  toKeep: string[];
  reason: string;
}

// Function to determine which post to keep
function selectPostToKeep(posts: BlogPost[]): { keep: BlogPost; delete: BlogPost[]; reason: string } {
  // Sort by: published > draft, then by date
  const sorted = [...posts].sort((a, b) => {
    // Prefer published over draft
    const aIsPublished = !a._id.startsWith('drafts.');
    const bIsPublished = !b._id.startsWith('drafts.');

    if (aIsPublished && !bIsPublished) return -1;
    if (!aIsPublished && bIsPublished) return 1;

    // Both same status, compare by date
    const aDate = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const bDate = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return bDate - aDate;
  });

  const keep = sorted[0];
  const toDelete = sorted.slice(1);

  let reason = '';
  if (!keep._id.startsWith('drafts.')) {
    reason = 'Keep published version';
  } else if (keep.publishedAt) {
    reason = 'Keep most recent draft';
  } else {
    reason = 'Keep only available version';
  }

  return { keep, delete: toDelete, reason };
}

async function findDuplicates(): Promise<DuplicateGroup[]> {
  console.log('🔍 Finding duplicate blog posts...\n');

  const query = `
    *[_type == "post"] | order(slug.current asc) {
      _id,
      _rev,
      title,
      "slug": slug.current,
      language,
      translationGroupId,
      publishedAt
    }
  `;

  const posts = await sanityClient.fetch(query);
  console.log(`📊 Found ${posts.length} total blog posts\n`);

  // Group by slug
  const slugMap = new Map<string, BlogPost[]>();
  for (const post of posts) {
    if (!slugMap.has(post.slug)) {
      slugMap.set(post.slug, []);
    }
    slugMap.get(post.slug)!.push(post);
  }

  // Find duplicates
  const duplicates: DuplicateGroup[] = [];
  for (const [slug, postList] of slugMap.entries()) {
    if (postList.length > 1) {
      const { keep, delete: toDelete, reason } = selectPostToKeep(postList);

      duplicates.push({
        slug,
        posts: postList,
        toDelete: toDelete.map(p => p._id),
        toKeep: [keep._id],
        reason
      });
    }
  }

  return duplicates;
}

async function dryRun(duplicates: DuplicateGroup[]) {
  console.log('🔍 DRY RUN - What will be deleted:\n');
  console.log('═'.repeat(80));
  console.log('\n');

  let totalToDelete = 0;

  for (const dup of duplicates) {
    console.log(`📝 Slug: "${dup.slug}"`);
    console.log(`   Reason: ${dup.reason}`);
    console.log(`   ✅ KEEP: ${dup.toKeep[0]}`);
    console.log(`   🗑️  DELETE: ${dup.toDelete.join(', ')}`);
    console.log('');

    totalToDelete += dup.toDelete.length;
  }

  console.log('═'.repeat(80));
  console.log(`\n📊 Summary: ${totalToDelete} posts will be deleted`);
  console.log(`📊 Summary: ${duplicates.length} duplicate groups found\n`);
}

async function deleteDuplicates(duplicates: DuplicateGroup[]) {
  console.log('🗑️  DELETING DUPLICATE POSTS\n');
  console.log('═'.repeat(80));
  console.log('\n');

  let deletedCount = 0;
  let errorCount = 0;

  for (const dup of duplicates) {
    for (const id of dup.toDelete) {
      try {
        await sanityClient.delete(id);
        console.log(`✅ Deleted: ${id}`);
        deletedCount++;
      } catch (error) {
        console.error(`❌ Failed to delete ${id}:`, error);
        errorCount++;
      }
    }
  }

  console.log('\n' + '═'.repeat(80));
  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Deleted: ${deletedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total duplicate groups: ${duplicates.length}\n`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRunMode = !args.includes('--execute');

  console.log('════════════════════════════════════════════════════════════════');
  console.log('         Sanity CMS - Duplicate Blog Post Cleanup');
  console.log('════════════════════════════════════════════════════════════════\n');

  try {
    const duplicates = await findDuplicates();

    if (duplicates.length === 0) {
      console.log('✅ No duplicates found!\n');
      return;
    }

    if (dryRunMode) {
      console.log('⚠️  DRY RUN MODE - No changes will be made\n');
      await dryRun(duplicates);
      console.log('💡 To execute deletions, run: npx tsx scripts/cleanup-duplicate-blog-posts.ts --execute\n');
    } else {
      console.log('⚠️  EXECUTION MODE - Will delete duplicate posts\n');
      console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
      await new Promise(resolve => setTimeout(resolve, 5000));

      await dryRun(duplicates);
      console.log('\n⏳ Proceeding with deletions...\n');
      await deleteDuplicates(duplicates);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
