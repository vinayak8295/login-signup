console.log("integrated");
import {initializeApp} from 'firebase/app'
import {getFirestore, collection,  getDocs, addDoc} from  'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAeUH9e7GCtpej2P19zoX1LHzzvsF4X3PE",
    authDomain: "testing-b1253.firebaseapp.com",
    databaseURL: "https://testing-b1253-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testing-b1253",
    storageBucket: "testing-b1253.appspot.com",
    messagingSenderId: "259748840833",
    appId: "1:259748840833:web:42670f2e0333310b3f5480",
    measurementId: "G-KX3SRD7625"
  }; 

// init firebase app
initializeApp(firebaseConfig)

// init services
 const db = getFirestore()

//collection reference
 const colRef = collection(db,'user')
 const admRef = collection(db,'admin')


//get data for user
let users = [];
getDocs(colRef)
.then((snapshot) => {
    snapshot.docs.forEach((doc)=>{
       users.push({ ...doc.data(), id: doc.id})
    })
    // console.log(users)
 })
 .catch(err =>{
   console.log(err.message)
 })

// get data for admin
let admin = [];
getDocs(admRef)
.then((snapshot) => {
    snapshot.docs.forEach((doc)=>{
       admin.push({ ...doc.data(), id: doc.id})
    })
    console.log(admin)
 })
 .catch(err =>{
   console.log(err.message)
 })

// getting email id and password from sign in page
  const check = document.querySelector('.check')
  if(check){
  check.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(adminverifier(check.email_id.value,check.password.value)){
      alert("successfully loged in as admin");
     }else
     if(userverifier(check.email_id.value,check.password.value)){
      
      alert("successfully loged in as user");
      location.href = "usersInfo.html";
     }else{
      alert("wrong EmailId/Password");
     }
  })
}

// verifing email id and password from database for user
function userverifier(email,password){
  console.log(email);
  console.log(password);

  for(let x in users){
    if(email==users[x]['email_id']){
      if(password==users[x]['password']){
        return true;
      }else{
        continue;
      }
    }
    else{
      continue;
    }
  }
  return false;
}

// verifing email id and password from database for admin
function adminverifier(email,password){
  console.log(email);
  console.log(password);

  for(let x in admin){
    if(email==admin[x]['admin']){
      if(password==admin[x]['password']){
        return true;
      }else{
        continue;
      }
    }
    else{
      continue;
    }
  }
  return false;
}

// adding new user to database
  const addBookForm = document.querySelector('.add')
  if(addBookForm){
  addBookForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    if(check_user(addBookForm.email_id.value)){
      alert("user already exist");
    }else{
    if(addBookForm.password.value==addBookForm.re_password.value){
    addDoc(colRef,{
      email_id: addBookForm.email_id.value,
      password: addBookForm.password.value,
      date: addBookForm.dob.value,
      s1: addBookForm.seq1.value,
      s2: addBookForm.seq2.value,
      s3: addBookForm.seq3.value,
      image: addBookForm.image.value,
    })
    .then(()=>{
      addBookForm.reset()
    }
    )
    .then(()=>{
      alert("successfully registered");
  
    })
  }else{
    alert("both password are not same");
  }
  }}
  )
  }

function check_user(email){
  for(let x in admin){
    if(email==admin[x]['admin']){
      return true;
    }
  }
  for(let x in users){
    if(email==users[x]['email_id']){
      return true;
    }
  }
}

// if(document.getElementById("email_uni")){
//   document.getElementById("email_uni").innerHTML = email_send;
// }
