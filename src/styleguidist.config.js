module.exports = {
    components: 'src/**/*.{ts,tsx}',
    ignore: [
        'src/setupTests.ts',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.d.ts'
    ],
    propsParser: require('react-docgen-typescript').parse,
    webpackConfig: require('react-scripts-ts/config/webpack.config.dev.js')
};
