//GPIO otetaan käyttöön
const Gpio = require('onoff').Gpio;

//Asetetaan outputti nelkkuun
const led = new Gpio(4,'out');

//both tarkottaa että molemmilla nappuloilla handeloidaan
const pushButton = new Gpio(17,'in','both');
const sensor = new Gpio(13,'in','both');

sensor.watch((err,value)=>{
   if(err) console.log("Sensor error",err);
   led.writeSync(value);
});

// watch tarkkailee muutoksia pushbuttonissa ja tekee callbakcin
pushButton.watch((err,value) => {
    if(err){
        //Jos homma hajoo niin sitten kerrotaan
        console.error('There was an error',err);
    }
    // asetetaan valon arvoksi nappulan arvo
    console.log("surr surr "+value);
    led.writeSync(value);
});

//Kun homma päättyy juoksutetaan tää. Sammuttaa kaiken
const unexportOnClose=()=>{
    led.writeSync(0);
    led.unexport();
    pushButton.unexport();
    sensor.unexport();
};

//ctrl+c niin tekee tän
process.on('SIGINT', unexportOnClose);