const fs = require("fs");
const path = require("path");

const footerPath = path.join(__dirname, "../src/components/Footer.tsx");

try {
  let footerContent = fs.readFileSync(footerPath, "utf8");

  // Get current date in MM/DD/YY format
  const date = new Date();
  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date
    .getFullYear()
    .toString()
    .slice(-2)}`;

  // Replace the date using regex to match the existing format
  const updatedContent = footerContent.replace(
    /UPDATED \d{2}\/\d{2}\/\d{2}/,
    `UPDATED ${formattedDate}`
  );

  fs.writeFileSync(footerPath, updatedContent);
  console.log("Footer date updated successfully!");
} catch (error) {
  console.error("Error updating footer date:", error);
  process.exit(1);
}
