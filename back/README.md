# CARDS FOR HUMANITY

## What is it
This is going to be an external API that serves `json` objects representing cards from the famous Cards Against Humanity game. These `json` objects will likely resemble something like this:

```json
{
  "color": "black",
  "pack": "original",
  "text": "___. Good till the last drop.",
  "choose": 1
},
{
  "color": "white",
  "pack": "box",
  "text": "The Biggest, Blackest Dick",
  "choose": null
}
```
It could also maybe output other formats such as plain text or xml if there is a need for it.

These objects will first be available through API calls like:
```
https://cardsforhumanity.com/api/count=all&color=white&packs%5B%5D=original&packs%5B%5D=90s
```
Then eventually there could be an NPM module and even a website with a GUI.

## Uses

Since the api will only be serving `json` objects, they can be used for many different things.
Like making your own Cards Against Humanity game, having random cards pop up on your website for lols, or even _**generating hilarious placeholder text Lorem Ipsum style**_ which is actually my how I came up with the idea to make this API.

This will mostly be a learning experience for me, as it will involve making an api, managing a database and models, setting up a backend server, writing an NPM module, and all that node type jazz. All of which I have little to no experience or real knowledge of.

But if anyone ever wanted to contribute once I get started, they are more than welcome (just try not to do all the work for me).

## Tech Stack
I know you shouldn't choose your tech stack before you properly analyze the project and start work on it, but I know that I will be using Node so I will probably be using Express. And the DB will probably be Firebase because its easy and I don't have to do anything. And probably gulp too because its gulp!
