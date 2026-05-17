// Quick database connection test script
const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing database connection...\n');
  
  const pooledUrl = process.env.DATABASE_URL;
  const directUrl = process.env.DIRECT_DATABASE_URL;
  
  console.log('📋 Connection Details:');
  console.log('Pooled URL:', pooledUrl ? pooledUrl.replace(/:[^:@]+@/, ':****@') : 'NOT SET');
  console.log('Direct URL:', directUrl ? directUrl.replace(/:[^:@]+@/, ':****@') : 'NOT SET');
  console.log('');
  
  // Test pooled connection
  console.log('Testing POOLED connection...');
  const pooledClient = new Client({
    connectionString: pooledUrl,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  
  try {
    await pooledClient.connect();
    const result = await pooledClient.query('SELECT version(), current_database(), current_user');
    console.log('✅ Pooled connection successful!');
    console.log('   Database:', result.rows[0].current_database);
    console.log('   User:', result.rows[0].current_user);
    console.log('   Version:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
    await pooledClient.end();
  } catch (error) {
    console.error('❌ Pooled connection failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.code);
  }
  
  console.log('');
  
  // Test direct connection
  if (directUrl) {
    console.log('Testing DIRECT connection...');
    const directClient = new Client({
      connectionString: directUrl,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 10000,
    });
    
    try {
      await directClient.connect();
      const result = await directClient.query('SELECT version(), current_database(), current_user');
      console.log('✅ Direct connection successful!');
      console.log('   Database:', result.rows[0].current_database);
      console.log('   User:', result.rows[0].current_user);
      console.log('   Version:', result.rows[0].version.split(' ').slice(0, 2).join(' '));
      await directClient.end();
    } catch (error) {
      console.error('❌ Direct connection failed:');
      console.error('   Error:', error.message);
      console.error('   Code:', error.code);
    }
  }
  
  console.log('\n📝 Troubleshooting Tips:');
  console.log('1. Check if your Neon database is active (not suspended)');
  console.log('2. Verify your database credentials in .env file');
  console.log('3. Check if your IP is whitelisted in Neon dashboard');
  console.log('4. Ensure your internet connection is stable');
  console.log('5. Try regenerating database credentials in Neon');
}

testConnection().catch(console.error);

// Made with Bob
