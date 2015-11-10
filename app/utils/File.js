
const fileOperate = {
    formatSize(size) {
        const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        let times = 0;
        let shrinkedSize = size;

        while (shrinkedSize >= 1000 && times < units.length - 1) {
            shrinkedSize /= 1024;
            times += 1;
        }
        shrinkedSize = shrinkedSize.toFixed(2);
        return `${shrinkedSize} ${units[times]}`;
    },
};

export default  fileOperate;


