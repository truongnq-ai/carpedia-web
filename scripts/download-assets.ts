import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '../public/images');

// Data definition
const COUNTRIES = [
    { slug: 'japan', code: 'jp' },
    { slug: 'germany', code: 'de' },
    { slug: 'united-states', code: 'us' },
    { slug: 'italy', code: 'it' },
    { slug: 'france', code: 'fr' },
    { slug: 'south-korea', code: 'kr' },
    { slug: 'united-kingdom', code: 'gb' },
    { slug: 'sweden', code: 'se' },
    { slug: 'china', code: 'cn' },
    { slug: 'czech-republic', code: 'cz' },
];

const BRAND_LOGOS: Record<string, string> = {
    'toyota': 'toyota',
    'honda': 'honda',
    'nissan': 'nissan',
    'mazda': 'mazda',
    'subaru': 'subaru',
    'bmw': 'bmw',
    'mercedes-benz': 'mercedes-benz',
    'audi': 'audi',
    'volkswagen': 'volkswagen',
    'porsche': 'porsche',
    'ford': 'ford',
    'chevrolet': 'chevrolet',
    'tesla': 'tesla',
    'ferrari': 'ferrari',
    'lamborghini': 'lamborghini',
    'fiat': 'fiat',
    'peugeot': 'peugeot',
    'renault': 'renault',
    'hyundai': 'hyundai',
    'kia': 'kia',
};

const BODY_TYPES = [
    'sedan',
    'suv',
    'hatchback',
    'pickup',
    'convertible',
    'minivan',
    'coupe'
];

async function downloadFile(url: string, outputPath: string) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            timeout: 10000,
        });

        await fs.ensureDir(path.dirname(outputPath));
        const writer = fs.createWriteStream(outputPath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading ${url}:`, error instanceof Error ? error.message : error);
        // Fallback handled by caller or separate logic
        return false;
    }
}

async function createPlaceholderImage(text: string, outputPath: string, bgColor = 'e2e8f0', textColor = '475569') {
   // Use placehold.co for real PNG/JPG generation
   // Dimensions: 800x600 for consistency
   const ext = path.extname(outputPath).substring(1); // png or jpg
   const url = `https://placehold.co/800x600/${bgColor}/${textColor}.${ext}?text=${encodeURIComponent(text)}`;
   
   console.log(`Generating placeholder for ${text} at ${outputPath}...`);
   await downloadFile(url, outputPath);
}

async function main() {
    console.log('🚀 Starting asset download (Standardization: PNG/JPG)...');

    // 1. Countries -> JPG Hero, SVG Flag
    console.log('⬇️  Processing Countries...');
    for (const country of COUNTRIES) {
        // Flag (SVG)
        const flagUrl = `https://flagcdn.com/${country.code}.svg`;
        const flagDest = path.join(PUBLIC_DIR, 'countries', country.slug, 'flag.svg');
        if (!fs.existsSync(flagDest)) {
             await downloadFile(flagUrl, flagDest);
        }
        
        // Hero (JPG) - Photos for countries
        const heroDest = path.join(PUBLIC_DIR, 'countries', country.slug, 'hero.jpg');
        if (!fs.existsSync(heroDest)) {
             // Reddish background for country placeholder
             await createPlaceholderImage(country.slug.toUpperCase(), heroDest, 'fee2e2', '991b1b');
        }
    }

    // 2. Brands -> PNG Hero (Transparent ideal), SVG Logo
    console.log('⬇️  Processing Brands...');
    const logoBaseUrl = 'https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/optimized';
    
    for (const [slug, filename] of Object.entries(BRAND_LOGOS)) {
        // Logo (SVG)
        const logoUrl = `${logoBaseUrl}/${filename}.svg`;
        const logoDest = path.join(PUBLIC_DIR, 'brands', slug, 'logo.svg');
        if (!fs.existsSync(logoDest)) {
             const success = await downloadFile(logoUrl, logoDest);
             if (success === false) {
                 // Fallback for logo if 404
                 await createPlaceholderImage(slug.substr(0, 2).toUpperCase(), logoDest.replace('.svg', '.png'), 'e2e8f0', '475569');
                 // Note: we might leave it as png if svg fails, but scaffolding needs to know. 
                 // For simplicity, let's assume we might just use text in scaffolding if logo missing? 
                 // Or we generate a placeholder SVG manually?
                 // Let's stick to generating a placeholder SVG locally to keep extension .svg
                 const svgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="#e2e8f0" /><text x="50%" y="50%" text-anchor="middle" dy=".3em">${slug.substring(0,2).toUpperCase()}</text></svg>`;
                 await fs.writeFile(logoDest, svgContent);
             }
        }

        // Hero (PNG) - Cars
        const heroDest = path.join(PUBLIC_DIR, 'brands', slug, 'hero.png');
        if (!fs.existsSync(heroDest)) {
             // Blueish background for brand placeholder
             await createPlaceholderImage(slug.toUpperCase(), heroDest, 'dbeafe', '1e40af');
        }
    }

    // 3. Body Types -> PNG Hero
    console.log('🎨 Processing Body Types...');
    for (const type of BODY_TYPES) {
        const dest = path.join(PUBLIC_DIR, 'body-types', type, 'hero.png');
         if (!fs.existsSync(dest)) {
             // Greenish background for body type
             await createPlaceholderImage(type.toUpperCase(), dest, 'd1fae5', '065f46');
        }
    }

    console.log('✅ Asset download complete!');
}

main().catch(console.error);
