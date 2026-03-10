import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:/Users/PC/Downloads/Dinero PAVI';
const targetDir = './public/images/pavi';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

const processFiles = async () => {
    for (const file of files) {
        if (!file.endsWith('.png')) continue;

        const isBack = file.includes('(Cara Detras)');
        let denomMatch = file.match(/^0?(\d+)/);
        if (!denomMatch) continue;

        // E.g., '01', '05', '100', '2'
        let actualDenom = file.split(' ')[0];
        let suffix = isBack ? 'back' : 'front';
        let targetName = actualDenom + '_' + suffix + '.webp';

        console.log(`Converting ${file} to ${targetName}`);
        await sharp(path.join(sourceDir, file))
            .webp({ quality: 80 })
            .toFile(path.join(targetDir, targetName));
    }
}
processFiles().then(() => console.log('Done'));
