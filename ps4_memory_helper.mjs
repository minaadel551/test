/* 
 * PS4 Memory Helper Module
 * وظائف خاصة لتحسين استقرار الذاكرة في متصفح PS4
 */

import { log } from './module/utils.mjs';
import { cleanupMemory } from './memory_stabilizer.mjs';

// مصفوفة لتخزين مراجع الكائنات المؤقتة
const temporaryObjects = [];

// دالة لتنظيف الكائنات المؤقتة بشكل دوري
export function setupPeriodicCleanup() {
    log('Setting up periodic memory cleanup...');
    
    // تنظيف الذاكرة كل 30 ثانية
    setInterval(() => {
        cleanTemporaryObjects();
    }, 30000);
    
    return true;
}

// دالة لتخزين كائن مؤقت
export function storeTemporaryObject(object) {
    temporaryObjects.push(object);
    return object;
}

// دالة لتنظيف الكائنات المؤقتة
export function cleanTemporaryObjects() {
    log('Cleaning temporary objects...');
    
    // تفريغ مصفوفة الكائنات المؤقتة
    while (temporaryObjects.length > 0) {
        temporaryObjects.pop();
    }
    
    // محاولة تحرير الذاكرة غير المستخدمة
    cleanupMemory();
    
    return true;
}

// دالة لتحسين أداء متصفح PS4
export function optimizePS4Browser() {
    log('Optimizing PS4 browser performance...');
    
    // تعطيل بعض ميزات المتصفح التي قد تستهلك الذاكرة
    try {
        // تعطيل التحقق من التحديثات في الخلفية (إذا كان متاحًا)
        if (typeof navigator.serviceWorker !== 'undefined') {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
        }
        
        // تعطيل الإشعارات (إذا كان متاحًا)
        if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            // لا يمكن إلغاء الإذن، ولكن يمكن تجاهل الإشعارات
        }
        
        // تعطيل تخزين الجلسة والتخزين المحلي (إذا لم يكن ضروريًا)
        // ملاحظة: لا تقم بتعطيل هذا إذا كان المشروع يعتمد على التخزين المحلي
        // sessionStorage.clear();
        // localStorage.clear();
    } catch (e) {
        log(`Warning during browser optimization: ${e}`);
    }
    
    return true;
}

// دالة لتحسين أداء WebGL (إذا كان مستخدمًا)
export function optimizeWebGL() {
    log('Optimizing WebGL performance...');
    
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
            // تعيين خيارات WebGL للأداء الأمثل
            gl.hint(gl.GENERATE_MIPMAP_HINT, gl.FASTEST);
            gl.disable(gl.DEPTH_TEST);
            gl.disable(gl.STENCIL_TEST);
            gl.disable(gl.BLEND);
            
            // تحرير موارد WebGL
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        }
    } catch (e) {
        log(`Warning during WebGL optimization: ${e}`);
    }
    
    return true;
}

// دالة لتحسين أداء DOM
export function optimizeDOM() {
    log('Optimizing DOM performance...');
    
    try {
        // تقليل عدد عمليات إعادة الرسم
        document.body.style.contain = 'content';
        
        // تعطيل الرسوم المتحركة غير الضرورية
        const style = document.createElement('style');
        style.textContent = '* { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }\n' +
                           '* { animation-delay: -0.001s !important; transition-delay: -0.001s !important; }';
        document.head.appendChild(style);
    } catch (e) {
        log(`Warning during DOM optimization: ${e}`);
    }
    
    return true;
}

// دالة لتنفيذ جميع التحسينات
export function applyAllOptimizations() {
    setupPeriodicCleanup();
    optimizePS4Browser();
    optimizeWebGL();
    optimizeDOM();
    
    log('All memory optimizations successfully applied');
    return true;
}