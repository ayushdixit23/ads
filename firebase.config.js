import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyA-9mlyRUML69ZVVA_AGNBnHVGQHv6dr4c",
	authDomain: "adspace-grovyo.firebaseapp.com",
	projectId: "adspace-grovyo",
	storageBucket: "adspace-grovyo.appspot.com",
	messagingSenderId: "572209189214",
	appId: "1:572209189214:web:9d9fda8e50f9c902493fcf",
	measurementId: "G-ZSQKMEPW9S"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
