const highlight = (content, query) => {
  if (!query || !query.trim()) {
    return content;
  }

  // Literal search ("example #1")
  if (query.at(0) === '"' && query.at(-1) === '"') {
    const word = query.slice(1, -1).trim();
    const regex = new RegExp(`\\b${word}\\b`, "giu");

    return content.replace(
      regex,
      (match) => `<span class="text-highlight">${match}</span>`
    );
  }

  // Non literal search (example #2) - separate each word
  const words = query.trim().split(" ");

  // Remove empty words (if any) - using for loop to go back one iteration if needed
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (!word.trim()) {
      words.splice(i, 1);
      i -= 1;
    }
  }

  // Avoid updating params
  let text = content;

  words.forEach((word) => {
    // Remove accents
    let wordRegex = word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replaceAll("n", "[n|ñ]");

    // Add regex for accents
    wordRegex = wordRegex.replaceAll("a", "(a|á)");
    wordRegex = wordRegex.replaceAll("e", "(e|é)");
    wordRegex = wordRegex.replaceAll("i", "(i|í)");
    wordRegex = wordRegex.replaceAll("o", "(o|ó)");
    wordRegex = wordRegex.replaceAll("u", "(u|ú)");

    const regex = new RegExp(`\\b${wordRegex}\\b`, "giu");

    // Search as is
    text = text.replace(
      regex,
      (match) => `<span class="text-highlight">${match}</span>`
    );
  });

  return text;
};
export default highlight;
