import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { useEffect } from "react";

window.CESIUM_BASE_URL = "/Cesium";

interface Props {
    id?: string;
    style?: React.CSSProperties;
}

export default function CesiumGaoDeView(props: Props) {
    const { id = "cesiumContainer", style } = props;
    let defaultAccessToken = "";
    Cesium.Ion.defaultAccessToken = defaultAccessToken;

    useEffect(() => {
        const viewer = new Cesium.Viewer("cesiumContainer", {
            imageryProvider: new Cesium.UrlTemplateImageryProvider({
                url: "https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
                minimumLevel: 3,
                maximumLevel: 18,
            }),
            baseLayerPicker: false,
            navigationHelpButton: false,
            animation: false, //动画器件，显示当前时间，允许跳转特定时间
            timeline: false, //时间轴
            //全屏图标，全屏按钮
            fullscreenButton: false,
            shadows: true,
            shouldAnimate: true,
        });

        var layer = new Cesium.UrlTemplateImageryProvider({
            url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            minimumLevel: 4,
            maximumLevel: 18
        })
        viewer.imageryLayers.addImageryProvider(layer);

        var annLayer = new Cesium.UrlTemplateImageryProvider({
            url: "http://webst02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=8",
            minimumLevel: 3,
            maximumLevel: 18
        })
        viewer.imageryLayers.addImageryProvider(annLayer);
        

        // viewer._cesiumWidget._creditContainer.style.display = "none"; //隐藏版本信息
        //viewer.scene.debugShowFramesPerSecond = true; //显示帧率,帧率与显示流畅度有关，或说与显卡有关
        viewer.scene.skyBox.show = true; //是否显示星空
        //viewer.scene.backgroundColor = Cesium.Color.BLUE;//地球背景颜色
        viewer.scene.sun.show = true; //是否显示太阳
        viewer.scene.moon.show = true; //是否显示有月亮
        viewer.scene.skyAtmosphere.show = true; //是否隐藏大气圈
        viewer.scene.globe.show = true; //是否显示地球
        //Rectangle(west, south, east, north)
        let lon = 100.48;
        let lat = 30;
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
            lon,
            lat,
            lon + 1,
            lat + 1
        );
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 2.8;
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, 19000000.0),
            orientation: {
                //此视角为观察者/相机
                heading: 0, //Cesium.Math.toRadians(0),//偏航
                pitch: Cesium.Math.toRadians(-90.0), //俯仰，人如果在赤道上空，俯仰角为0可见地球。如果在北纬，俯仰角为负才能见地球
                roll: 0.0, //翻滚
            },
        });
    });

    return (
        <div id={id} ></div>
    )
}
