export default function EditPostBox(props) {
  const { updatePost, setUpdatePost } = props;
  return (
    <div className="flex flex-col ">
      <textarea
        value={updatePost.caption}
        className="ml-10 pl-1 focus:outline-none"
        onChange={(e) =>
          setUpdatePost((prev) => ({ ...prev, caption: e.target.value }))
        }
      />
      <input
        value={updatePost.imageURL}
        placeholder="Add image URL here"
        className="ml-10 pl-1 focus:outline-none"
        onChange={(e) =>
          setUpdatePost((prev) => ({
            ...prev,
            imageURL: e.target.value,
          }))
        }
      />
      {updatePost.imageURL && (
        <img
          src={updatePost.imageURL}
          alt="post-one"
          className="mx-auto aspect-auto max-h-96 mt-2"
        />
      )}
    </div>
  );
}
