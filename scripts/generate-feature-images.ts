import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Get API key from .env.local
const GEMINI_API_KEY = 'AIzaSyCco-_O5c5-cLRKeGO0jRCS2KHBh_Qj-zA'

// Feature definitions with image prompts based on Eazybe product understanding
const features = [
  {
    slug: 'cloud-backup',
    title: 'Cloud Backup',
    color: '#3B82F6',
    sections: [
      {
        badge: 'The Problem',
        prompt: 'Create an SVG illustration (800x500) showing data loss concept for a SaaS product. Dark slate background (#0f172a). Show scattered phone icons with WhatsApp message bubbles fading/disappearing into a void. Use blue accent (#3B82F6). Minimal, modern style. No text.'
      },
      {
        badge: 'Real-Time Sync',
        prompt: 'Create an SVG illustration (800x500) showing cloud sync concept. Dark background (#0f172a). Show WhatsApp chat bubbles flowing upward with sync arrows to a cloud icon with a checkmark. Blue glow effects (#3B82F6). Modern SaaS style. No text.'
      },
      {
        badge: 'Instant Search',
        prompt: 'Create an SVG illustration (800x500) showing search functionality. Dark background (#0f172a). Show a search magnifying glass over stacked chat message cards with one highlighted. Blue accent (#3B82F6). Clean minimal style. No text.'
      }
    ]
  },
  {
    slug: 'team-inbox',
    title: 'Team Inbox',
    color: '#10B981',
    sections: [
      {
        badge: 'Unified View',
        prompt: 'Create an SVG illustration (800x500) showing unified inbox dashboard. Dark background (#0f172a). Show a central inbox icon with multiple conversation cards arranged in a grid. Emerald green accents (#10B981). Modern dashboard style. No text.'
      },
      {
        badge: 'Team Visibility',
        prompt: 'Create an SVG illustration (800x500) showing team collaboration. Dark background (#0f172a). Show user avatars connected to a central hub with conversation routing lines. Green highlights (#10B981). Clean vector style. No text.'
      }
    ]
  },
  {
    slug: 'whatsapp-crm',
    title: 'WhatsApp CRM',
    color: '#8B5CF6',
    sections: [
      {
        badge: 'Native CRM',
        prompt: 'Create an SVG illustration (800x500) showing CRM in WhatsApp. Dark background (#0f172a). Show a WhatsApp chat window with a sidebar panel containing contact info and deal stages. Purple accents (#8B5CF6). Chrome extension UI style. No text.'
      },
      {
        badge: 'Deal Pipeline',
        prompt: 'Create an SVG illustration (800x500) showing sales pipeline. Dark background (#0f172a). Show a horizontal kanban board with cards moving through stages (prospect, qualified, negotiation, won). Violet highlights (#8B5CF6). No text.'
      }
    ]
  },
  {
    slug: 'revenue-inbox',
    title: 'Revenue Inbox',
    color: '#14B8A6',
    sections: [
      {
        badge: 'Deal Health',
        prompt: 'Create an SVG illustration (800x500) showing deal health dashboard. Dark background (#0f172a). Show deals as cards with health indicators (green/yellow/red dots). Teal accents (#14B8A6). Analytics dashboard style. No text.'
      },
      {
        badge: 'Opportunity Signals',
        prompt: 'Create an SVG illustration (800x500) showing AI signals. Dark background (#0f172a). Show sparkle/AI icons next to deal cards with trend arrows (up/down). Teal highlights (#14B8A6). Modern AI analytics style. No text.'
      }
    ]
  },
  {
    slug: 'whatsapp-copilot',
    title: 'WhatsApp Copilot',
    color: '#0EA5E9',
    sections: [
      {
        badge: 'AI Assistant',
        prompt: 'Create an SVG illustration (800x500) showing AI assistant. Dark background (#0f172a). Show a chat window with an AI sparkle icon suggesting a reply in a floating suggestion bubble. Sky blue AI glow (#0EA5E9). No text.'
      },
      {
        badge: 'Smart Summaries',
        prompt: 'Create an SVG illustration (800x500) showing conversation summary. Dark background (#0f172a). Show a chat thread with an AI-generated summary card floating above with bullet points. Blue highlights (#0EA5E9). No text.'
      }
    ]
  },
  {
    slug: 'quick-reply',
    title: 'Quick Replies',
    color: '#F59E0B',
    sections: [
      {
        badge: 'Template Library',
        prompt: 'Create an SVG illustration (800x500) showing template picker. Dark background (#0f172a). Show a popup with template message cards in a grid/list. Amber accents (#F59E0B). Productivity tool UI style. No text.'
      }
    ]
  },
  {
    slug: 'scheduler',
    title: 'Message Scheduler',
    color: '#EC4899',
    sections: [
      {
        badge: 'Schedule Messages',
        prompt: 'Create an SVG illustration (800x500) showing message scheduling. Dark background (#0f172a). Show a calendar/clock icon with a WhatsApp message being scheduled with a time indicator. Pink accents (#EC4899). No text.'
      }
    ]
  },
  {
    slug: 'rep-radar',
    title: 'Rep Radar',
    color: '#6366F1',
    sections: [
      {
        badge: 'Team Analytics',
        prompt: 'Create an SVG illustration (800x500) showing team performance dashboard. Dark background (#0f172a). Show bar charts and metrics with user avatars representing team members. Indigo accents (#6366F1). Analytics visualization style. No text.'
      }
    ]
  }
]

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateSVGWithGemini(prompt: string, featureName: string, sectionBadge: string, retryCount = 0): Promise<string | null> {
  const fullPrompt = `You are an expert SVG illustrator. Generate a complete, valid SVG code for the following:

${prompt}

Requirements:
- Output ONLY the SVG code, nothing else
- Use viewBox="0 0 800 500"
- Include proper defs for gradients and filters if needed
- Keep it minimal and modern
- Use the specified colors
- Make it visually appealing for a SaaS product page
- Add subtle glow effects where appropriate
- NO text elements in the SVG

Respond with ONLY the SVG code starting with <svg and ending with </svg>.`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: fullPrompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8192
          }
        })
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      if (response.status === 429 && retryCount < 3) {
        console.log(`    Rate limited, waiting 60s and retrying... (attempt ${retryCount + 1})`)
        await sleep(60000)
        return generateSVGWithGemini(prompt, featureName, sectionBadge, retryCount + 1)
      }
      console.error(`Gemini API error for ${featureName}/${sectionBadge}:`, errorText)
      return null
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      console.error(`No response text for ${featureName}/${sectionBadge}`)
      return null
    }

    // Extract SVG from response (in case there's markdown formatting)
    const svgMatch = text.match(/<svg[\s\S]*<\/svg>/i)
    if (svgMatch) {
      return svgMatch[0]
    }

    // Log first 500 chars of response for debugging
    console.error(`No valid SVG found in response for ${featureName}/${sectionBadge}`)
    console.error(`Response preview: ${text.substring(0, 500)}...`)
    return null
  } catch (error) {
    console.error(`Error generating SVG for ${featureName}/${sectionBadge}:`, error)
    return null
  }
}

async function main() {
  console.log('Starting feature image generation with Gemini...\n')

  // Create output directory
  const outputDir = path.join(__dirname, '..', 'generated-images')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const feature of features) {
    console.log(`\nProcessing ${feature.title}...`)

    for (const section of feature.sections) {
      console.log(`  Generating SVG for "${section.badge}"...`)

      const svgContent = await generateSVGWithGemini(
        section.prompt,
        feature.title,
        section.badge
      )

      if (svgContent) {
        const filename = `${feature.slug}-${section.badge.toLowerCase().replace(/\s+/g, '-')}.svg`
        const localPath = path.join(outputDir, filename)
        fs.writeFileSync(localPath, svgContent)
        console.log(`    ✓ Saved: ${filename}`)
      } else {
        console.log(`    ✗ Failed to generate`)
      }

      // Rate limiting - wait 15 seconds between requests to avoid quota issues
      await sleep(15000)
    }
  }

  console.log('\n✓ Done! Images saved to:', outputDir)
}

main().catch(console.error)
