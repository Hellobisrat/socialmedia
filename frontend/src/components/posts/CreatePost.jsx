import { ImagePlus, X } from "lucide-react";
import { useState } from "react";

export default function CreatePost({ onSubmit }) {
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleMedia = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMedia(file);
    setPreview(URL.createObjectURL(file));
  };

  const handlePost = () => {
    if (!text.trim() && !media) return;

    onSubmit({ text, media });
    setText("");
    setMedia(null);
    setPreview(null);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
      <textarea
        placeholder="What's on your mind?"
        className="w-full bg-gray-100 p-3 rounded-lg outline-none resize-none"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {preview && (
        <div className="relative mt-3">
          <img
            src={preview}
            className="rounded-lg max-h-64 object-cover w-full"
          />
          <button
            onClick={() => {
              setPreview(null);
              setMedia(null);
            }}
            className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <label className="flex items-center gap-2 cursor-pointer text-primary">
          <ImagePlus size={20} />
          <span>Add Photo/Video</span>
          <input type="file" className="hidden" onChange={handleMedia} />
        </label>

        <button
          onClick={handlePost}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>
    </div>
  );
}