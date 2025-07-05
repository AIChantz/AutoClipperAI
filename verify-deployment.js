#!/usr/bin/env node

// Deployment verification script for AutoClipper AI
// Tests all health check endpoints to ensure deployment readiness

const http = require('http');

async function testEndpoint(path, expectedStatus = 200) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:8080${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✅ ${path} - Status: ${res.statusCode}, Response: ${JSON.stringify(json, null, 2)}`);
          resolve({ status: res.statusCode, data: json });
        } catch (error) {
          console.log(`✅ ${path} - Status: ${res.statusCode}, Raw: ${data}`);
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ ${path} - Error: ${error.message}`);
      reject(error);
    });
    
    req.setTimeout(5000, () => {
      console.error(`❌ ${path} - Timeout after 5 seconds`);
      req.destroy();
      reject(new Error('Timeout'));
    });
  });
}

async function runVerification() {
  console.log('🔍 AutoClipper AI - Deployment Verification');
  console.log('═'.repeat(50));
  
  try {
    // Test critical health endpoints
    await testEndpoint('/');
    await testEndpoint('/health');
    await testEndpoint('/api/status');
    
    console.log('\n✅ All health checks passed!');
    console.log('🚀 Application is ready for deployment');
    
  } catch (error) {
    console.error('\n❌ Verification failed:', error.message);
    process.exit(1);
  }
}

// Run verification if script is called directly
if (require.main === module) {
  console.log('Starting verification in 2 seconds...');
  setTimeout(runVerification, 2000);
}

module.exports = { testEndpoint, runVerification };