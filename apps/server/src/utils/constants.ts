export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const PORT = process.env.PORT || 4000;
export const adminEmails = [
  'matteo.soresini@hotmail.it',
  'matteo.soresini90@gmail.com',
];
export const emailCooldowns = new Map<string, ReturnType<typeof setTimeout>>();

export const virtualAdminId = 'admin_virtual_id';
