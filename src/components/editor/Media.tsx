import { ContentBlock, ContentState } from 'draft-js';
import Image from 'next/image';
import * as React from 'react';

interface IProps {
  srcURL: string;
}

const ImageAvatar: React.FC<IProps> = ({ srcURL, ...props }) => {
  return <Image src={srcURL} alt='' {...props} height={350} width={350} />;
};

interface MediaProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Media = ({ contentState, block }: MediaProps) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === 'IMAGE') {
    media = <ImageAvatar srcURL={src} />;
  }
  return media;
};

export default Media;
