import { useCallback, useState } from "react";

import { useDispatch } from "react-redux";

import { updatePackageWithNpmInfo } from "@/lib/api/npm";
import { setNpmInfo } from "@/lib/store/npmInfoSlice";
import { setPackageJson } from "@/lib/store/packageSlice";

import { Button } from "./ui/button";

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
    reader.onload = async (e) => {
      try {
        const content = JSON.parse(e.target?.result as string);
        dispatch(setPackageJson(content));
        const npmInfo = await updatePackageWithNpmInfo(content);
        dispatch(setNpmInfo(npmInfo || {}));
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
          ? "拖放package.json文件到这里"
          : "拖放package.json文件或点击选择"}
      </label>
      <p className="mt-2 text-sm text-gray-500">或者粘贴package.json内容</p>
      <Button
        className="mt-4 cursor-pointer"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        上传文件
      </Button>
    </div>
  );
}
