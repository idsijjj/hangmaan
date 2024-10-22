# hangmaan
import random
def get_word():
   words = ['python', 'hangman', 'programmering', 'spill', 'github']
   return random.choice(words)
def display_hangman(tries):
   stages = [
               '''
                  -----
                  |   |
                  O   |
                 /|\\  |
                 / \\  |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                  O   |
                 /|\\  |
                 /    |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                  O   |
                 /|\\  |
                      |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                  O   |
                 /|   |
                      |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                  O   |
                  |   |
                      |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                  O   |
                      |
                      |
                     |
               --------
               ''',
               '''
                  -----
                  |   |
                      |
                      |
                      |
                     |
               --------
               '''
   ]
   return stages[tries]
def play_game():
   word = get_word().upper()
   word_letters = set(word)
   alphabet = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
   used_letters = set()
   tries = 6
   print("Velkommen til Hangman!")
   while len(word_letters) > 0 and tries > 0:
       print(display_hangman(tries))
       print("Du har", tries, "forsøk igjen og har brukt disse bokstavene:", ' '.join(used_letters))
       word_display = [letter if letter in used_letters else '_' for letter in word]
       print("Gjeldende ord: ", ' '.join(word_display))
       guessed_letter = input("Gjett en bokstav: ").upper()
       if guessed_letter in alphabet - used_letters:
           used_letters.add(guessed_letter)
           if guessed_letter in word_letters:
               word_letters.remove(guessed_letter)
               print("Bra! Bokstaven", guessed_letter, "er i ordet.")
           else:
               tries -= 1
               print("Beklager, bokstaven", guessed_letter, "er ikke i ordet.")
       elif guessed_letter in used_letters:
           print("Du har allerede gjettet bokstaven", guessed_letter)
       else:
           print("Ugyldig bokstav.")
   if tries == 0:
       print(display_hangman(tries))
       print("Du tapte! Ordet var", word)
   else:
       print("Gratulerer! Du gjettet ordet", word, "korrekt!")
if __name__ == "__main__":
   play_game()
