import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import del from 'rollup-plugin-delete';


export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true
    },
    plugins: [del({ targets: 'dist/*' }), nodeResolve(), typescript(), postcss({ extract: true })],
  },
  // {
  //   input: 'src/styles/var.less',
  //   output: { file: 'dist/styles/var.css' },
  //   plugins: [postcss({ extract: true })]
  // },
  // {
  //   input: 'src/styles/normalize.less',
  //   output: { file: 'dist/styles/normalize.css' },
  //   plugins: [postcss({ extract: true })]
  // },
];