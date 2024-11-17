import typescript from '@rollup/plugin-typescript';

export default {
  input: ['src/LastClient.ts', 'src/error/LastfmError.ts'],
  output: {
    dir: 'dist',
    format: 'es'
  },
  plugins: [typescript()]
};