import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useMemo} from "react";
import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import { RiEmotionLaughLine, RiImageAddFill } from "react-icons/ri";
import { getUser, createPost, uploadImage, createCircle  } from "../firebase/firebase-calls";
import toast from "react-hot-toast";
import {Button} from '@mui/material';
import DropdownList from "react-widgets/DropdownList";
import Combobox from "react-widgets/Combobox"

export default function TextEditor() {
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
    createPost(currentUser, newPost);
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
    <div className="mb-4 text-s md:text-l mx-auto flex w-full flex-col gap-4 p-4">
      <form
        className="mx-auto w-full max-w-3x bg-gray-50 shadow-md rounded-lg"
        onSubmit={(e) => submitHandler(e)}
      >

        <textarea
          rows="4"
          placeholder="What's on your mind?"
          className={`w-full resize-none rounded-sm border-none p-4 outline-none`}
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
        <div className="flex items-center justify-between p-3 mx-auto mt-2 mb-2 h-fit w-full min-w-[20rem] max-w-[90%] flex-col sm:w-3/4 md:mx-auto md:w-3/4 lg:w-full">
          <div className="flex gap-4">
            <label htmlFor="post-image" className="text-1xl text-black">
              <input
                type="file"
                id="post-image"
                name="imageURL"
                accept="image/*, .gif"
                className="hidden"
                onChange={(e) => handleImage(e.target.files[0])}
              />
              <RiImageAddFill className="text-1xl my-2"/>
            </label>
            <div
              className="relative text-black"
              onClick={(e) => setShowEmojis((prev) => !prev)}
            >
              <RiEmotionLaughLine className="text-1xl my-2" />
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
           <select class="text-1xl hover:outline mx-auto border-2 " onChange={TagClick}> 
            {/* Creating the default / starting option for our dropdown.    */}
            <option value="⬇ Tag an experience ⬇">Tag an experience</option>
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
          {showModalImage && ( 
          <Button type='submit' className="rounded-md border-none bg-blue-500 px-4 py-1 text-base text-gray-100 shadow-md">
            Post
          </Button>
          )}
        </div>

      </form>
    </div>
  );
}
