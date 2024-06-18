// 1. Проверка наличия определенных свойств в объекте navigator
const hasWebdriver = () => {
    const headlessProperties = [
      'webdriver',
      'webdriverInChrome',
      'webdriverInChromeOptions',
    ];

    return headlessProperties.some((property) => navigator[property]);
};

// 2. User agent
const testUserAgent = () => {
    if (/HeadlessChrome/.test(window.navigator.userAgent)) {
        // Headless
        return 1;
    }
    // Not Headless
    return 0;
}

// 3. Eval

// Chrome / Edge: 33
// Firefox: 37
// Safari: 37
// IE: 39

const testChromeWindow = () => {
    if (eval.toString().length == 33 && !window.chrome) {
        // Headless
        return 1;
    }
    // Not Headless
    return 0;
}

// 4. Notification Permissions
const testNotificationPermissions = () => {
    // promise?
    const permissionStatus = navigator.permissions.query({
        name: 'notifications'
    });

    if (Notification.permission === 'denied' && permissionStatus.state === 'prompt') {
        // Headless
        return 1;
    }
    // Not Headless
    return 0;
}

// 5. No Plugins deprecated
// в некоторых браузерах плагины по умолчанию отсутствуют
// и не для Firefox
const testPlugins = () => {
    const length = navigator.plugins.length;
    return length === 0 ? 1 : 0;
}

// 6. App Version deprecated
// Браузеры, работающие с puppeteer в безголовом режиме, будут включать «Headless» в свою версию приложения.
const testAppVersion = () => {
    const appVersion = navigator.appVersion;
    return /headless/i.test(appVersion) ? 1 : 0;
}

// 7. Connection Rtt
const testConnectionRtt = () => {
    const connection = navigator.connection;
    const connectionRtt = connection ? connection.rtt : undefined;

    if (connectionRtt === undefined) {
        return 0; // UNDEFINED - без флага
    }

    return connectionRtt === 0 ? 1 : 0;
}

// 8. Connection Downlink
const testConnectionDownlink = () => {
    const connection = navigator.connection;
    const connectionDownlink = connection ? connection.downlink : undefined;

    if (connectionDownlink === undefined) {
        return 0;
    }

    return connectionDownlink === 0 ? 1 : 0;
}


// 9. Connection Effective Type
const testConnectionEffectiveType = () => {
    const connection = navigator.connection;
    const connectionEffectiveType = connection ? connection.effectiveType : undefined;

    if (connectionEffectiveType === undefined) {
        return 0;
    }

    return connectionEffectiveType === '2g' ? 1 : 0;
}

// 10. Device Memory
const testDeviceMemory = () => {
    const deviceMemory = navigator.deviceMemory;
    return deviceMemory === 0 ? 1 : 0;
}

// 11. Device Pixel Ratio
// 12. Device Orientation
// 13. Retina/HiDPI Hairline Feature
// 14. Broken Image
// 15. WebGL Vendor and Renderer
// 16. Mime Type
// 17. Time elapse
// 18. Devtool
// 19. Outer Dimension
// 20. Mouse Move
// deviceandbrowserinfo.com/learning_zone/articles/detecting-headless-chrome-puppeteer-2024

document.addEventListener('DOMContentLoaded', function () {
    const browserType = hasWebdriver() ||
        testUserAgent() ||
        testChromeWindow() ||
        testNotificationPermissions() ||
        testPlugins() ||
        testAppVersion() ||
        testConnectionRtt() ||
        testConnectionDownlink() ||
        testConnectionEffectiveType() ||
        testDeviceMemory()
            ? 'headless' : 'generic';

    // 1/true - headless
    console.log(browserType);
})