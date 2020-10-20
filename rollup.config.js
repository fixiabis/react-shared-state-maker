import typescript from 'rollup-plugin-typescript2';

const tsconfigDefaults = { compilerOptions: { declaration: true } };

const rollupConfigs = [
  {
    input: './src/index.ts',

    plugins: [
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigDefaults,
      }),
    ],

    output: {
      file: 'lib/index.js',
      format: 'cjs',
      indent: true,
    },
  },
];

export default rollupConfigs;
