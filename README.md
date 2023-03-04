

 1 l l g -t e r m i n a l - g p t



1llg-terminal-GPT is a command-line interface (CLI) tool that uses OpenAI's GPT-3.5-turbo(default) API to generate text based on user prompts.



## Start

> Node >= 14

### Install

```bash
$ npm install 1llg-terminal-gpt -G
```

### Config

```bash
1gpt config --key [your_api_key]
```

You need to configure your access rights to access the OpenAI API. Please replace **[your_api_key]** to your actual OpenAI key. You can get your API keys from [OpenAI-Keys](https://platform.openai.com/account/api-keys).




## Usage

###  Chat

```bash
1gpt chat
```

Use the above command to enter the chat mode to communicate with chatGPT.

#### chat commands

After entering the chat, you can perform different operations by entering the following commands

- `/` :  to exit current chatting process

- `/clear`:  to exit current chatting process and clean terminal screen

  > The following commands will not modify the Endpoint (Turbo) of the default conversation process, just a single dialogue

- `/davinci-chat + prompt`: use text-davinci-003 model to send this prompt

- `/davinci-code + code`: use ode-davinci-002 model to expalin your code

- some still under development...



### History

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
This project is licensed under the MIT License. See the LICENSE file for details.