// Direct HTTP test for Supabase
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection (Direct HTTP)...\n')
console.log('📍 URL:', supabaseUrl)
console.log('🔑 Key length:', supabaseAnonKey?.length)
console.log('🔑 Key preview:', supabaseAnonKey?.substring(0, 20) + '...\n')

async function testDirect() {
    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`
            }
        })

        console.log('📡 Response status:', response.status)
        console.log('📡 Response status text:', response.statusText)

        if (response.status === 200 || response.status === 404) {
            console.log('\n✅ Connection successful!')
            console.log('🎉 Your Supabase API key is valid and working!\n')
            return true
        } else {
            const text = await response.text()
            console.log('Response body:', text)
            console.log('\n❌ Unexpected response')
            return false
        }
    } catch (error) {
        console.error('❌ Connection failed!')
        console.error('Error:', error.message)
        return false
    }
}

testDirect()
    .then(success => process.exit(success ? 0 : 1))
    .catch(err => {
        console.error('Unexpected error:', err)
        process.exit(1)
    })
