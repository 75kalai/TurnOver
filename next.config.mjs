/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
          domains: ['./']
     },
     env: {
          PGHOST: 'ep-tiny-cake-a5omfxnz.us-east-2.aws.neon.tech',
          PGDATABASE: 'turnover',
          PGUSER: 'turnover_owner',
          PGPASSWORD: 'pVnFBMOqCw49',
     }
};

export default nextConfig;
