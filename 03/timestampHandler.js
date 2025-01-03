const fs = require('fs');

const timestampHandler = () => {
  // đường dẫn file json
  const inputFilePath = '/home/megashork/Desktop/code/internTest/03/timestamp.json';

  // đường dẫn file output
  const outputFilePath = '/home/megashork/Desktop/code/internTest/03/output/timestamp.txt';

  fs.readFile(inputFilePath, 'utf-8', (err, jsonData) => {
    if (err) {
      console.error('Error reading JSON file: ');
    }

    const data = JSON.parse(jsonData);

    // for(let i=0; i<(data.timestamp).length; i++) {
    //   console.log('time ellapsed: ', data.timestamp[i][0]);
    //   console.log('duration: ', data.timestamp[i][1]);
    //   console.log('index: ', data.timestamp[i][2]);
    //   console.log('word length: ', data.timestamp[i][3]);
    // } 
    
    // data.timestamp.forEach((item) => {
    //   console.log('time ellapsed', item[0])
    //   console.log('duration', item[1])
    //   console.log('index', item[2])
    //   console.log('word length', item[3])
    // });

    let results = '';
    data.timestamp.forEach((item) => {
      results += `${item[0]}, ${item[1]}, ${item[2]}, ${item[3]} \n`
    });
    // console.log(results);

    fs.writeFile(outputFilePath, results, (err) => {
      if (err) {
        console.error('Error writing to TXT file: ');
      } else {
        console.log(`Data successfully written to ${outputFilePath}`);
      }
    })
  })
}

timestampHandler()