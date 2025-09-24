import { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";
import Header from "./Header";
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const currentUserEmail = auth?.user?.email;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProfile(data.users);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found.</p>;

  const userProfile = profile.find(user => user.email === currentUserEmail);
  if (!userProfile) return <p>No matching profile found.</p>;

  return (
    <div className="profile-container">
      <Sidebar />
      <Header />
      <div className="profile">
        <div className="profile-card">
          <div className="profile-avatar">
            <span>{userProfile.name[0]}</span>
          </div>
          <div className="profile-info">
            <div className="info-group">
              <label>Name:</label>
              <p>{userProfile.name}</p>
            </div>
            <div className="info-group">
              <label>Email:</label>
              <p>{userProfile.email}</p>
            </div>
            <div className="info-group">
              <label>Role:</label>
              <p>{userProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

// import { useState, useEffect } from 'react';
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import './Profile.css';

// function Profile() {
//   // const [profile] = useState({
//   //   name: 'Deepanshu Chand',
//   //   id: 'N12345',
//   //   department: 'Surgery',
//   //   hospital: 'Central Hospital'
//   // });

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const auth = JSON.parse(localStorage.getItem("auth"));
//   const currentUserEmail = auth?.user?.email;

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/v1/users');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         console.log(data);
//         setProfile(data.users);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) return <p>Loading profile...</p>;
//   if (!profile) return <p>Profile not found.</p>;

//   return (
//     <div className="profile-container"> {/* ✅ Added Flex Container */}
//       <Sidebar /> {/* Sidebar on the left */}
//       <Header />
//       <div className="profile"> {/* Profile content on the right */}
//         {/* <h1>Profile</h1> */}
        
//         <div className="profile-card">
//           <div className="profile-avatar">
//             <span>{profile[0].name}</span>
//           </div>
          
//           <div className="profile-info">
//             <div className="info-group">
//               <label>Name:</label>
//               <p>{profile.name}</p>
//             </div>
            
//             <div className="info-group">
//               <label>Nurse ID:</label>
//               <p>{profile.id}</p>
//             </div>
            
//             <div className="info-group">
//               <label>Department:</label>
//               <p>{profile.department}</p>
//             </div>
            
//             <div className="info-group">
//               <label>Hospital:</label>
//               <p>{profile.hospital}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;