import { createClient } from '@supabase/supabase-js'
import config from '../config/env'
import fetch from 'node-fetch'
import https from 'https'

// Create a fetch implementation that ignores SSL certificate issues
const customFetch = (url: any, init?: any) => {
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    
    return fetch(url, { 
        ...init,
        // @ts-ignore - node-fetch specific option
        agent 
    })
}

const supabase = createClient(
    config.supabaseUrl,
    config.supabaseAnonKey,
    {
        auth: {
            persistSession: false
        },
        global: {
            fetch: customFetch as unknown as typeof globalThis.fetch
        }
    }
)

export default supabase