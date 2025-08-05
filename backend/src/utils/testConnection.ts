import supabase from "../db/supabase"

export const testDbConnection = async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .limit(1)

        if (error) {
            console.error('❌ Supabase connection failed:', error.message)
        } else {
            console.log('✅ Supabase connection successful')
        }
    } catch (err) {
        console.error('❌ Supabase connection failed:', err)
    }
}