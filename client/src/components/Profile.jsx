import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { baseUrl, getUserPic, updateUserInfo } from '../actions/auth';
import { uploadUserPhoto } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
function Profile() {
  const { user, userPic, loading } = useSelector((state) => state.authReducer);
  const [firstN, setFirstN] = useState(user.firstName);
  const [lastN, setLastN] = useState(user.lastName);
  const last4PasswordLetters = user?.password?.slice(-4);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstRender, setFirstRender] = useState(true);
  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const newFormData = new FormData();
    newFormData.append('image', file);
    //send post request /upload
    baseUrl
      .post('/upload', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        dispatch(uploadUserPhoto(user._id, response.data));
      });
  };
  const upoladFile = () => {
    document.querySelector('.inputFile').click();
  };
  useEffect(() => {
    const waitTime = 1000;
    if (!firstRender) {
      const bounceTime = setTimeout(
        () => dispatch(updateUserInfo('firstName', firstN, user._id)),
        waitTime
      );

      return () => clearTimeout(bounceTime);
    }
  }, [firstN]);

  useEffect(() => {
    const waitTime = 1000;
    if (!firstRender) {
      const bounceTime = setTimeout(
        () => dispatch(updateUserInfo('lastName', lastN, user._id)),
        waitTime
      );

      return () => clearTimeout(bounceTime);
    }
  }, [lastN]);
  useEffect(() => setFirstRender(false));
  useEffect(() => {
    if (!user.token) navigate('/login');
  }, [user]);

  useEffect(()=>{
      dispatch(getUserPic(user._id))
  },[])

  return (
    <div className="bg-white p-4">
      {loading && <Spinner />}
      <h2 className="font-bold mb-5">General info</h2>
      <div className="flex">
        {/* userPicture */}
        <div className="px-6 pt-3 bg-dark rounded-md max-w-40 w-full flex flex-col items-center">
        {loading && <Spinner />}  
        {userPic && (
            <img
              className="h-20 w-20 rounded-full object-cover"
              src={`data:image/${userPic.extName};base64,${userPic.image}`}
            />
          )}

          <div className="flex justify-center gap-3 my-6">
            <input
              type="file"
              name="image"
              className="inputFile hidden"
              onChange={uploadHandler}
            />
            <p className="text-primary fontbold" onClick={upoladFile}>
              upload
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full mx-4">
          <div className="flex flex-col gap-3 max-w-sm w-full">
            <label>First Name</label>
            {user.firstName ? (
              <div className="bg-dark rounded-md text-white px-2 py-3">
                {user.firstName}
              </div>
            ) : (
              <input
                type="text"
                value={firstN}
                onChange={(e) => setFirstN(e.target.value)}
                placeholder="enter your first name"
                className="bg-dark rounded-md px-2 py-3 text-white placeholder:text-white"
              />
            )}
          </div>

          <div className="flex flex-col gap-3 max-w-sm w-full">
            <label>Last name</label>
            {user.lastName ? (
              <div className="bg-dark rounded-md text-white px-2 py-3">
                {user.lastName}
              </div>
            ) : (
              <input
                type="text"
                value={lastN}
                onChange={(e) => setLastN(e.target.value)}
                placeholder="enter your last name"
                className="bg-dark rounded-md px-2 py-3 text-white placeholder:text-white"
              />
            )}
          </div>

          <div className="flex flex-col gap-3 max-w-sm w-full">
            <label>Email</label>
            <div className="bg-dark rounded-md text-white px-2 py-3">
              {user.email}
            </div>
          </div>

          <div className="flex flex-col gap-3 max-w-sm w-full">
            <label>password</label>
            <div className="bg-dark rounded-md text-white px-2 py-3 ">
              {last4PasswordLetters?.padStart(16, '*')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
