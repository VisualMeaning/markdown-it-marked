/*
 * Plain text extractor for markdown-it.
 *
 * https://github.com/wavesheep/markdown-it-plain-text
 */

export function plainTextPlugin(md) {

  const scan = function (tokens) {
    let text = '';
    const tokenTypes = ['text', 'fence', 'html_block', 'code_block', 'code_inline', 'html_inline', 'emoji'];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.children !== null) {
        text += scan(token.children);
      } else {
        if (tokenTypes.includes(token.type)) {
          text += token.content;
        } else if (/[a-zA-Z]+_close/.test(token.type)) { // prevent words from sticking together
          text += " ";
        }
      }
    }

    return text;
  };

  const plainTextRule = function (state) {
    const text = scan(state.tokens);
    // remove redundant white spaces
    md.plainText = text.replace(/\s+/g, " ");
  };

  md.core.ruler.push('plainText', plainTextRule);
}
