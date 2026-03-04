let badgeTimeout = null;

browser.runtime.onMessage.addListener(async (msg, sender) => {

    if (msg.type === "auto-detect") {
        browser.browserAction.setBadgeText({ text: "!" });
        browser.browserAction.setBadgeBackgroundColor({ color: "red" });

        if (badgeTimeout) clearTimeout(badgeTimeout);
        badgeTimeout = setTimeout(() => {
            browser.browserAction.setBadgeText({ text: "" });
        }, 10000);

        return;
    }

    if (msg.type === "auto-clear") {
        browser.browserAction.setBadgeText({ text: "" });
        if (badgeTimeout) clearTimeout(badgeTimeout);
        return;
    }

    if (msg.action === "scan-current-tab") {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        const result = await browser.tabs.executeScript(tabs[0].id, { file: "scanner.js" });
        const text = result[0];

        if (text.includes("keydown") ||
            text.includes("keyup") ||
            text.includes("keypress") ||
            text.includes("onkeydown") ||
            text.includes("onkeyup") ||
            text.includes("onkeypress")) {

            browser.browserAction.setBadgeText({ text: "!" });
            browser.browserAction.setBadgeBackgroundColor({ color: "red" });

            if (badgeTimeout) clearTimeout(badgeTimeout);
            badgeTimeout = setTimeout(() => {
                browser.browserAction.setBadgeText({ text: "" });
            }, 20000);
        }

        return text;
    }
});
