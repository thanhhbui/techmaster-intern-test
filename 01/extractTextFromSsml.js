// 01. Trích xuất text thuần từ ssml.xml
// Viết hàm JavaScript có tên là extractTextFromSsml để trích xuất text thuần từ ssml.xml ra file có
// dạng như output/output.txt .
// Mỗi dòng trong file output/output.txt là một câu nói của một người được phân cách bởi ký tự
// xuống dòng.

const extractTextFromSsml = () => {
    const fs = require('fs');

    // Đường dẫn file XML gốc
    const inputFilePath = '/home/megashork/Desktop/code/internTest/01/ssml.xml';

    // Đường dẫn file TXT để ghi kết quả
    const outputFilePath = '/home/megashork/Desktop/code/internTest/01/output/output.txt';

    // Đọc file XML
    fs.readFile(inputFilePath, 'utf-8', (err, xmlData) => {
        if (err) {
            console.error("Error reading XML file:", err);
            return;
        }
    
        // Trích xuất nội dung text giữa các thẻ <voice>
        const regex = /<voice[^>]*>(.*?)<\/voice>/gs;
        // /<voice[^>]*> bắt đầu câu lệnh regex: match với '<voice' theo sau là '[^>]*' match với mọi kí tự khác với '>' vì có thể có attribute và luôn có 1 kí tự trống trước khi gặp '>', 
        // (.*?): '()' capture group nội dung trong '()' sẽ được lưu lại để sử dụng, '.*?' khớp với tất cả kí tự khác với dấu xuống dòng và chỉ lấy chuỗi ngắn nhất
        // vì ? khi đi với những kí tự có khả năng lặp lại như *, + sẽ biến kí tự đó từ greedy thành lazy
        // <\/voice> chỉ đơn giản là thẻ </voice> ở cuối. /gs với g là global flag và s là cho phép '.' như kí tự xuống dòng
        
        // khai báo 1 mảng để lưu kết quả match
        let matches;
        // khai báo chuỗi để lưu giá trị vừa trích xuất từ match (trích xuất: xóa khoảng trắng trước và sau, thêm kí tự xuống dòng với mỗi phần tử của mảng matches - line 36)
        let extractedText = '';
    
        // sử dụng regex để lấy nội dung giữa các thể voice 
        while ((matches = regex.exec(xmlData)) !== null) {
            extractedText += matches[1].trim() + '\n';
        }
    
        // Ghi nội dung trích xuất ra file TXT
        // log ra thông báo or lỗi
        fs.writeFile(outputFilePath, extractedText, (err) => {
            if (err) {
                console.error("Error writing to TXT file:", err);
            } else {
                console.log(`Data successfully written to ${outputFilePath}`);
            }
        });
    });
}

extractTextFromSsml()