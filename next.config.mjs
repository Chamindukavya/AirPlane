/** @type {import('next').NextConfig} */
const nextConfig = {experimental: {
    appDir: true
},
env: {
    host_dev: 'localhost',
    user_dev: 'root',
    port_dev: '3306',
    password_dev: 'Zaq12345#',
    database_dev: 'students',
}
};

export default nextConfig;
