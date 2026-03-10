import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:/Users/PC/Downloads/Dinero PAVI';
const targetDir = './public/images/pavi';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const fileMap = {
    '01 PAVI.png': '1_front.webp',
    '01 PAVI (Cara Detras).png': '1_back.webp',
    '05 PAVI.png': '5_front.webp',
    '05 PAVI (Cara Detras).png': '5_back.webp',
    '10 PAVI.png': '10_front.webp',
    '10 PAVI (Cara Detras).png': '10_back.webp',
    '20 PAVI.png': '20_front.webp',
    '20 PAVI (Cara Detras).png': '20_back.webp',
    '50 PAVI.png': '50_front.webp',
    '50 PAVI (Cara Detras).png': '50_back.webp',
    '100 PAVI.png': '100_front.webp',
    '100 PAVI (Cara Detras).png': '100_back.webp',
    '200 PAVI.png': '200_front.webp',
    '200 PAVI (Cara Detras).png': '200_back.webp'
};

const rawFiles = fs.readdirSync(sourceDir);

async function processImages() {
    for (const file of rawFiles) {
        if (!fileMap[file]) {
            console.log('Skipping ' + file);
            continue;
        }
        
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, fileMap[file]);
        
        console.log('Compressing ' + file + ' -> ' + fileMap[file] + '...');
        try {
            await sharp(sourcePath)
                .webp({ quality: 80 })
                .resize({ width: 1200 })
                .toFile(targetPath);
            console.log('Saved ' + targetPath);
        } catch (err) {
            console.error('Error processing ' + file + ':', err);
        }
    }
}
processImages();
