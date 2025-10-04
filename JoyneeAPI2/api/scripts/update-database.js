// Script to update database schema and test cognitoId integration
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateDatabase() {
  console.log('🔄 Updating database schema...');
  
  try {
    // First, let's check if the cognitoId column exists
    console.log('📋 Checking current database schema...');
    
    // Try to find a user to see the current structure
    const users = await prisma.user.findMany({
      take: 1,
      select: {
        id: true,
        email: true,
        // cognitoId: true, // This will fail if column doesn't exist
      },
    });
    
    console.log('✅ Database connection successful');
    console.log('📊 Found users:', users.length);
    
    if (users.length > 0) {
      console.log('👤 Sample user:', users[0]);
    }
    
    console.log('\n📝 Next steps:');
    console.log('1. Run: npx prisma db push');
    console.log('2. Run: npx prisma generate');
    console.log('3. Test the API with the updated routes');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('cognitoId')) {
      console.log('\n🔧 The cognitoId column needs to be added to the database.');
      console.log('Run: npx prisma db push');
    }
  } finally {
    await prisma.$disconnect();
  }
}

// Test function to create a user with cognitoId
async function testCreateUser() {
  console.log('\n🧪 Testing user creation with cognitoId...');
  
  try {
    const testUser = await prisma.user.create({
      data: {
        cognitoId: 'test-cognito-id-' + Date.now(),
        firstName: 'Test',
        lastName: 'User',
        birthDate: new Date('1990-01-01'),
        avatar: 'https://example.com/avatar.jpg',
        email: `test-${Date.now()}@example.com`,
        active: true,
        personality: 'Friendly',
        bio: 'Test user bio',
      },
    });
    
    console.log('✅ Test user created:', testUser);
    
    // Clean up
    await prisma.user.delete({
      where: { id: testUser.id },
    });
    
    console.log('🧹 Test user cleaned up');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🔧 Database Update Script');
  console.log('========================');
  
  await updateDatabase();
  
  // Uncomment to test user creation
  // await testCreateUser();
}

main().catch(console.error); 