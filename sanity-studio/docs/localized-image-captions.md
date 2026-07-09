# Localized image captions

How image **alt** and **caption** are localized in the blog (`post` / `comparisonPost`)
document-per-locale model.

## Model

Each language is a **separate document** sharing a `translationGroupId`, with a
`language` field (`en`, `es`, `tr`, `pt-BR`). The studio actions **Create All
Translations** and **Sync from English** (`sanity-studio/actions/*.jsx`) run
`utils/translate.js` over the English source and write a translated copy per
locale. Block `_key`s are preserved across locales (the translator spreads
`{ ...block }`), so blocks line up 1:1 between an English doc and its siblings.

## Fields (see `schemas/blogImage.js`)

| Field             | Type                     | Localization                                            |
| ----------------- | ------------------------ | ------------------------------------------------------- |
| `alt`             | `string`                 | Auto-translated per locale (unchanged).                 |
| `caption`         | `array` (Portable Text)  | Rich text with **bold / italic / links**; auto-translated as Portable Text. |
| `translationMode` | `string` `inherit`\|`custom` | `inherit` (default) auto-translates the caption on every sync; `custom` keeps a hand-authored localized caption and is never overwritten. |

`caption` links use the `link` annotation (`href` + `openInNewTab`). The
frontend renders it with `@portabletext/react` (`imageCaptionComponents` in
`src/components/pages/BlogPostClient.tsx`) and falls back to a plain string for
legacy captions.

`translate.js` handles captions everywhere they appear: inline body images,
`imageGallery` images + gallery caption, and top-level `featuredImage` /
`socialShareImage` — alongside alt text, tables, FAQs, buttons, quotes,
`tldrHeading`, etc.

## GROQ

### 1. Fetch a post for a locale, with document-level fallback to English

Captions inside `body` are already localized in the locale document, so the
simplest, robust fallback is at the document level: use the locale doc if it
exists, otherwise the English sibling.

```groq
coalesce(
  *[_type == "post" && slug.current == $slug && language == $language][0],
  *[_type == "post" && translationGroupId == $groupId && language == "en"][0]
){
  _id,
  language,
  "content": body[]{
    ...,
    _type == "image" => {
      ...,                 // alt, caption (Portable Text + markDefs), translationMode
      "url": asset->url
    }
  }
}
```

### 2. Per-image caption fallback to the English sibling

For the `custom` case where a locale caption may be left blank, coalesce each
image's caption against the matching block (`_key`) in the English sibling:

```groq
*[_type == "post" && slug.current == $slug && language == $language][0]{
  "content": body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "caption": coalesce(
        caption,
        *[_type == "post"
          && translationGroupId == ^.^.translationGroupId
          && language == "en"][0].body[_key == ^._key][0].caption
      )
    }
  }
}
```

Params: `$slug`, `$language` (Sanity code, e.g. `"es"`), `$groupId`
(`translationGroupId`).
