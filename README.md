# Cryptolotterie-fcc

[sommaire](https://github.com/smartcontractkit/full-blockchain-solidity-course-js)
[Question]https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions

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

### Hardhat Methods & "Time Travel" ([15:32:45](https://youtu.be/gyMwXuJrbJQ?t=55965)):

Comment manipuler la blockchain dans un environnement de test

waffle read the doc : emitting event

hardhat network reference ( hardhat documentation) -> JSON RPC methods

hardhatnetwork methods

si on lance la commande `hh coverage`

#### Question

C'est quoi les JSON RPC methods ?
a quoi sert la hardhat network methods ?  
A quoi sert la commande hh coverage ?

### Raffle.sol Unit Tests Continued II [15:37:10](https://youtu.be/gyMwXuJrbJQ?t=56230)

On test la fonction checkUpKeep qui renvoi false si des personnes on recu une notificiation.
Cette fonction est testé en simulant un temps d'attente et une opération de minage.

#### Question

##### A quoi sert la function checkUpKepp ?

### Callstatic [15:38:22](https://youtu.be/gyMwXuJrbJQ?t=56302)

callStatic permet de simuler l'envoi d'une transaction dans notre environnement de test.  
Ainsi, au lieu de "raffle.check upkeep", nous pouvons faire "raffle.call static (check upkeep)" pour obtenir le résultat de "upkeep needed". Nous pouvons ensuite extraire la valeur de "upkeep needed" de cette réponse et la stocker dans une constante. Ensuite, nous pouvons vérifier que "upkeep needed" est "not false" en utilisant la fonction "assert". Si "upkeep needed" était vrai, alors "assert not false" serait faux et cela provoquerait une erreur.

### Raffle.sol Unit Tests Continued III [15:40:00](https://youtu.be/gyMwXuJrbJQ?t=56401)

On test les fonctionalité checkUpkeep et perforUpkeep

#### 1 Vérification du calcul de l'état de la loterie :

-   Utilisation de la fonction asynchrone "raffle.getRaffleState()" pour récupérer l'état actuel de la loterie.
-   Utilisation de la fonction asynchrone "raffle.callStatic.checkUpkeep()" pour vérifier si la maintenance est nécessaire.
-   Utilisation de l'instruction "assert.equal()" pour comparer la valeur retournée par "getRaffleState()" à la valeur attendue.

#### 2 Vérification de la fonction "checkUpkeep()":

-   Utilisation de la fonction asynchrone "raffle.callStatic.checkUpkeep()" pour vérifier si la maintenance est nécessaire.
-   Utilisation de l'instruction "assert.equal()" pour comparer la valeur retournée à la valeur attendue.
-   Vérification de la fonction "performUpkeep()":
-   Vérification que la fonction "performUpkeep()" ne peut être exécutée que si "checkUpkeep()" renvoie true.
-   Utilisation de la fonction asynchrone "raffle.enter()" pour entrer dans la loterie.
-   Utilisation de l'instruction "await network.provider.send()" pour avancer le temps de la blockchain et passer en mode "calculating".
-   Utilisation de la fonction asynchrone "raffle.performUpkeep()" pour effectuer la maintenance de la loterie.
-   Utilisation de l'instruction "assert()" pour vérifier que la transaction de maintenance a été effectuée avec succès.

#### Question

#### A quoi sert checkUpkeep() ?

Verifie si les joueur on les ressource nécéssaire pour payer l'entretien

##### A quoi sert la fonction raffle.performUpkeep ?

Verifie que les participant garde le droit d'effectuer l'action a laquel il ont le droit dans la lotterie comme reclamer leur gain.

##### A quoi sert l'instruction network.provider.send ?

Envoie une demande a un noeud ethereum pour effectuer une operation sur le reseaux avec un objet JSON-RPC en entré et renvoi une eéponse sous forme de promesse

#### C'est quoi un objet JSON-RPC ?

Un objet JSON RPC (Remote Procedure Call) est différent d'un objet JSON standard.

JSON (JavaScript Object Notation) est un format de données utilisé pour échanger des informations structurées entre différents systèmes. Il est généralement utilisé pour transmettre des données entre un serveur et un client dans des applications web.

JSON RPC, quant à lui, est un protocole de communication basé sur JSON qui permet à une application de demander l'exécution d'une procédure à distance sur un serveur. Il utilise une structure JSON pour spécifier les paramètres d'une méthode à exécuter sur le serveur et pour renvoyer les résultats de cette méthode au client.

Ainsi, un objet JSON RPC est une structure de données JSON qui suit les spécifications du protocole JSON RPC, tandis qu'un objet JSON standard peut être utilisé pour stocker n'importe quel type de données structurées.

### Massive Promis Test [15:52:11](https://youtu.be/gyMwXuJrbJQ?t=57131)

Le test vérifie que le gagnat de la lotterie réinitilialise la lotterie et envoie l'argent.

#### Voici les différentes etapes :

-   Ajout de nouveaux entrants : Le test commence par l'ajout de plusieurs nouveaux entrants à la loterie. Cette étape permet de s'assurer que le contrat est capable de gérer plusieurs joueurs simultanément.

-   Envoi de fonds : Les nouveaux entrants envoient des fonds pour participer à la loterie. Cette étape permet de vérifier que le contrat est capable de collecter des fonds et de gérer les transactions.

-   Tirage au sort : Une fois que tous les joueurs ont participé, le contrat doit effectuer un tirage au sort aléatoire pour désigner un gagnant. Cette étape permet de vérifier que le contrat fonctionne correctement en termes de logique métier.

-   Enregistrement du gagnant : Une fois le gagnant désigné, le contrat doit enregistrer le résultat du tirage au sort. Cette étape permet de vérifier que le contrat est capable de stocker des données et de les récupérer ultérieurement.

-   Remise à zéro de la loterie : Après avoir enregistré le gagnant, le contrat doit remettre à zéro la loterie pour permettre de nouveaux joueurs de participer. Cette étape permet de vérifier que le contrat est capable de réinitialiser son état interne.

-   Maintenance du contrat : Enfin, le test doit simuler la maintenance du contrat en appelant certaines fonctions qui effectuent des opérations de maintenance, telles que la mise à jour des informations de prix ou la vérification des données externes. Cette étape permet de s'assurer que le contrat est capable de gérer les tâches de maintenance nécessaires pour son bon fonctionnement.

```javascript
it("picks a winner, resets the lottery, and sends money", async function () {
    const additionalEntrants = 3
    const staringAccountIndex = 1 // deployer = 0
    const accounts = await ethers.getSigners()
    for (let i = startingAccountIndex; i < staringAccountIndex + additionalEntrants; i++) {
        const accountConnectedRaffle = raffle.connect(accounts[i])
        await accountConnectedRaffle.enterRaffle({ value: raffleEntranceFee })
    }
    const startingSimeStamp = await raffle.getLatestTimeStamp()

    // perfomUpkeep ( mock being chainLink keepers)
    // fullfillRandomWords ( mock being the chainLinkURL )
    // We will have to wait for the fullfillRandomWords to be called
    await new Promise(async (resolve, reject) => {
        raffle.once("WinnerPicked", () async => {})
        console.log("Found the event")
        try {
            const recentWinner = await raffle.getRecentWinner()
            console.log(recentWinner)
            console.log(accounts[2])
            console.log(accounts[1])
            console.log(accounts[0])
            console.log(accounts[3])

            const raffleState = await raffle.getRaffleState()
            const endingTimeStamp = await raffle.getLatestTimeStamp()
            const numPlayers = await raffle.getNumberOfPlayers()
            assert.equal(numPlayers.toString(), "0")
            assert.equal(raffleState.toString(), "0")
            assert(endingTimeStamp > startingTimeStamp)
        } catch (e) {
            reject(e)
        }
        resolve()
    })
    // Setting up the listener
    // below we will first the event and the listener will pick it up, and resolve
    const tx = await raffle.performUpkeet([])
    const txReceipt = await tx.wait(1)
    await vrfCoordinatorV2Mock.fulfillRandomWords(txReceipt.event[1].arg.requestId, raffle.address)
})
```

### Let's fix my spelling errors & Run Test[16:02:32](https://youtu.be/gyMwXuJrbJQ?t=57752)

Re copier coller le code car il ya des erreur .
Et reparer le test pour voir le winner

Le script commence par ajouter des participants à la loterie, avant de lancer une fonction qui va sélectionner un gagnant au hasard.
Et une fois que le gagnant est selectionné la fonction verifie que le gagnant a recu le prix correspondant

Voici les étape :

-   Faire participer plusieurs personnes à la loterie
-   Appeler la fonction **performUpkeep** pour mettre à jour l'état de la loterie
-   Appeler la fonction **fulfillRandomness** pour générer un nombre aléatoire et sélectionner un gagnant
-   Vérifier que le solde du gagnant a été mis à jour correctement en fonction du nombre d'entrées et du montant de l'entrée
-   Réinitialiser l'état de la loterie pour pouvoir effectuer d'autres tests

### Raffle.sol Unit Tests continuer IV [16:07:24](https://youtu.be/gyMwXuJrbJQ?t=58045)

### Raffle.sol Staging tests

## Mes liens

[crypto-lottery-repo](https://github.com/Willy-Bottega/Cryptolotterie-fcc)
