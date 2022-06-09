import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { createPost, uploadImage } from "../firebase/firebase-calls";
import { RiEmotionLaughLine, RiImageAddFill } from "react-icons/ri";
import toast from "react-hot-toast";

export default function TextEditor() {
  const currentUser = auth?.currentUser;
  const initialPostState = {
    author: "",
    uid: "",
    photoURL: "",
    email: "",
    caption: "",
    createdAt: "",
    imageURL: null,
    postID: "",
  };

  const [newPost, setNewPost] = useState(initialPostState);
  const [showEmojis, setShowEmojis] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
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
      });
    },
    // eslint-disable-next-line
    [chosenEmoji]
  );

  const handleImage = async (file) => {
    const loader = toast.loading("uploading image");
    const path = `images/${currentUser.uid}/${file.name}`;
    const imageURL = await uploadImage(path, file);
    toast.success("uploaded image", { id: loader });
    setNewPost({ ...newPost, imageURL: imageURL });
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-100 text-l p-4 mx-auto w-full">
      <form
        className="mx-auto w-full max-w-3xl bg-gray-50 "
        onSubmit={(e) => submitHandler(e)}
      >
        <textarea
          rows="4"
          placeholder="What's on your mind?"
          className={`rounded-sm w-full bg-gray-50 resize-none outline-none border-none p-4`}
          name="caption"
          value={newPost.caption}
          onChange={inputHandler}
        />
        {newPost?.imageURL !== null && (
          <img
            src={newPost?.imageURL}
            alt="post"
            className="mx-auto aspect-auto max-h-96"
          />
        )}
        <div className="flex justify-between px-3 py-2 items-center">
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
              className="text-gray-500 relative"
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
          </div>

          <button className="border-none bg-blue-500 text-gray-100 rounded-md px-4 py-1 text-base">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
