-- Create API credentials table
CREATE TABLE IF NOT EXISTS api_credentials (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  client_id VARCHAR(500) NOT NULL,
  client_secret VARCHAR(500) NOT NULL,
  access_token VARCHAR(1000),
  refresh_token VARCHAR(1000),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create unique index for user+platform combination
CREATE UNIQUE INDEX IF NOT EXISTS idx_api_credentials_user_platform 
ON api_credentials(user_id, platform) WHERE is_active = true;