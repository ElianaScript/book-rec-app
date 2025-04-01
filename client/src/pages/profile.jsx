import { useEffect, useState } from 'react';
import { getUserPrompts } from '../api/promptAPI';
import  { useParams } from 'react-router-dom';


const Profile = () => {
    const { userId } = useParams();
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        const fetchPrompts = async () => {
            const userPrompts = await getUserPrompts(userId);
            setPrompts(userPrompts);
        };
        fetchPrompts();
    }, [userId]);


return (
  <div>
    <h2>(username here) prompts</h2>
    {prompts.length > 0 ? (
      <ul>
        {prompts.map((prompt) => (
          <li key = {prompt._id}>
            <h3>{prompt.title}</h3>
            <p>{prompt.description}</p>
          </li>
        ))}
     </ul>
   ) : (
    <p>No prompts yet!</p>
   )}
  </div>
 ); 
}
export default Profile;