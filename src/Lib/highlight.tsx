const highlight = (content, query) => {
  console.log("content- ", content, "   -typeof-  ", typeof content);
  console.log("query- ", query, "   -typeof-  ", typeof query);

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

// const highlight = (content: string, query: string): string => {
//   // Ensure that content is a string
//   if (typeof content !== "string") {
//     console.error("Expected content to be a string, but got:", typeof content);
//     return content; // Return the content as-is if it's not a string
//   }

//   // Ensure that query is a valid string
//   if (typeof query !== "string" || !query.trim()) {
//     return content;
//   }

//   // Literal search ("example #1")
//   if (query.at(0) === '"' && query.at(-1) === '"') {
//     const word = query.slice(1, -1).trim();
//     const regex = new RegExp(`\\b${word}\\b`, "giu");

//     // Avoid double wrapping
//     return content.replace(regex, (match) => {
//       if (match.includes('<span class="text-highlight">')) {
//         return match; // Return as-is if already highlighted
//       }
//       return `<span class="text-highlight">${match}</span>`;
//     });
//   }

//   // Non-literal search (example #2) - separate each word
//   const words = query.trim().split(" ");

//   // Remove empty words (if any) - using for loop to go back one iteration if needed
//   for (let i = 0; i < words.length; i += 1) {
//     const word = words[i];
//     if (!word.trim()) {
//       words.splice(i, 1);
//       i -= 1;
//     }
//   }

//   // Avoid updating params
//   let text = content;

//   words.forEach((word) => {
//     // Remove accents
//     let wordRegex = word
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "")
//       .replaceAll("n", "[n|ñ]");

//     // Add regex for accents
//     wordRegex = wordRegex.replaceAll("a", "(a|á)");
//     wordRegex = wordRegex.replaceAll("e", "(e|é)");
//     wordRegex = wordRegex.replaceAll("i", "(i|í)");
//     wordRegex = wordRegex.replaceAll("o", "(o|ó)");
//     wordRegex = wordRegex.replaceAll("u", "(u|ú)");

//     const regex = new RegExp(`\\b${wordRegex}\\b`, "giu");

//     // Search and highlight
//     text = text.replace(regex, (match) => {
//       if (match.includes('<span class="text-highlight">')) {
//         return match; // If already highlighted, return as-is
//       }
//       return `<span class="text-highlight">${match}</span>`;
//     });
//   });

//   return text;
// };
// export default highlight;
