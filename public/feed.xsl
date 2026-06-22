<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:atom="http://www.w3.org/2005/Atom"
                xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          <xsl:value-of select="/rss/channel/title"/> · RSS Feed
        </title>
        <meta name="robots" content="noindex" />
        <style>
          :root {
            --ink: #0F1115;
            --ink-2: #2A2E38;
            --ink-3: #5A6070;
            --paper: #FBFCFE;
            --bg: #F5F7FC;
            --accent: #5B4BAE;
            --line: #E4E8F1;
          }
          * { box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            color: var(--ink);
            background: var(--bg);
            margin: 0;
            padding: 32px 16px 64px;
            -webkit-font-smoothing: antialiased;
            line-height: 1.55;
          }
          .feed-wrap { max-width: 760px; margin: 0 auto; }
          .feed-callout {
            background: var(--accent);
            color: #fff;
            padding: 14px 18px;
            border-radius: 10px;
            font-size: 13px;
            line-height: 1.5;
            margin-bottom: 24px;
            display: flex;
            gap: 10px;
            align-items: flex-start;
          }
          .feed-callout-icon {
            flex-shrink: 0;
            width: 18px;
            height: 18px;
            margin-top: 1px;
          }
          .feed-callout a {
            color: #fff;
            text-decoration: underline;
            font-weight: 500;
          }
          .feed-header {
            display: flex;
            align-items: center;
            gap: 16px;
            padding-bottom: 22px;
            border-bottom: 1px solid var(--line);
            margin-bottom: 28px;
          }
          .feed-logo {
            width: 56px;
            height: 56px;
            border-radius: 10px;
            background: #fff;
            border: 1px solid var(--line);
            object-fit: contain;
            padding: 6px;
            flex-shrink: 0;
          }
          .feed-title {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: -0.015em;
            margin: 0 0 4px;
            color: var(--ink);
          }
          .feed-desc {
            margin: 0;
            font-size: 14px;
            color: var(--ink-3);
            line-height: 1.5;
          }
          .feed-meta {
            margin-top: 6px;
            font-size: 12px;
            color: var(--ink-3);
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .feed-items {
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .feed-item {
            background: var(--paper);
            border: 1px solid var(--line);
            border-radius: 12px;
            padding: 20px 22px;
            transition: border-color .2s, transform .2s;
          }
          .feed-item:hover {
            border-color: color-mix(in oklab, var(--accent) 35%, var(--line));
          }
          .feed-item-title {
            font-size: 18px;
            font-weight: 700;
            line-height: 1.35;
            margin: 0 0 10px;
            letter-spacing: -0.01em;
          }
          .feed-item-title a {
            color: var(--ink);
            text-decoration: none;
          }
          .feed-item-title a:hover { color: var(--accent); }
          .feed-item-meta {
            font-size: 12px;
            color: var(--ink-3);
            font-family: 'JetBrains Mono', ui-monospace, monospace;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            margin-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .feed-item-meta-sep { color: color-mix(in oklab, var(--ink-3) 50%, transparent); }
          .feed-item-desc {
            font-size: 15px;
            color: var(--ink-2);
            margin: 0 0 12px;
            line-height: 1.6;
          }
          .feed-item-link {
            font-size: 13px;
            color: var(--accent);
            font-weight: 500;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
          }
          .feed-item-link:hover { text-decoration: underline; }
          .feed-empty {
            background: var(--paper);
            border: 1px dashed var(--line);
            border-radius: 12px;
            padding: 48px 24px;
            text-align: center;
            color: var(--ink-3);
          }
          @media (max-width: 540px) {
            body { padding: 20px 12px 40px; }
            .feed-title { font-size: 22px; }
            .feed-item { padding: 16px 18px; }
          }
        </style>
      </head>
      <body>
        <div class="feed-wrap">
          <div class="feed-callout">
            <svg class="feed-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            <div>
              This is an <strong>RSS feed</strong>. Paste this page&#8217;s URL into a feed reader
              (Feedly, Inoreader, NetNewsWire) to subscribe and get every new post automatically.
              Prefer to just browse? Visit
              <a><xsl:attribute name="href"><xsl:value-of select="/rss/channel/link"/></xsl:attribute>the blog</a>.
            </div>
          </div>

          <div class="feed-header">
            <xsl:if test="/rss/channel/image/url">
              <img class="feed-logo" alt="">
                <xsl:attribute name="src"><xsl:value-of select="/rss/channel/image/url"/></xsl:attribute>
              </img>
            </xsl:if>
            <div>
              <h1 class="feed-title"><xsl:value-of select="/rss/channel/title"/></h1>
              <p class="feed-desc"><xsl:value-of select="/rss/channel/description"/></p>
              <div class="feed-meta">
                <xsl:value-of select="count(/rss/channel/item)"/> posts
                · last updated <xsl:value-of select="/rss/channel/lastBuildDate"/>
              </div>
            </div>
          </div>

          <xsl:choose>
            <xsl:when test="count(/rss/channel/item) = 0">
              <div class="feed-empty">No posts yet. Check back soon.</div>
            </xsl:when>
            <xsl:otherwise>
              <div class="feed-items">
                <xsl:for-each select="/rss/channel/item">
                  <article class="feed-item">
                    <h2 class="feed-item-title">
                      <a>
                        <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                        <xsl:value-of select="title"/>
                      </a>
                    </h2>
                    <div class="feed-item-meta">
                      <xsl:if test="dc:creator">
                        <span><xsl:value-of select="dc:creator"/></span>
                        <span class="feed-item-meta-sep">·</span>
                      </xsl:if>
                      <span><xsl:value-of select="pubDate"/></span>
                      <xsl:if test="category">
                        <span class="feed-item-meta-sep">·</span>
                        <span><xsl:value-of select="category"/></span>
                      </xsl:if>
                    </div>
                    <p class="feed-item-desc"><xsl:value-of select="description"/></p>
                    <a class="feed-item-link">
                      <xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute>
                      Read post →
                    </a>
                  </article>
                </xsl:for-each>
              </div>
            </xsl:otherwise>
          </xsl:choose>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
