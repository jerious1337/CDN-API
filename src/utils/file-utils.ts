/*---------------------
| Made by Jerious1337 |
*---------------------*/

import fs from 'fs'
import path from 'path'

const LOGS_PATH = path.join(__dirname, '../logs/logs.json')

export function write_on(data: any) {
    try {
        let logs = []
        
        if (fs.existsSync(LOGS_PATH)) {
            const actual_data = fs.readFileSync(LOGS_PATH, 'utf-8')
            logs = JSON.parse(actual_data)
        }

        logs.push(data)
        fs.writeFileSync(LOGS_PATH, JSON.stringify(logs, null, 4), 'utf-8')
        console.log('[Success] Sucessfully writed on logs...')
    } catch (ex) {
        console.log('[Error] Exception while writing on log file...')
        console.log('[Info] Details: ' + ex)
    }
}

export function contains_query(query: any) {
    try {
        if (!fs.existsSync(LOGS_PATH)) {
            console.log('[Error] Log file don\'t exist\'s')
            return false
        }
        const actual_data = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'))
        try {
            for (let data of actual_data) {
                if (matches_query(data, query)) {
                    return true
                }
            }
            return false
        } catch (ex) {
            console.log('[Error] Exception while running matchesQuery()...')
            console.log('[Info] Details: ' + ex)
        }
    } catch (ex) {
        console.log('[Error] Exception while examining on log file...')
        console.log('[Info] Details: ' + ex)
    }
}

export function get_from_query(query: any) {
    try {
        if (!fs.existsSync(LOGS_PATH)) {
            console.log('[Error] Log file don\'t exist\'s')
            return false
        }
        const actual_data = JSON.parse(fs.readFileSync(LOGS_PATH, 'utf-8'))
        try {
            for (let data of actual_data) {
                if (matches_query(data, query)) {
                    return data
                }
            }
            return undefined
        } catch (ex) {
            console.log('[Error] Exception while running matchesQuery()...')
            console.log('[Info] Details: ' + ex)
        }
    } catch (ex) {
        console.log('[Error] Exception while examining on log file...')
        console.log('[Info] Details: ' + ex)
    }
}

function matches_query(json: Record<string, any>, query: Record<string, any>) {
    return Object.entries(query).every(([key, value]) => json[key] === value);
}