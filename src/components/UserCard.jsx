const UserCard = ({ user }) => {
    const {firstName, lastName, age, skills, gender, about} = user;
  if (!user) return null;

  console.log(user);

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={user.photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title" >{firstName + " " + lastName}</h2>
       { age && gender &&<p className="text-red-500">{age + "," + gender}</p>}
        <p className="text-red-500">{about}</p>
        <p>{skills}</p>
        <div className="card-actions justify-center mx-4">
        <button className="btn btn-secondary"> Ignore</button>
         <button className="btn btn-primary"> Interested </button>
        </div>
      </div>
    </div>
  
  );
};

export default UserCard;
