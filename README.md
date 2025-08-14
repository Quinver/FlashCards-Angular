# Flashcards
I'm trying out diffrent frameworks to get the feel of them. And this is my attempt to work with Angular with Asp.net core as backend.

The app itself is just the thousands flashcard app. You can add/remove/edit decks, and in the decks you can do the same for the cards. I have not used any css framework because my skills were getting a bit rusty in that area.

## Local Install
To run it I've decided on docker.
Tested it on my arch(btw) system and on my windows desktop.

#### Linux/wsl:

1. First, make sure Docker and Docker Compose are installed on your system. Use your favorite package manager (tested with pacman on Arch Linux):
```bash
sudo pacman -S docker docker-compose
```
2. Start the Docker service to ensure it’s running:
```bash
sudo systemctl start docker
```
3. Clone the repository to your local machine:
```bash
git clone https://github.com/Quinver/FlashCards-Angular.git
```
4. Change to the root directory of the project:
```bash
cd FlashCards-Angular
```
5. Finally, run the Docker containers defined in the docker-compose.yml file(This will take a while):
```bash
docker-compose up
```
### Windows:
1. Install docker from the [download](https://docs.docker.com/desktop/setup/install/windows-install/) page.
2. Restart system if needed.
3. Run docker-desktop(For me it took a while before the engine started).
4. Clone the repository to your local machine:
```bash
git clone https://github.com/Quinver/FlashCards-Angular.git
```
5. Change to the root directory of the project:
```bash
cd FlashCards-Angular
```
6. Finally, run the Docker containers defined in the docker-compose.yml file(This will take a while):
```bash
docker-compose up
```
## Running: how to basic!
The site is running on http://localhost:4200.
If you want to access the api go to http://localhost:5041.

That's it, now you can manoeuvre throught the beautiful ui and make your flashcards a reality.

## Closure
This was the easiest way I could think of to let you run this project locally, if you have any tips/improvements for the installation, feel free to contact me.
