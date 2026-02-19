import PocketBase from 'pocketbase';

// URL con el puerto 8021 para producción en Contabo
const pb = new PocketBase('http://209.126.77.41:8021'); 

export default pb;