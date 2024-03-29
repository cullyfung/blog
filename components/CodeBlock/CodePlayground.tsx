import LivePreview from '@/components/playground/LivePreview'
import LiveProvider, {
  LiveProviderProps
} from '@/components/playground/LiveProvider'
import classNames from 'classnames'
import React from 'react'
import LazyLoad from 'react-lazyload'
import styles from './CodePlayground.module.scss'
import Editor from './Editor'
import { scope as builtInScope } from './react-live-scope'

const CodePlayground: React.FC<{
  code: string
  language: LiveProviderProps['language']
  scope: LiveProviderProps['scope']
  editor: boolean
}> = props => {
  const { code, language, scope, editor = true } = props

  return (
    <div className="code-playground relative border border-2 border-slate-500">
      <div
        className={classNames(
          styles.codeBlock,
          'max-h-[300px] sm:max-h-[500px]'
        )}
      >
        <LiveProvider
          language={language}
          defaultCode={code}
          scope={{ ...builtInScope, ...scope }}
        >
          {/* 编辑器 */}
          {editor && (
            <div className={classNames(styles.editorWrap)}>
              <div
                className={styles.editorBody}
                style={{ background: '#282a36', color: '#fff' }}
              >
                <Editor className={styles.editor} />
              </div>
            </div>
          )}
          {/* 预览 */}
          <LazyLoad className={styles.previewWrap}>
            {/* 避免 tailwindcss preflight 影响到 preview 组件 */}
            <div className={classNames(styles.previewBody, 'unreset')}>
              <LivePreview />
            </div>
          </LazyLoad>
        </LiveProvider>
      </div>
    </div>
  )
}

export default CodePlayground
