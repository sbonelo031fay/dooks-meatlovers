/** Browser storage is untrusted. Persist only a small, deduplicated set of IDs. */
export function parseSavedIds(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? 'null');
    if (!Array.isArray(value)) return [];
    return [...new Set(value.filter((id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 128))].slice(0, 500);
  } catch { return []; }
}
