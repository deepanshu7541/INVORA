import { useState } from 'react';
import './Profile.css';

function Profile() {
  // const [profile] = useState({
  //   name: 'Deepanshu Chand',
  //   id: 'N12345',
  //   department: 'Surgery',
  //   hospital: 'Central Hospital'
  // });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/profile');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data);
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
  return (
    <div className="profile">
      <h1>Profile</h1>
      
      <div className="profile-card">
        <div className="profile-avatar">
          <span>{profile.name[0]}</span>
        </div>
        
        <div className="profile-info">
          <div className="info-group">
            <label>Name:</label>
            <p>{profile.name}</p>
          </div>
          
          <div className="info-group">
            <label>Nurse ID:</label>
            <p>{profile.id}</p>
          </div>
          
          <div className="info-group">
            <label>Department:</label>
            <p>{profile.department}</p>
          </div>
          
          <div className="info-group">
            <label>Hospital:</label>
            <p>{profile.hospital}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;