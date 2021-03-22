/*const bluetooth = require('webbluetooth').bluetooth;
async function comm(){
   
    let device = await bluetooth.requestDevice()
    let server = await device.gatt.connect();
    let services = server.getPrimaryService();
    console.log(services)

    while(server.connected){
        console.log('I GOT ONE!!!!')
        gattOperator = new BluetoothRemoteGATTCharacteristic()

        let statement = await gattOperator.readValue()
        console.log('Heres what the buffer is saying '+ statement);
    }
}

comm()*/