import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = './public/images/pavi';
const targetDir = './public/images/pavi2';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);

const processFiles = async () => {
    for (const file of files) {
        if (!file.endsWith('.webp')) continue;

        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);

        console.log(`Compressing ${file}...`);
        
        await sharp(sourcePath)
            .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 60, effort: 6 })
            .toFile(targetPath);
    }
}

processFiles().then(() => console.log('Done')).catch(console.error);
