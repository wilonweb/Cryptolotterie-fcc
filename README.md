# Cryptolotterie-fcc

## Les notes

### 15.10.46 Deploying Raffle.sol Continued

Ou dois aller les const de helper-hardhat-config ?
deployer-raffle.js

C'est quoi le VRF ? ( Coordinator, ... )
Verifiable random Function
En cryptographie, une fonction aléatoire vérifiable (VRF) est une fonction pseudo-aléatoire à clé publique qui fournit des preuves que ses sorties ont été calculées correctement

C'est quoi le Gas lane (Key hash) ?
Le keyHash est le prix maximum qu'on est pret à payer pour le servive VRF en Wei
Pendant les périodes de prix élevés du gaz, ceux qui ont configuré leur abonnement pour utiliser le keyhash d'un gasLane de plus petite valeur, peuvent ne pas voir leur demande vrf traitée.

#### C'est le le EntranceFee ?

#### C'est quoi le Gwei ?

#### C'est quoi un Mock ?

#### C'est quoi la const VRF_SUB_FUND_AMOUNT ?

#### C'est quoi le KeyHash ( testNet ) ?

La clé publique utilisé dans le parametre GasLane que l'on trouve dans helper-hardhat-confing.js
https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number/

#### C'est quoi le Subscription ID ?

https://vrf.chain.link/

#### C'est quoi l'intervalle ?

C'est le nombre de seconde

C'est Quoi ? ( CF constructor Raffle.sol )

-   vrfCoordinatorV2,
-   uint256 entranceFee,
-   bytes32 gaslane,
-   uint64 subscriptionId,
-   uint32 callbackGasLimit,
-   uint256 interval

### 15:20:07 Raffle.Sol Unit Tests

Dans cette partie on écrit des test unitaire.
Il ne faut pas hesiter à revoir la vidéo pour comprendre chaque partit des test. Ecrire des test peut êtres fastidieux, mais cela aide a developper une memoire musculaire et a devenir un ingenieur d'exceptions.

On commence par developper des chaine de developpements, puis on deploi le Raffle et le VRF core.

Ensuite on effectue des test sur le contructeur pour s'assurer que le Raffle est initialisé correctement.

Les test sont écris avec les bibliotheque Chai et HardHat.

#### C'est quoi un test unitaire ?

#### C'est quoi une chaine de developpement ?

#### C'est quoi le Raffle ?

#### C'est quoi le VRF core ?

#### C'est quoi le constructeur ?

#### Comment ecris t-on des test avec Chai et HardHat ?

#### C'est quoi le grep dans la commande :

hh test --grep "you don't pay enough".

### 15:30:21 Testing Events & Chai Matchers

CF Doc [ETH-Waffle](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html?highlight=event#emitting-events)

Nous testons une fonction pour nous assurer qu'elle émet un evenement et la syntaxe sera tres similaire à celle que nous utilison pour verifier si une erreur est déclenché.

Pour émettre des événements, nous pouvons utiliser "await expect to emit", suivi de l'événement que nous attendons.

nous disons donc que le contrat raffle doit émettre un événement d'entrée de loterie. Nous pouvons copier ce code et l'exécuter dans notre terminal en utilisant "hard hat. Test --grep".
Et nous lançon le test avec :
`hh test --grep "emits event on enter"`

```javascript
it("emits event on enter", async function () {
    await expect(raffle.enterRaffle({ value: RaffleEntraceFee })).to.emit(raffle, "RaffleEnter")
})
```

## Raffle.sol unit Tests Continued ([15:32:45](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=43200s)):

Dans cet partie on vas tester la lotterie pour s'assurer que personne ne puisse entrer dans la loterie lorsqu'elle est fermé ou entrain de calculé un resultant.

On verifie a l'aide d'une fonction asynchrone si la lotterie est entrain de calculer un resultat et si c'est le cas on la ferme.

Puis on la passe ouverte.

On dois également simulter l'action d'un reseaux de gestionnaire pour appeler cette fonction au bon moment.
