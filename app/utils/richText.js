const api = {
    //  文字大小
    setFontSize: function (value, doc) {
        doc.execCommand('FontSize', false, value); //   value(int型)
    },
    //  字体
    setFontFamily: function (value, doc) {
        doc.execCommand('FontName', false, value);
    },
    //  字体颜色
    setFontColor: function (value, doc) {
        doc.execCommand('ForeColor', false, value);
    },
    //  背景填充
    setBackColor: function (value, doc) {
        doc.execCommand('BackColor', true, value);
    },
    //  粗细|倾斜
    setFontStyle: function (name, doc) {
        doc.execCommand(name, false, null);
    },
    //  下划线
    setUnderLine: function (doc) {
        doc.execCommand('Underline', false, null);
    },
    //  删除格式
    removeFormat: function (doc) {
        doc.execCommand('RemoveFormat', false, null);
    },
    //  左对齐|居中|右对齐
    setJustify: function (name, doc) {
        doc.execCommand(name, false, null);
    },
    //  对齐方式
    addOrderList: function (doc) {
        doc.execCommand('InsertOrderedList');
    },
    //  表情
    insertImage: function (value, doc) {
        doc.execCommand('InsertImage', false, value); // value为图片的url
    },
    //  链接
    setLink: function (value, doc) {
        doc.execCommand('CreateLink', false, value); // 第三个参数为URL
    },
    //  检测Selection对象是否选中（看是否命令可用，是否选中文字)
    checkState: function (doc) {
        const selection = doc.getSelection();
        return selection.type === 'Range';
    },
    //  将base64缩放成指定的宽度base64
    scaleImg: function (base64Src, width, height, callback) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const cxt = canvas.getContext('2d');
        const img = document.createElement('img');
        img.onload = function () {
            callback(img, canvas, cxt);
        };
        img.src = base64Src;
    },
};

export default api;
