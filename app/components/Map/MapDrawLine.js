import MapLine from './MapLine.js';


// drawline event params
let currentEditMapPoint = null;


const drawLineFunction = {
    line_mouseDown(point) {
        const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
        this.linePointList.some(value => {
            if (this.checkCircleInCircle(mapPoint, value.point)) {
                currentEditMapPoint = value;
                return true;
            }
        });
    },

    line_mouseMove(point) {
        const tempList = this.tempPointList;
        const lastPoint = tempList[tempList.length - 1];

        // 编辑线段中...
        if (currentEditMapPoint) {
            const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
            currentEditMapPoint.setMapPoint(mapPoint);
            this.drawCanvas();
            return;
        }

        // 新建线段中...
        if (tempList.length === 0) return;
        if (this.checkCircleInCircle(lastPoint, point)) {
            point.x = lastPoint.x;
            point.y = lastPoint.y;
        }

        this.drawLine(lastPoint.x, lastPoint.y, point.x, point.y);
    },

    line_mouseUp(point) {
        const tempList = this.tempPointList;
        const lastPoint = tempList[tempList.length - 1];

        // 编辑线段中...
        if (currentEditMapPoint) {
            const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
            currentEditMapPoint.setMapPoint(mapPoint);
            this.drawCanvas();
            currentEditMapPoint = null;
            return;
        }

        // 新建线段中...
        if (tempList.length === 0) {
            // 添加第一个点
            tempList.push(point);
        } else if (this.checkCircleInCircle(lastPoint, point)) {
            // 如果最后一个点与新点相交，结束这条线的创建
            const pointStyle = this.lineConfig.pointStyle;
            const mapLine = new MapLine({
                strokeStyle: this.lineConfig.strokeStyle,
                lineWidth: this.lineConfig.lineWidth,
            });
            mapLine.setPointType(pointStyle);
            tempList.forEach(value => {
                const mapPoint = this.transformViewPointToMapPoint(value, this.canvas, this.x, this.y, this.zoom);
                mapLine.addMapPoint(mapPoint);
            });
            this.lineList.push(mapLine);
            this.linePointList.push(...mapLine.mapPoints);
            tempList.length = 0;
            this.drawCanvas();
        } else {
            // 添加点
            this.drawLine(lastPoint.x, lastPoint.y, point.x, point.y);
            tempList.push(point);
        }
    },
};

export default drawLineFunction;
