"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
require("dotenv/config");
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.applicationDefault(),
    });
}
const auth = firebase_admin_1.default.auth();
async function setAdminRole() {
    const email = 'g.victor.juan@gmail.com'; // 👈 tu usuario actual
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, {
        role: 'admin',
    });
    console.log(`✅ Rol admin asignado a ${email}`);
}
setAdminRole().catch(console.error);
