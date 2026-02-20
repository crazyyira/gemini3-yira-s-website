/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/send-email/route";
exports.ids = ["app/api/send-email/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsend-email%2Froute&page=%2Fapi%2Fsend-email%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-email%2Froute.ts&appDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsend-email%2Froute&page=%2Fapi%2Fsend-email%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-email%2Froute.ts&appDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Yira_Documents_code_gemini3_yira_s_website_app_api_send_email_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/send-email/route.ts */ \"(rsc)/./app/api/send-email/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/send-email/route\",\n        pathname: \"/api/send-email\",\n        filename: \"route\",\n        bundlePath: \"app/api/send-email/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Yira\\\\Documents\\\\code\\\\gemini3-yira-s-website\\\\app\\\\api\\\\send-email\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Yira_Documents_code_gemini3_yira_s_website_app_api_send_email_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZzZW5kLWVtYWlsJTJGcm91dGUmcGFnZT0lMkZhcGklMkZzZW5kLWVtYWlsJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGc2VuZC1lbWFpbCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNZaXJhJTVDRG9jdW1lbnRzJTVDY29kZSU1Q2dlbWluaTMteWlyYS1zLXdlYnNpdGUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q1lpcmElNUNEb2N1bWVudHMlNUNjb2RlJTVDZ2VtaW5pMy15aXJhLXMtd2Vic2l0ZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0M7QUFDckg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXFlpcmFcXFxcRG9jdW1lbnRzXFxcXGNvZGVcXFxcZ2VtaW5pMy15aXJhLXMtd2Vic2l0ZVxcXFxhcHBcXFxcYXBpXFxcXHNlbmQtZW1haWxcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3NlbmQtZW1haWwvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9zZW5kLWVtYWlsXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9zZW5kLWVtYWlsL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcWWlyYVxcXFxEb2N1bWVudHNcXFxcY29kZVxcXFxnZW1pbmkzLXlpcmEtcy13ZWJzaXRlXFxcXGFwcFxcXFxhcGlcXFxcc2VuZC1lbWFpbFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsend-email%2Froute&page=%2Fapi%2Fsend-email%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-email%2Froute.ts&appDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/send-email/route.ts":
/*!*************************************!*\
  !*** ./app/api/send-email/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var resend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! resend */ \"(rsc)/./node_modules/resend/dist/index.mjs\");\n\n\nconst resend = new resend__WEBPACK_IMPORTED_MODULE_1__.Resend(process.env.RESEND_API_KEY);\nasync function POST(request) {\n    try {\n        const { type, name, contact, message } = await request.json();\n        if (!name || !message) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"缺少必填字段\"\n            }, {\n                status: 400\n            });\n        }\n        let emailSubject = \"\";\n        let emailContent = \"\";\n        if (type === \"contact\") {\n            emailSubject = `【联系表单】来自 ${name} 的消息`;\n            emailContent = `\n        <h2>新的联系表单提交</h2>\n        <p><strong>姓名：</strong>${name}</p>\n        <p><strong>联系方式：</strong>${contact || \"未提供\"}</p>\n        <p><strong>留言内容：</strong></p>\n        <p>${message}</p>\n      `;\n        } else if (type === \"story\") {\n            emailSubject = `【瓶中信】${name} 投递了新故事`;\n            emailContent = `\n        <h2>新的故事投递</h2>\n        <p><strong>昵称：</strong>${name}</p>\n        <p><strong>故事内容：</strong></p>\n        <p>${message}</p>\n      `;\n        } else {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"无效的类型\"\n            }, {\n                status: 400\n            });\n        }\n        const { data, error } = await resend.emails.send({\n            from: \"Xiaohei Island <onboarding@resend.dev>\",\n            to: [\n                \"yirawong@outlook.com\"\n            ],\n            subject: emailSubject,\n            html: emailContent\n        });\n        if (error) {\n            console.error(\"Resend error:\", error);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"发送失败\"\n            }, {\n                status: 500\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            data\n        });\n    } catch (error) {\n        console.error(\"Send email error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"服务器错误\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3NlbmQtZW1haWwvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQTJDO0FBQ1g7QUFFaEMsTUFBTUUsU0FBUyxJQUFJRCwwQ0FBTUEsQ0FBQ0UsUUFBUUMsR0FBRyxDQUFDQyxjQUFjO0FBRTdDLGVBQWVDLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNLEVBQUVDLElBQUksRUFBRUMsSUFBSSxFQUFFQyxPQUFPLEVBQUVDLE9BQU8sRUFBRSxHQUFHLE1BQU1KLFFBQVFLLElBQUk7UUFFM0QsSUFBSSxDQUFDSCxRQUFRLENBQUNFLFNBQVM7WUFDckIsT0FBT1gscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFTLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUM5RDtRQUVBLElBQUlDLGVBQWU7UUFDbkIsSUFBSUMsZUFBZTtRQUVuQixJQUFJUixTQUFTLFdBQVc7WUFDdEJPLGVBQWUsQ0FBQyxTQUFTLEVBQUVOLEtBQUssSUFBSSxDQUFDO1lBQ3JDTyxlQUFlLENBQUM7OytCQUVTLEVBQUVQLEtBQUs7aUNBQ0wsRUFBRUMsV0FBVyxNQUFNOztXQUV6QyxFQUFFQyxRQUFRO01BQ2YsQ0FBQztRQUNILE9BQU8sSUFBSUgsU0FBUyxTQUFTO1lBQzNCTyxlQUFlLENBQUMsS0FBSyxFQUFFTixLQUFLLE9BQU8sQ0FBQztZQUNwQ08sZUFBZSxDQUFDOzsrQkFFUyxFQUFFUCxLQUFLOztXQUUzQixFQUFFRSxRQUFRO01BQ2YsQ0FBQztRQUNILE9BQU87WUFDTCxPQUFPWCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQVEsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzdEO1FBRUEsTUFBTSxFQUFFRyxJQUFJLEVBQUVKLEtBQUssRUFBRSxHQUFHLE1BQU1YLE9BQU9nQixNQUFNLENBQUNDLElBQUksQ0FBQztZQUMvQ0MsTUFBTTtZQUNOQyxJQUFJO2dCQUFDO2FBQXVCO1lBQzVCQyxTQUFTUDtZQUNUUSxNQUFNUDtRQUNSO1FBRUEsSUFBSUgsT0FBTztZQUNUVyxRQUFRWCxLQUFLLENBQUMsaUJBQWlCQTtZQUMvQixPQUFPYixxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO2dCQUFFQyxPQUFPO1lBQU8sR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQzVEO1FBRUEsT0FBT2QscURBQVlBLENBQUNZLElBQUksQ0FBQztZQUFFYSxTQUFTO1lBQU1SO1FBQUs7SUFDakQsRUFBRSxPQUFPSixPQUFPO1FBQ2RXLFFBQVFYLEtBQUssQ0FBQyxxQkFBcUJBO1FBQ25DLE9BQU9iLHFEQUFZQSxDQUFDWSxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUFRLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQzdEO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcWWlyYVxcRG9jdW1lbnRzXFxjb2RlXFxnZW1pbmkzLXlpcmEtcy13ZWJzaXRlXFxhcHBcXGFwaVxcc2VuZC1lbWFpbFxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XHJcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gXCJyZXNlbmRcIjtcclxuXHJcbmNvbnN0IHJlc2VuZCA9IG5ldyBSZXNlbmQocHJvY2Vzcy5lbnYuUkVTRU5EX0FQSV9LRVkpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHR5cGUsIG5hbWUsIGNvbnRhY3QsIG1lc3NhZ2UgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICAgIGlmICghbmFtZSB8fCAhbWVzc2FnZSkge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLnvLrlsJHlv4XloavlrZfmrrVcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBlbWFpbFN1YmplY3QgPSBcIlwiO1xyXG4gICAgbGV0IGVtYWlsQ29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IFwiY29udGFjdFwiKSB7XHJcbiAgICAgIGVtYWlsU3ViamVjdCA9IGDjgJDogZTns7vooajljZXjgJHmnaXoh6ogJHtuYW1lfSDnmoTmtojmga9gO1xyXG4gICAgICBlbWFpbENvbnRlbnQgPSBgXHJcbiAgICAgICAgPGgyPuaWsOeahOiBlOezu+ihqOWNleaPkOS6pDwvaDI+XHJcbiAgICAgICAgPHA+PHN0cm9uZz7lp5PlkI3vvJo8L3N0cm9uZz4ke25hbWV9PC9wPlxyXG4gICAgICAgIDxwPjxzdHJvbmc+6IGU57O75pa55byP77yaPC9zdHJvbmc+JHtjb250YWN0IHx8IFwi5pyq5o+Q5L6bXCJ9PC9wPlxyXG4gICAgICAgIDxwPjxzdHJvbmc+55WZ6KiA5YaF5a6577yaPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgIDxwPiR7bWVzc2FnZX08L3A+XHJcbiAgICAgIGA7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwic3RvcnlcIikge1xyXG4gICAgICBlbWFpbFN1YmplY3QgPSBg44CQ55O25Lit5L+h44CRJHtuYW1lfSDmipXpgJLkuobmlrDmlYXkuotgO1xyXG4gICAgICBlbWFpbENvbnRlbnQgPSBgXHJcbiAgICAgICAgPGgyPuaWsOeahOaVheS6i+aKlemAkjwvaDI+XHJcbiAgICAgICAgPHA+PHN0cm9uZz7mmLXnp7DvvJo8L3N0cm9uZz4ke25hbWV9PC9wPlxyXG4gICAgICAgIDxwPjxzdHJvbmc+5pWF5LqL5YaF5a6577yaPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgIDxwPiR7bWVzc2FnZX08L3A+XHJcbiAgICAgIGA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLml6DmlYjnmoTnsbvlnotcIiB9LCB7IHN0YXR1czogNDAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHJlc2VuZC5lbWFpbHMuc2VuZCh7XHJcbiAgICAgIGZyb206IFwiWGlhb2hlaSBJc2xhbmQgPG9uYm9hcmRpbmdAcmVzZW5kLmRldj5cIixcclxuICAgICAgdG86IFtcInlpcmF3b25nQG91dGxvb2suY29tXCJdLCAvLyDmm7/mjaLkuLrkvaDnmoTpgq7nrrFcclxuICAgICAgc3ViamVjdDogZW1haWxTdWJqZWN0LFxyXG4gICAgICBodG1sOiBlbWFpbENvbnRlbnQsXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIlJlc2VuZCBlcnJvcjpcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLlj5HpgIHlpLHotKVcIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJTZW5kIGVtYWlsIGVycm9yOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogXCLmnI3liqHlmajplJnor69cIiB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIlJlc2VuZCIsInJlc2VuZCIsInByb2Nlc3MiLCJlbnYiLCJSRVNFTkRfQVBJX0tFWSIsIlBPU1QiLCJyZXF1ZXN0IiwidHlwZSIsIm5hbWUiLCJjb250YWN0IiwibWVzc2FnZSIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImVtYWlsU3ViamVjdCIsImVtYWlsQ29udGVudCIsImRhdGEiLCJlbWFpbHMiLCJzZW5kIiwiZnJvbSIsInRvIiwic3ViamVjdCIsImh0bWwiLCJjb25zb2xlIiwic3VjY2VzcyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/send-email/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/svix","vendor-chunks/uuid","vendor-chunks/postal-mime","vendor-chunks/standardwebhooks","vendor-chunks/resend","vendor-chunks/fast-sha256","vendor-chunks/@stablelib"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fsend-email%2Froute&page=%2Fapi%2Fsend-email%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fsend-email%2Froute.ts&appDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CYira%5CDocuments%5Ccode%5Cgemini3-yira-s-website&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();