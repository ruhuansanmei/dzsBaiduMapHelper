/**
 * 用来自动计算百度地图描点的缩放
 */
"use strict";
var autoGetCenterAndZoom = function (BMapRef /*百度地图大对象引用*/, mapRef /*百度地图实例引用*/, containerId /*百度地图容器id*/, points /*用来显示的点数组*/) {
    var lngMax = null;
    var lngMin = null;
    var latMax = null;
    var latMin = null;
    for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
        var point = points_1[_i];
        var lng = point.lng;
        var lat = point.lat;
        if (!!lng && !!lat) {
            if (lngMax == null) {
                lngMax = lng;
            }
            else {
                lngMax = Math.max(lng, lngMax);
            }
            if (lngMin == null) {
                lngMin = lng;
            }
            else {
                lngMin = Math.min(lng, lngMin);
            }
            if (latMax == null) {
                latMax = lat;
            }
            else {
                latMax = Math.max(lat, latMax);
            }
            if (latMin == null) {
                latMin = lat;
            }
            else {
                latMin = Math.min(lat, latMin);
            }
        }
    }
    if (lngMax == null || lngMin == null || latMax == null || latMin == null) {
        lngMax = 116.404;
        lngMin = 116.404;
        latMax = 39.915;
        latMin = 39.915;
    }
    var center = new BMapRef.Point((lngMax + lngMin) / 2, (latMax + latMin) / 2);
    console.log("center is");
    console.log((lngMax + lngMin) / 2);
    console.log((latMax + latMin) / 2);
    var height = document.querySelector("#" + containerId).offsetHeight;
    var width = document.querySelector("#" + containerId).offsetWidth;
    var delta1 = mapRef.getDistance(new BMapRef.Point(lngMax, latMin), new BMapRef.Point(lngMin, latMin)) / width;
    var delta2 = mapRef.getDistance(new BMapRef.Point(lngMax, latMax), new BMapRef.Point(lngMax, latMin)) / height;
    delta1 = delta1 == 0 ? 8 : delta1;
    delta2 = delta2 == 0 ? 8 : delta2;
    var delta = Math.max(delta1, delta2);
    console.log("delta is " + delta);
    var zoom = 18 + Math.log(1 / delta) / Math.log(2) - 1;
    console.log("zoom is " + zoom);
    return {
        center: center,
        zoom: zoom
    };
};
exports.autoGetCenterAndZoom = autoGetCenterAndZoom;
