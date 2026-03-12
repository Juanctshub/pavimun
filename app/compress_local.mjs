import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './public/images/pavi';
const files = fs.readdirSync(dir);

const processFiles = async () => {
    for (const file of files) {
        if (!file.endsWith('.webp')) continue;

        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, 'temp_' + file);

        console.log(`Compressing ${file}...`);
        
        await sharp(filePath)
            .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 60, effort: 6 })
            .toFile(tempPath);
            
        fs.renameSync(tempPath, filePath);
    }
}

processFiles().then(() => console.log('All images compressed successfully!')).catch(console.error);
