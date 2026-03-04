(() => {
    const suspicious = [];

    const elements = document.querySelectorAll("[onkeydown], [onkeyup], [onkeypress]");
    if (elements.length > 0) {
        suspicious.push(`Inline event attributes detected: ${elements.length}`);
    }

    const scripts = [...document.querySelectorAll("script:not([src])")];
    const pattern = /(onkeydown|onkeyup|onkeypress|keydown|keyup|keypress)/g;

    for (const script of scripts) {
        if (pattern.test(script.textContent)) {
            suspicious.push("Inline script contains key event usage.");
        }
    }

    if (suspicious.length > 0) {
        browser.runtime.sendMessage({
            type: "auto-detect",
            url: location.href,
            findings: suspicious
        });
    } else {
        browser.runtime.sendMessage({
            type: "auto-clear",
            url: location.href
        });
    }
})();
