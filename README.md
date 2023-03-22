<br />

<p>
  <img width="200" alt="logo" src="https://github.com/codeacme17/repo-assets/blob/main/terminal-gpt/logo.png?raw=true "/> 
</p>

<br />

<p>
  <a href="https://github.com/codeacme17/1llg-terminal-GPT/blob/main/package.json">
    <img height="20" alt="node" src="https://img.shields.io/badge/node-%3E%3D%2014.0.0-orange?style=flat-square"/>
  </a>
  <a href="https://discord.com/channels/974519864045756446/1082238050542813244">
    <img height="20" alt="license" src="https://img.shields.io/badge/discord-chat%20room-blueviolet?style=flat-square"/>
  </a>
  <a href="https://github.com/codeacme17/1llg-terminal-GPT/blob/main/package.json">
    <img height="20" alt="version" src="https://img.shields.io/github/package-json/v/codeacme17/1llg-terminal-GPT?style=flat-square"/>
  </a>
</p>


> 1llg-terminal-GPT is a command-line interface (CLI) tool that uses OpenAI's GPT-3.5-turbo(default) API to generate text based on user prompts.

## Use Case


https://user-images.githubusercontent.com/67408722/226816002-298b5065-72a0-4dcd-bee9-4cc95b3cb162.mov



## Start


### Install

```bash
$ npm install 1llg-terminal-gpt -g
```

### Config

```bash
1gpt config --key [your_api_key]
```

> I can guarantee that your keys are not stored anywhere other than your computer. After performing the above operations, a file named `user_configs.json` will be created on the root directory of the project in your computer to store and read your api-key

You need to configure your access rights to access the OpenAI API. Please replace **[your_api_key]** to your actual OpenAI key. You can get your API keys from [OpenAI-Keys](https://platform.openai.com/account/api-keys).


## Usage

### 🤖 Chat

```bash
1gpt chat
```

Use the above command to enter the chat mode to communicate with chatGPT.

> This command will provide a quick chat mode, and your current chat conversation will not be remembered by chatGPT. If you want to continue chatting next time after leaving the terminal, I suggest you use `Pattern` mode.

#### chat commands

After entering the chat, you can perform different operations by entering the following commands

- `/` :  to exit current chatting process

- `/clear`:  to exit current chatting process and clean terminal screen

- some still under development...


### 📔 Pattern

> Pattern is a module that can record your chat history with chatGPT, and you can continue the last chat when you open the terminal next time. You can create multiple patterns to correspond to different chatGPT systems, just like the sidebar on the chatGPT website

```bash
1gpt pattern
```

#### options
- `-u, --use [pattern-name]`: used to open an existing pattern. `1gpt pattern` has the same effect
- `-c, --create [pattern-name]`: create a new pattern
- `-r, --remove [pattern-name]`: delete a existing pattern
- `-l, --list`: show the existing pattern list

> Highly recommended that you read this document [Pattern-user-guide](https://github.com/codeacme17/repo-assets/blob/main/terminal-gpt/pattern-use-cases.md).



### 🕒 History

```bash
1gpt history [options]
```

History will record every conversation you have with chatGPT.

#### options

- `-r, --read`: print the content of the history file in the current terminal
- `-c, --clear`: clear all history



>You can view or manage the history file by yourself, which is located in the chat-history.txt file in the root directory of the project






## Contributing
Contributions to the project are welcome! If you find a bug or have an idea for a new feature, please submit an issue or pull request.



## License
[MIT](https://github.com/codeacme17/1llg-terminal-GPT/blob/main/LICENSE) License © 2023-Present [leyoonafr](https://github.com/codeacme17)
