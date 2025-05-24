/*---------------------
| Made by Jerious1337 |
*---------------------*/

import { write_on, contains_query, get_from_query } from '../utils/file-utils' // Log utils
import { get_file_hash } from '../utils/hash'
import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// Dotenv config
dotenv.config({ path: path.join(__dirname, '../../.env') })

// Path to files directory
const ATTACHMENTS_DIR = path.join(__dirname, '../attachments/')

// Port where the API will run
const PORT = 9003

// Multer config
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, ATTACHMENTS_DIR)
    },
    filename: (_, file, cb) => { // Change this if possible...
        let prefix = Date.now() + '_' + Math.round(Math.random() * 1e9)
        cb(null, prefix + path.extname(file.originalname) + '.png')
    }
})

app.use(cors())

const upload = multer({ storage: storage })

/**
 * Handles user request to upload a image to server from server id in channel from channel id
 */
app.post('/upload/:apikey', upload.single('file'), async (req, res) => { // CHANGE YOUR API KEY IN .env FILE IN THE ROOT DIRECTORY

    if (req.params.apikey !== process.env.API_KEY) {
        console.log('[Warning] Invalid API Key has been used...')
    
        res.status(401).send({ response: 'Unvalid key...' })
        return
    }
    if (!req.file) {
        res.status(400).send('File not found...')
        return
    }
    try {
        console.log('[Info] Gateway uploading something...')

        res.status(200).send({ response: 'Success while uploading file!' })
        const file_name = await get_file_hash(ATTACHMENTS_DIR + req.file.filename)
        write_on({ file_name: file_name, file_path_name: req.file.filename, type: 'attachment' })
    } catch (err) {
        log_message(MessageType.Error, 'Fail while upload file...')
        log_message(MessageType.Info, '' + err)
    }
})

/**
 * Handles user request to get image
 */
app.get('/:type/:serverid/:channelid/:filename', async (req, res) => {
    const query = { file_name: req.params.filename, type: req.params.type }
    if (!(contains_query(query))) {
        log_message(MessageType.Error, 'Failed to get file...')
        res.status(404).send('File not found...')
        return
    }

    const file_path_name = await get_from_query(query).file_path_name

    if (file_path_name === undefined) {
        log_message(MessageType.Error, 'Failed to get file path name from query...')
        return
    }

    res.sendFile(ATTACHMENTS_DIR + file_path_name)
})

/* ---------------------------------------------------------------- Logger ------------------------------------------------------ */

function log_message(type: string, message: string) {
    console.log(type + ' ' + message)
}

let MessageType = {
    Info: '[Info]',
    Error: '[Error]',
    Sucess: '[Success]'
}

/* ----------------------------------------------------------------------------------------------------------------------------- */

/**
 * Runs CDN API
 */
app.listen(PORT, () => {
    log_message(MessageType.Sucess, "CDN API is running on port: " + PORT)
})