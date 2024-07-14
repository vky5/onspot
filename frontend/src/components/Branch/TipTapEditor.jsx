import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';

const TipTapEditor = () => {
  const [content, setContent] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // Allow H1, H2, H3 headings
        },
        // Configure other options as needed
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white shadow-md sticky top-0 z-10">
        <MenuBar editor={editor} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group mb-4">
      <div className="button-group space-x-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`px-4 py-2 border rounded ${
            editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          Bold
        </button>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
};

export default TipTapEditor;
