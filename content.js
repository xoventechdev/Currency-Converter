// Function to convert and update prices
function convertPrices(conversionRate) {
  const priceElements = document.querySelectorAll(".chakra-text.css-11t9n23");

  if (priceElements.length > 0) {
    for (let element of priceElements) {
      const bdtText = element.textContent;
      const bdtAmount = parseFloat(bdtText.replace(/[^0-9.]/g, ""));
      if (!isNaN(bdtAmount)) {
        const qarAmount = (bdtAmount / conversionRate).toFixed(2);
        element.textContent = `${bdtText} # ${qarAmount} QAR`;
      } else {
        console.error("Invalid BDT amount found.");
      }
    }
  } else {
    console.error("Ticket prices elements not found.");
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "convertPrices") {
    chrome.storage.sync.get("conversionRate", ({ conversionRate }) => {
      if (!conversionRate) {
        console.error("Conversion rate not set.");
        return;
      }

      convertPrices(conversionRate);
    });
  }
});
