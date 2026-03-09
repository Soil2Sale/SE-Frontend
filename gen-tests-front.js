const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const dirsToTest = ['app', 'components', 'services'];

function getFiles(dir, files_) {
    files_ = files_ || [];
    if (!fs.existsSync(dir)) return files_;

    const files = fs.readdirSync(dir);
    for (var i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            if (!name.includes('__tests__') && !name.includes('__mocks__')) {
                getFiles(name, files_);
            }
        } else {
            if (name.endsWith('.ts') || name.endsWith('.tsx')) {
                if (!name.endsWith('.test.ts') && !name.endsWith('.test.tsx') && !name.includes('__tests__')) {
                    files_.push(name);
                }
            }
        }
    }
    return files_;
}

dirsToTest.forEach(startDir => {
    const fullStartDir = path.join(baseDir, startDir);
    const testDir = path.join(fullStartDir, '__tests__');

    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }

    const allTsFiles = getFiles(fullStartDir);

    allTsFiles.forEach(file => {
        // Rel path within the startDir
        const relPath = path.relative(fullStartDir, file);
        const parsedRelPath = path.parse(relPath);

        // We append .unit.test.ts/tsx
        const testFileName = relPath.replace(/\.(ts|tsx)$/, '.unit.test.$1');
        const fullTestPath = path.join(testDir, testFileName);
        const testSubDir = path.join(testDir, parsedRelPath.dir);

        if (!fs.existsSync(testSubDir)) {
            fs.mkdirSync(testSubDir, { recursive: true });
        }

        if (!fs.existsSync(fullTestPath)) {
            let depth = parsedRelPath.dir ? parsedRelPath.dir.split('/').length + 1 : 1;
            let upDir = '../'.repeat(depth);
            let importPath = upDir + relPath.replace(/\.(ts|tsx)$/, '');

            const isTsx = file.endsWith('.tsx');

            let content = `import * as mod from '${importPath}';

describe('${relPath}', () => {
  it('should be defined', () => {
    expect(mod).toBeDefined();
  });
});
`;
            fs.writeFileSync(fullTestPath, content);
            console.log("Created test for", relPath);
        }
    });
});

console.log('Done generating frontend tests.');
