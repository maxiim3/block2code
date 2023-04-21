# Code2Block
Code2Block is a web application that allows users to minify and split their code into blocks with a maximum character length of 6000. It provides an intuitive interface for users to input their code, choose their input language, and decide whether to minify the code before creating the blocks.

- Preview the App: [Code2Block](https://code2block.vercel.app/)
- Deployed on Vercel
- Made with Next.js
- Made by Maxime Tamburrini | [Maxiim3](https://github.com/maxiim3)
- UI is inspired by [Mckay Wrigley](https://github.com/mckaywrigley) [from this repo](https://github.com/mckaywrigley/ai-code-translator)
- I used it as a template. Thanks to him for the great job!


## Features
- Minify code using Terser.
- Split code into blocks with a maximum character length of 6000.
- Support for multiple input languages.
- Responsive design that works on both desktop and mobile devices.

# Getting Started

To run Code2Block locally, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.
2. Clone the repository:
    ```bash
    git clone https://github.com/username/Code2Block.git
    ```

3. Install dependencies:

    ```bash
    cd Code2Block
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```
   
5. Open your browser and navigate to http://localhost:3000.

## Usage

- Input your code in the provided text area.
- Choose your input language from the dropdown menu.
- Check the "Minify Code" checkbox if you want the code to be minified before splitting it into blocks.
- Click the "Create Blocks" button to process the input code and generate blocks.
- The generated blocks will appear below the input and minified code areas.

- ## Contributing
If you'd like to contribute to Code2Block, please follow these steps:

- Fork the repository.
- Create a new branch with a descriptive name, e.g., feature/add-language-support.
- Make your changes and commit them to your branch.
- Open a pull request and describe the changes you made.