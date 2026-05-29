import Client from 'ssh2-sftp-client';
import { Client as SSHClient } from 'ssh2';

const sftp = new Client();
const ssh = new SSHClient();

const config = {
  host: '209.126.77.41',
  port: 22,
  username: 'root',
  password: 'rtribu8789'
};

const localFile = './dist.tar.gz';
const remoteFile = '/root/projects/astro-rebel/dist.tar.gz';
const remoteDir = '/root/projects/astro-rebel';

async function deploy() {
  try {
    console.log('Conectando SFTP...');
    await sftp.connect(config);
    console.log(`Subiendo ${localFile} a ${remoteFile}...`);
    await sftp.put(localFile, remoteFile);
    console.log('Subida completada.');
    await sftp.end();

    console.log('Conectando SSH para descomprimir, limpiar y reiniciar PM2...');
    await new Promise((resolve, reject) => {
      ssh.on('ready', () => {
        // Limpiar el proyecto duplicado (sin guion)
        // Descomprimir el nuevo dist y reiniciar en watch mode
        const cmd = `rm -rf /root/projects/astrorebel && cd ${remoteDir} && rm -rf dist && tar -xzf dist.tar.gz && rm dist.tar.gz && pm2 restart astro-rebel --watch`;
        console.log(`Ejecutando: ${cmd}`);
        ssh.exec(cmd, (err, stream) => {
          if (err) return reject(err);
          stream.on('close', (code, signal) => {
            console.log('Comando finalizado con código:', code);
            ssh.end();
            resolve();
          }).on('data', (data) => {
            console.log('STDOUT: ' + data);
          }).stderr.on('data', (data) => {
            console.error('STDERR: ' + data);
          });
        });
      }).on('error', reject).connect(config);
    });
    console.log('¡Despliegue rápido completado con éxito!');
  } catch (err) {
    console.error('Error durante el despliegue:', err);
  }
}

deploy();
