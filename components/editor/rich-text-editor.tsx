"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
}

export const RichTextEditor = ({
  value,
  onChange,
}: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false, 
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  /* ================= HELPERS ================= */

  const toolbarButton = (active?: boolean) =>
    cn(
      "h-8 w-8",
      active && "bg-neutral-200 text-neutral-900"
    );

  const currentHeading = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    if (editor.isActive("heading", { level: 4 })) return "Heading 4";
    return "Normal text";
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  /* ================= RENDER ================= */

  return (
    <div className="border rounded-md bg-white">
      {/* ===== Toolbar ===== */}
      <div className="flex flex-wrap items-center gap-1 border-b p-2 bg-neutral-50 rounded-t-md">

        {/* Heading Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="flex items-center gap-1 px-2"
            >
              {currentHeading()}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem
              onClick={() => editor.chain().focus().setParagraph().run()}
            >
              Normal text
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              Heading 1
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
              Heading 2
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              Heading 3
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            >
              Heading 4
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Divider */}
        <div className="h-5 w-px bg-neutral-300 mx-1" />

        {/* Text styles */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        {/* Divider */}
        <div className="h-5 w-px bg-neutral-300 mx-1" />

        {/* Lists */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Divider */}
        <div className="h-5 w-px bg-neutral-300 mx-1" />

        {/* Link */}
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className={toolbarButton(editor.isActive("link"))}
          onClick={setLink}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* ===== Editor ===== */}
      <EditorContent
        editor={editor}
        className="
          min-h-[120px]
          p-3
          text-sm
          prose prose-sm max-w-none
          focus:outline-none
          outline-none
          border-0
          [&_*]:outline-none
        "
      />
    </div>
  );
};
