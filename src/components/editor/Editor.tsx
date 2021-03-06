import {
  AtomicBlockUtils,
  ContentBlock,
  convertFromRaw,
  convertToRaw,
  DraftHandleValue,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  RawDraftContentState,
  RichUtils,
} from 'draft-js';
import * as React from 'react';

// Components
import Button from '@/components/buttons/Button';

import Media from './Media';
import { BlockStyleControls, InlineStyleControls } from './StyleControls';

function mediaBlockRenderer(contentBlock: ContentBlock) {
  if (contentBlock.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}
type SyntheticKeyboardEvent = React.KeyboardEvent;

const CustomEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(contentState)
  );
  const [data, setData] = React.useState<RawDraftContentState>();

  const handleKeyCommand = React.useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    []
  );

  const keyBindingEditorCommand = (e: SyntheticKeyboardEvent) => {
    if (e.code === '9') {
      const newState = RichUtils.onTab(e, editorState, 4);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    }
    return getDefaultKeyBinding(e);
  };

  const onChange = React.useCallback((editorState: EditorState) => {
    setEditorState(editorState);
  }, []);

  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineType: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineType));
  };

  const handlePastedFiles = (files: Array<Blob>): DraftHandleValue => {
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const src = event.target?.result;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'image',
        'IMMUTABLE',
        {
          src,
        }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        ' '
      );
      setEditorState(newEditorState);
    };
    reader.readAsDataURL(file);
    return 'handled';
  };

  let className = 'mt-4 text-left';
  const editorContentState = editorState.getCurrentContent();
  if (!editorContentState.hasText()) {
    if (editorContentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    setData(rawContent);
  };

  return (
    <>
      <form className='' onSubmit={handleSubmit}>
        <div className='mx-auto my-4 min-h-fit rounded-xl bg-slate-100 p-4 shadow'>
          <BlockStyleControls
            editorState={editorState}
            onToggle={toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={toggleInlineStyle}
          />

          <div className={className}>
            <Editor
              blockRendererFn={mediaBlockRenderer}
              customStyleMap={styleMap}
              editorKey='editor'
              editorState={editorState}
              handleKeyCommand={handleKeyCommand}
              handlePastedFiles={handlePastedFiles}
              keyBindingFn={keyBindingEditorCommand}
              onChange={onChange}
              placeholder='Paste an image or video URL'
            />
          </div>
        </div>
        <Button variant='light' className='mt-4' type='submit'>
          Submit
        </Button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

const contentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      key: '637gr',
      text: 'Paste an Image below',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [{ offset: 0, length: 25, style: 'ITALIC' }],
      entityRanges: [],
      data: {},
    },
  ],
});

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

export default CustomEditor;
