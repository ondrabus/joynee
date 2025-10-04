// Simple test script to verify Cognito integration
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCognitoIntegration() {
  console.log('🧪 Testing Cognito Integration');
  console.log('==============================');
  
  try {
    // Test 1: Check if cognitoId field exists
    console.log('\n1️⃣ Testing cognitoId field access...');
    
    const testCognitoId = 'test-cognito-' + Date.now();
    
    // Try to create a user with cognitoId
    const testUser = await prisma.user.create({
      data: {
        cognitoId: testCognitoId,
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
    
    console.log('✅ User created successfully with cognitoId:', testUser.cognitoId);
    
    // Test 2: Find user by cognitoId
    console.log('\n2️⃣ Testing find by cognitoId...');
    
    const foundUser = await prisma.user.findUnique({
      where: { cognitoId: testCognitoId },
    });
    
    if (foundUser) {
      console.log('✅ User found by cognitoId:', foundUser.firstName, foundUser.lastName);
    } else {
      console.log('❌ User not found by cognitoId');
    }
    
    // Test 3: Update user by cognitoId
    console.log('\n3️⃣ Testing update by cognitoId...');
    
    const updatedUser = await prisma.user.update({
      where: { cognitoId: testCognitoId },
      data: {
        firstName: 'Updated',
        lastName: 'Name',
      },
    });
    
    console.log('✅ User updated successfully:', updatedUser.firstName, updatedUser.lastName);
    
    // Test 4: List users with cognitoId
    console.log('\n4️⃣ Testing list users with cognitoId...');
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        cognitoId: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      take: 5,
    });
    
    console.log('✅ Found users:', users.length);
    users.forEach(user => {
      console.log(`   - ${user.firstName} ${user.lastName} (${user.cognitoId})`);
    });
    
    // Clean up
    console.log('\n5️⃣ Cleaning up test data...');
    
    await prisma.user.delete({
      where: { cognitoId: testCognitoId },
    });
    
    console.log('✅ Test user deleted successfully');
    
    console.log('\n🎉 All tests passed! Cognito integration is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.message.includes('cognitoId')) {
      console.log('\n🔧 Issue: cognitoId field not found in database');
      console.log('   Run: npx prisma db push');
    } else if (error.message.includes('Unknown field')) {
      console.log('\n🔧 Issue: Prisma client not regenerated');
      console.log('   Run: npx prisma generate');
    }
  } finally {
    await prisma.$disconnect();
  }
}

testCognitoIntegration(); 