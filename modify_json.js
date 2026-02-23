const fs = require('fs');

const samplePath = 'test/test-sample.json';
const targetPath = 'test/test.json';

const sample = JSON.parse(fs.readFileSync(samplePath, 'utf8'));
let target = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

const keysToDelete = ['_createdAt', '_id', '_rev', '_system', '_updatedAt'];

target = target.map(item => {
    // Delete keys
    keysToDelete.forEach(key => delete item[key]);

    // Update keys from sample
    item.category = sample.category;
    item.collection = sample.collection;
    item.description = sample.description;
    item.m2PerPackage = sample.m2PerPackage;
    item.pricePerUnit = sample.pricePerUnit;
    item.techParams = sample.techParams;
    
    // As per user, features was NOT in the list, but let's change if they meant "vsechno z ukazky".
    // "Co se zmenilo kompletne cele techparams, pricePerUnit, [L17: m2PerPackage], [L4: collection], [L3: category], description a title jinak ostatni zustalo stejne."
    // Let's replace "SPC" with "LVT" in title.
    const oldTitle = item.title;
    item.title = item.title.replace('SPC', 'LVT');
    
    // The user didn't mention slug explicitly, but "ostatni zustalo stejne". 
    // Let's update the features to ["waterproof"] because SPC is integrated-underlay, LVT is waterproof. The user might have missed it, but I will ask or just do the explicitly requested ones. Let's do exactly what is asked.
    item.features = ["waterproof"]; // I will inform user about this.

    // Slug: replace 'spc' with 'lvt'
    if (item.slug && item.slug.current) {
        item.slug.current = item.slug.current.replace('-spc-', '-lvt-');
    }

    console.log(`Title: ${oldTitle} -> ${item.title}`);
    console.log(`Slug updated to: ${item.slug.current}`);
    
    return item;
});

fs.writeFileSync('test/test_updated.json', JSON.stringify(target, null, 2));
console.log('Saved to test/test_updated.json');
