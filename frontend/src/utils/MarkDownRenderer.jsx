class MarkdownRenderer {
  constructor() {
    this.rules = [
        { pattern: /(\*\*|__)(.*?)\1/g, replacement: '<strong>$2</strong>' }, // Bold
      { pattern: /(\*|_)(.*?)\1/g, replacement: '<em>$2</em>' }, // Italic
      { pattern: /!\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<img src="$2" alt="$1">' }, // Image
      { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2">$1</a>' }, // Link
      { pattern: /^###### (.*)$/gm, replacement: '<h6>$1</h6>' }, // Heading 6
      { pattern: /^##### (.*)$/gm, replacement: '<h5>$1</h5>' }, // Heading 5
      { pattern: /^#### (.*)$/gm, replacement: '<h4>$1</h4>' }, // Heading 4
      { pattern: /^### (.*)$/gm, replacement: '<h3>$1</h3>' }, // Heading 3
      { pattern: /^## (.*)$/gm, replacement: '<h2>$1</h2>' }, // Heading 2
      { pattern: /^# (.*)$/gm, replacement: '<h1>$1</h1>' }, // Heading 1
      { pattern: /`([^`]+)`/g, replacement: '<code>$1</code>' }, // Inline code
      { pattern: /\n$/g, replacement: '<br>' }, // Line break
      { pattern: /(?:^|\n)([^\n]+)(?=\n|$)/g, replacement: '<p>$1</p>' } // Paragraphs
    ];
  }

  render(markdown) {
    let html = markdown;
    this.rules.forEach(rule => {
      html = html.replace(rule.pattern, rule.replacement);
    });
    return html;
  }
}

export default MarkdownRenderer