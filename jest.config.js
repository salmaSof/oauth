module.exports = {
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleFileExtensions:[
        'js',
        'ts',
        'tsx'
    ],
    testMatch: [
        '**/*.spec.+(ts|tsx|js)'
    ],
    testEnvironment: 'node',
    setupTestFrameworkScriptFile: "./test/setup.ts"
}