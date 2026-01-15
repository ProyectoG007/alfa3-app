require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('YOUR_SUPABASE') || supabaseUrl.includes('your_')) {
    console.error('❌ ERROR: Supabase credentials are not properly configured');
    console.error('Please create a .env file in the server directory with:');
    console.error('  SUPABASE_URL=your_supabase_url');
    console.error('  SUPABASE_KEY=your_supabase_anon_key');
    console.error('\nSee .env.example for reference');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
