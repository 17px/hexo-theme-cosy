import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'es', // 使用 ES Module 格式
      sourcemap: true
    }
  ],
  plugins: [
    nodeResolve(), // 解析 node_modules 中的模块
    typescript()   // 编译 TypeScript
  ]
};
