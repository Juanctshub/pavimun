import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceDir = 'C:/Users/PC/Downloads/Dinero PAVI';
const targetDir = './public/images/pavi';

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.png'));

async function processImages() {
    for (const file of files) {
        const sourcePath = path.join(sourceDir, file);
        // Change extension to webp
        const targetPath = path.join(targetDir, file.replace('.png', '.webp'));
        
        console.log(Compressing ...);
        try {
            await sharp(sourcePath)
                .webp({ quality: 80 })
                .resize({ width: 1200 }) // reasonable max width for web
                .toFile(targetPath);
            console.log(Saved );
        } catch (err) {
            console.error(Error processing :, err);
        }
    }
}
processImages();
