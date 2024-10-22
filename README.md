# hangmaan
import random

# Farger med ANSI escape-koder
RØD = '\033[91m'
GRØNN = '\033[92m'
BLÅ = '\033[94m'
RESET = '\033[0m'

# Liste over ord spilleren kan gjette
ord_liste = ["eadni", "sámegiella", "ihkku", "disdat", "beana", "guovdageaidnu", "divri"]

# Hangman stadier
def galge(antall_forsok):
    stadier = [
        """
           -----
           |   |
               |
               |
               |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
               |
               |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
           |   |
               |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
          /|   |
               |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
          /|\\  |
               |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
          /|\\  |
          /    |
               |
        _______|__
        """,
        """
           -----
           |   |
           O   |
          /|\\  |
          / \\  |
               |
        _______|__
        """
    ]
    print(stadier[6 - antall_forsok])

# Velger et tilfeldig ord fra listen
hemmelig_ord = random.choice(ord_liste)
ord_len = len(hemmelig_ord)
gjettede_bokstaver = []
korrekte_gjetninger = ["_"] * ord_len
antall_forsok = 6  # Spilleren har 6 forsøk

def vis_spillet():
    """Viser statusen til spillet."""
    print("\nsátni: ", " ".join(korrekte_gjetninger))
    print(f"don sáhtat arvalit {antall_forsok} have vel.")
    print("Árvaluvan bukstavat:", ", ".join(gjettede_bokstaver))
    galge(antall_forsok)

while antall_forsok > 0 and "_" in korrekte_gjetninger:
    vis_spillet()

    # Spilleren gjetter en bokstav
    gjett = input(f"{BLÅ} árvit bukstava: ").lower()

    if len(gjett) != 1 or not gjett.isalpha():
        print(f"{RØD}árvit albma bukstava.{RESET}")
        continue

    if gjett in gjettede_bokstaver:
        print(f"{BLÅ}Don leat juo árvidan dan bukstava!.{RESET}")
        continue

    gjettede_bokstaver.append(gjett)

    if gjett in hemmelig_ord:
        print(f"{GRØNN}Buorre \033[4m{gjett}\033[0m lea sánis.{RESET}")
        for i in range(ord_len):
            if hemmelig_ord[i] == gjett:
                korrekte_gjetninger[i] = gjett
    else:
        print(f"{RØD}Boastut! {gjett} ii leat sánis.{RESET}")
        antall_forsok -= 1

# Avslutning av spillet - resultat
if "_" not in korrekte_gjetninger:
    print(f"{GRØNN}Riekta! sadni lei: {hemmelig_ord}.{RESET}")
else:
    galge(0)
    print(f"{RØD}Buostut! sadni lei:\033[1m \033[4m{hemmelig_ord}.{RESET}")

