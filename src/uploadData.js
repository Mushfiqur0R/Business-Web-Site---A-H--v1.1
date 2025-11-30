// src/uploadData.js
import { db } from './firebase'; 
import { collection, writeBatch, doc } from "firebase/firestore"; 
import { allProducts } from './data/productsData'; 
import { newsItems } from './data/newsData';

// --- ফাংশন: সব প্রোডাক্ট আপলোড করা ---
const uploadProducts = async () => {
  const batch = writeBatch(db);
  console.log("Uploading Products...");
  
  allProducts.forEach((product) => {
    // এখানে আমরা কাস্টম আইডি ব্যবহার করতে পারি অথবা অটো-আইডি
    // আপাতত অটো-আইডি দিচ্ছি
    const docRef = doc(collection(db, "products")); 
    batch.set(docRef, product);
  });

  await batch.commit();
  console.log("All Products Uploaded Successfully!");
};

// --- ফাংশন: নিউজ আপলোড করা ---
const uploadNews = async () => {
  const batch = writeBatch(db);
  console.log("Uploading News...");
  
  newsItems.forEach((news) => {
    const docRef = doc(collection(db, "news"));
    batch.set(docRef, news);
  });

  await batch.commit();
  console.log("All News Uploaded Successfully!");
};

// --- মেইন এক্সিকিউশন ---
const runUpload = async () => {
  try {
    await uploadProducts();
    await uploadNews();
    alert("Data Uploaded Successfully! Check Firebase Console.");
  } catch (error) {
    console.error("Error uploading data: ", error);
    alert("Error uploading data. Check Console.");
  }
};

export default runUpload;