import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect } from '@/components/LanguageSelect';
import { TextBlock } from '@/components/TextBlock';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { minify } from 'terser';

export default function Home() {
  const [blocks, setBlocks] = useState<string[]>([]);
  const [inputLanguage, setInputLanguage] = useState<string>('JavaScript');
  const [inputCode, setInputCode] = useState<string>('');
  const [minifiedCode, setMinifiedCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasProcessed, setHasProcessed] = useState<boolean>(false);
  const maxCodeLength = 6000;
  const [doMinifyCode, setDoMinifyCode] = useState(true);
  const handleMinify = async (input: string) => {
    try {
      const result = await minify(input, { module: true, toplevel: true });
      return result.code || '';
    } catch (error) {
      console.error('Failed to minify TypeScript code:', error);
      return input;
    }
  };
  const createBlocks = (minifiedInput: string): string[] => {
    const blocks = [];
    let currentBlock = '';
    let currentBlockLength = 0;
    const words = minifiedInput.split(/\s/);
    for (const word of words) {
      if (currentBlockLength + word.length + 1 > maxCodeLength) {
        blocks.push(currentBlock);
        currentBlock = '';
        currentBlockLength = 0;
      }
      if (currentBlockLength > 0) {
        currentBlock += ' ';
        currentBlockLength += 1;
      }
      currentBlock += word;
      currentBlockLength += word.length;
    }
    if (currentBlockLength > 0) {
      blocks.push(currentBlock);
    }
    return blocks;
  };
  const handleProcess = async () => {
    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    setLoading(true);
    setMinifiedCode('');

    const minifiedCode = await handleMinify(inputCode);

    if (minifiedCode.trim().length === 0) {
      setLoading(false);
      alert('Something went wrong.');
      return;
    }

    const newBlocks = createBlocks(doMinifyCode ? minifiedCode : inputCode);
    setBlocks(newBlocks);
    setMinifiedCode(minifiedCode);
    setLoading(false);
    setHasProcessed(true);
  };

  useEffect(() => {
    if (hasProcessed) {
      handleProcess().then();
    }
  }, [inputLanguage, inputCode]);

  return (
    <>
      <Head>
        {/*-- Primary Meta Tags --*/}
        <title>Code2Block</title>
        <meta name="title" content="Code2Block" />
        <meta
          name="description"
          content="Code2Block is a web app that splits code into blocks of 6000 chars. Input code, select language, & minify before creating blocks."
        />

        {/*-- Open Graph / Facebook --*/}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://code2block.vercel.app/" />
        <meta property="og:title"  content="Code2Block" />
        <meta
          property="og:description"
          content="Code2Block is a web app that splits code into blocks of 6000 chars. Input code, select language, & minify before creating blocks."
        />
        <meta property="og:image" content="https://res.cloudinary.com/dumtd7dhj/image/upload/v1682092813/preview-xl_sgvnei.png" />

        {/*-- Twitter --*/}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://code2block.vercel.app/" />
        <meta property="twitter:title" content="Code2Block" />
        <meta
          property="twitter:description"
          content="Code2Block is a web app that splits code into blocks of 6000 chars. Input code, select language, & minify before creating blocks."
        />
        <meta property="twitter:image" content="https://res.cloudinary.com/dumtd7dhj/image/upload/v1682092812/preview-lg_acaee7.png" />
      </Head>

      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">Code2Block</div>
        </div>

        <div className="gap- mt-2 flex flex-col items-center">
          <label htmlFor="min">
            Minify Code
            <input
              className={'mx-2'}
              type="checkbox"
              onChange={(e) => setDoMinifyCode(e.currentTarget.checked)}
            />
          </label>
          <div className={'flex items-center justify-center gap-4'}>
            <button
              className="w-[180px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
              onClick={() => handleProcess()}
              disabled={loading}
            >
              {loading
                ? 'Minifying and Splitting the Code into Blocks...'
                : 'Create Blocks'}
            </button>
            <button
              className="box-border w-fit cursor-pointer rounded-md border-2 border-violet-500 px-4 py-2 font-bold hover:border-violet-600 active:border-violet-700"
              onClick={() => {
                setBlocks([]);
                setHasProcessed(false);
                setInputCode('');
                setMinifiedCode('');
              }}
              disabled={loading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-2 text-center text-xs">
          {loading
            ? 'Processing...'
            : hasProcessed
            ? 'Process completed!'
            : 'Enter some code and click "Create Blocks"'}
        </div>
        <div className="mt-2 text-center text-xs">
          {loading
            ? ''
            : hasProcessed
            ? ''
            : 'Check the box to minify the code before splitting it into blocks.'}
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Input</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasProcessed(false);
                setInputCode('');
                setMinifiedCode('');
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasProcessed(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasProcessed(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Minified Code</div>
            {inputLanguage === 'Natural Language' ? (
              <TextBlock text={minifiedCode} />
            ) : (
              <CodeBlock code={minifiedCode} />
            )}
          </div>
        </div>
        {minifiedCode && blocks.length > 0 && !loading && hasProcessed && (
          <>
            <div className="text-center text-xl font-bold">
              {blocks.length} Blocks Created
            </div>
            <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:flex-wrap">
              {blocks.map((block, _i) => (
                <div
                  key={_i}
                  className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4"
                >
                  {/*<div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">*/}
                  <div className="text-center text-xl font-bold">
                    Block Code {_i + 1}
                  </div>
                  <TextBlock text={block} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
