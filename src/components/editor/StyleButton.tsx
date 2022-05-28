import * as React from 'react';

import Button from '@/components/buttons/Button';

interface StyleButtonProps {
  label: string;
  style: string;
  onToggle: (e: string) => void;
  active: boolean;
}

const StyleButton: React.FC<StyleButtonProps> = ({
  active,
  label,
  onToggle,
  style,
}) => {
  const toggle = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = 'm-1';
  if (active) {
    className += ' bg-gray-200 text-gray-800';
  }

  return (
    <Button onMouseDown={toggle} className={className} variant='light'>
      {label}
    </Button>
  );
};

export default StyleButton;
