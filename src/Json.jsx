import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import styled from '@emotion/styled'
import 'prismjs/components/prism-json.min'

import 'prismjs/themes/prism-coy.css'

const fakeCode = `{
  "name": "appgenerator",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build:react": "tsc && vite build",
    "preview": "vite preview",
    "asbuild:debug": "asc assembly/index.ts --target debug",
    "asbuild:release": "asc assembly/index.ts --target release",
    "asbuild": "npm run asbuild:debug && npm run asbuild:release",
    "test": "node tests",
    "start": "npx serve ."
  },
  "dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mantine/core": "^4.2.4",
    "@mantine/hooks": "^4.2.4",
    "@mantine/next": "^4.2.4",
    "@mantine/prism": "^4.2.4",
    "core-js": "^3.22.4",
    "firebase": "^9.7.0",
    "jquery": "^3.6.0",
    "lodash": "^4.17.21",
    "prismjs": "^1.28.0",
    "query-string": "^7.1.1",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-icons": "^4.3.1",
    "react-router-dom": "6",
    "react-simple-code-editor": "^0.11.0",
    "react-syntax-highlighter": "^15.5.0",
    "react-use": "^17.3.2"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^1.3.0",
    "assemblyscript": "^0.20.6",
    "typescript": "^4.6.3",
    "vite": "^2.9.7"
  },
  "type": "module",
  "exports": {
    ".": {
      "import": "./build/release.js",
      "types": "./build/release.d.ts"
    }
  }
}
`;

const Container = styled.div`
  overflow-y: scroll !important;
  max-height: 610px;
`

export function Json() {
  const [code, setCode] = useState(fakeCode)

  return (
    <Container>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.json, "json")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          minHeight: 600,
        }}
      />
    </Container>
  );
}