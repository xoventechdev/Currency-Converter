// Function to convert and update prices
function convertPrices(conversionRate) {
  // const priceElements = document.querySelectorAll(".chakra-text.css-11t9n23");

  // Website A
  const priceElementsA = document.querySelectorAll(
    ".b2b-flight-price--gross-fare-tooltip span"
  );
  priceElementsA.forEach((element) => {
    const bdtText = element.textContent.match(/(\d+(\.\d{1,2})?)\s*BDT/);
    if (bdtText && bdtText[1]) {
      const bdtAmount = parseFloat(bdtText[1]);
      let qarAmount = (bdtAmount * conversionRate).toFixed(2);
      if (qarAmount < 500) {
        qarAmount += 20;
      } else if (qarAmount > 1000) {
        qarAmount += 10;
      } else qarAmount += 5;
      element.textContent = `${bdtText[0]} # ${qarAmount} QAR`;
    }
  });

  // Website B
  const priceElementsB = document.querySelectorAll(".css-whdouq .chakra-text");
  priceElementsB.forEach((element) => {
    const bdtText = element.textContent.match(/(\d+(\.\d{1,2})?)\s*BDT/);
    if (bdtText && bdtText[1]) {
      const bdtAmount = parseFloat(bdtText[1]);
      let qarAmount = (bdtAmount * conversionRate).toFixed(2);
      if (qarAmount < 500) {
        qarAmount += 20;
      } else if (qarAmount > 1000) {
        qarAmount += 10;
      } else qarAmount += 5;
      element.textContent = `${bdtText[0]} # ${qarAmount} QAR`;
    }
  });

  // Website C
  const priceElementsC = document.querySelectorAll(".priceViewer");
  priceElementsC.forEach((element) => {
    const bdtText = element.textContent.match(/(\d+(\.\d{1,2})?)/);
    if (bdtText && bdtText[1]) {
      const bdtAmount = parseFloat(bdtText[1]);
      let qarAmount = (bdtAmount * conversionRate).toFixed(2);
      if (qarAmount < 500) {
        qarAmount += 20;
      } else if (qarAmount > 1000) {
        qarAmount += 10;
      } else qarAmount += 5;
      element.textContent = `${element.textContent.trim()} # ${qarAmount} QAR`;
    }
  });

  // Website C
  const priceElementsD = document.querySelectorAll(".css-11t9n23");
  priceElementsD.forEach((element) => {
    const bdtText = element.textContent;
    const bdtAmount = parseFloat(bdtText.replace(/[^0-9.]/g, ""));
    if (!isNaN(bdtAmount)) {
      let qarAmount = bdtAmount / conversionRate;

      if (qarAmount < 500) {
        qarAmount += 20;
      } else if (qarAmount < 1000) {
        qarAmount += 10;
      } else {
        qarAmount += 5;
      }

      qarAmount = qarAmount.toFixed(2);
      element.textContent += ` # ${qarAmount} QAR`;
    } else {
      console.error("Invalid BDT amount found.");
    }
  });
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
