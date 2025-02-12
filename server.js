const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DIRECTORY = path.join(__dirname, "DataBase"); // المجلد الذي يحتوي على الملفات النصية

app.use(express.json());
app.use(cors());

// ✅ التأكد من أن المجلد موجود، وإذا لم يكن، يتم إنشاؤه تلقائيًا
if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY, { recursive: true });
}

// ✅ جلب قائمة الملفات النصية في المجلد
app.get('/files', (req, res) => {
    fs.readdir(DIRECTORY, (err, files) => {
        if (err) return res.status(500).json({ error: 'خطأ في قراءة المجلد' });
        const textFiles = files.filter(file => file.endsWith('.txt')); // فقط الملفات النصية
        res.json({ files: textFiles });
    });
});

// ✅ قراءة محتوى أي ملف نصي
app.get('/data/:filename', (req, res) => {
    const filePath = path.join(DIRECTORY, req.params.filename);
    if (!filePath.endsWith('.txt')) return res.status(400).json({ error: '❌ يُسمح فقط بقراءة الملفات النصية' });

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'خطأ في قراءة الملف' });
        res.json({ content: data });
    });
});

// ✅ تحديث محتوى أي ملف نصي
app.post('/data/:filename', (req, res) => {
    const filePath = path.join(DIRECTORY, req.params.filename);
    const newData = req.body.content;

    if (!filePath.endsWith('.txt')) return res.status(400).json({ error: '❌ يُسمح فقط بتحديث الملفات النصية' });

    fs.writeFile(filePath, newData, 'utf8', (err) => {
        if (err) return res.status(500).json({ error: 'خطأ في تحديث الملف' });
        res.json({ message: '✅ تم تحديث الملف بنجاح', content: newData });
    });
});

// ✅ تشغيل الخادم
app.listen(PORT, () => console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`));
