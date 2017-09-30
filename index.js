'use strict';
var runtime = require("runtimejs");

const fatfs = require('fatfs');

//TODO
//const msgpack = require("msgpack5")();
//const encode = msgpack.encode
//const decode = msgpack.decode

const disk = runtime.block.devices[0];
const blockInterface = {
  sectorSize: disk.formatInfo.sectorSize,
  numSectors: disk.formatInfo.totalSectorCount,
  readSectors(i, dest, cb) {
    disk
      .read(i, dest)
      .then(cb.bind(null, null))
      .catch(cb);
  },
  writeSectors(i, data, cb) {
    disk
    .write(i, data)
    .then(cb.bind(null, null))
    .catch(cb);
  }
}

const fs = fatfs.createFileSystem(blockInterface);


fs.on('ready', () => {
  fs.writeFile('/1.txt', JSON.stringify({"test": "runtime.js FTW"}), (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("done");

    fs.readFile("/1.txt", {encoding: "utf8"}, (err, d) => {
      console.log(d);
    });
  });
});

fs.on('error', err => {
  console.log(err);
});


