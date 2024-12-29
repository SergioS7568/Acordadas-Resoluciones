export const highlight = (content: string, query: string): string => {
  if (!query || !query.trim()) {
    return content; // Return original content if no query
  }

  // Literal search ("example #1")
  if (query.at(0) === '"' && query.at(-1) === '"') {
    const word = query.slice(1, -1).trim();
    const regex = new RegExp(`\\b${word}\\b`, "giu"); // Fix RegExp here

    return content.replace(
      regex,
      (match) => `<span class="text-highlight">${match}</span>`
    );
  }

  // Non-literal search (example #2) - separate each word
  const words = query.trim().split(" ");

  // Remove empty words (if any)
  const cleanedWords = words.filter((word) => word.trim() !== "");

  let text = content;

  cleanedWords.forEach((word) => {
    // Remove accents
    let wordRegex = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Normalize accents
      .replaceAll("n", "[n|ñ]");

    // Add regex for accents
    wordRegex = wordRegex.replaceAll("a", "(a|á)");
    wordRegex = wordRegex.replaceAll("e", "(e|é)");
    wordRegex = wordRegex.replaceAll("i", "(i|í)");
    wordRegex = wordRegex.replaceAll("o", "(o|ó)");
    wordRegex = wordRegex.replaceAll("u", "(u|ú)");

    const regex = new RegExp(`\\b${wordRegex}\\b`, "giu"); // Fix RegExp here

    // Search and highlight
    text = text.replace(
      regex,
      (match) => `<span class="text-highlight">${match}</span>`
    );
  });

  return text;
};
export default highlight;
