import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/styles/hljs';

type CodeBlockProps = {
  code: string;
  language?: string;
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'javascript' }) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
    >
      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        highlighter="hljs"
        customStyle={styles.codeStyle}
      >
        {code}
      </SyntaxHighlighter>
    </ScrollView>
  );
};

export default CodeBlock;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  codeStyle: {
    borderRadius: 8,
    padding: 12,
    minWidth: 300,
  },
});
