// src/data/productsData.js

// ----------------------------------------------------------------------
// STEP 1: IMPORT ALL IMAGES
// ----------------------------------------------------------------------

// --- Existing Images (Other Categories) ---
import modelXPlus from '../assets/images/model-x-plus.png';
import webmaster from '../assets/images/webmaster.png';
import vegapress from '../assets/images/vegapress.png';
import decoY from '../assets/images/deco-y.png';
import ink from '../assets/images/ink.png';
import dyes from '../assets/images/dyes.png';

// --- New Sublimation Images (As per your request) ---
import sub4Head from '../assets/images/four-HeadsSublimationPrinter.png';
import sub8Head from '../assets/images/eight-HeadsSublimationPrinter.png'; // Assuming .jpg
import sub12Head from '../assets/images/twel-HeadsSublimationPrinter.png'; // Fixed typo from 'Printerjpg'
import sub16Head from '../assets/images/sixtin-HeadsSublimationPrinter.png';
import sub20Head from '../assets/images/twenty-HeadsSublimationPrinter.png';
import sub30Head from '../assets/images/thirty-HeadsSublimationPrinter.png';

// --- New Reactive & Pigment Images ---
import reactive32 from '../assets/images/thirty-two-head-reactive-print.png';
import pigment32 from '../assets/images/thirty-two-head-pigment.png';

// --- Background Textures ---
import textileBg1 from '../assets/images/textile-bg-01.jpg';
import textileBg2 from '../assets/images/textile-bg-02.jpg';
import textileBg3 from '../assets/images/textile-bg-03.jpg';
import printerBg1 from '../assets/images/printer-bg-01.jpg';
import printerBg2 from '../assets/images/printer-bg-02.jpg';
import printerBg3 from '../assets/images/printer-bg-03.jpg';
import inkBg1 from '../assets/images/ink-bg-01.jpg';
import inkBg2 from '../assets/images/ink-bg-02.jpg';

// ----------------------------------------------------------------------
// STEP 2: ORGANIZE DATA FOR TEXTILE PAGE (SERIES BASED)
// ----------------------------------------------------------------------

export const textileSeries = [
  {
    seriesName: "Sublimation", // আগে ছিল Vega
    description: "High performance sublimation transfer printing",
    products: [
      { 
        id: 101, 
        name: 'Sublimation 4H', 
        output: '4 Heads High Speed', 
        imageUrl: sub4Head, // আপনার ইম্পোর্ট করা ভেরিয়েবল
        category: 'Textile',
        
        // --- NEW: Feature Highlights (আইকন সেকশনের জন্য) ---
        features: [
          { title: "24/7 Printing", desc: "Daily Output: 3000-5000m" },
          { title: "Vivid Color", desc: "Exquisite Sharpness & Clarity" },
          { title: "Linear Motor", desc: "World-leading Brand Components" },
          { title: "Degassing System", desc: "Reduces Print Head Blockage" },
        ],

        // --- NEW: Full Specification Table Data ---
        specifications: {
          model: "Sublimation 4H (1804)",
          printHead: "4 Epson i3200 Heads",
          width: "1800mm / 70 inch",
          inkType: "Sublimation Ink",
          colors: "4 Colors (C, M, Y, K)",
          speed: {
            pass1: "150 m²/h",
            pass2: "110 m²/h",
            pass3: "85 m²/h",
          },
          software: "Maintop / Photoprint / Onyx",
          format: "PDF, JPEG, TIFF, EPS, AI",
          power: "AC 220V, 50/60Hz, 3500W",
          environment: "Temp: 20-28°C, Humidity: 40-60%",
          dimensions: "3200 x 900 x 1400 mm",
          weight: "650 KG"
        }
      },
      { 
        id: 102, 
        name: 'Sublimation 8H', 
        output: '8 Heads Industrial', 
        imageUrl: sub8Head,
        category: 'Textile'
      },
      { 
        id: 103, 
        name: 'Sublimation 12H', 
        output: '12 Heads Professional', 
        imageUrl: sub12Head,
        category: 'Textile'
      },
      { 
        id: 104, 
        name: 'Sublimation 16H', 
        output: '16 Heads Production', 
        imageUrl: sub16Head,
        category: 'Textile'
      },
      { 
        id: 105, 
        name: 'Sublimation 20H', 
        output: '20 Heads Mass Production', 
        imageUrl: sub20Head,
        category: 'Textile'
      },
      { 
        id: 106, 
        name: 'Sublimation 30H', 
        output: '30 Heads Ultra Speed', 
        imageUrl: sub30Head,
        category: 'Textile'
      },
    ]
  },
  {
    seriesName: "Model",
    description: "Industrial direct to fabric printing solution",
    products: [
      { 
        id: 201, 
        name: 'Model X Plus', 
        output: 'Daily Output: 3000-5000m', 
        imageUrl: modelXPlus,
        category: 'Textile'
      },
      // যদি Model সিরিজের আরও প্রোডাক্ট থাকে তবে এখানে যোগ করবেন
    ]
  },
  {
    seriesName: "Eco",
    description: "Environment friendly printing technology",
    products: [
      // আপাতত ডামি বা অন্য ছবি ব্যবহার করছি, আপনার কাছে Eco সিরিজের ছবি থাকলে পরিবর্তন করবেন
      { 
        id: 301, 
        name: 'Eco Print Pro', 
        output: 'Sustainable Printing', 
        imageUrl: sub4Head, // Placeholder image
        category: 'Textile'
      }, 
    ]
  },
  {
    seriesName: "Single-pass",
    description: "Ultra high speed industrial printing",
    products: [
      { 
        id: 401, 
        name: 'Vega One', 
        output: 'Single Pass Tech', 
        imageUrl: sub30Head, // Placeholder image
        category: 'Textile'
      }, 
    ]
  },
  {
    seriesName: "Reactive",
    description: "Vibrant colors for natural fibers",
    products: [
      { 
        id: 501, 
        name: 'Reactive 32H', 
        output: '32 Heads Reactive Printer', 
        imageUrl: reactive32,
        category: 'Textile'
      }, 
    ]
  },
  {
    seriesName: "Pigment",
    description: "Waterless printing for all fabrics",
    products: [
      { 
        id: 601, 
        name: 'Pigment 32H', 
        output: '32 Heads Pigment Printer', 
        imageUrl: pigment32,
        category: 'Textile'
      }, 
    ]
  }
];

// ----------------------------------------------------------------------
// STEP 3: COMPREHENSIVE ARRAY FOR SEARCH / ALL PRODUCTS / DETAIL PAGES
// ----------------------------------------------------------------------
// (Here we merge all textile series products + printers + inks)

const textileBackgrounds = [textileBg1, textileBg2, textileBg3];

export const allProducts = [
  // Spread all textile products from the series above
  // আমরা এখানে index ব্যবহার করে ব্যাকগ্রাউন্ডগুলো ঘুরিয়ে ঘুরিয়ে সেট করছি
  ...textileSeries.flatMap(series => 
    series.products.map((p, index) => ({
      ...p,
      // index % 3 এর মানে হলো: 0, 1, 2, 0, 1, 2... এভাবে চলবে
      backgroundUrl: textileBackgrounds[index % textileBackgrounds.length] 
    }))
  ),

  // --- Printer Category ---
  {
    id: 8,
    name: 'WebMaster',
    output: 'Packaging Solution',
    category: 'Printer',
    imageUrl: webmaster,
    backgroundUrl: printerBg1,
  },
  {
    id: 9,
    name: 'A2iPress',
    output: 'Commercial Printing',
    category: 'Printer',
    imageUrl: vegapress,
    backgroundUrl: printerBg2,
  },
  {
    id: 10,
    name: 'DECO Y',
    output: 'Decor Printing',
    category: 'Printer',
    imageUrl: decoY,
    backgroundUrl: printerBg3,
  },

  // --- Ink Category ---
  {
    id: 11,
    name: 'Ink',
    output: 'High-Quality Pigment Inks',
    category: 'Ink',
    imageUrl: ink,
    backgroundUrl: inkBg1,
  },
  {
    id: 12,
    name: 'Dyes',
    output: 'Vibrant Textile Dyes',
    category: 'Ink',
    imageUrl: dyes,
    backgroundUrl: inkBg2,
  },
];