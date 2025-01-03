// 02. Cải tiến hàm thứ nhất
// Viết hàm JavaScript có tên là extractTextFromSsml để trích xuất text thuần từ ssml.xml ra file có
// dạng như output/output_AB.txt .
// File output/output_AB.txt có label A và B để phân biệt giữa 2 người nói.

const extractTextFromSsml = () => {
  const fs = require('fs');

  // đường dẫn file xml
  const inputFilePath = '/home/megashork/Desktop/code/internTest/02/ssml.xml';
  // đường dẫn file output txt
  const outputFilePath = '/home/megashork/Desktop/code/internTest/02/output/output_AB.txt';

  fs.readFile(inputFilePath, 'utf-8', (err, xmlData) => {
    if (err) {
      console.error('Error reading XML file: ', err);
      return;
    }

    const regex = /<voice[^>]*name="([^"]+)"[^>]*>(.*?)<\/voice>/gs;
    // regex tìm kiếm khớp với những thẻ voice '[^>]*' những kí tự trước name không phải > - có thể lặp nhiều lần
    // ([^"]+) lấy giá trị của attribute name 
    // (.*?) lấy giá trị của thẻ voice
    // <\/voice>/gs kết thúc bằng thẻ đóng của voice, và các flag của regex

    let matches;
    let extractedText = '';

    while((matches = regex.exec(xmlData)) !== null) {
      const nameSpeaker = matches[1];
      const contentText = matches[2].trim();
      
      // gắn nhãn cho người nói
      const label = nameSpeaker.includes('vi-VN') ? 'B' : 'A';

      extractedText += `${label}: ${contentText}\n`;
    }
    // console.log(extractedText)

    fs.writeFile(outputFilePath, extractedText, (err) => {
      if (err) {
        console.error('Error writing to TXT file: ', err);
      } else {
        console.log(`Data successfully written to ${outputFilePath}`);
      }
    })
  })
};

extractTextFromSsml();