import { Client } from 'ssh2';

const conn = new Client();
conn.on('ready', () => {
  console.log('Conectado al servidor.');
  conn.exec('grep -r "astro-rebel" /etc/nginx/ /etc/apache2/ 2>/dev/null', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      conn.end();
    }).on('data', (data) => {
      console.log('OUTPUT:\n' + data);
    }).stderr.on('data', (data) => {
      console.log('ERROR:\n' + data);
    });
  });
}).connect({
  host: '209.126.77.41',
  port: 22,
  username: 'root',
  password: 'rtribu8789'
});
