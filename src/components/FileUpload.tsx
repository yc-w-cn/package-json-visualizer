import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { setPackageJson } from "@/lib/store/packageSlice";

export function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useDispatch();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name === "package.json") {
        parseFile(file);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name === "package.json") {
        parseFile(file);
      }
    }
  };

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        dispatch(setPackageJson(content));
      } catch (error) {
        console.error("Error parsing package.json:", error);
      }
    };
    reader.readAsText(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text");
    try {
      const content = JSON.parse(text);
      if (content.name && (content.dependencies || content.devDependencies)) {
        dispatch(setPackageJson(content));
      }
    } catch (error) {
      console.error("Error parsing pasted content:", error);
    }
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center"
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onPaste={handlePaste}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".json"
        onChange={handleChange}
      />
      <label
        htmlFor="file-upload"
        className={`cursor-pointer ${dragActive ? "text-blue-500" : ""}`}
      >
        {dragActive
          ? "Drop package.json here"
          : "Drag & drop package.json or click to select"}
      </label>
      <p className="mt-2 text-sm text-gray-500">
        Or paste package.json content
      </p>
    </div>
  );
}
