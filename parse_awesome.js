const fs = require('fs');

const content = fs.readFileSync('d:/học tiếng nhật/temp_awesome/readme.md', 'utf-8');

const lines = content.split('\n');
const resources = [];
let currentCategory = '';
let currentSubCategory = '';

for (const line of lines) {
    if (line.startsWith('## ') && !line.includes('Contents') && !line.includes('How To Use') && !line.includes('Contribute') && !line.includes('License')) {
        currentCategory = line.replace('## ', '').trim();
        currentSubCategory = '';
    } else if (line.startsWith('### ')) {
        currentSubCategory = line.replace('### ', '').replace(/:\w+:/g, '').trim();
    } else if (line.startsWith('- [') || (line.startsWith('  - [') && currentCategory)) {
        const match = line.match(/- \[(.*?)\]\((.*?)\)(?: - (.*))?/);
        if (match) {
            const title = match[1].trim();
            const url = match[2].trim();
            let desc = match[3] ? match[3].replace(/:\w+:/g, '').trim() : '';
            if (title !== 'Awesome Japanese' && title !== 'Contents') {
                resources.push({
                    category: currentCategory,
                    subCategory: currentSubCategory || currentCategory,
                    title: title,
                    url: url,
                    description: desc
                });
            }
        }
    }
}

let tsOutput = `export interface Resource {
  category: string;
  subCategory: string;
  title: string;
  url: string;
  description: string;
}

export const awesomeResources: Resource[] = ${JSON.stringify(resources, null, 2)};
`;

fs.writeFileSync('d:/học tiếng nhật/src/data/awesome_resources.ts', tsOutput);
console.log('Parsedd ' + resources.length + ' resources!');
