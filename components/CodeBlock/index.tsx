import CodePlayground from '@/components/CodeBlock/CodePlayground'
import FencedCodeBlock from '@/components/CodeBlock/FencedCodeBlock'
import { NativeProps } from '@/utils/native-props'
import { Language } from 'prism-react-renderer'
import React from 'react'
import { scope as builtInScope } from './react-live-scope'

export interface CodeBlockProps extends NativeProps {
  children?: string
  live?: boolean
  editor?: boolean
  height?: number
  scope?: Record<string, any>
}

const CodeBlock: React.FC<CodeBlockProps> = props => {
  const { children, className, live, editor = true, scope = {} } = props
  const language = className?.replace(/language-/, '') as Language

  if (!children) return null
  // 没有语言并且内容结尾不是换行，则表明它是 `code` 写法，而不是代码块
  if (!language && !children.endsWith('\n')) return <code>{children}</code>
  if (!live)
    return <FencedCodeBlock language={language} code={children.trim()} />

  return (
    <CodePlayground
      code={children.trim()}
      language={language}
      scope={{ ...builtInScope, ...scope }}
      editor={editor}
    />
  )
}

export default CodeBlock
