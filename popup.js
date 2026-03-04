document.getElementById("scan").addEventListener("click", async () => {
    document.getElementById("output").textContent = "Scanning...";

    const result = await browser.runtime.sendMessage({ action: "scan-current-tab" });
    document.getElementById("output").textContent = result;
});

document.getElementById("supportBtn").addEventListener("click", () => {
    browser.tabs.create({ url: "https://www.buymeacoffee.com/erikjclark" });
});
