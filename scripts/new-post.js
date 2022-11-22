import fs from 'fs-extra'
import path from 'path'
import dayjs from 'dayjs'
import pangu from 'pangu'

// npm run new:post name [tag1] [tag2] ...
const createPost = async () => {
  const [, , filename, ...tags] = process.argv

  await fs.outputFile(
    path.resolve(
      process.cwd(),
      `./posts/${dayjs().format('YYYY-MM-DD')}-${filename}.mdx`
    ),
    `
    ---
      title: '${pangu.spacing(filename)}'
      date: '${dayjs().format('YYYY-MM-DD HH:mm:ss')}'
      tags:${tags.map(tag => `\n  - '${tag}'`).join('')}
    ---
    `
  )
}

createPost()
