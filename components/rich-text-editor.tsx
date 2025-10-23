"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Underline,
  Video,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "./ui/separator"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onImageUpload?: (file: File) => Promise<string> | string
  disabled?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  onImageUpload,
  disabled = false,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEditorFocused, setIsEditorFocused] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showVideoUrlInput, setShowVideoUrlInput] = useState(false)
  const [videoUrl, setVideoUrl] = useState("")

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
  }, [value])

  const executeCommand = (command: string, commandValue?: string) => {
    if (disabled) return
    try {
      document.execCommand(command, false, commandValue)
      editorRef.current?.focus()
      updateContent()
    } catch (error) {
      console.error("Error executing command:", error)
    }
  }

  const updateContent = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled) return
    updateContent()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault()
          executeCommand("bold")
          break
        case "i":
          e.preventDefault()
          executeCommand("italic")
          break
        case "u":
          e.preventDefault()
          executeCommand("underline")
          break
      }
    }
  }

  const handleFocus = () => !disabled && setIsEditorFocused(true)
  const handleBlur = () => setIsEditorFocused(false)

  const isCommandActive = (command: string) => {
    try {
      return document.queryCommandState(command)
    } catch {
      return false
    }
  }

  const handleFormatChange = (formatValue: string) => {
    if (!disabled) executeCommand("formatBlock", `<${formatValue}>`)
  }

  const handleImageUpload = () => {
    if (!disabled) fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)
    try {
      let imageUrl: string
      if (onImageUpload) {
        imageUrl = await onImageUpload(file)
      } else {
        imageUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
      }
      insertImage(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const insertImage = (imageUrl: string) => {
    if (!editorRef.current || disabled) return
    editorRef.current.focus()

    const img = document.createElement("img")
    img.src = imageUrl
    img.style.maxWidth = "100%"
    img.style.height = "auto"
    img.style.display = "block"
    img.style.margin = "10px 0"
    img.alt = "Uploaded image"

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(img)
      range.setStartAfter(img)
      range.setEndAfter(img)
      selection.removeAllRanges()
      selection.addRange(range)
    } else {
      editorRef.current.appendChild(img)
    }

    updateContent()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith("image/")) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) handleFileChange({ target: { files: [file] } } as any)
        break
      }
    }
  }

  const handleVideoInsertClick = () => {
    if (!disabled) {
      setShowVideoUrlInput((prev) => !prev)
      setVideoUrl("")
    }
  }

  const insertVideo = (url: string) => {
    if (!editorRef.current || !url || disabled) return
    editorRef.current.focus()

    let videoContent = ""
    const youtubeMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/
    )
    const vimeoMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/|)(\d+)(?:\S+)?/
    )

    if (youtubeMatch?.[1]) {
      videoContent = `<iframe src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>`
    } else if (vimeoMatch?.[1]) {
      videoContent = `<iframe src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe>`
    } else {
      videoContent = `<video src="${url}" controls preload="metadata" style="position:absolute;top:0;left:0;width:100%;height:100%;">Your browser does not support the video tag.</video>`
    }

    const wrapper = document.createElement("div")
    wrapper.style.position = "relative"
    wrapper.style.paddingBottom = "56.25%"
    wrapper.style.height = "0"
    wrapper.style.overflow = "hidden"
    wrapper.style.maxWidth = "100%"
    wrapper.style.margin = "10px 0"
    wrapper.innerHTML = videoContent

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(wrapper)
      range.setStartAfter(wrapper)
      range.setEndAfter(wrapper)
      selection.removeAllRanges()
      selection.addRange(range)
    } else {
      editorRef.current.appendChild(wrapper)
    }

    updateContent()
    setShowVideoUrlInput(false)
    setVideoUrl("")
  }

  return (
    <div className={`border rounded-lg overflow-hidden ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}>
      <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={disabled} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-x-1 gap-y-2 p-2 border-b bg-muted/50">
        <Select onValueChange={handleFormatChange} disabled={disabled}>
          <SelectTrigger className="w-32 h-8">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p">Paragraph</SelectItem>
            <SelectItem value="h1">Heading 1</SelectItem>
          </SelectContent>
        </Select>

        <Separator orientation="vertical" className="h-6" />

        {[
          { icon: Bold, cmd: "bold" },
          { icon: Italic, cmd: "italic" },
          { icon: Underline, cmd: "underline" },
          { icon: List, cmd: "insertUnorderedList" },
          { icon: ListOrdered, cmd: "insertOrderedList" },
          { icon: AlignLeft, cmd: "justifyLeft" },
          { icon: AlignCenter, cmd: "justifyCenter" },
          { icon: AlignRight, cmd: "justifyRight" },
        ].map(({ icon: Icon, cmd }) => (
          <Button
            key={cmd}
            variant={isCommandActive(cmd) ? "default" : "ghost"}
            size="sm"
            onClick={() => executeCommand(cmd)}
            className="h-8 w-8 p-0"
            type="button"
            disabled={disabled}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleImageUpload}
          disabled={disabled || isUploading}
          className="h-8 w-8 p-0"
          type="button"
          title="Upload Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleVideoInsertClick}
          className="h-8 w-8 p-0"
          type="button"
          disabled={disabled}
          title="Insert Video"
        >
          <Video className="h-4 w-4" />
        </Button>

        {showVideoUrlInput && !disabled && (
          <>
            <Input
              type="url"
              placeholder="Enter video URL"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="h-8 flex-grow w-full sm:w-48 ml-2"
              disabled={disabled}
            />
            <Button size="sm" onClick={() => insertVideo(videoUrl)} className="h-8" type="button" disabled={!videoUrl || disabled}>
              Insert
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowVideoUrlInput(false)} className="h-8" type="button" disabled={disabled}>
              Cancel
            </Button>
          </>
        )}
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          className={`min-h-[120px] p-4 outline-none focus:ring-0 prose prose-sm max-w-none ${disabled ? "bg-muted/30" : ""}`}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          suppressContentEditableWarning
        />
        {!value && !isEditorFocused && (
          <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none">{placeholder}</div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <div className="text-sm text-muted-foreground">Uploading image...</div>
          </div>
        )}
      </div>
    </div>
  )
}
