'use client';

import { useEffect, useRef, useState, type ComponentType } from 'react';
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, ImagePlus, Italic,
  Link2, List, ListOrdered, Quote, Redo2, RemoveFormatting, Underline, Undo2,
} from 'lucide-react';
import { useApp } from '@/lib/AppContext';

type EditorProps = {
  value: string;
  onChange: (html: string) => void;
};

type ToolbarButtonProps = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onAction: () => void;
};

function ToolbarButton({ label, icon: Icon, onAction }: ToolbarButtonProps) {
  return <button type="button" title={label} aria-label={label} onMouseDown={(event) => { event.preventDefault(); onAction(); }} className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"><Icon className="h-4 w-4"/></button>;
}

function validLink(value: string) {
  return value.startsWith('/') || /^(?:https?:\/\/|mailto:|tel:)/i.test(value);
}

function escapeAttribute(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function RichTextEditor({ value, onChange }: EditorProps) {
  const { uploadMedia } = useApp();
  const editor = useRef<HTMLDivElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const savedSelection = useRef<Range | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editor.current && document.activeElement !== editor.current && editor.current.innerHTML !== value) {
      editor.current.innerHTML = value;
    }
  }, [value]);

  function sync() {
    onChange(editor.current?.innerHTML ?? '');
  }

  function focusEditor() {
    editor.current?.focus();
  }

  function command(name: string, commandValue?: string) {
    focusEditor();
    document.execCommand(name, false, commandValue);
    sync();
  }

  function rememberSelection() {
    const selection = window.getSelection();
    if (selection?.rangeCount && editor.current?.contains(selection.anchorNode)) {
      savedSelection.current = selection.getRangeAt(0).cloneRange();
    }
  }

  function restoreSelection() {
    focusEditor();
    if (!savedSelection.current) return;
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(savedSelection.current);
  }

  function addLink() {
    rememberSelection();
    const href = window.prompt('Enter an internal path such as /admissions, or a complete external URL:')?.trim() ?? '';
    if (!href) return;
    if (!validLink(href)) {
      setError('Links must start with /, https://, http://, mailto: or tel:.');
      return;
    }
    setError('');
    restoreSelection();
    command('createLink', href);
  }

  function chooseImage() {
    rememberSelection();
    imageInput.current?.click();
  }

  async function insertImage(file: File | null) {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const alt = window.prompt('Describe this image for accessibility:')?.trim() || file.name;
      const asset = await uploadMedia(file, alt);
      restoreSelection();
      document.execCommand('insertHTML', false, `<figure><img src="${escapeAttribute(asset.url)}" alt="${escapeAttribute(alt)}" loading="lazy"><figcaption>${escapeAttribute(alt)}</figcaption></figure><p><br></p>`);
      sync();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'The image could not be inserted.');
    } finally {
      setUploading(false);
      if (imageInput.current) imageInput.current.value = '';
    }
  }

  return <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50 p-2">
      <select aria-label="Paragraph style" defaultValue="p" onChange={(event) => command('formatBlock', event.target.value)} className="mr-1 h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700">
        <option value="p">Paragraph</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="h4">Heading 4</option><option value="blockquote">Quote</option>
      </select>
      <ToolbarButton label="Bold" icon={Bold} onAction={() => command('bold')}/><ToolbarButton label="Italic" icon={Italic} onAction={() => command('italic')}/><ToolbarButton label="Underline" icon={Underline} onAction={() => command('underline')}/>
      <span className="mx-1 h-6 w-px bg-slate-200"/>
      <ToolbarButton label="Align left" icon={AlignLeft} onAction={() => command('justifyLeft')}/><ToolbarButton label="Align center" icon={AlignCenter} onAction={() => command('justifyCenter')}/><ToolbarButton label="Align right" icon={AlignRight} onAction={() => command('justifyRight')}/><ToolbarButton label="Justify" icon={AlignJustify} onAction={() => command('justifyFull')}/>
      <span className="mx-1 h-6 w-px bg-slate-200"/>
      <ToolbarButton label="Bulleted list" icon={List} onAction={() => command('insertUnorderedList')}/><ToolbarButton label="Numbered list" icon={ListOrdered} onAction={() => command('insertOrderedList')}/><ToolbarButton label="Quote" icon={Quote} onAction={() => command('formatBlock', 'blockquote')}/>
      <span className="mx-1 h-6 w-px bg-slate-200"/>
      <ToolbarButton label="Insert link" icon={Link2} onAction={addLink}/><ToolbarButton label="Insert R2 image" icon={ImagePlus} onAction={chooseImage}/><ToolbarButton label="Clear formatting" icon={RemoveFormatting} onAction={() => command('removeFormat')}/>
      <span className="mx-1 h-6 w-px bg-slate-200"/>
      <ToolbarButton label="Undo" icon={Undo2} onAction={() => command('undo')}/><ToolbarButton label="Redo" icon={Redo2} onAction={() => command('redo')}/>
      <input ref={imageInput} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(event) => void insertImage(event.target.files?.[0] ?? null)}/>
      {uploading && <span className="ml-auto px-2 text-xs font-bold text-blue-700">Uploading image…</span>}
    </div>
    {error && <p role="alert" className="border-b border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">{error}</p>}
    <div ref={editor} contentEditable suppressContentEditableWarning onInput={sync} onMouseUp={rememberSelection} onKeyUp={rememberSelection} data-placeholder="Write the article here…" className="min-h-[420px] px-6 py-5 text-base leading-8 text-slate-700 outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] [&_a]:font-bold [&_a]:text-blue-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-400 [&_blockquote]:pl-4 [&_h2]:text-3xl [&_h2]:font-black [&_h2]:text-blue-950 [&_h3]:text-2xl [&_h3]:font-extrabold [&_h3]:text-blue-950 [&_img]:my-6 [&_img]:max-h-[520px] [&_img]:w-full [&_img]:rounded-xl [&_img]:object-cover"/>
  </div>;
}
