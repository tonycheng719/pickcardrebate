// 臨時 script - 更新 admin 密碼
// 執行後請刪除此檔案

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY!;

async function updateAdminPassword() {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing environment variables');
    process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  // 先搵 admin 用戶
  const { data: users, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error('Error listing users:', listError);
    process.exit(1);
  }

  // 搵 email 包含 "admin" 嘅用戶
  const adminUser = users.users.find(u => 
    u.email?.toLowerCase().includes('admin') || 
    u.user_metadata?.name?.toLowerCase().includes('admin')
  );

  if (!adminUser) {
    console.log('Available users:');
    users.users.forEach(u => {
      console.log(`- ${u.email} (${u.id})`);
    });
    console.error('\nNo admin user found. Please check the email above.');
    process.exit(1);
  }

  console.log(`Found admin user: ${adminUser.email} (${adminUser.id})`);

  // 更新密碼
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    adminUser.id,
    { password: 'solomo21522813' }
  );

  if (updateError) {
    console.error('Error updating password:', updateError);
    process.exit(1);
  }

  console.log('✅ Password updated successfully!');
  console.log(`Email: ${adminUser.email}`);
  console.log('New password: solomo21522813');
}

updateAdminPassword();

