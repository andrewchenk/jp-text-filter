import React, { useState } from 'react';
import CSS from 'csstype';

const containerStyle:  CSS.Properties = {
  fontSize: "1em",
  margin:"2em auto",
  maxWidth:"1000px",
  fontFamily: "sans-serif"
};

const bigTextStyle:  CSS.Properties = {
  fontSize: "1.5em",
  fontFamily: "sans-serif"
};

const JapaneseTextFilter: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [japaneseText, setJapaneseText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    setInputText(value);

    // Regex to match Japanese characters and punctuation
    const japaneseRegex = /([\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF01-\uFF60\uFFE0-\uFFE6\u4E00-\u9FAF]+)|([？！。＂＃＄％＆’（）＊＋，－．／：；＜＝＞＠［＼］＾＿｀｛｜｝～「」])/g;
    const matchedJapanese = value.match(japaneseRegex) || [];
    
    // Join the matched parts with a line break
    setJapaneseText(matchedJapanese.join('\n'));

    
  };

  const handleCopyToClipboard = (): void => {
    // Asynchronously write our text to the clipboard
    navigator.clipboard.writeText(japaneseText)
      .then(() => alert("Text copied to clipboard"))
      .catch((err) => console.error("Failed to copy text to clipboard", err));
  };



  return (
    <div style={containerStyle}>
      <h1>Japanese Text Filter</h1>

      <p>A web app that isolates Japanese text from mixed text (for example, a subtitle file). For use with Yomichan/Yomibaba.</p>
      <h2>Input</h2>
      <textarea
        value={inputText}
        onChange={handleTextChange}
        placeholder="Type or paste text here"
        rows={20}
        cols={100}
      />
      <div>
        <h2>Output</h2>
        <p>Will only contain Japanese characters and punctuation ？！。＂＃＄％＆’（）＊＋，－．／：；＜＝＞＠［＼］＾＿｀｛｜｝～「」</p>
        <button onClick={handleCopyToClipboard}>Copy Output to Clipboard</button>
        <pre style={bigTextStyle}>{japaneseText}</pre>

      </div>
    </div>
  );
};

export default JapaneseTextFilter;