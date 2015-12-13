import MapPolygon from './MapPolygon';


// draw polygon event params
let currentEditMapPoint = null;


const drawPolygonFunction = {
    polygon_mouseDown(point) {
        const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
        this.polygonPointList.some(value => {
            if (this.checkCircleInCircle(mapPoint, value.point)) {
                currentEditMapPoint = value;
                return true;
            }
        });
    },

    polygon_mouseMove(point) {
        const tempList = this.tempPointList;
        const lastPoint = tempList[tempList.length - 1];
        const firstPoint = tempList[0];
        const tempLen = tempList.length;

        // 编辑线段中...
        if (currentEditMapPoint) {
            const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
            currentEditMapPoint.setMapPoint(mapPoint);
            this.drawCanvas();
            return;
        }

        // 新建多边形中...
        if (tempLen === 0) {
            return;
        } else if (tempLen === 1) {
            this.drawLine(lastPoint.x, lastPoint.y, point.x, point.y);
        } else if (tempLen > 1) {
            // 判断吸附端点
            if (tempLen > 2) {
                if (this.checkCircleInCircle(firstPoint, point)) {
                    point.x = firstPoint.x;
                    point.y = firstPoint.y;
                } else if (this.checkCircleInCircle(lastPoint, point)) {
                    point.x = lastPoint.x;
                    point.y = lastPoint.y;
                }
            }

            this.drawLine(lastPoint.x, lastPoint.y, point.x, point.y);
            this.drawPolygon([...tempList, point]);
        }
    },

    polygon_mouseUp(point) {
        const tempList = this.tempPointList;
        const lastPoint = tempList[tempList.length - 1];
        const firstPoint = tempList[0];
        const polygonConfig = this.polygonConfig;
        const tempLen = tempList.length;

        // 编辑线段中...
        if (currentEditMapPoint) {
            const mapPoint = this.transformViewPointToMapPoint(point, this.canvas, this.x, this.y, this.zoom);
            currentEditMapPoint.setMapPoint(mapPoint);
            this.drawCanvas();
            currentEditMapPoint = null;
            return;
        }

        // 新建多边形中...
        if (tempLen === 0) {
            // 添加第一个点
            tempList.push(point);
        } else if (tempLen > 0) {
            if (tempLen > 2 &&
                (this.checkCircleInCircle(firstPoint, point) ||
                this.checkCircleInCircle(lastPoint, point))) {
                // 如果端点与新点相交，结束多边形的创建
                const pointStyle = this.polygonConfig.pointStyle;
                const mapPolygon = new MapPolygon({
                    strokeStyle: polygonConfig.strokeStyle,
                    fillStyle: polygonConfig.fillStyle,
                    lineWidth: polygonConfig.lineWidth,
                });
                mapPolygon.setPointType(pointStyle);
                tempList.forEach(value => {
                    const mapPoint = this.transformViewPointToMapPoint(value, this.canvas, this.x, this.y, this.zoom);
                    mapPolygon.addMapPoint(mapPoint);
                });
                this.polygonList.push(mapPolygon);
                this.polygonPointList.push(...mapPolygon.mapPoints);
                tempList.length = 0;
                this.drawCanvas();
            } else {
                // 添加点，绘画线段
                tempList.push(point);
                this.drawLine(lastPoint.x, lastPoint.y, point.x, point.y);
            }
        }
    },
};

export default drawPolygonFunction;


