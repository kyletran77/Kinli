import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useMemo} from "react";
import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { RiEmotionLaughLine, RiImageAddFill } from "react-icons/ri";
import { getUser, createPost, uploadImage, createCircle, createQuestion  } from "../firebase/firebase-calls";
import toast from "react-hot-toast";
import {Button} from '@mui/material';
import DropdownList from "react-widgets/DropdownList";
import Combobox from "react-widgets/Combobox"

export default function QuestionTextEditor({CircleID}) {
  const currentUser = auth?.currentUser;
  const { user } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [comp, setComp] = useState("");

  useEffect(
    () => {
      if (currentUser) getUser(currentUser, setUserData);
    },
    // eslint-disable-next-line
    [currentUser]
  );

  const initialPostState = {
    author: "",
    uid: "",
    photoURL: "",
    email: "",
    caption: "",
    createdAt: "",
    imageURL: null,
    postID: "",
    company: "",
  };

  const [newPost, setNewPost] = useState(initialPostState);
  const [showEmojis, setShowEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showModalImage, setShowModalImage] = useState(false);
  const [showModalTags, setShowModalTags] = useState("");
  const categories = userData?.allExp;


//   var filteredData = useMemo(() => {  

//     return userData?.experience?.filter(exp => exp.company);  
// }, [category]); 
// filteredData=["ligma"];
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };
  let TagClick = (tag) => {
    setNewPost({ ...newPost, company: tag.target.value });
    console.log(tag.target.value);

  };
 
  const submitHandler = (e) => {
    e.preventDefault();
    createQuestion(currentUser, CircleID, newPost);
    setNewPost(initialPostState);
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(
    () => {
      setNewPost({
        ...newPost,
        caption:
          newPost.caption + (chosenEmoji ? chosenEmoji.emoji.toString() : ""),
        company: newPost.company
      });
    },
    // eslint-disable-next-line
    [chosenEmoji]
  );
  

  const handleImage = async (file) => {
    console.log("Image Uploader Pressed")
    const loader = toast.loading("uploading image");
    const path = `images/${currentUser.uid}/${file.name}`;
    const imageURL = await uploadImage(path, file);
    toast.success("uploaded image", { id: loader });
    setShowModalImage((prev) => !prev);
    setNewPost({ ...newPost, imageURL: imageURL });

  };
  //problem with the text area/form only responsive on certain sizes
  return (
    <div className="mx-auto p-2 items-center w-full mt-2 justify-center content-center text-l flex flex-col gap-4">

      <div class="flex flex-col w-96">
      <h5 class="mx-auto text-lg text-center bg-gray-50 mb-2 rounded-lg w-80 md:w-full">Ask your questions here!</h5>
      <form
        className="bg-gray-50 mx-8 md:mx-0 shadow-md rounded-lg"
        onSubmit={(e) => submitHandler(e)}
      >
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          className={`resize-none rounded-sm border-none bg-gray-50 p-4 outline-none`}
          name="caption"
          value={newPost.caption}
          onInput={inputHandler}
        />
        {newPost?.imageURL !== null && (
          <img
            src={newPost?.imageURL}
            alt="post"
            className="mx-auto aspect-auto max-h-96"
          />
        )}
        <div className="flex flex-col items-center justify-between px-3 py-2">
          <div className="flex gap-4">
            <label htmlFor="post-image" className="text-2xl text-gray-500">
              <input
                type="file"
                id="post-image"
                name="imageURL"
                accept="image/*, .gif"
                className="hidden"
                onChange={(e) => handleImage(e.target.files[0])}
              />
              <RiImageAddFill />
            </label>
            <div
              className="relative text-gray-500"
              onClick={(e) => setShowEmojis((prev) => !prev)}
            >
              <RiEmotionLaughLine className="text-2xl" />
              {showEmojis && (
                <div className="emojipicker absolute z-10">
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    pickerStyle={{ height: "220px" }}
                  />
                </div>
              )}
            </div>
           {/* DropDown Menu */}
           <select class="text-sm md:text-1xl" onChange={TagClick}> 
        {/* Creating the default / starting option for our 
          dropdown.
         */}
      <option value="⬇️ Select an Experience to Tag ⬇️"> -- Select an Experience to Tag -- </option>
      {userData?.allExp?.map((exp) => (exp.company != "")?<option key={exp.company} value={exp.company}>{exp.company}</option>: "")}


    </select>
           {/* <DropdownList
            dataKey="company"
            textField="company"
            value={company}
            onChange={(nextValue) => setCompany(nextValue.company)}
            data = {userData?.allExp}
          /> */}
           {/* <Combobox
      // busy={loading}
      data={userData?.allExp}
      textField="company"
      value={newPost.company}
      onChange={inputHandler}
      hideEmptyPopup
    /> */}

          </div>
          <div class="flex mt-2">
          {(
          <Button type='submit' className="flex rounded-md border-none mx-auto bg-blue-500 px-4 py-1 text-base text-gray-100 shadow-md">
            Post
          </Button>
          )}
          </div>
        </div>

      </form>
      </div>
    </div>
  );
}
