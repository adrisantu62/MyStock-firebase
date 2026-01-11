import admin from 'firebase-admin';
import 'dotenv/config';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const auth = admin.auth();

async function setAdminRole() {
  const email = 'g.victor.juan@gmail.com'; // 👈 tu usuario actual

  const user = await auth.getUserByEmail(email);

  await auth.setCustomUserClaims(user.uid, {
    role: 'admin',
  });

  console.log(`✅ Rol admin asignado a ${email}`);
}

setAdminRole().catch(console.error);
