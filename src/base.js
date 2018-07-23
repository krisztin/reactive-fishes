import Rebase from "re-base";
import firebase from "firebase";

const firebaseAPP = firebase.initializeApp({
  apiKey: "AIzaSyDifPkzX7H1Ca5j44FV85g_ZSPPCBk7P7g",
  authDomain: "catch-of-the-day-krisztin.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-krisztin.firebaseio.com"
});

const base = Rebase.createClass(firebaseAPP.database());

// named export
export {firebaseAPP};

export default base;