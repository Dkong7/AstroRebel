import { execSync } from 'child_process';
console.log('Building...');
execSync('npm run build', { stdio: 'inherit' });
console.log('Compressing...');
execSync('tar -czf dist.tar.gz dist', { stdio: 'inherit' });
console.log('Deploying...');
execSync('node deploy_fast.js', { stdio: 'inherit' });
