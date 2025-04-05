declare module 'react-native-syntax-highlighter' {
    import * as React from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface SyntaxHighlighterProps {
      language: string;
      style: object;
      highlighter?: 'hljs' | 'prism';
      customStyle?: ViewStyle;
      codeTagProps?: object;
      fontFamily?: string;
      fontSize?: number;
      children: string;
    }
  
    const SyntaxHighlighter: React.FC<SyntaxHighlighterProps>;
  
    export default SyntaxHighlighter;
  }
  