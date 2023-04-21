import { useEffect, useState } from 'react';

interface Props {
  text: string;
  editable?: boolean;
  onChange?: (value: string) => void;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  onChange = () => {},
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);
  return (
      <div className="relative">
      <button
        className="absolute right-0 top-0 z-10 rounded bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A]"
        onClick={() => {
          navigator.clipboard.writeText(text).then();
          setCopyText('Copied!');
        }}
      >
        {copyText}
      </button>
      <textarea
        className="min-h-[500px] w-full bg-[#1A1B26] p-4 text-[15px] text-neutral-200 focus:outline-none"
        style={{ resize: 'none' }}
        value={text}
        onChange={(e) => onChange(e.target.value)}
        disabled={!editable}
      />
    </div>
  );
};
