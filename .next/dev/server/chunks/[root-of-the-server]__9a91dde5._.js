module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteImageFromBucket",
    ()=>deleteImageFromBucket,
    "deletePhoto",
    ()=>deletePhoto,
    "getImagesFromBucket",
    ()=>getImagesFromBucket,
    "getPhotos",
    ()=>getPhotos,
    "supabase",
    ()=>supabase,
    "uploadImageToBucket",
    ()=>uploadImageToBucket,
    "uploadPhoto",
    ()=>uploadPhoto
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
// 服务器端使用
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables');
}
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
async function getPhotos() {
    const { data, error } = await supabase.storage.from('PHOTO').list('', {
        limit: 100,
        offset: 0,
        sortBy: {
            column: 'created_at',
            order: 'desc'
        }
    });
    if (error) {
        console.error('Error fetching photos:', error);
        return [];
    }
    // 过滤出图片文件并生成公开 URL
    const photos = data.filter((file)=>{
        const ext = file.name.toLowerCase();
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.gif') || ext.endsWith('.webp');
    }).map((file)=>{
        const { data: urlData } = supabase.storage.from('PHOTO').getPublicUrl(file.name);
        return {
            name: file.name,
            url: urlData.publicUrl,
            created_at: file.created_at
        };
    });
    return photos;
}
async function uploadPhoto(file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from('PHOTO').upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) {
        throw error;
    }
    return data;
}
async function deletePhoto(fileName) {
    const { error } = await supabase.storage.from('PHOTO').remove([
        fileName
    ]);
    if (error) {
        throw error;
    }
    return true;
}
async function getImagesFromBucket(bucketName) {
    const { data, error } = await supabase.storage.from(bucketName).list('', {
        limit: 100,
        offset: 0,
        sortBy: {
            column: 'created_at',
            order: 'desc'
        }
    });
    if (error) {
        console.error(`Error fetching images from ${bucketName}:`, error);
        return [];
    }
    const images = data.filter((file)=>{
        const ext = file.name.toLowerCase();
        return ext.endsWith('.jpg') || ext.endsWith('.jpeg') || ext.endsWith('.png') || ext.endsWith('.gif') || ext.endsWith('.webp');
    }).map((file)=>{
        const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(file.name);
        return {
            name: file.name,
            url: urlData.publicUrl,
            created_at: file.created_at
        };
    });
    return images;
}
async function uploadImageToBucket(bucketName, file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
    });
    if (error) {
        throw error;
    }
    // 返回公开 URL
    const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    return {
        ...data,
        publicUrl: urlData.publicUrl
    };
}
async function deleteImageFromBucket(bucketName, fileName) {
    const { error } = await supabase.storage.from(bucketName).remove([
        fileName
    ]);
    if (error) {
        throw error;
    }
    return true;
}
}),
"[project]/app/api/hero/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from("hero_content").select("*").single();
        if (error) {
            console.error("Supabase error:", error);
            // 如果没有数据，返回默认值
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                main_title: "小黑的奇幻岛屿",
                main_subtitle: "在岩壁上寻找自由，在代码中构建万物",
                left_card_title: "山海之息",
                left_card_description: "在崎岖的岩壁上寻找自由的支点，在深邃的海底听见心跳的回响。",
                right_card_title: "灯火之境",
                right_card_description: "一盏复古台灯，一行跳动的代码，在寂静的深夜构建属于未来的碎片。",
                bottom_text: "连接有趣的人，一起 Vibe Coding，一起坠入山海。"
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data);
    } catch (error) {
        console.error("Get hero content error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "获取失败"
        }, {
            status: 500
        });
    }
}
async function PUT(request) {
    try {
        const body = await request.json();
        const { main_title, main_subtitle, left_card_title, left_card_description, right_card_title, right_card_description, bottom_text } = body;
        // 先检查是否有记录
        const { data: existing } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from("hero_content").select("id").single();
        let result;
        if (existing) {
            // 更新现有记录
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from("hero_content").update({
                main_title,
                main_subtitle,
                left_card_title,
                left_card_description,
                right_card_title,
                right_card_description,
                bottom_text
            }).eq("id", existing.id).select().single();
            if (error) throw error;
            result = data;
        } else {
            // 插入新记录
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from("hero_content").insert([
                {
                    main_title,
                    main_subtitle,
                    left_card_title,
                    left_card_description,
                    right_card_title,
                    right_card_description,
                    bottom_text
                }
            ]).select().single();
            if (error) throw error;
            result = data;
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: result
        });
    } catch (error) {
        console.error("Update hero content error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "更新失败"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9a91dde5._.js.map