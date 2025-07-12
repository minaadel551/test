/* 
 * Memory Stabilizer Module
 * يستخدم هذا الملف لتحسين استقرار الذاكرة وتجنب تسريبات الذاكرة
 */

import { log } from './module/utils.mjs';

// مصفوفة لتخزين المراجع إلى الكائنات لمنع جامع القمامة من تحريرها
const memoryReferences = [];

// دالة لتنظيف الذاكرة قبل تنفيذ الـ exploit
export function prepareMemory() {
    log('Preparing memory for exploit...');
    
    // محاولة تحرير الذاكرة غير المستخدمة
    try {
        // إجبار جامع القمامة على العمل
        for (let i = 0; i < 10; i++) {
            const dummy = new Uint8Array(1024 * 1024); // 1MB
            dummy.fill(0);
        }
    } catch (e) {
        log(`Warning during memory preparation: ${e}`);
    }
    
    log('Memory prepared successfully');
    return true;
}

// دالة لحجز كائن في الذاكرة ومنع جامع القمامة من تحريره
export function keepAlive(object) {
    memoryReferences.push(object);
    return object;
}

// دالة لتنظيف الذاكرة بعد تنفيذ الـ exploit
export function cleanupMemory() {
    log('Cleaning up memory after exploit...');
    
    // تفريغ مصفوفة المراجع
    while (memoryReferences.length > 0) {
        memoryReferences.pop();
    }
    
    // محاولة تحرير الذاكرة غير المستخدمة
    try {
        // إجبار جامع القمامة على العمل
        for (let i = 0; i < 10; i++) {
            const dummy = new Uint8Array(1024 * 1024); // 1MB
            dummy.fill(0);
        }
    } catch (e) {
        log(`Warning during memory cleanup: ${e}`);
    }
    
    log('Memory cleaned successfully');
    return true;
}

// دالة لمراقبة استخدام الذاكرة وتسجيل تحذيرات إذا كان الاستخدام مرتفعًا
export function monitorMemoryUsage() {
    // هذه الدالة تعمل فقط في بيئات معينة مثل المتصفحات الحديثة
    // وليس في متصفح PS4، لكن يمكن استخدامها للاختبار
    
    if (typeof performance !== 'undefined' && performance.memory) {
        const memoryInfo = performance.memory;
        const usedHeapSize = memoryInfo.usedJSHeapSize;
        const totalHeapSize = memoryInfo.totalJSHeapSize;
        const usagePercentage = (usedHeapSize / totalHeapSize) * 100;
        
        log(`Memory usage: ${Math.round(usedHeapSize / (1024 * 1024))}MB / ${Math.round(totalHeapSize / (1024 * 1024))}MB (${Math.round(usagePercentage)}%)`);
        
        if (usagePercentage > 80) {
            log('Warning: High memory usage!');
        }
    }
    
    return true;
}