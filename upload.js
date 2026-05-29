import Client from 'ssh2-sftp-client';
const sftp = new Client();

const config = {
  host: '209.126.77.41',
  port: 22,
  username: 'root',
  password: 'rtribu8789'
};

const localDir = './dist';
const remoteDir = '/root/projects/astrorebel';

async function upload() {
  try {
    console.log('Conectando al servidor...');
    await sftp.connect(config);
    console.log('Conectado. Subiendo archivos a', remoteDir);
    
    // Primero, limpiamos el directorio remoto o subimos sobrescribiendo
    // uploadDir sobreescribe archivos existentes
    await sftp.uploadDir(localDir, remoteDir);
    
    console.log('¡Subida completada con éxito!');
  } catch (err) {
    console.error('Error durante la subida:', err);
  } finally {
    await sftp.end();
  }
}

upload();
