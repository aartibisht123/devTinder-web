const UserCard = ({ user }) => {
  if (!user) return null;
  const {firstName, lastName, age, skills =[], gender, about , photoUrl,} = user;
  console.log(user);

  return (
    <div className="card bg-base-300 w-96 mt-5 shadow-sm">
      <figure>
        <img
          src={photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title" >{firstName + " " + lastName}</h2>
     {age && gender && <p>{age}, {gender}</p>}


        <p  >{about}</p>
        <p > {skills.join(", ")}</p>
        <div className="card-actions justify-center mx-4 mt-2 my-6" >
        <button className="btn btn-primary"> Ignore</button>
         <button className="btn btn-secondary">Interested </button>
        </div>
      </div>
    </div>
  
  );
};

export default UserCard;
