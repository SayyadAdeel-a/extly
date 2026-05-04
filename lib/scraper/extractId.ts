export function extractChromeId(input: string): string | null {
  const trimmed = input.trim()

  // 1. Direct 32-char lowercase ID
  if (/^[a-z]{32}$/.test(trimmed)) return trimmed

  // 2. New Chrome Web Store URL format
  // Handles:
  // /detail/name/ID
  // /detail/ID
  const newUrlMatch = trimmed.match(
    /chromewebstore\.google\.com\/detail\/(?:[^/]+\/)?([a-z]{32})/i
  )
  if (newUrlMatch) return newUrlMatch[1]

  // 3. Old Chrome Web Store URL format
  // Handles:
  // /webstore/detail/name/ID
  // /webstore/detail/ID
  const oldUrlMatch = trimmed.match(
    /chrome\.google\.com\/webstore\/detail\/(?:[^/]+\/)?([a-z]{32})/i
  )
  if (oldUrlMatch) return oldUrlMatch[1]

  return null
}

export function isValidChromeId(id: string): boolean {
  return /^[a-z]{32}$/.test(id)
}
