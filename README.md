# Editor.js Font Size Tool

The `@nabeelh/editorjs-fontsize-tool` is a custom tool for Editor.js that allows users to adjust the font size of selected text within the editor. This tool provides a dropdown menu for selecting different font sizes and applying them to the text.

## Features

- **Font Size Dropdown**: Provides a list of predefined font sizes for users to choose from.
- **Inline Styling**: Applies font sizes directly to the selected text without affecting other content.
- **Clean Fragment**: Ensures that existing styles are cleaned up when applying new font sizes.

## Installation

To install the package, run:

```bash
npm install @nabeelh/editorjs-fontsize-tool

```
## Usage

To Use the package, run:

```bash
import FontSizeTool from '@nabeelh/editorjs-fontsize-tool';

- Register Font Size like this.

fontSize: {
    class: FontSizeTool,
    inlineToolbar: true, // Ensures it's available in the inline toolbar
},

- use it like that in your paragraph module.

paragraph: {
    class: paragraph,
    inlineToolbar: ['fontSize', 'link', 'bold'], // Specify inline tools as an array
    tunes: ["alignmentTuneTool"],
},

```
## DEMO
![Demo Video](https://github.com/nabeelhussain819/editorjs-fontsize-tool/blob/main/assets/demo.mp4)