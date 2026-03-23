# Srimad Valmiki Ramayana

A modern, fast, and accessible web application for **Srimad Valmiki Ramayana**, rebuilt from the ground up. This project aims to bring the monumental translation work originally published at [valmikiramayan.net](https://valmikiramayan.net) into a contemporary interface, providing 24,000 Sanskrit verses across 6 Kaandas (Books) alongside their word-by-word meanings and English translations.

## 🌟 Features

- **Complete Collection**: Access all 6 Kaandas and 534 Sargas.
- **Detailed Verses**: View original Devanagari Sanskrit verses, romanized transliteration, word-for-word meaning, and English translations.
- **Modern User Interface**: Built with an elegant, warm parchment/saffron design theme inspired by ancient scriptures.
- **Responsive & Fast**: Fully responsive layout optimized for mobile and desktop viewing.
- **Dark Mode**: Supports a beautifully curated "Temple Night" dark mode for comfortable reading.
- **Static Generation**: Pre-renders all sarga pages for blazing-fast performance and excellent SEO.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Parsing**: Node.js web scraper (`node-html-parser`) for migrating legacy HTML data into structured JSON.

---

## 🚀 Getting Started

To run the project locally, ensure you have **Node.js 18+** installed.

### 1. Clone the repository
```bash
git clone https://github.com/diffusionmam/valmiki-ramayan.git
cd valmiki-ramayan
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Setup the Data
Since this project relies on scraped text data from the original legacy site, you need to generate the JSON files first:

```bash
# This script will scrape the data and output it inside the `/data` folder
npm run scrape # (or directly run: npx tsx scripts/scraper.ts)
```
*(Note: Ensure you have an internet connection and allow the script time to download and parse all 534 sargas.)*

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the outcome.

---

## 🤝 How to Contribute

We welcome contributions of all forms—whether it's improving the UI, optimizing performance, fixing data typos, or adding new features (like search or a gallery). 

Here is how you can help:

### 1. Reporting Issues
Spotted a bug, a missing verse, or a typo in the script? Please open an [Issue](https://github.com/diffusionmam/valmiki-ramayan/issues) and describe the problem along with steps to reproduce it or the specific verse number where it occurs.

### 2. Code Contributions
1. **Fork the Repository**: Click the 'Fork' button at the top-right corner of this page.
2. **Clone your fork**: `git clone https://github.com/[your-username]/valmiki-ramayan.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name` or `fix/your-fix-name`
4. **Make your changes**: Write clean, concise code following the existing formatting. 
5. **Test your code**: Run `npm run dev` to ensure everything compiles successfully and functions properly.
6. **Commit and push**: 
   ```bash
   git add .
   git commit -m "feat: adding new dynamic search feature"
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**: Go to the original repository and click "Compare & pull request".

### 3. Areas for Improvement
- **Data Scraping**: The legacy site data is unstructured. Enhancements to `scripts/scraper.ts` to better catch edge-case verses or specific commentary notes are highly appreciated.
- **Search System**: Expanding the application to support blazing-fast, client-side or server-side full-text search across all 24,000 verses.
- **Accessibility (a11y)**: Making sure the reading experience is perfectly accessible to all users.

---

## 📜 Credits and Copyright

- **Original Content & Translation**: Translation by **Sri Desiraju Hanumanta Rao** & **Sri K. M. K. Murthy**. Original content compiled at [valmikiramayan.net](https://valmikiramayan.net) (© 1998–2008).
- **Project Structure**: Inspired by the desire to preserve and widely distribute this monumental, timeless epic in a highly readable and long-lasting digital medium.
