import crypto from 'crypto'
import fs from 'fs'

export const get_file_hash = (path: string) => new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const rs = fs.createReadStream(path);

    rs.on('error', reject);

    rs.on('data', chunk => hash.update(chunk));

    rs.on('end', () => resolve(hash.digest('hex'))); 
})