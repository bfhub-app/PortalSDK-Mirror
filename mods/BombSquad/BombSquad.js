var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _JsPlayer_allJsPlayers, _ScoreUI_instances, _ScoreUI_jsPlayer, _ScoreUI_rootWidget, _ScoreUI_containerWidth, _ScoreUI_containerHeight, _ScoreUI_isIndicatorVisible, _ScoreUI_roundTime, _ScoreUI_allyTeamScore, _ScoreUI_enemyTeamScore, _ScoreUI_teamDesignation, _ScoreUI_create, _VersionUI_instances, _VersionUI_jsPlayer, _VersionUI_rootWidget, _VersionUI_containerWidth, _VersionUI_containerHeight, _VersionUI_backgroundSpacing, _VersionUI_isIndicatorVisible, _VersionUI_create, _ProgressBar_instances, _ProgressBar_jsPlayer, _ProgressBar_rootWidget, _ProgressBar_fillWidget, _ProgressBar_labelWidget, _ProgressBar_currentProgress, _ProgressBar_isIndicatorVisible, _ProgressBar_containerWidth, _ProgressBar_containerHeight, _ProgressBar_create, _HasBombIndicator_instances, _HasBombIndicator_jsPlayer, _HasBombIndicator_rootWidget, _HasBombIndicator_containerWidth, _HasBombIndicator_containerHeight, _HasBombIndicator_backgroundSpacing, _HasBombIndicator_isIndicatorVisible, _HasBombIndicator_create, _DropBombIndicator_instances, _DropBombIndicator_jsPlayer, _DropBombIndicator_rootWidget, _DropBombIndicator_containerWidth, _DropBombIndicator_containerHeight, _DropBombIndicator_backgroundSpacing, _DropBombIndicator_isIndicatorVisible, _DropBombIndicator_create, _LobbyUI_instances, _LobbyUI_jsPlayer, _LobbyUI_rootWidget, _LobbyUI_containerWidth, _LobbyUI_containerHeight, _LobbyUI_lineBreakHeight, _LobbyUI_backgroundSpacing, _LobbyUI_activeTabBgColor, _LobbyUI_lobbyStatusText, _LobbyUI_isUIVisible, _LobbyUI_create, _MessageUI_instances, _MessageUI_jsPlayer, _MessageUI_rootWidget, _MessageUI_containerWidth, _MessageUI_containerHeight, _MessageUI_lineBreakHeight, _MessageUI_backgroundSpacing, _MessageUI_activeTabBgColor, _MessageUI_messageText, _MessageUI_isUIVisible, _MessageUI_create, _Store_instances, _Store_jsPlayer, _Store_storeData, _Store_rootWidget, _Store_storeWidth, _Store_storeHeight, _Store_headerHeight, _Store_tabHeight, _Store_tabSpacing, _Store_tabNamePrefix, _Store_currentTabIndex, _Store_activeTabBgColor, _Store_inactiveTabBgColor, _Store_itemSize, _Store_itemSizeH, _Store_itemSizeV, _Store_itemSpacingHorizontal, _Store_itemSpacingVertical, _Store_closeButtonName, _Store_tabWidgets, _Store_itemButtons, _Store_isStoreVisible, _Store_create, _Store_createTabs, _Store_createTab, _Store_createItems, _Store_createItem, _Store_deleteTabItems, _ItemButton_jsPlayer, _ItemButton_itemBgColor, _ItemButton_isDisabled, _ItemButton_widget, _ItemButton_widgetButton, _ItemButton_widgetCost, _ItemButton_widgetCostName, _ItemButton_widgetDisabled, _ItemButton_widgetDisabledName;
const VERSION = [1, 4, 59];
const debugJSPlayer = true;
const debugSkipBuyPhase = false;
const debugSwitchTeamsEachRound = false;
const AIBackfill = false;
const INSTANT_START = false;
let gameOver = false;
let initialPlayerCount = 0;
let combatCountdownStarted = false;
let combatStartDelayRemaining = 60;
let combatStarted = false;
let roundEnded = false;
let bombPickupDistance = 3.0;
let bombInteractDistance = 3.0;
let messageTime = 0;
let initialCash = 800;
let teamSwitchOccurred = false;
let team1Score = 0;
let team2Score = 0;
let attackingTeam = mod.GetTeam(1);
let defendingTeam = mod.GetTeam(2);
let roundNum = 0;
let roundTime = 300; // Max time for round in seconds (extended when bomb is planted)
// This is the amount of time remaining until the round begins (buy/setup phases)
let buyPhaseTimeRemaining = 60;
let interactPointA = mod.GetInteractPoint(1);
let interactPointB = mod.GetInteractPoint(2);
let worldIconA = mod.GetWorldIcon(20);
let worldIconB = mod.GetWorldIcon(21);
let alarmSFX;
let attackersStoreInteractPoint = mod.GetInteractPoint(500);
let defendersStoreInteractPoint = mod.GetInteractPoint(501);
let attackersStoreWI = mod.GetWorldIcon(500);
let defendersStoreWI = mod.GetWorldIcon(501);
const pointAAreaID = 1;
const pointBAreaID = 2;
const storeID_attackers = 500;
const storeID_defenders = 501;
const MCOMPositionA = mod.CreateVector(128.70, 184.04, 137.26);
const MCOMPositionB = mod.CreateVector(213.2, 182.12, 128.51);
const SpawnWallPos1 = mod.CreateVector(136.2, 174.24, 134.51);
const SpawnWallPos2 = mod.CreateVector(169.7, 174.24, 129.51);
const SpawnWallPos3 = mod.CreateVector(161.7, 184.24, 41.519);
const SpawnWallPos4 = mod.CreateVector(182.2, 184.24, 38.519);
const SpawnWall1ID = 100;
const SpawnWall2ID = 101;
const SpawnWall3ID = 102;
const SpawnWall4ID = 103;
const loserBox1Pos = mod.CreateVector(171, 235.5, 16);
const loserBox2Pos = mod.CreateVector(171, 235.5, 160);
const wallMoveDelta = -20;
const attackersHQID = 1;
const defendersHQID = 2;
let attackersHQ = mod.GetHQ(attackersHQID);
let defendersHQ = mod.GetHQ(defendersHQID);
const defendersSpawnID = 1000;
const attackersSpawnID = 2000;
// Attackers will have their ability to interact removed within this distance of either MCOM
const disabledInteractDistance = 5;
// Money Rewards
const roundWinReward = 2400;
const roundLoseReward = 1200; // Might want to make scales for these
const killReward = 300;
const defuseReward = 1000;
const plantReward = 800;
let roundStarted = false;
let buyPhase = false;
const buyPhaseLength = 35;
const roundEndBuffer = 10;
const minimumInitialPlayerCount = 2;
const BLACKCOLOR = [1, 1, 1];
const REDCOLOR = [1, 0, 0];
const WHITECOLOR = [0, 0, 0];
const maxRounds = 14;
const deathYPos = 160;
const ZEROVEC = mod.CreateVector(0, 0, 0);
const ONEVEC = mod.CreateVector(1, 1, 1);
const MCOMFuseTime = 60;
const armTime = 3;
const disarmTime = 3;
const messageRemainTime = 5;
const maxRoundTime = 300;
let vfxidx = 0;
// Use this as your "ready"/game startup function
export async function OnGameModeStarted() {
    console.log("Bomb Defusal v", VERSION[0], ".", VERSION[1], ".", VERSION[2], " Game Mode Started");
    combatStartDelayRemaining = 60; // Reset in case the game is restarted ig
    mod.SetSpawnMode(mod.SpawnModes.AutoSpawn);
    gameOver = false;
    mod.SetWorldIconText(worldIconA, MakeMessage(mod.stringkeys.a));
    mod.SetWorldIconText(worldIconB, MakeMessage(mod.stringkeys.b));
    mod.SetWorldIconText(attackersStoreWI, MakeMessage(mod.stringkeys.shop));
    mod.SetWorldIconText(defendersStoreWI, MakeMessage(mod.stringkeys.shop));
    mod.SetWorldIconOwner(attackersStoreWI, attackingTeam);
    mod.SetWorldIconOwner(defendersStoreWI, defendingTeam);
    BombData.Initialize();
    alarmSFX = mod.SpawnObject(mod.RuntimeSpawn_Common.SFX_GameModes_Rush_Alarm_SimpleLoop3D, ZEROVEC, ZEROVEC);
    if (!INSTANT_START) {
        // wait for required number of players to join the game.
        while (initialPlayerCount < minimumInitialPlayerCount) {
            await mod.Wait(1);
            //console.log("initial player count is ", initialPlayerCount);
        }
    }
    // console.log("Adequate players have entered lobby. Begin the game.");
    await CombatCountdown();
    SetupRound();
    TickUpdate();
    ThrottledUpdate();
}
async function TickUpdate() {
    let tickRate = 0.016;
    while (true) {
        await mod.Wait(tickRate);
        BombData.ItemProximityCheck();
        BombData.ItemHeld();
        if (BombData.carryingPlayer && mod.GetSoldierState(BombData.carryingPlayer, mod.SoldierStateBool.IsAlive)) {
            let jsPlayer = JsPlayer.get(BombData.carryingPlayer);
            // Invalid check
            if (!jsPlayer)
                return;
            if (!BombData.isPlanting && mod.IsInventorySlotActive(BombData.carryingPlayer, mod.InventorySlots.MeleeWeapon)) {
                if (mod.GetSoldierState(BombData.carryingPlayer, mod.SoldierStateBool.IsProne)) {
                    BombData.ItemDropped(BombData.carryingPlayer);
                }
            }
            // Extra sanity check.
            if (buyPhase)
                continue;
            if (BombData.isPlanting) {
                if (BombData.carryingPlayer != null) {
                    if (BombData.isAtA) {
                        if (mod.DistanceBetween(mod.GetSoldierState(BombData.carryingPlayer, mod.SoldierStateVector.GetPosition), MCOMPositionA) > bombInteractDistance) {
                            BombData.CancelPlant();
                        }
                    }
                    else if (BombData.isAtB) {
                        if (mod.DistanceBetween(mod.GetSoldierState(BombData.carryingPlayer, mod.SoldierStateVector.GetPosition), MCOMPositionB) > bombInteractDistance) {
                            BombData.CancelPlant();
                        }
                    }
                }
                else {
                    BombData.CancelPlant();
                }
                // Might have just been cancelled, so check again
                if (BombData.isPlanting && (BombData.isAtA || BombData.isAtB)) {
                    BombData.plantProgress += tickRate / armTime;
                    console.log("Update Plant Progress: ", BombData.plantProgress);
                    jsPlayer.progressBarUI?.refresh(BombData.plantProgress);
                    if (BombData.plantProgress >= 1) {
                        BombData.PlantBomb();
                    }
                }
            }
        }
        // Extra sanity check.
        if (buyPhase)
            continue;
        if (BombData.isPlanted && BombData.defusingPlayer != null) {
            let jsPlayer = JsPlayer.get(BombData.defusingPlayer);
            if (!jsPlayer) {
                return;
            }
            if (BombData.isAtA) {
                if (mod.DistanceBetween(mod.GetSoldierState(BombData.defusingPlayer, mod.SoldierStateVector.GetPosition), MCOMPositionA) > bombInteractDistance) {
                    BombData.CancelDefuse();
                }
            }
            else if (BombData.isAtB) {
                if (mod.DistanceBetween(mod.GetSoldierState(BombData.defusingPlayer, mod.SoldierStateVector.GetPosition), MCOMPositionB) > bombInteractDistance) {
                    BombData.CancelDefuse();
                }
            }
            // May have just been cancelled, so check again
            if (BombData.defusingPlayer != null) {
                BombData.defusingProgress += tickRate / disarmTime;
                jsPlayer.progressBarUI?.refresh(BombData.defusingProgress);
                if (BombData.defusingProgress >= 1) {
                    BombData.DefuseBomb();
                }
            }
        }
    }
}
// Updates every 1 second
async function ThrottledUpdate() {
    while (true) {
        if (!gameOver) {
            if (roundStarted && !roundEnded) {
                roundTime--;
                if (roundTime <= 0 && !BombData.isPlanted) {
                    EndRound(defendingTeam);
                }
            }
            else {
                buyPhaseTimeRemaining--;
            }
            UpdateMessages();
            BombData.BombPlanted(); // Will simply return if the bomb is not currently planted
            JsPlayer.playerInstances.forEach(player => {
                // IDK why, but AI soldiers keep returning low ypositions despite standing alongside human players that are at acceptable y positions
                if (player && mod.GetObjId(player) >= 0) {
                    if (!gameOver)
                        UpdateScoreUI(player);
                    if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive)) {
                        UpdateInteracts(player);
                        let yPos = mod.YComponentOf(mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition));
                        if (yPos < deathYPos) {
                            mod.Kill(player);
                        }
                    }
                }
            });
        }
        await mod.Wait(1);
    }
}
// Check the player, and if they are on the attacking team, and not carrying the bomb,
// disable/enable interact input restriction based on their distance to either MCOM
function UpdateInteracts(player) {
    if (!roundStarted || buyPhase)
        return;
    let onAttackingTeam = mod.GetObjId(mod.GetTeam(player)) == mod.GetObjId(attackingTeam);
    if (onAttackingTeam) {
        if (BombData.carryingPlayer != null && mod.GetObjId(player) == mod.GetObjId(BombData.carryingPlayer)) {
            mod.EnableInputRestriction(player, mod.RestrictedInputs.Interact, false);
        }
        else {
            let playerPos = mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition);
            let mcomADist = mod.DistanceBetween(playerPos, MCOMPositionA);
            let mcomBDist = mod.DistanceBetween(playerPos, MCOMPositionB);
            if (mcomADist < disabledInteractDistance || mcomBDist < disabledInteractDistance)
                mod.EnableInputRestriction(player, mod.RestrictedInputs.Interact, true);
        }
    }
    else {
        mod.EnableInputRestriction(player, mod.RestrictedInputs.Interact, false);
    }
}
function UpdateScoreUI(player) {
    let jsPlayer = JsPlayer.get(player);
    if (jsPlayer)
        jsPlayer.scoreUI?.refresh();
}
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
// Player Functions:
//-----------------------------------------------------------------------------------------------//
export async function OnPlayerJoinGame(player) {
    let jsPlayer = JsPlayer.get(player);
    if (!jsPlayer)
        return;
    // Check if this is a human player or not. 
    if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier) == false) {
        // Show the pre-game lobby window, assuming combat hasn't started. 
        if (!combatStarted) {
            jsPlayer.lobbyUI?.open();
            initialPlayerCount++;
            console.log("There are now ", initialPlayerCount, " players in the lobby.");
            UpdateAllLobbyUI();
        }
    }
    else {
        // The player is not a human so we will ignore them.
    }
    let teamID = mod.GetObjId(mod.GetTeam(player));
    if (roundStarted) {
        console.log("player ID(", mod.GetObjId(player), ") joined mid-round on team", teamID);
        //mod.EnablePlayerDeploy(player, false);
    }
}
export async function OnPlayerLeaveGame(playerId) {
    try {
        if ((!BombData.carryingPlayer || !mod.IsPlayerValid(BombData.carryingPlayer)) && BombData.isBeingCarried) {
            BombData.ItemDropped();
        }
    }
    catch {
        if (BombData.isBeingCarried) {
            BombData.ItemDropped();
        }
    }
    // reduce player count. 
    JsPlayer.removeInvalidJSPlayers(playerId);
    // Updated valid combatants count
    if (combatCountdownStarted && !gameOver) {
        //validCombatants = GetNumberOfPlayersOnTeam(combatTeam);
        //UpdateValidCombatantsUI();
        //CheckVictoryState();
    }
    else if (!combatCountdownStarted) {
        if (!gameOver) {
            initialPlayerCount--;
            UpdateAllLobbyUI();
        }
    }
}
export function OnPlayerDeployed(eventPlayer) {
    let jsPlayer = JsPlayer.get(eventPlayer);
    let teamID = mod.GetObjId(mod.GetTeam(eventPlayer));
    let attackingTeamID = mod.GetObjId(attackingTeam);
    if (jsPlayer) {
        jsPlayer.isDeployed = true;
        if (roundStarted && !roundEnded) {
            // this is redundant with death, but it covers late joiners and I need to mark players out of round immediately on death so I can count "living" team members
            jsPlayer.outOfRound = true;
        }
        else {
            jsPlayer.outOfRound = false;
        }
        if (!jsPlayer.outOfRound) {
            if (teamID == attackingTeamID) {
                let hqPos = mod.GetObjectPosition(attackersHQ);
                console.log("Player is deploying on team ", teamID, ". Teleport them to HQ ", mod.GetObjId(attackersHQ), " at position: ", mod.XComponentOf(hqPos), ", ", mod.YComponentOf(hqPos), ", ", mod.ZComponentOf(hqPos));
                mod.Teleport(eventPlayer, hqPos, 0);
            }
            else {
                let hqPos = mod.GetObjectPosition(defendersHQ);
                console.log("Player is deploying on team ", teamID, ". Teleport them to HQ ", mod.GetObjId(defendersHQ), " at position: ", mod.XComponentOf(hqPos), ", ", mod.YComponentOf(hqPos), ", ", mod.ZComponentOf(hqPos));
                mod.Teleport(eventPlayer, hqPos, 0);
            }
        }
        if (buyPhase == true) {
            if (!mod.GetSoldierState(eventPlayer, mod.SoldierStateBool.IsAISoldier)) {
                jsPlayer.store?.open();
                jsPlayer.updateWalletUI();
            }
        }
        else {
            if (jsPlayer.outOfRound) {
                if (teamID == attackingTeamID) {
                    mod.Teleport(eventPlayer, loserBox1Pos, 0);
                }
                else {
                    mod.Teleport(eventPlayer, loserBox2Pos, 0);
                }
                ResetPlayerLoadout(eventPlayer, true);
                return;
            }
        }
    }
    else {
        console.log("Player deploying with invalid jsPlayer!");
    }
    ResetPlayerLoadout(eventPlayer, false);
}
function EnableStores(enable) {
    mod.EnableInteractPoint(attackersStoreInteractPoint, enable);
    mod.EnableInteractPoint(defendersStoreInteractPoint, enable);
    mod.EnableWorldIconImage(attackersStoreWI, enable);
    mod.EnableWorldIconText(attackersStoreWI, enable);
    mod.EnableWorldIconImage(defendersStoreWI, enable);
    mod.EnableWorldIconText(defendersStoreWI, enable);
}
async function SetupRound() {
    roundNum++;
    console.log("Set up Round ", roundNum);
    roundEnded = false;
    buyPhase = true;
    RefillAmmo();
    EnableStores(true);
    if (BombData.isBeingCarried) {
        if (BombData.carryingPlayer != null)
            BombData.ItemDropped(BombData.carryingPlayer);
        else
            BombData.ItemDropped();
    }
    let teamsSwitched = roundNum == maxRounds / 2 + 1 || (debugSwitchTeamsEachRound && roundNum != 1);
    if (teamsSwitched) {
        SwitchTeams();
    }
    let attackers = [];
    let attackingTeamID = mod.GetObjId(attackingTeam);
    let defendingTeamID = mod.GetObjId(defendingTeam);
    // Reset Bomb data here? This is where MCOMs were reset.
    mod.EnableInteractPoint(interactPointA, true);
    mod.EnableInteractPoint(interactPointB, true);
    mod.EnableWorldIconImage(worldIconA, true);
    mod.EnableWorldIconText(worldIconA, true);
    mod.EnableWorldIconImage(worldIconB, true);
    mod.EnableWorldIconText(worldIconB, true);
    JsPlayer.playerInstances.forEach(player => {
        let teamID = mod.GetObjId(mod.GetTeam(player));
        let jsPlayer = JsPlayer.get(player);
        let isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        if (isAI) {
            mod.Kill(player);
        }
        else {
            // Return to base / respawn
            if (jsPlayer && jsPlayer.isDeployed) {
                if (teamID == attackingTeamID) {
                    let hqPos = mod.GetObjectPosition(attackersHQ);
                    console.log("Player is on team ", teamID, ". Teleport them to HQ ", mod.GetObjId(attackersHQ), " at position: ", mod.XComponentOf(hqPos), ", ", mod.YComponentOf(hqPos), ", ", mod.ZComponentOf(hqPos));
                    mod.Teleport(player, hqPos, 0);
                }
                else {
                    let hqPos = mod.GetObjectPosition(defendersHQ);
                    console.log("Player is on team ", teamID, ". Teleport them to HQ ", mod.GetObjId(defendersHQ), " at position: ", mod.XComponentOf(hqPos), ", ", mod.YComponentOf(hqPos), ", ", mod.ZComponentOf(hqPos));
                    mod.Teleport(player, hqPos, 0);
                }
            }
            if (teamID == attackingTeamID) {
                attackers.push(player);
            }
        }
        if (jsPlayer) {
            if (jsPlayer.outOfRound && mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive))
                ResetPlayerLoadout(player, false);
            jsPlayer.outOfRound = false;
        }
    });
    // Another await after spawning before opening the shop up
    await mod.Wait(0.5);
    JsPlayer.playerInstances.forEach(player => {
        // There should not be any AI at this point, but just for extreme sanity....
        let isAI = mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier);
        let jsPlayer = JsPlayer.get(player);
        if (jsPlayer) {
            // Reset cash to starting value
            if (teamsSwitched)
                jsPlayer.cash = initialCash;
            if (!isAI) {
                if (jsPlayer.isDeployed && mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive))
                    jsPlayer.store?.open();
                jsPlayer.updateWalletUI();
            }
        }
    });
    // Pick a random attacker and give them the bomb
    if (attackers.length == 0) {
        console.log("THERE ARE NO ATTACKERS!!!!");
        BombData.currentWorldIconPos = mod.GetObjectPosition(attackersHQ);
        mod.SetWorldIconPosition(BombData.bombPositionWorldIcon, BombData.currentWorldIconPos);
    }
    else {
        let playerAttackers = [];
        attackers.forEach(attacker => {
            if (!mod.GetSoldierState(attacker, mod.SoldierStateBool.IsAISoldier) && mod.GetSoldierState(attacker, mod.SoldierStateBool.IsAlive))
                playerAttackers.push(attacker);
        });
        // Only allow for players to begin with the bomb, unless there are no players on the attacking team
        let arr = playerAttackers;
        if (playerAttackers.length == 0)
            arr = attackers;
        let rand = GetRandomInt(arr.length - 1);
        BombData.ItemPickedUp(arr[rand]);
        console.log("Give bomb to ", arr[rand], " on team ", mod.GetObjId(mod.GetTeam(arr[rand])));
    }
    if (!debugSkipBuyPhase) {
        console.log("Start Buy Phase Timer");
        buyPhaseTimeRemaining = buyPhaseLength;
        while (buyPhaseTimeRemaining > 0) {
            await mod.Wait(1);
        }
    }
    roundTime = maxRoundTime;
    let attackingTeamSize = 0;
    let defendingTeamSize = 0;
    JsPlayer.playerInstances.forEach(player => {
        // Close the shops
        let jsPlayer = JsPlayer.get(player);
        if (jsPlayer)
            jsPlayer.store?.close();
        // Return AI players to default pathfinding behavior
        if (AIBackfill && mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier)) {
            mod.AIBattlefieldBehavior(player);
        }
        if (mod.GetObjId(mod.GetTeam(player)) == attackingTeamID) {
            attackingTeamSize++;
        }
        else {
            defendingTeamSize++;
        }
        // Make extra sure this is disabled for all players when Round Setup ends
        mod.EnableUIInputMode(false, player);
    });
    let tWall1 = mod.GetSpatialObject(SpawnWall1ID);
    let tWall2 = mod.GetSpatialObject(SpawnWall2ID);
    let tWall3 = mod.GetSpatialObject(SpawnWall3ID);
    let tWall4 = mod.GetSpatialObject(SpawnWall4ID);
    mod.MoveObjectOverTime(tWall1, mod.CreateVector(0, wallMoveDelta, 0), mod.CreateVector(0, 0, 0), 3, false, false);
    mod.MoveObjectOverTime(tWall2, mod.CreateVector(0, wallMoveDelta, 0), mod.CreateVector(0, 0, 0), 3, false, false);
    mod.MoveObjectOverTime(tWall3, mod.CreateVector(0, wallMoveDelta, 0), mod.CreateVector(0, 0, 0), 3, false, false);
    mod.MoveObjectOverTime(tWall4, mod.CreateVector(0, wallMoveDelta, 0), mod.CreateVector(0, 0, 0), 3, false, false);
    RefillAmmo();
    EnableStores(false);
    if (AIBackfill) {
        console.log("There are ", attackingTeamSize, " members of attacking team");
        console.log("spawn ", (5 - attackingTeamSize), " AI to attacking team");
        console.log("There are ", defendingTeamSize, " members of defending team");
        console.log("spawn ", (5 - defendingTeamSize), " AI to defending team");
        // Spawn AI characters to backfill
        for (let i = 0; i < 5 - attackingTeamSize; i++) {
            console.log("Spawn AI from spawner ID: ", mod.GetObjId(mod.GetSpawner(i + 10)), " to Team ID  ", attackingTeamID);
            mod.SpawnAIFromAISpawner(mod.GetSpawner(i + 10), mod.SoldierClass.Assault, attackingTeam);
            await mod.Wait(0.1);
        }
        for (let i = 0; i < 5 - defendingTeamSize; i++) {
            console.log("Spawn AI from spawner ID: ", mod.GetObjId(mod.GetSpawner(i + 15)), " to Team ID ", defendingTeamID);
            mod.SpawnAIFromAISpawner(mod.GetSpawner(i + 15), mod.SoldierClass.Assault, defendingTeam);
            await mod.Wait(0.1);
        }
    }
    buyPhase = false;
    roundStarted = true;
    //mod.EnableAllPlayerDeploy(false);
    await mod.Wait(8);
    JsPlayer.playerInstances.forEach(player => {
        if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier)) {
            mod.AIBattlefieldBehavior(player);
        }
    });
}
function RefillAmmo() {
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (jsPlayer) {
            if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive) && jsPlayer.isDeployed) {
                RefillPlayersAmmo(player);
                console.log("Refill Ammo");
            }
        }
    });
}
function RefillPlayersAmmo(player) {
    mod.SetInventoryAmmo(player, mod.InventorySlots.PrimaryWeapon, 1000);
    mod.SetInventoryMagazineAmmo(player, mod.InventorySlots.PrimaryWeapon, 1000);
    mod.SetInventoryAmmo(player, mod.InventorySlots.SecondaryWeapon, 1000);
    mod.SetInventoryMagazineAmmo(player, mod.InventorySlots.SecondaryWeapon, 1000);
}
function IsPrimarySlotFilled(player) {
    for (var enumMember in mod.Weapons) {
        var isValueProperty = Number(enumMember) >= 0;
        if (isValueProperty) {
            let em = mod.Weapons[enumMember];
            if (em.includes("AssaultRifle") || em.includes("Carbine") || em.includes("DMR") ||
                em.includes("LMG") || em.includes("Shotgun") || em.includes("SMG") ||
                em.includes("Sniper")) {
                if (mod.HasEquipment(player, Number(enumMember))) {
                    return true;
                }
            }
        }
    }
    return false;
}
function IsSecondarySlotFilled(player) {
    for (let enumMember in mod.Weapons) {
        let isValueProperty = Number(enumMember) >= 0;
        if (isValueProperty) {
            let em = mod.Weapons[enumMember];
            if (em.includes("Sidearm")) {
                if (mod.HasEquipment(player, Number(enumMember))) {
                    return true;
                }
            }
        }
    }
    return false;
}
// NO WAY TO CHECK WHICH SLOT A GADGET IS IN!!!
// function IsGadget1Filled(player: mod.Player): boolean {
//     for (let enumMember in mod.Gadgets) {
//         let isValueProperty = Number(enumMember) >= 0;
//         if (isValueProperty) {
//             let em = mod.Gadgets[enumMember];
//             if (mod.HasEquipment(player, Number(enumMember))) {
//                 return true;
//             }
//         }
//     }
//     return false;
// }
function ExplodeFeedback(pos) {
    let vfx = mod.SpawnObject(mod.RuntimeSpawn_Common.FX_ArtilleryStrike_Explosion_GS, pos, ZEROVEC);
    mod.EnableVFX(vfx, true);
}
async function EndRound(winners) {
    let winningTeamID = mod.GetObjId(winners);
    console.log("End Round, Winning Team ID is: ", winningTeamID);
    console.log("Attacking Team ID is currently: ", mod.GetObjId(attackingTeam));
    console.log("Defending Team ID is currently: ", mod.GetObjId(defendingTeam));
    roundEnded = true;
    BombData.Reset();
    if (winningTeamID == mod.GetObjId(attackingTeam)) {
        MessageAllUI(MakeMessage(mod.stringkeys.AttackersWin), REDCOLOR);
        if (teamSwitchOccurred) {
            team2Score++;
        }
        else {
            team1Score++;
        }
    }
    else {
        MessageAllUI(MakeMessage(mod.stringkeys.DefendersWin), REDCOLOR);
        if (teamSwitchOccurred) {
            team1Score++;
        }
        else {
            team2Score++;
        }
    }
    await mod.Wait(roundEndBuffer);
    roundStarted = false;
    console.log("Team 1 score is: ", team1Score);
    console.log("Team 2 score is: ", team2Score);
    if (CheckVictoryState()) {
        return;
    }
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (jsPlayer) {
            if (mod.GetObjId(mod.GetTeam(player)) == winningTeamID) {
                jsPlayer.cash += roundWinReward;
            }
            else {
                jsPlayer.cash += roundLoseReward;
            }
            jsPlayer.updateWalletUI();
            // Kill downed players (might be causing bugs if they're downed going into the next round)
            if (jsPlayer.isDeployed && mod.GetSoldierState(player, mod.SoldierStateBool.IsManDown)) {
                mod.DealDamage(player, 100);
            }
        }
    });
    let tWall1 = mod.GetSpatialObject(SpawnWall1ID);
    let tWall2 = mod.GetSpatialObject(SpawnWall2ID);
    let tWall3 = mod.GetSpatialObject(SpawnWall3ID);
    let tWall4 = mod.GetSpatialObject(SpawnWall4ID);
    mod.MoveObject(tWall1, mod.Subtract(SpawnWallPos1, mod.GetObjectPosition(tWall1)), mod.CreateVector(0, 0, 0));
    mod.MoveObject(tWall2, mod.Subtract(SpawnWallPos2, mod.GetObjectPosition(tWall2)), mod.CreateVector(0, 0, 0));
    mod.MoveObject(tWall3, mod.Subtract(SpawnWallPos3, mod.GetObjectPosition(tWall3)), mod.CreateVector(0, 0, 0));
    mod.MoveObject(tWall4, mod.Subtract(SpawnWallPos4, mod.GetObjectPosition(tWall4)), mod.CreateVector(0, 0, 0));
    // If neither team won, reset the round
    SetupRound();
}
function SwitchTeams() {
    console.log("SWITCH TEAMS");
    if (mod.GetObjId(attackingTeam) == mod.GetObjId(mod.GetTeam(1))) {
        defendingTeam = mod.GetTeam(1);
        attackingTeam = mod.GetTeam(2);
        teamSwitchOccurred = true;
    }
    else {
        defendingTeam = mod.GetTeam(2);
        attackingTeam = mod.GetTeam(1);
        teamSwitchOccurred = false; // Teams switched back
    }
    console.log("Attacking Team ID is currently: ", mod.GetObjId(attackingTeam));
    console.log("Defending Team ID is currently: ", mod.GetObjId(defendingTeam));
    mod.SetWorldIconOwner(attackersStoreWI, attackingTeam);
    mod.SetWorldIconOwner(defendersStoreWI, defendingTeam);
    mod.UndeployAllPlayers();
}
function ResetPlayerLoadout(player, isOutOfRound) {
    if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive)) {
        if (isOutOfRound)
            mod.RemoveEquipment(player, mod.InventorySlots.SecondaryWeapon);
        else
            mod.AddEquipment(player, mod.Weapons.Sidearm_P18, SidearmPackage_Standard_P18);
        mod.AddEquipment(player, mod.Gadgets.Melee_Combat_Knife);
        mod.RemoveEquipment(player, mod.InventorySlots.PrimaryWeapon);
        try {
            mod.RemoveEquipment(player, mod.InventorySlots.GadgetOne);
        }
        catch (e) {
        }
        try {
            mod.RemoveEquipment(player, mod.InventorySlots.GadgetTwo);
        }
        catch (e) {
        }
    }
}
function CheckVictoryState() {
    let scoreToWin = maxRounds / 2 + 1;
    // This is stupid, but winning will always occur after the team switch, so team 1 would be defending and team 2 would be attacking
    if (team1Score >= scoreToWin) {
        mod.EndGameMode(defendingTeam);
        return true;
    }
    else if (team2Score >= scoreToWin) {
        mod.EndGameMode(attackingTeam);
        return true;
    }
    return false;
}
function CleanUp() {
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (jsPlayer) {
            jsPlayer.destroyUI();
        }
    });
}
async function UpdateMessages() {
    if (messageTime > 0) {
        messageTime--;
        if (messageTime <= 0) {
            HideAllMessageUI();
            messageTime = 0;
        }
    }
}
export function OnPlayerEarnedKill(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock) {
    if (mod.EventDeathTypeCompare(eventDeathType, mod.PlayerDeathTypes.Redeploy))
        return;
    let jsPlayer = JsPlayer.get(eventPlayer);
    if (!jsPlayer)
        return;
    let playerTeamID = mod.GetObjId(mod.GetTeam(eventPlayer));
    let otherPlayerTeamID = -1;
    if (eventOtherPlayer != null) {
        otherPlayerTeamID = mod.GetObjId(mod.GetTeam(eventOtherPlayer));
    }
    if (playerTeamID != otherPlayerTeamID) {
        jsPlayer.cash += killReward;
    }
    jsPlayer.updateWalletUI();
}
export function OnPlayerDied(eventPlayer, eventOtherPlayer, eventDeathType, eventWeaponUnlock) {
    if (BombData.carryingPlayer && mod.IsPlayerValid(BombData.carryingPlayer) && mod.GetObjId(eventPlayer) == mod.GetObjId(BombData.carryingPlayer)) {
        BombData.ItemDropped(BombData.carryingPlayer);
        console.log("ObjectiveItemData.currentWorldIconPos: ", mod.XComponentOf(BombData.currentWorldIconPos), mod.YComponentOf(BombData.currentWorldIconPos), mod.ZComponentOf(BombData.currentWorldIconPos));
    }
    if (roundEnded) {
        return;
    }
    let jsPlayer = JsPlayer.get(eventPlayer);
    if (jsPlayer) {
        jsPlayer.progressBarUI?.close();
        if (roundStarted && !roundEnded && !buyPhase) {
            jsPlayer.outOfRound = true;
        }
    }
    if (BombData.defusingPlayer != null && mod.GetObjId(BombData.defusingPlayer) == mod.GetObjId(eventPlayer)) {
        console.log("Defusing player killed mid-defuse");
        BombData.CancelDefuse();
    }
    // Check for any remaining surviving players on the team.
    // When playing with a team full of bots, this often gets triggered during team assignment!
    if (combatStarted && !roundEnded && !buyPhase) {
        let deadPlayerTeamID = mod.GetObjId(mod.GetTeam(eventPlayer));
        let survivingTeamMembers = GetLivingPlayersOnTeam(mod.GetTeam(eventPlayer));
        console.log("Player on team ", deadPlayerTeamID, " Died. They have ", survivingTeamMembers.length, " remaining teammates.");
        if (survivingTeamMembers.length == 0) {
            if (mod.GetSoldierState(eventPlayer, mod.SoldierStateBool.IsManDown)) {
                console.log("Player that died is still in man down state. FINISH THEM!");
                mod.DealDamage(eventPlayer, 100);
            }
            // Defending team all dying is always a win for the attackers
            if (deadPlayerTeamID == mod.GetObjId(defendingTeam)) {
                console.log("All defenders have died.");
                EndRound(attackingTeam);
            }
            // Bomb isn't planted and attacking team is all dead
            if (!BombData.isPlanted && mod.GetObjId(attackingTeam) == deadPlayerTeamID) {
                console.log("All attackers are dead and the bomb is not planted.");
                EndRound(defendingTeam);
            }
            else if (BombData.isPlanted && mod.GetObjId(attackingTeam) == deadPlayerTeamID) {
                console.log("Player on attacking team is killed. Bomb is currently planted, so must be defused before round can end.");
            }
        }
    }
}
function GetLivingPlayersOnTeam(team) {
    let teamArr = [];
    let teamID = mod.GetObjId(team);
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (mod.GetObjId(mod.GetTeam(player)) == teamID && !jsPlayer?.outOfRound) {
            teamArr.push(player);
        }
    });
    return teamArr;
}
export function OnPlayerUndeploy(eventPlayer) {
    let jsPlayer = JsPlayer.get(eventPlayer);
    if (jsPlayer)
        jsPlayer.isDeployed = false;
}
// Called whenever a player interacts with an object
export async function OnPlayerInteract(player, interactPoint) {
    // ObjIds are assigned IN GODOT. I recommend assigning them to const numbers in the global scope
    let id = mod.GetObjId(interactPoint);
    let jsPlayer = JsPlayer.get(player);
    if (!jsPlayer) {
        console.log("Interaction attempted with invalid JSPlayer! Interact Point ID is: ", id);
        return;
    }
    if (buyPhase && (id == storeID_attackers || storeID_defenders)) {
        jsPlayer.store?.open();
    }
    if (BombData.carryingPlayer != null && mod.GetObjId(player) == mod.GetObjId(BombData.carryingPlayer)) {
        if (id == pointAAreaID) {
            console.log("Begin planting at A");
            BombData.isAtA = true;
            jsPlayer.progressBarUI?.open(MakeMessage(mod.stringkeys.planting));
            BombData.isPlanting = true;
        }
        else if (id == pointBAreaID) {
            console.log("Begin planting at B");
            BombData.isAtB = true;
            jsPlayer.progressBarUI?.open(MakeMessage(mod.stringkeys.planting));
            BombData.isPlanting = true;
        }
    }
    if (BombData.isPlanted && mod.GetObjId(mod.GetTeam(player)) == mod.GetObjId(defendingTeam)) {
        if (id == pointAAreaID || id == pointBAreaID) {
            BombData.defusingPlayer = player;
            let jsPlayer = JsPlayer.get(player);
            if (!jsPlayer) {
                console.log("Attempting bomb defuse with invalid JSPlayer!!!!");
                return;
            }
            jsPlayer.progressBarUI?.open(MakeMessage(mod.stringkeys.defusing));
        }
    }
}
async function CombatCountdown() {
    combatCountdownStarted = true;
    console.log("Combat Countdown Started");
    // INSTANT_START debug flag will skip the countdown delay
    while (combatStartDelayRemaining > -1 && !INSTANT_START) {
        UpdateAllLobbyUI();
        await mod.Wait(1);
        combatStartDelayRemaining--;
    }
    combatStarted = true;
    HideAllLobbyUI();
    return Promise.resolve();
}
function UpdateAllLobbyUI() {
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (!jsPlayer)
            return;
        jsPlayer.lobbyUI?.refresh();
    });
}
function MessageAllUI(message, textColor) {
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (!jsPlayer)
            return;
        if (jsPlayer.messageUI?.isOpen()) {
            jsPlayer.messageUI.refresh(message);
        }
        else {
            jsPlayer.messageUI?.open(message, textColor);
        }
    });
    messageTime = messageRemainTime;
}
function MessagePlayer(player, message, textColor) {
    if (player.messageUI?.isOpen()) {
        player.messageUI?.refresh(message);
    }
    else {
        player.messageUI?.open(message, textColor);
    }
    mod.Wait(3);
    player.messageUI?.close();
}
function HideAllMessageUI() {
    console.log("Hide all message UI");
    JsPlayer.playerInstances.forEach(player => {
        let jsPlayer = JsPlayer.get(player);
        if (!jsPlayer)
            return;
        jsPlayer.messageUI?.close();
    });
}
function HideAllLobbyUI() {
    console.log("Hide lobby UI");
    JsPlayer.playerInstances.forEach((player) => {
        let jsPlayer = JsPlayer.get(player);
        if (!jsPlayer)
            return;
        jsPlayer.lobbyUI?.close();
    });
}
function MakeMessage(message, ...args) {
    switch (args.length) {
        case 0:
            return mod.Message(message);
        case 1:
            return mod.Message(message, args[0]);
        case 2:
            return mod.Message(message, args[0], args[1]);
        default:
            return mod.Message(message, args[0], args[1], args[2]);
    }
}
export function OnCapturePointCapturing(eventCapturePoint) {
    mod.DisplayNotificationMessage(MakeMessage(mod.stringkeys.teamCapture));
}
export function OnGameModeEnding() {
    HideAllMessageUI();
    CleanUp();
}
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-------------------------------------- RYAN W STORE -------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
export function OnPlayerUIButtonEvent(player, widget, event) {
    //console.log("got button event for widget: " + mod.GetUIWidgetName(widget));
    // send to the store?
    let jsPlayer = JsPlayer.get(player);
    if (!jsPlayer)
        return;
    jsPlayer.store.onUIButtonEvent(widget, event);
}
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
// Helper Functions:
//-----------------------------------------------------------------------------------------------//
function GetRandomFloatInRange(max, min) {
    return Math.random() * (max - min) + min;
}
function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}
/// ----------------------------------- JS PLAYER --------------------------------------------------------------
class JsPlayer {
    constructor(player) {
        this.cash = initialCash;
        this.maxHealth = 100;
        this.currentHealth = 100;
        this.bonusDamage = 0;
        // stats:
        this.kills = 0;
        this.deaths = 0;
        this.totalCashEarned = 0;
        this.isDeployed = false;
        this.hasDeployed = false;
        this.outOfRound = false;
        this.itemBuysPerRound = {}; // a count of each item bought this round, keyed by itemDatas.id
        this.player = player;
        this.playerId = mod.GetObjId(player);
        _a.playerInstances.push(this.player);
        if (debugJSPlayer) {
            console.log("Bomb Defusal Adding Player [", mod.GetObjId(this.player), "] Creating JS Player: ", _a.playerInstances.length);
        }
        ;
        // Never create UI elements for AI soldiers, because late joining players will inherit their Object IDs, and thus their UI
        if (!mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier)) {
            this.createWalletUI();
            this.openWalletUI();
            this.store = new Store(this, cStoreData);
            this.lobbyUI = new LobbyUI(this);
            this.scoreUI = new ScoreUI(this);
            this.messageUI = new MessageUI(this);
            this.dropBombIndicator = new DropBombIndicator(this);
            this.hasBombIndicator = new HasBombIndicator(this);
            this.versionUI = new VersionUI(this);
            this.progressBarUI = new ProgressBar(this);
        }
    }
    static get(player) {
        if (!gameOver && mod.GetObjId(player) > -1) {
            let index = mod.GetObjId(player);
            let jsPlayer = __classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers)[index];
            if (!jsPlayer) {
                jsPlayer = new _a(player);
                __classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers)[index] = jsPlayer;
            }
            return jsPlayer;
        }
        return undefined;
    }
    static removeInvalidJSPlayers(invalidPlayerId) {
        if (!gameOver) {
            if (debugJSPlayer) {
                console.log("Removing Invalid JSPlayers currently: ", _a.playerInstances.length);
            }
            let allPlayersLength = Object.keys((__classPrivateFieldGet(_a, _a, "f", _JsPlayer_allJsPlayers))).length;
            if (debugJSPlayer) {
                console.log("#allJsPlayers Length: ", _a.playerInstances.length);
            }
            let n = 0;
            let indexToRemove = -1;
            _a.playerInstances.forEach((indexPlayer) => {
                if (mod.GetObjId(_a.playerInstances[n]) < 0) {
                    indexToRemove = n;
                }
                n++;
            });
            __classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers)[invalidPlayerId].destroyUI(); // Brute force disallow the double UI bug
            delete __classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers)[invalidPlayerId];
            if (indexToRemove > -1) {
                _a.playerInstances.splice(indexToRemove, 1);
            }
            if (debugJSPlayer) {
                console.log("Player [", invalidPlayerId, "] removed. JSPlayers Remaining: ", _a.playerInstances.length);
            }
            allPlayersLength = Object.keys((__classPrivateFieldGet(_a, _a, "f", _JsPlayer_allJsPlayers))).length;
            if (debugJSPlayer) {
                console.log("#allJsPlayers New Length: ", _a.playerInstances.length);
            }
        }
    }
    static getAllAsArray() {
        return Object.values(__classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers));
    }
    static IsPlayer(id) {
        if (!__classPrivateFieldGet(this, _a, "f", _JsPlayer_allJsPlayers)[id]) {
            return false;
        }
        return true;
    }
    static getRandomJsPlayer() {
        let i = GetRandomInt(_a.playerInstances.length);
        return _a.playerInstances[i];
    }
    static getValidJsPlayer() {
        //console.log("M12 getValidJsPlayer: ")
        let aliveAndFreeJSPlayers = [];
        let n = _a.playerInstances.length;
        //console.log("M12 getValidJsPlayer length: ", n)
        for (let i = 0; i < n; i++) {
            //console.log("M12 candidate player = ", JsPlayer.get(JsPlayer.playerInstances[i]))
            let candidateJsPlayer = _a.get(_a.playerInstances[i]);
            if (!candidateJsPlayer)
                continue;
        }
        if (aliveAndFreeJSPlayers.length > 0) {
            let i = GetRandomInt(aliveAndFreeJSPlayers.length);
            let validJsPlayer = aliveAndFreeJSPlayers[i];
            //console.log("M12 Returning Valid JS Player: ", validJsPlayer)
            return validJsPlayer;
        }
        else {
            //console.log("M12 There are no Free & Alive JS Players")
            return null;
        }
    }
    static anyJsPlayersAlive() {
        let anyPlayersStillAlive = false;
        _a.playerInstances.forEach((player) => {
            let jsPlayer = _a.get(player);
            if (!jsPlayer)
                return;
        });
        if (anyPlayersStillAlive) {
            return true;
        }
        else {
            return false;
        }
    }
    destroyUI() {
        console.log("Destroy UI");
        this.closeWalletUI();
        this.store?.close();
        this.lobbyUI?.close();
        this.scoreUI?.close();
        this.messageUI?.close();
        this.dropBombIndicator?.close();
        this.hasBombIndicator?.close();
        this.versionUI?.close();
        this.progressBarUI?.close();
    }
    createWalletUI() {
        this.playerwalletWidget = ParseUI({
            type: "Text",
            position: [50, 50],
            size: [200, 40],
            anchor: mod.UIAnchor.TopLeft,
            textLabel: MakeMessage(mod.stringkeys.playerwallet, this.cash),
            playerId: this.player,
            visible: false,
        });
    }
    openWalletUI() {
        if (!this.playerwalletWidget)
            return;
        mod.SetUIWidgetVisible(this.playerwalletWidget, true);
    }
    updateWalletUI() {
        if (!this.playerwalletWidget)
            return;
        mod.SetUITextLabel(this.playerwalletWidget, MakeMessage(mod.stringkeys.playerwallet, this.cash));
    }
    closeWalletUI() {
        if (this.playerwalletWidget) {
            mod.SetUIWidgetVisible(this.playerwalletWidget, false);
        }
    }
}
_a = JsPlayer;
JsPlayer.playerInstances = [];
// declare dictionary with int keys
_JsPlayer_allJsPlayers = { value: {} };
//-----------------------------------------------------------------------------------------------//
class ScoreUI {
    constructor(jsPlayer) {
        _ScoreUI_instances.add(this);
        _ScoreUI_jsPlayer.set(this, void 0);
        _ScoreUI_rootWidget.set(this, void 0);
        _ScoreUI_containerWidth.set(this, 150);
        _ScoreUI_containerHeight.set(this, 60);
        _ScoreUI_isIndicatorVisible.set(this, false);
        _ScoreUI_roundTime.set(this, void 0);
        _ScoreUI_allyTeamScore.set(this, void 0);
        _ScoreUI_enemyTeamScore.set(this, void 0);
        _ScoreUI_teamDesignation.set(this, void 0);
        __classPrivateFieldSet(this, _ScoreUI_jsPlayer, jsPlayer, "f");
        console.log("Create score UI for ", jsPlayer.player, " with ID: ", jsPlayer.playerId);
        __classPrivateFieldGet(this, _ScoreUI_instances, "m", _ScoreUI_create).call(this);
        if (!__classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"), true);
    }
    refresh() {
        if (!__classPrivateFieldGet(this, _ScoreUI_roundTime, "f") || !__classPrivateFieldGet(this, _ScoreUI_allyTeamScore, "f") || !__classPrivateFieldGet(this, _ScoreUI_enemyTeamScore, "f") || !__classPrivateFieldGet(this, _ScoreUI_teamDesignation, "f")) {
            return;
        }
        // refresh the lobby status text:
        let time; // Either display setup/buy time or round time remaining
        if (roundStarted) {
            time = roundTime;
            if (mod.GetObjId(attackingTeam) == mod.GetObjId(mod.GetTeam(__classPrivateFieldGet(this, _ScoreUI_jsPlayer, "f").player))) {
                mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_teamDesignation, "f"), MakeMessage(mod.stringkeys.attackingTeam));
            }
            else {
                mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_teamDesignation, "f"), MakeMessage(mod.stringkeys.defendingTeam));
            }
        }
        else {
            time = buyPhaseTimeRemaining;
            mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_teamDesignation, "f"), MakeMessage(mod.stringkeys.buyPhase));
            //console.log("there is ", time, " time remaining in the buy phase");
        }
        let minutes = Math.max(Math.floor(time / 60), 0);
        let seconds = Math.max(Math.ceil(time % 60), 0);
        let seconds1 = Math.max(Math.floor(seconds / 10), 0);
        let seconds2 = Math.max(Math.floor(seconds % 10), 0);
        mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_roundTime, "f"), MakeMessage(mod.stringkeys.roundTime, minutes, seconds1, seconds2));
        // #allyTeamScore is just the score on the left, and #enemyTeamScore is the one on the right
        // so really #allyTeamScore is "allied team" score and #enemyTeamScore is "enemy team score"
        if (mod.GetObjId(mod.GetTeam(__classPrivateFieldGet(this, _ScoreUI_jsPlayer, "f").player)) == 1) {
            mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_allyTeamScore, "f"), MakeMessage(mod.stringkeys.score, team1Score));
            mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_enemyTeamScore, "f"), MakeMessage(mod.stringkeys.score, team2Score));
        }
        else {
            mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_allyTeamScore, "f"), MakeMessage(mod.stringkeys.score, team2Score));
            mod.SetUITextLabel(__classPrivateFieldGet(this, _ScoreUI_enemyTeamScore, "f"), MakeMessage(mod.stringkeys.score, team1Score));
        }
        mod.SetUITextColor(__classPrivateFieldGet(this, _ScoreUI_allyTeamScore, "f"), mod.CreateVector(0, .2, 1));
        mod.SetUITextColor(__classPrivateFieldGet(this, _ScoreUI_enemyTeamScore, "f"), mod.CreateVector(1, 0, 0));
    }
    close() {
        if (__classPrivateFieldGet(this, _ScoreUI_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _ScoreUI_isIndicatorVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _ScoreUI_isIndicatorVisible, "f");
    }
}
_ScoreUI_jsPlayer = new WeakMap(), _ScoreUI_rootWidget = new WeakMap(), _ScoreUI_containerWidth = new WeakMap(), _ScoreUI_containerHeight = new WeakMap(), _ScoreUI_isIndicatorVisible = new WeakMap(), _ScoreUI_roundTime = new WeakMap(), _ScoreUI_allyTeamScore = new WeakMap(), _ScoreUI_enemyTeamScore = new WeakMap(), _ScoreUI_teamDesignation = new WeakMap(), _ScoreUI_instances = new WeakSet(), _ScoreUI_create = function _ScoreUI_create() {
    __classPrivateFieldSet(this, _ScoreUI_isIndicatorVisible, true, "f");
    // background:
    __classPrivateFieldSet(this, _ScoreUI_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _ScoreUI_containerWidth, "f"), __classPrivateFieldGet(this, _ScoreUI_containerHeight, "f")],
        position: [0, 30],
        anchor: mod.UIAnchor.TopCenter,
        bgFill: mod.UIBgFill.Blur,
        //bgColor: this.#activeTabBgColor,
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _ScoreUI_jsPlayer, "f").player,
    }), "f");
    __classPrivateFieldSet(this, _ScoreUI_roundTime, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"),
        textSize: 24,
        position: [0, 10, 0],
        size: [__classPrivateFieldGet(this, _ScoreUI_containerWidth, "f") / 3, 50],
        anchor: mod.UIAnchor.TopCenter,
        textAnchor: mod.UIAnchor.Center,
        bgAlpha: 0,
        bgColor: [0, 0, 0],
        textLabel: MakeMessage(mod.stringkeys.roundTime, "05", "00"),
    }), "f");
    __classPrivateFieldSet(this, _ScoreUI_allyTeamScore, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"),
        textSize: 24,
        position: [4, 20, 0],
        size: [__classPrivateFieldGet(this, _ScoreUI_containerWidth, "f") / 4, 50],
        anchor: mod.UIAnchor.TopLeft,
        textAnchor: mod.UIAnchor.TopLeft,
        bgAlpha: 0,
        bgColor: [0, 0, 0],
        textLabel: MakeMessage(mod.stringkeys.score, 0),
    }), "f");
    __classPrivateFieldSet(this, _ScoreUI_enemyTeamScore, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"),
        textSize: 24,
        position: [4, 20, 0],
        size: [__classPrivateFieldGet(this, _ScoreUI_containerWidth, "f") / 4, 50],
        anchor: mod.UIAnchor.TopRight,
        textAnchor: mod.UIAnchor.TopRight,
        bgAlpha: 0,
        bgColor: [0, 0, 0],
        textLabel: MakeMessage(mod.stringkeys.score, 0),
    }), "f");
    __classPrivateFieldSet(this, _ScoreUI_teamDesignation, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _ScoreUI_rootWidget, "f"),
        textSize: 24,
        position: [0, -50, 0],
        size: [__classPrivateFieldGet(this, _ScoreUI_containerWidth, "f") * 2 / 3, 50],
        anchor: mod.UIAnchor.BottomCenter,
        textAnchor: mod.UIAnchor.Center,
        bgAlpha: 0.5,
        bgColor: [0, 0, 1],
        textColor: [1, 1, 1],
        textLabel: MakeMessage(mod.stringkeys.waiting, 0),
    }), "f");
};
class VersionUI {
    constructor(jsPlayer) {
        _VersionUI_instances.add(this);
        _VersionUI_jsPlayer.set(this, void 0);
        _VersionUI_rootWidget.set(this, void 0);
        _VersionUI_containerWidth.set(this, 180);
        _VersionUI_containerHeight.set(this, 40);
        _VersionUI_backgroundSpacing.set(this, 4);
        _VersionUI_isIndicatorVisible.set(this, false);
        __classPrivateFieldSet(this, _VersionUI_jsPlayer, jsPlayer, "f");
        if (!__classPrivateFieldGet(this, _VersionUI_rootWidget, "f"))
            __classPrivateFieldGet(this, _VersionUI_instances, "m", _VersionUI_create).call(this);
        if (!__classPrivateFieldGet(this, _VersionUI_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _VersionUI_rootWidget, "f"), true);
    }
    close() {
        if (__classPrivateFieldGet(this, _VersionUI_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _VersionUI_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _VersionUI_isIndicatorVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _VersionUI_isIndicatorVisible, "f");
    }
}
_VersionUI_jsPlayer = new WeakMap(), _VersionUI_rootWidget = new WeakMap(), _VersionUI_containerWidth = new WeakMap(), _VersionUI_containerHeight = new WeakMap(), _VersionUI_backgroundSpacing = new WeakMap(), _VersionUI_isIndicatorVisible = new WeakMap(), _VersionUI_instances = new WeakSet(), _VersionUI_create = function _VersionUI_create() {
    console.log("Create VersionUI");
    __classPrivateFieldSet(this, _VersionUI_isIndicatorVisible, true, "f");
    __classPrivateFieldSet(this, _VersionUI_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _VersionUI_containerWidth, "f"), __classPrivateFieldGet(this, _VersionUI_containerHeight, "f")],
        position: [0, 20],
        anchor: mod.UIAnchor.TopRight,
        bgFill: mod.UIBgFill.Blur,
        bgColor: [0, 0, 0],
        bgAlpha: 0,
        playerId: __classPrivateFieldGet(this, _VersionUI_jsPlayer, "f").player,
        children: [{
                type: "Text",
                textSize: 18,
                position: [0, 0, 0],
                size: [__classPrivateFieldGet(this, _VersionUI_containerWidth, "f") - __classPrivateFieldGet(this, _VersionUI_backgroundSpacing, "f") * 2, __classPrivateFieldGet(this, _VersionUI_containerHeight, "f")],
                anchor: mod.UIAnchor.Center,
                textAnchor: mod.UIAnchor.Center,
                bgAlpha: 0,
                textLabel: MakeMessage(mod.stringkeys.version, VERSION[0], VERSION[1], VERSION[2]),
            }]
    }), "f");
};
class ProgressBar {
    constructor(jsPlayer) {
        _ProgressBar_instances.add(this);
        _ProgressBar_jsPlayer.set(this, void 0);
        _ProgressBar_rootWidget.set(this, void 0);
        _ProgressBar_fillWidget.set(this, void 0);
        _ProgressBar_labelWidget.set(this, void 0);
        _ProgressBar_currentProgress.set(this, 0); // 0-1
        _ProgressBar_isIndicatorVisible.set(this, false);
        _ProgressBar_containerWidth.set(this, 180);
        _ProgressBar_containerHeight.set(this, 50);
        __classPrivateFieldSet(this, _ProgressBar_jsPlayer, jsPlayer, "f");
    }
    open(label) {
        if (!__classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"))
            __classPrivateFieldGet(this, _ProgressBar_instances, "m", _ProgressBar_create).call(this, label);
        if (!__classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _ProgressBar_isIndicatorVisible, true, "f");
    }
    close() {
        if (__classPrivateFieldGet(this, _ProgressBar_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _ProgressBar_isIndicatorVisible, false, "f");
        }
    }
    refresh(progress) {
        __classPrivateFieldSet(this, _ProgressBar_currentProgress, progress, "f");
        if (__classPrivateFieldGet(this, _ProgressBar_fillWidget, "f"))
            mod.SetUIWidgetSize(__classPrivateFieldGet(this, _ProgressBar_fillWidget, "f"), mod.CreateVector(progress * __classPrivateFieldGet(this, _ProgressBar_containerWidth, "f"), __classPrivateFieldGet(this, _ProgressBar_containerHeight, "f"), 1));
        else
            console.log("fill widget is null!");
    }
    isOpen() {
        return __classPrivateFieldGet(this, _ProgressBar_isIndicatorVisible, "f");
    }
}
_ProgressBar_jsPlayer = new WeakMap(), _ProgressBar_rootWidget = new WeakMap(), _ProgressBar_fillWidget = new WeakMap(), _ProgressBar_labelWidget = new WeakMap(), _ProgressBar_currentProgress = new WeakMap(), _ProgressBar_isIndicatorVisible = new WeakMap(), _ProgressBar_containerWidth = new WeakMap(), _ProgressBar_containerHeight = new WeakMap(), _ProgressBar_instances = new WeakSet(), _ProgressBar_create = function _ProgressBar_create(label) {
    console.log("Create has bomb indicator UI");
    // background:
    __classPrivateFieldSet(this, _ProgressBar_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _ProgressBar_containerWidth, "f"), __classPrivateFieldGet(this, _ProgressBar_containerHeight, "f")],
        position: [0, 150],
        anchor: mod.UIAnchor.BottomCenter,
        bgFill: mod.UIBgFill.None,
        bgColor: [0, 0, 0],
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _ProgressBar_jsPlayer, "f").player,
        children: [{
                // Background
                type: "Container",
                position: [0, 0],
                size: [__classPrivateFieldGet(this, _ProgressBar_containerWidth, "f"), __classPrivateFieldGet(this, _ProgressBar_containerHeight, "f")],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Blur,
                bgColor: BLACKCOLOR,
                bgAlpha: 1,
            },]
    }), "f");
    __classPrivateFieldSet(this, _ProgressBar_fillWidget, ParseUI({
        type: "Container",
        parent: __classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"),
        size: [0, __classPrivateFieldGet(this, _ProgressBar_containerHeight, "f")],
        position: [0, 0],
        anchor: mod.UIAnchor.CenterLeft,
        bgFill: mod.UIBgFill.GradientLeft,
        bgColor: [0, 1, 0.3],
        bgAlpha: 1,
    }), "f");
    __classPrivateFieldSet(this, _ProgressBar_labelWidget, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _ProgressBar_rootWidget, "f"),
        textSize: 18,
        position: [-__classPrivateFieldGet(this, _ProgressBar_containerWidth, "f"), 0, 0],
        size: [__classPrivateFieldGet(this, _ProgressBar_containerWidth, "f"), __classPrivateFieldGet(this, _ProgressBar_containerHeight, "f")],
        anchor: mod.UIAnchor.CenterLeft,
        textAnchor: mod.UIAnchor.Center,
        bgAlpha: 0,
        textLabel: label,
    }), "f");
};
class HasBombIndicator {
    constructor(jsPlayer) {
        _HasBombIndicator_instances.add(this);
        _HasBombIndicator_jsPlayer.set(this, void 0);
        _HasBombIndicator_rootWidget.set(this, void 0);
        _HasBombIndicator_containerWidth.set(this, 180);
        _HasBombIndicator_containerHeight.set(this, 80);
        _HasBombIndicator_backgroundSpacing.set(this, 4);
        _HasBombIndicator_isIndicatorVisible.set(this, false);
        __classPrivateFieldSet(this, _HasBombIndicator_jsPlayer, jsPlayer, "f");
    }
    open() {
        if (!__classPrivateFieldGet(this, _HasBombIndicator_rootWidget, "f"))
            __classPrivateFieldGet(this, _HasBombIndicator_instances, "m", _HasBombIndicator_create).call(this);
        if (!__classPrivateFieldGet(this, _HasBombIndicator_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _HasBombIndicator_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _HasBombIndicator_isIndicatorVisible, true, "f");
    }
    close() {
        if (__classPrivateFieldGet(this, _HasBombIndicator_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _HasBombIndicator_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _HasBombIndicator_isIndicatorVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _HasBombIndicator_isIndicatorVisible, "f");
    }
}
_HasBombIndicator_jsPlayer = new WeakMap(), _HasBombIndicator_rootWidget = new WeakMap(), _HasBombIndicator_containerWidth = new WeakMap(), _HasBombIndicator_containerHeight = new WeakMap(), _HasBombIndicator_backgroundSpacing = new WeakMap(), _HasBombIndicator_isIndicatorVisible = new WeakMap(), _HasBombIndicator_instances = new WeakSet(), _HasBombIndicator_create = function _HasBombIndicator_create() {
    console.log("Create has bomb indicator UI");
    // background:
    __classPrivateFieldSet(this, _HasBombIndicator_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _HasBombIndicator_containerWidth, "f"), __classPrivateFieldGet(this, _HasBombIndicator_containerHeight, "f")],
        position: [200, 30],
        anchor: mod.UIAnchor.BottomCenter,
        bgFill: mod.UIBgFill.Blur,
        bgColor: [0, 0, 0],
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _HasBombIndicator_jsPlayer, "f").player,
        children: [{
                // Black Background
                type: "Container",
                position: [0, 0],
                size: [__classPrivateFieldGet(this, _HasBombIndicator_containerWidth, "f") - __classPrivateFieldGet(this, _HasBombIndicator_backgroundSpacing, "f"), __classPrivateFieldGet(this, _HasBombIndicator_containerHeight, "f") - __classPrivateFieldGet(this, _HasBombIndicator_backgroundSpacing, "f")],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Blur,
                bgColor: BLACKCOLOR,
                bgAlpha: 1,
            }, {
                type: "Text",
                textSize: 18,
                position: [0, 0, 0],
                size: [__classPrivateFieldGet(this, _HasBombIndicator_containerWidth, "f") - __classPrivateFieldGet(this, _HasBombIndicator_backgroundSpacing, "f") * 2, __classPrivateFieldGet(this, _HasBombIndicator_containerHeight, "f")],
                anchor: mod.UIAnchor.Center,
                textAnchor: mod.UIAnchor.Center,
                bgAlpha: 0,
                textLabel: MakeMessage(mod.stringkeys.bombCarrier),
            },]
    }), "f");
};
//-----------------------------------------------------------------------------------------------//
class DropBombIndicator {
    constructor(jsPlayer) {
        _DropBombIndicator_instances.add(this);
        _DropBombIndicator_jsPlayer.set(this, void 0);
        _DropBombIndicator_rootWidget.set(this, void 0);
        _DropBombIndicator_containerWidth.set(this, 180);
        _DropBombIndicator_containerHeight.set(this, 80);
        _DropBombIndicator_backgroundSpacing.set(this, 4);
        _DropBombIndicator_isIndicatorVisible.set(this, false);
        __classPrivateFieldSet(this, _DropBombIndicator_jsPlayer, jsPlayer, "f");
    }
    open() {
        if (!__classPrivateFieldGet(this, _DropBombIndicator_rootWidget, "f"))
            __classPrivateFieldGet(this, _DropBombIndicator_instances, "m", _DropBombIndicator_create).call(this);
        if (!__classPrivateFieldGet(this, _DropBombIndicator_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _DropBombIndicator_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _DropBombIndicator_isIndicatorVisible, true, "f");
    }
    close() {
        if (__classPrivateFieldGet(this, _DropBombIndicator_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _DropBombIndicator_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _DropBombIndicator_isIndicatorVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _DropBombIndicator_isIndicatorVisible, "f");
    }
}
_DropBombIndicator_jsPlayer = new WeakMap(), _DropBombIndicator_rootWidget = new WeakMap(), _DropBombIndicator_containerWidth = new WeakMap(), _DropBombIndicator_containerHeight = new WeakMap(), _DropBombIndicator_backgroundSpacing = new WeakMap(), _DropBombIndicator_isIndicatorVisible = new WeakMap(), _DropBombIndicator_instances = new WeakSet(), _DropBombIndicator_create = function _DropBombIndicator_create() {
    // background:
    __classPrivateFieldSet(this, _DropBombIndicator_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _DropBombIndicator_containerWidth, "f"), __classPrivateFieldGet(this, _DropBombIndicator_containerHeight, "f")],
        position: [0, 30],
        anchor: mod.UIAnchor.BottomCenter,
        bgFill: mod.UIBgFill.Blur,
        bgColor: [0, 0, 0],
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _DropBombIndicator_jsPlayer, "f").player,
        children: [{
                // Black Background
                type: "Container",
                position: [0, 0],
                size: [__classPrivateFieldGet(this, _DropBombIndicator_containerWidth, "f") - __classPrivateFieldGet(this, _DropBombIndicator_backgroundSpacing, "f"), __classPrivateFieldGet(this, _DropBombIndicator_containerHeight, "f") - __classPrivateFieldGet(this, _DropBombIndicator_backgroundSpacing, "f")],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Blur,
                bgColor: BLACKCOLOR,
                bgAlpha: 1,
            }, {
                type: "Text",
                textSize: 18,
                position: [0, 0, 0],
                size: [__classPrivateFieldGet(this, _DropBombIndicator_containerWidth, "f") - __classPrivateFieldGet(this, _DropBombIndicator_backgroundSpacing, "f") * 2, __classPrivateFieldGet(this, _DropBombIndicator_containerHeight, "f")],
                anchor: mod.UIAnchor.Center,
                textAnchor: mod.UIAnchor.Center,
                bgAlpha: 0,
                textLabel: MakeMessage(mod.stringkeys.dropBombTip),
            }]
    }), "f");
};
//-----------------------------------------------------------------------------------------------//
class LobbyUI {
    constructor(jsPlayer) {
        _LobbyUI_instances.add(this);
        _LobbyUI_jsPlayer.set(this, void 0);
        _LobbyUI_rootWidget.set(this, void 0);
        _LobbyUI_containerWidth.set(this, 700);
        _LobbyUI_containerHeight.set(this, 300);
        _LobbyUI_lineBreakHeight.set(this, 3);
        _LobbyUI_backgroundSpacing.set(this, 4);
        _LobbyUI_activeTabBgColor.set(this, BLACKCOLOR);
        _LobbyUI_lobbyStatusText.set(this, void 0);
        _LobbyUI_isUIVisible.set(this, false);
        __classPrivateFieldSet(this, _LobbyUI_jsPlayer, jsPlayer, "f");
    }
    open() {
        if (!__classPrivateFieldGet(this, _LobbyUI_rootWidget, "f"))
            __classPrivateFieldGet(this, _LobbyUI_instances, "m", _LobbyUI_create).call(this);
        if (!__classPrivateFieldGet(this, _LobbyUI_rootWidget, "f"))
            return;
        // this.refresh();
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _LobbyUI_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _LobbyUI_isUIVisible, true, "f");
    }
    close() {
        if (__classPrivateFieldGet(this, _LobbyUI_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _LobbyUI_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _LobbyUI_isUIVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _LobbyUI_isUIVisible, "f");
    }
    refresh() {
        if (!__classPrivateFieldGet(this, _LobbyUI_lobbyStatusText, "f")) {
            console.log("No lobby status text");
            return;
        }
        // refresh the lobby status text:
        if (combatCountdownStarted) {
            mod.SetUITextLabel(__classPrivateFieldGet(this, _LobbyUI_lobbyStatusText, "f"), MakeMessage(mod.stringkeys.combatStartDelayCountdown, combatStartDelayRemaining));
        }
        else {
            mod.SetUITextLabel(__classPrivateFieldGet(this, _LobbyUI_lobbyStatusText, "f"), MakeMessage(mod.stringkeys.waitingforplayersX, initialPlayerCount, 10, minimumInitialPlayerCount));
        }
    }
}
_LobbyUI_jsPlayer = new WeakMap(), _LobbyUI_rootWidget = new WeakMap(), _LobbyUI_containerWidth = new WeakMap(), _LobbyUI_containerHeight = new WeakMap(), _LobbyUI_lineBreakHeight = new WeakMap(), _LobbyUI_backgroundSpacing = new WeakMap(), _LobbyUI_activeTabBgColor = new WeakMap(), _LobbyUI_lobbyStatusText = new WeakMap(), _LobbyUI_isUIVisible = new WeakMap(), _LobbyUI_instances = new WeakSet(), _LobbyUI_create = function _LobbyUI_create() {
    // background:
    __classPrivateFieldSet(this, _LobbyUI_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f"), __classPrivateFieldGet(this, _LobbyUI_containerHeight, "f")],
        position: [0, 100],
        anchor: mod.UIAnchor.TopCenter,
        bgFill: mod.UIBgFill.Solid,
        bgColor: __classPrivateFieldGet(this, _LobbyUI_activeTabBgColor, "f"),
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _LobbyUI_jsPlayer, "f").player,
        children: [{
                // Black Background
                type: "Container",
                position: [0, 0],
                size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f") - __classPrivateFieldGet(this, _LobbyUI_backgroundSpacing, "f"), __classPrivateFieldGet(this, _LobbyUI_containerHeight, "f") - __classPrivateFieldGet(this, _LobbyUI_backgroundSpacing, "f")],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Solid,
                bgColor: [0.1, 0.1, 0.1],
                bgAlpha: 1
            }, {
                // Line Break Line
                type: "Container",
                position: [0, 100],
                size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f") - 50, __classPrivateFieldGet(this, _LobbyUI_lineBreakHeight, "f")],
                anchor: mod.UIAnchor.BottomCenter,
                bgFill: mod.UIBgFill.Solid,
                bgColor: BLACKCOLOR,
                bgAlpha: 1
            }, {
                // Experience Title Text:
                type: "Text",
                textSize: 72,
                position: [0, 25, 0],
                size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f"), 150],
                anchor: mod.UIAnchor.TopCenter,
                textAnchor: mod.UIAnchor.TopCenter,
                bgAlpha: 0,
                //bgColor: REDCOLOR,
                textLabel: MakeMessage(mod.stringkeys.titleLineOne),
            },
            {
                // Experience Title Text:
                type: "Text",
                textSize: 72,
                position: [0, 90, 0],
                size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f"), 150],
                anchor: mod.UIAnchor.TopCenter,
                textAnchor: mod.UIAnchor.TopCenter,
                bgAlpha: 0,
                //bgColor: REDCOLOR,
                textLabel: MakeMessage(mod.stringkeys.titleLineTwo),
            }]
    }), "f");
    // lobby status text:
    __classPrivateFieldSet(this, _LobbyUI_lobbyStatusText, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _LobbyUI_rootWidget, "f"),
        textSize: 36,
        position: [0, 30, 0],
        size: [__classPrivateFieldGet(this, _LobbyUI_containerWidth, "f"), 50],
        anchor: mod.UIAnchor.BottomCenter,
        textAnchor: mod.UIAnchor.Center,
        bgAlpha: 0,
        //bgColor: REDCOLOR,
        textLabel: MakeMessage(mod.stringkeys.waitingforplayersX, initialPlayerCount, 12),
    }), "f");
};
class MessageUI {
    constructor(jsPlayer) {
        _MessageUI_instances.add(this);
        _MessageUI_jsPlayer.set(this, void 0);
        _MessageUI_rootWidget.set(this, void 0);
        _MessageUI_containerWidth.set(this, 700);
        _MessageUI_containerHeight.set(this, 100);
        _MessageUI_lineBreakHeight.set(this, 3);
        _MessageUI_backgroundSpacing.set(this, 4);
        _MessageUI_activeTabBgColor.set(this, [0, 0, 0]);
        _MessageUI_messageText.set(this, void 0);
        _MessageUI_isUIVisible.set(this, false);
        __classPrivateFieldSet(this, _MessageUI_jsPlayer, jsPlayer, "f");
    }
    open(message, textColor) {
        //console.log("Open message UI");
        if (!__classPrivateFieldGet(this, _MessageUI_rootWidget, "f"))
            __classPrivateFieldGet(this, _MessageUI_instances, "m", _MessageUI_create).call(this, message, textColor);
        else {
            this.refresh(message);
            if (__classPrivateFieldGet(this, _MessageUI_messageText, "f") && textColor.length >= 3)
                mod.SetUITextColor(__classPrivateFieldGet(this, _MessageUI_messageText, "f"), mod.CreateVector(textColor[0], textColor[1], textColor[2]));
        }
        if (!__classPrivateFieldGet(this, _MessageUI_rootWidget, "f"))
            return;
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _MessageUI_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _MessageUI_isUIVisible, true, "f");
    }
    close() {
        if (__classPrivateFieldGet(this, _MessageUI_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _MessageUI_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _MessageUI_isUIVisible, false, "f");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _MessageUI_isUIVisible, "f");
    }
    refresh(message) {
        //console.log("refresh message text");
        if (!__classPrivateFieldGet(this, _MessageUI_messageText, "f")) {
            console.log("Missing Message Text!");
            return;
        }
        mod.SetUITextLabel(__classPrivateFieldGet(this, _MessageUI_messageText, "f"), message);
    }
}
_MessageUI_jsPlayer = new WeakMap(), _MessageUI_rootWidget = new WeakMap(), _MessageUI_containerWidth = new WeakMap(), _MessageUI_containerHeight = new WeakMap(), _MessageUI_lineBreakHeight = new WeakMap(), _MessageUI_backgroundSpacing = new WeakMap(), _MessageUI_activeTabBgColor = new WeakMap(), _MessageUI_messageText = new WeakMap(), _MessageUI_isUIVisible = new WeakMap(), _MessageUI_instances = new WeakSet(), _MessageUI_create = function _MessageUI_create(message, textColor) {
    // background:
    __classPrivateFieldSet(this, _MessageUI_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _MessageUI_containerWidth, "f"), __classPrivateFieldGet(this, _MessageUI_containerHeight, "f")],
        position: [0, 100],
        anchor: mod.UIAnchor.BottomCenter,
        bgFill: mod.UIBgFill.Blur,
        bgColor: __classPrivateFieldGet(this, _MessageUI_activeTabBgColor, "f"),
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _MessageUI_jsPlayer, "f").player,
        children: [{
                // Black Background
                type: "Container",
                position: [0, 0],
                size: [__classPrivateFieldGet(this, _MessageUI_containerWidth, "f") - __classPrivateFieldGet(this, _MessageUI_backgroundSpacing, "f"), __classPrivateFieldGet(this, _MessageUI_containerHeight, "f") - __classPrivateFieldGet(this, _MessageUI_backgroundSpacing, "f")],
                anchor: mod.UIAnchor.Center,
                bgFill: mod.UIBgFill.Blur,
                bgColor: BLACKCOLOR,
                bgAlpha: 1,
            },
        ]
    }), "f");
    // message
    __classPrivateFieldSet(this, _MessageUI_messageText, ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _MessageUI_rootWidget, "f"),
        textSize: 36,
        position: [0, 30, 0],
        size: [__classPrivateFieldGet(this, _MessageUI_containerWidth, "f"), 50],
        anchor: mod.UIAnchor.BottomCenter,
        textAnchor: mod.UIAnchor.Center,
        bgAlpha: 0,
        textColor: textColor,
        textLabel: message,
    }), "f");
};
//-----------------------------------------------------------------------------------------------//
class BombData {
    static Initialize() {
        // Init things here
        this.bombPositionWorldIcon = mod.GetWorldIcon(1502);
        mod.SetWorldIconText(this.bombPositionWorldIcon, MakeMessage(mod.stringkeys.bomb));
        mod.SetWorldIconColor(this.bombPositionWorldIcon, mod.CreateVector(1, 0, 0));
        mod.EnableWorldIconImage(this.bombPositionWorldIcon, false);
        mod.EnableWorldIconText(this.bombPositionWorldIcon, false);
    }
    static Reset() {
        mod.StopSound(alarmSFX);
        this.isPlanted = false;
        this.isPlanting = false;
        this.isAtA = false;
        this.isAtB = false;
        this.defusingProgress = 0;
        this.plantProgress = 0;
        this.defusingPlayer = null;
        if (this.isBeingCarried) {
            if (this.carryingPlayer != null)
                this.ItemDropped(this.carryingPlayer);
            else
                this.ItemDropped();
        }
    }
    static ItemProximityCheck() {
        // this implementation will potentially mess up when multiple players enter the pickup range in quicker succession than the tick, should probably have a failsafe
        if (!this.isBeingCarried && this.canBePickedUp) {
            const player = mod.ClosestPlayerTo(this.currentWorldIconPos, attackingTeam);
            let pos;
            if (mod.IsPlayerValid(player) && !mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier) && mod.GetSoldierState(player, mod.SoldierStateBool.IsAlive)) {
                pos = mod.GetSoldierState(player, mod.SoldierStateVector.GetPosition);
                const playerPos = pos;
                const distance = mod.DistanceBetween(this.currentWorldIconPos, playerPos);
                if (distance <= bombPickupDistance) {
                    this.ItemPickedUp(player);
                }
            }
        }
    }
    static ItemPickedUp(player) {
        this.isBeingCarried = true;
        this.isAtA = false;
        this.isAtB = false;
        this.carryingPlayer = player;
        mod.AddUIIcon(this.carryingPlayer, mod.WorldIconImages.Bomb, 2.0, mod.CreateVector(0, 1, 0.1), mod.Message("Bomb"), mod.GetTeam(this.carryingPlayer));
        mod.EnableWorldIconImage(this.bombPositionWorldIcon, false);
        mod.EnableWorldIconText(this.bombPositionWorldIcon, false);
        console.log("Bomb model ID is ", this.bombModel);
        if (this.bombModel != null) {
            mod.UnspawnObject(this.bombModel);
        }
        console.log("Bomb has been picked up");
        mod.EnableInputRestriction(player, mod.RestrictedInputs.Interact, false);
        // Message all Teammates
        JsPlayer.playerInstances.forEach(playerInst => {
            if (mod.GetObjId(mod.GetTeam(player)) == mod.GetObjId(mod.GetTeam(playerInst))) {
                let jsPlayer = JsPlayer.get(playerInst);
                if (jsPlayer) {
                    MessagePlayer(jsPlayer, MakeMessage(mod.stringkeys.bombPickedUp), WHITECOLOR);
                    if (mod.GetObjId(player) == mod.GetObjId(playerInst)) {
                        jsPlayer.hasBombIndicator?.open();
                        jsPlayer.dropBombIndicator?.open();
                    }
                }
            }
        });
    }
    static ItemHeld() {
        if (!this.isBeingCarried || this.isPlanted)
            return;
        if (this.carryingPlayer && mod.IsPlayerValid(this.carryingPlayer) && mod.GetSoldierState(this.carryingPlayer, mod.SoldierStateBool.IsAlive)) {
            this.lastCarryingPlayerPos = mod.GetSoldierState(this.carryingPlayer, mod.SoldierStateVector.GetPosition);
        }
    }
    static BombPlanted() {
        if (!this.isPlanted || roundEnded || !roundStarted)
            return;
        this.countDown -= 1;
        if (this.countDown <= 0) {
            mod.StopSound(alarmSFX);
            ExplodeFeedback(this.isAtA ? MCOMPositionA : MCOMPositionB);
            console.log("Explode Bomb!");
            MessageAllUI(MakeMessage(mod.stringkeys.bombExploded), WHITECOLOR);
            EndRound(attackingTeam);
        }
    }
    static ItemDropped(player) {
        this.isBeingCarried = false;
        this.isAtA = false;
        this.isAtB = false;
        this.currentWorldIconPos = mod.Add(this.lastCarryingPlayerPos, mod.CreateVector(0, 1.5, 0));
        this.carryingPlayer = null;
        mod.EnableWorldIconImage(this.bombPositionWorldIcon, true);
        mod.EnableWorldIconText(this.bombPositionWorldIcon, true);
        if (player) {
            mod.EnableInputRestriction(player, mod.RestrictedInputs.Interact, true);
            let jsPlayer = JsPlayer.get(player);
            if (jsPlayer) {
                jsPlayer.dropBombIndicator?.close();
                jsPlayer.hasBombIndicator?.close();
            }
            mod.RemoveUIIcon(player);
        }
        mod.SetWorldIconPosition(this.bombPositionWorldIcon, this.currentWorldIconPos);
        if (this.bombModel != null) {
            mod.UnspawnObject(this.bombModel);
        }
        this.bombModel = mod.SpawnObject(mod.RuntimeSpawn_Capstone.RetroBoomBox_01, mod.Add(this.lastCarryingPlayerPos, mod.CreateVector(0, 0.25, 0)), ZEROVEC);
        console.log("Bomb Dropped");
        MessageAllUI(MakeMessage(mod.stringkeys.bombDropped, player), REDCOLOR);
        console.log("Bomb World Icon should be at position: ", mod.XComponentOf(this.currentWorldIconPos), " ", mod.YComponentOf(this.currentWorldIconPos), " ", mod.ZComponentOf(this.currentWorldIconPos));
        BombDropTimer();
    }
    static PlantBomb() {
        console.log("Bomb is planted");
        roundTime = MCOMFuseTime;
        this.plantProgress = 0;
        this.isPlanting = false;
        if (this.carryingPlayer)
            mod.RemoveUIIcon(this.carryingPlayer);
        if (this.carryingPlayer != null) {
            mod.EnableInputRestriction(this.carryingPlayer, mod.RestrictedInputs.Interact, true);
            let jsPlayer = JsPlayer.get(this.carryingPlayer);
            if (jsPlayer) {
                jsPlayer.dropBombIndicator?.close();
                jsPlayer.hasBombIndicator?.close();
                jsPlayer.progressBarUI?.close();
            }
        }
        else
            console.log("Bomb was Planted but had no carrying player. This should not be possible.");
        HideAllMessageUI();
        if (BombData.isAtA) {
            console.log("Bomb planted at B feedback");
            MessageAllUI(MakeMessage(mod.stringkeys.aArmed), REDCOLOR);
            mod.EnableInteractPoint(interactPointB, false);
            mod.EnableWorldIconImage(worldIconB, false);
            mod.EnableWorldIconText(worldIconB, false);
            const above = mod.Add(MCOMPositionA, mod.Multiply(mod.UpVector(), 2.1));
            mod.PlaySound(alarmSFX, 1, above, 100);
        }
        else if (BombData.isAtB) {
            console.log("Bomb planted at A feedback");
            MessageAllUI(MakeMessage(mod.stringkeys.bArmed), REDCOLOR);
            mod.EnableInteractPoint(interactPointA, false);
            mod.EnableWorldIconImage(worldIconA, false);
            mod.EnableWorldIconText(worldIconA, false);
            const above = mod.Add(MCOMPositionB, mod.Multiply(mod.UpVector(), 2.1));
            mod.PlaySound(alarmSFX, 1, above, 100);
        }
        else {
            console.log("Bomb is at neither A nor B when planted! This should not be possible.");
        }
        this.countDown = MCOMFuseTime;
        this.isBeingCarried = false;
        this.isPlanted = true;
        this.carryingPlayer = null;
        this.canBePickedUp = false;
        mod.EnableWorldIconImage(this.bombPositionWorldIcon, false);
        mod.EnableWorldIconText(this.bombPositionWorldIcon, false);
        // Reward the team
        JsPlayer.playerInstances.forEach(player => {
            if (mod.GetObjId(mod.GetTeam(player)) == mod.GetObjId(attackingTeam)) {
                let jsPlayer = JsPlayer.get(player);
                if (jsPlayer) {
                    jsPlayer.cash += plantReward;
                    jsPlayer.updateWalletUI();
                }
            }
        });
    }
    static DefuseBomb() {
        MessageAllUI(MakeMessage(mod.stringkeys.bombDefused), WHITECOLOR);
        console.log("Bomb is defused!");
        // Reward the team
        JsPlayer.playerInstances.forEach(player => {
            if (mod.GetObjId(mod.GetTeam(player)) == mod.GetObjId(defendingTeam)) {
                let jsPlayer = JsPlayer.get(player);
                if (jsPlayer) {
                    jsPlayer.cash += defuseReward;
                    jsPlayer.updateWalletUI();
                }
            }
        });
        if (this.defusingPlayer) {
            let jsPlayer = JsPlayer.get(this.defusingPlayer);
            if (jsPlayer) {
                jsPlayer.progressBarUI?.close();
            }
        }
        mod.StopSound(alarmSFX);
        this.defusingPlayer = null;
        this.isPlanted = false;
        this.defusingProgress = 0;
        EndRound(defendingTeam);
    }
    static CancelDefuse() {
        console.log("Bomb Defusing Cancelled");
        if (this.defusingPlayer != null) {
            let jsPlayer = JsPlayer.get(this.defusingPlayer);
            if (jsPlayer) {
                jsPlayer.progressBarUI?.close();
            }
        }
        this.defusingPlayer = null;
        this.defusingProgress = 0;
    }
    static CancelPlant() {
        console.log("Bomb Planting Cancelled");
        BombData.isAtA = false;
        BombData.isAtB = false;
        BombData.plantProgress = 0;
        BombData.isPlanting = false;
        if (this.carryingPlayer != null) {
            let jsPlayer = JsPlayer.get(this.carryingPlayer);
            if (jsPlayer) {
                jsPlayer.progressBarUI?.close();
            }
        }
    }
}
BombData.currentWorldIconPos = mod.CreateVector(0, 0, 0);
BombData.lastCarryingPlayerPos = mod.CreateVector(0, 0, 0);
BombData.isAtA = false;
BombData.isAtB = false;
BombData.isPlanting = false;
BombData.plantProgress = 0;
BombData.countDown = 60;
BombData.defusingProgress = 0;
BombData.isBeingCarried = false;
BombData.isPlanted = false;
BombData.canBePickedUp = true;
BombData.bombModel = null;
async function BombDropTimer() {
    BombData.canBePickedUp = false;
    await mod.Wait(3);
    BombData.canBePickedUp = true;
}
//-----------------------------------------------------------------------------------------------//
class StoreItemData {
    constructor(params) {
        this.cost = 1;
        this.bonusDamage = 0;
        this.bonusHealth = 0;
        const fields = this;
        for (const id in params)
            fields[id] = params[id];
    }
    canAffordIt(jsPlayer, itemData) {
        return jsPlayer.cash >= itemData.cost;
    }
    // return null if unlocked, or a String or mod.Message with the locked reason
    getDisabledMessageCallback(jsPlayer, itemData) {
        if (itemData.inventoryPerRound > 0) {
            let buysThisRound = jsPlayer.itemBuysPerRound[itemData.id];
            if (buysThisRound >= itemData.inventoryPerRound)
                return mod.stringkeys.outOfInventory;
        }
        return null;
    }
    onBuyCallback(jsPlayer, itemData) {
        jsPlayer.cash -= itemData.cost;
        jsPlayer.updateWalletUI();
        //console.log("Make Player " + mod.GetObjId(jsPlayer.player) + " buy: " + itemData.id);
    }
}
class StoreItemDataWeapon extends StoreItemData {
    onBuyCallback(jsPlayer, itemData) {
        jsPlayer.cash -= itemData.cost;
        jsPlayer.updateWalletUI();
        ////////// Can't do any of this for launch because of the Loot Spawner //////////
        // if (itemData.weapon in mod.Weapons && mod.IsInventorySlotActive(jsPlayer.player, mod.InventorySlots.PrimaryWeapon)) {
        //     for (let i = 0; i < Object.keys(mod.PrimaryWeapons).length; ++i) {
        //         if (mod.HasInventory(jsPlayer.player, i)) {
        //             let lootSpawner: mod.LootSpawner = mod.SpawnObject(mod.RuntimeSpawn_Common.LootSpawner, mod.GetSoldierState(jsPlayer.player, mod.SoldierStateVector.GetPosition), ZEROVEC, ONEVEC);
        //             mod.SpawnLoot(lootSpawner, i);
        //             mod.UnspawnObject(lootSpawner);
        //             break;
        //         }
        //     }
        // }
        // else if (itemData.weapon in mod.SecondaryWeapons && mod.IsInventorySlotActive(jsPlayer.player, mod.InventorySlots.SecondaryWeapon)) {
        //     for (let i = 0; i < Object.keys(mod.SecondaryWeapons).length; ++i) {
        //         if (mod.HasInventory(jsPlayer.player, i)) {
        //             let lootSpawner: mod.LootSpawner = mod.SpawnObject(mod.RuntimeSpawn_Common.LootSpawner, mod.GetSoldierState(jsPlayer.player, mod.SoldierStateVector.GetPosition), ZEROVEC, ONEVEC);
        //             mod.SpawnLoot(lootSpawner, i);
        //             mod.UnspawnObject(lootSpawner);
        //             break;
        //         }
        //     }
        // }
        if (itemData.weaponPackage != null) {
            console.log("removing and adding new equipment");
            //mod.RemoveEquipment(jsPlayer.player, mod.InventorySlots.PrimaryWeapon)
            mod.AddEquipment(jsPlayer.player, itemData.weapon, itemData.weaponPackage);
        }
        else {
            mod.AddEquipment(jsPlayer.player, itemData.weapon);
        }
    }
}
class StoreItemDataGadget extends StoreItemData {
    onBuyCallback(jsPlayer, itemData) {
        jsPlayer.cash -= itemData.cost;
        jsPlayer.updateWalletUI();
        // if (mod.IsInventorySlotActive(jsPlayer.player, mod.InventorySlots.GadgetOne)) {
        //     if (mod.IsInventorySlotActive(jsPlayer.player, mod.InventorySlots.GadgetTwo)) {
        //         ////////// Can't do any of this for launch because of the Loot Spawner //////////
        //         // No open gadget slots, drop gadget 2
        //         // for (let i = 0; i < Object.keys(mod.Gadgets).length; ++i) {
        //         //     if (mod.HasInventory(jsPlayer.player, i)) {
        //         //         let lootSpawner: mod.LootSpawner = mod.SpawnObject(mod.RuntimeSpawn_Common.LootSpawner, mod.GetSoldierState(jsPlayer.player, mod.SoldierStateVector.GetPosition), ZEROVEC, ONEVEC);
        //         //         mod.SpawnLoot(lootSpawner, i);
        //         //         mod.UnspawnObject(lootSpawner);
        //         //         break;
        //         //     }
        //         // }
        //         mod.AddEquipment(jsPlayer.player, itemData.weapon, mod.InventorySlots.GadgetTwo);
        //     }
        //     else {
        //         // Gadget slot 2 is clear
        //         mod.AddEquipment(jsPlayer.player, itemData.weapon, mod.InventorySlots.GadgetTwo);
        //     }
        // }
        // else {
        //     // Gadget slots are clear
        //     mod.AddEquipment(jsPlayer.player, itemData.weapon, mod.InventorySlots.GadgetOne);
        // }
        mod.AddEquipment(jsPlayer.player, itemData.weapon);
    }
}
//// - Assault Rifle Weapon Packages - ////
let assaultRiflePackage_Basic = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, assaultRiflePackage_Basic);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, assaultRiflePackage_Basic);
let assaultRiflePackage_Standard = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, assaultRiflePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_1p87_150x, assaultRiflePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, assaultRiflePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Compensated_Brake, assaultRiflePackage_Standard);
let assaultRiflePackage_Elite = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Fast_Mag, assaultRiflePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_R4T_200x, assaultRiflePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Full_Angled, assaultRiflePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Tungsten_Core, assaultRiflePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Standard_Suppressor, assaultRiflePackage_Elite);
let assaultRiflePackage_Basic_B36A4 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, assaultRiflePackage_Basic_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, assaultRiflePackage_Basic_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_480mm_Factory, assaultRiflePackage_Basic_B36A4);
let assaultRiflePackage_Standard_B36A4 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, assaultRiflePackage_Standard_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_1p87_150x, assaultRiflePackage_Standard_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, assaultRiflePackage_Standard_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Compensated_Brake, assaultRiflePackage_Standard_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_480mm_Factory, assaultRiflePackage_Standard_B36A4);
let assaultRiflePackage_Elite_B36A4 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Fast_Mag, assaultRiflePackage_Elite_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_R4T_200x, assaultRiflePackage_Elite_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Full_Angled, assaultRiflePackage_Elite_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Tungsten_Core, assaultRiflePackage_Elite_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Standard_Suppressor, assaultRiflePackage_Elite_B36A4);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_480mm_Factory, assaultRiflePackage_Elite_B36A4);
//// - Carbine Weapon Packages - ////
let carbinePackage_Basic = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Magazine, carbinePackage_Basic);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, carbinePackage_Basic);
let carbinePackage_Standard = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Magazine, carbinePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_CCO_200x, carbinePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Vertical, carbinePackage_Standard);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Compensated_Brake, carbinePackage_Standard);
let carbinePackage_Elite = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Fast_Mag, carbinePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_ST_Prisim_500x, carbinePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Ribbed_Vertical, carbinePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Tungsten_Core, carbinePackage_Elite);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Standard_Suppressor, carbinePackage_Elite);
let carbinePackage_Basic_M4A1 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, carbinePackage_Basic_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, carbinePackage_Basic_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_145_Carbine, carbinePackage_Basic_M4A1);
let carbinePackage_Standard_M4A1 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Fast_Mag, carbinePackage_Standard_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_1p87_150x, carbinePackage_Standard_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, carbinePackage_Standard_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Compensated_Brake, carbinePackage_Standard_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_145_Carbine, carbinePackage_Standard_M4A1);
let carbinePackage_Elite_M4A1 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_40rnd_Fast_Mag, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_R4T_200x, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Ribbed_Vertical, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Tungsten_Core, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Lightened_Suppressor, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_115_Commando, carbinePackage_Elite_M4A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ergonomic_Improved_Mag_Catch, carbinePackage_Elite_M4A1);
//// - PDW Weapon Packages - ////
let PDWPackage_Basic_SMG_PW7A2 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Magazine, PDWPackage_Basic_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, PDWPackage_Basic_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_180mm_Standard, PDWPackage_Basic_SMG_PW7A2);
let PDWPackage_Standard_SMG_PW7A2 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_30rnd_Magazine, PDWPackage_Standard_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Mini_Flex_100x, PDWPackage_Standard_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Compact_Handstop, PDWPackage_Standard_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_180mm_Standard, PDWPackage_Standard_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Right_5_mW_Red, PDWPackage_Standard_SMG_PW7A2);
let PDWPackage_Elite_SMG_PW7A2 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_40rnd_Magazine, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_SU_231_150x, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Folding_Vertical, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_CQB_Suppressor, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_180mm_Prototype, PDWPackage_Elite_SMG_PW7A2);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Right_5_mW_Red, PDWPackage_Elite_SMG_PW7A2);
//// - DMR Weapon Packages - ////
let DMRPackage_Basic_SVDM = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_10rnd_Magazine, DMRPackage_Basic_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Baker_300x, DMRPackage_Basic_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_550mm_Factory, DMRPackage_Basic_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Flash_Hider, DMRPackage_Basic_SVDM);
let DMRPackage_Standard_SVDM = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_10rnd_Fast_Mag, DMRPackage_Standard_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_LDS_450x, DMRPackage_Standard_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_6H64_Vertical, DMRPackage_Standard_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_550mm_Factory, DMRPackage_Standard_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Flash_Hider, DMRPackage_Standard_SVDM);
let DMRPackage_Elite_SVDM = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Magazine, DMRPackage_Elite_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_PAS_35_300x, DMRPackage_Elite_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Bipod, DMRPackage_Elite_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, DMRPackage_Elite_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Long_Suppressor, DMRPackage_Elite_SVDM);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_620mm_Classic, DMRPackage_Elite_SVDM);
//// - Sniper Weapon Packages - ////
let SniperPackage_Basic_M2010ESR = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_5rnd_Magazine, SniperPackage_Basic_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_LDS_450x, SniperPackage_Basic_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, SniperPackage_Basic_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_24_Full, SniperPackage_Basic_M2010ESR);
let SniperPackage_Standard_SV_98 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SniperPackage_Standard_SV_98);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_LDS_450x, SniperPackage_Standard_SV_98);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_650mm_Factory, SniperPackage_Standard_SV_98);
let SniperPackage_Standard_M2010ESR = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_5rnd_Fast_Mag, SniperPackage_Standard_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_SSDS_600x, SniperPackage_Standard_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Bipod, SniperPackage_Standard_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_24_Full, SniperPackage_Standard_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Flash_Hider, SniperPackage_Standard_M2010ESR);
let SniperPackage_Elite_M2010ESR = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_8rnd_Magazine, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_NFX_800x, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Bipod, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Match_Grade, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Long_Suppressor, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_26_Carbon, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Left_Range_Finder, SniperPackage_Elite_M2010ESR);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ergonomic_DLC_Bolt, SniperPackage_Elite_M2010ESR);
//// - LMG Weapon Packages - ////
let LMGPackage_Basic = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, LMGPackage_Basic);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, LMGPackage_Basic);
let LMGPackage_Basic_M240L = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_50rnd_Loose_Belt, LMGPackage_Basic_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, LMGPackage_Basic_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Classic_Grip_Pod, LMGPackage_Basic_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_20_Lima, LMGPackage_Basic_M240L);
let LMGPackage_Standard_M240L = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_75rnd_Belt_Box, LMGPackage_Standard_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_BF_2M_250x, LMGPackage_Standard_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Ribbed_Vertical, LMGPackage_Standard_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_20_Lima, LMGPackage_Standard_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Flash_Hider, LMGPackage_Standard_M240L);
let LMGPackage_Elite_M240L = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_100rnd_Belt_Box, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_LDS_450x, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Bipod, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Tungsten_Core, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_Linear_Comp, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_24_Bravo, LMGPackage_Elite_M240L);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Right_120_mW_Blue, LMGPackage_Elite_M240L);
//// - Shotgun Weapon Packages - ////
let ShotgunPackage_Basic = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, ShotgunPackage_Basic);
let ShotgunPackage_Basic_185KS_K = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_4rnd_Magazine, ShotgunPackage_Basic_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, ShotgunPackage_Basic_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_430mm_Factory, ShotgunPackage_Basic_185KS_K);
let ShotgunPackage_Standard_185KS_K = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_4rnd_Fast_Mag, ShotgunPackage_Standard_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Mini_Flex_100x, ShotgunPackage_Standard_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Flechette, ShotgunPackage_Standard_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Folding_Stubby, ShotgunPackage_Standard_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_430mm_Factory, ShotgunPackage_Standard_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Right_5_mW_Red, ShotgunPackage_Standard_185KS_K);
let ShotgunPackage_Elite_185KS_K = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_8rnd_Fast_Mag, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_SU_231_150x, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Bottom_Ribbed_Vertical, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_Slugs, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Muzzle_CQB_Suppressor, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_430mm_Cut, ShotgunPackage_Elite_185KS_K);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Right_120_mW_Blue, ShotgunPackage_Elite_185KS_K);
//// - Pistol Weapon Packages - ////
let SidearmPackage_Standard_ES_57 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SidearmPackage_Standard_ES_57);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_122mm_Factory, SidearmPackage_Standard_ES_57);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_20rnd_Magazine, SidearmPackage_Standard_ES_57);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, SidearmPackage_Standard_ES_57);
let SidearmPackage_Standard_M44 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SidearmPackage_Standard_M44);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, SidearmPackage_Standard_M44);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_675_Factory, SidearmPackage_Standard_M44);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_6rnd_Speedloader, SidearmPackage_Standard_M44);
let SidearmPackage_Standard_M45A1 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SidearmPackage_Standard_M45A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Scope_Iron_Sights, SidearmPackage_Standard_M45A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_5_Factory, SidearmPackage_Standard_M45A1);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_11rnd_Magazine, SidearmPackage_Standard_M45A1);
let SidearmPackage_Standard_P18 = mod.CreateNewWeaponPackage();
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SidearmPackage_Standard_P18);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Ammo_FMJ, SidearmPackage_Standard_P18);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Magazine_17rnd_Magazine, SidearmPackage_Standard_P18);
mod.AddAttachmentToWeaponPackage(mod.WeaponAttachments.Barrel_39_Factory, SidearmPackage_Standard_P18);
//-----------------------------------------------------------------------------------------------//
const cStoreData = [
    {
        tabName: mod.stringkeys.store.riflestab,
        tabRandomized: false,
        itemDatas: [
            new StoreItemDataWeapon({
                id: "gun_M4A1",
                name: mod.stringkeys.store.rifle1_1,
                cost: 2400,
                weapon: mod.Weapons.Carbine_M4A1,
                weaponPackage: carbinePackage_Basic_M4A1
            }),
            new StoreItemDataWeapon({
                id: "gun_AK4D",
                name: mod.stringkeys.store.rifle1_2,
                cost: 2400,
                weapon: mod.Weapons.Carbine_AK_205,
                weaponPackage: carbinePackage_Basic
            }),
            new StoreItemDataWeapon({
                id: "gun_KORD_6P67",
                name: mod.stringkeys.store.rifle3,
                cost: 2000,
                weapon: mod.Weapons.AssaultRifle_KORD_6P67,
                weaponPackage: assaultRiflePackage_Basic
            }),
            new StoreItemDataWeapon({
                id: "gun_TR-7",
                name: mod.stringkeys.store.rifle4,
                cost: 3000,
                weapon: mod.Weapons.AssaultRifle_TR_7,
                weaponPackage: assaultRiflePackage_Basic
            }),
            new StoreItemDataWeapon({
                id: "gun_M2010",
                name: mod.stringkeys.store.rifle5,
                cost: 3500,
                weapon: mod.Weapons.Sniper_M2010_ESR,
                weaponPackage: SniperPackage_Elite_M2010ESR
            }),
            new StoreItemDataWeapon({
                id: "gun_SV98",
                name: mod.stringkeys.store.rifle6,
                cost: 4000,
                weapon: mod.Weapons.Sniper_SV_98,
                weaponPackage: SniperPackage_Standard_SV_98
            })
        ]
    }, {
        tabName: mod.stringkeys.store.pistolstab,
        tabRandomized: false,
        itemDatas: [
            new StoreItemDataWeapon({
                id: "gun_P18",
                name: mod.stringkeys.store.pistol1_1,
                cost: 200,
                weapon: mod.Weapons.Sidearm_P18,
                weaponPackage: SidearmPackage_Standard_P18
            }),
            new StoreItemDataWeapon({
                id: "gun_m45a1",
                name: mod.stringkeys.store.pistol2,
                cost: 300,
                weapon: mod.Weapons.Sidearm_M45A1,
                weaponPackage: SidearmPackage_Standard_M45A1
            }),
            new StoreItemDataWeapon({
                id: "gun_es5.7",
                name: mod.stringkeys.store.pistol3,
                cost: 500,
                weapon: mod.Weapons.Sidearm_ES_57,
                weaponPackage: SidearmPackage_Standard_ES_57
            }),
            new StoreItemDataWeapon({
                id: "gun_m44",
                name: mod.stringkeys.store.pistol4,
                cost: 800,
                weapon: mod.Weapons.Sidearm_M44,
                weaponPackage: SidearmPackage_Standard_M44
            })
        ]
    }, {
        tabName: mod.stringkeys.store.shotgunstab,
        tabRandomized: false,
        itemDatas: [
            new StoreItemDataWeapon({
                id: "gun_m7a1",
                name: mod.stringkeys.store.shotgun1,
                cost: 1100,
                weapon: mod.Weapons.Shotgun_M87A1,
                weaponPackage: ShotgunPackage_Basic
            }),
            new StoreItemDataWeapon({
                id: "gun_m1014",
                name: mod.stringkeys.store.shotgun3,
                cost: 1800,
                weapon: mod.Weapons.Shotgun_M1014,
                weaponPackage: ShotgunPackage_Basic
            })
        ]
    }, {
        tabName: mod.stringkeys.store.grenadestab,
        tabRandomized: false,
        itemDatas: [
            new StoreItemDataGadget({
                id: "grenade_exlosive",
                name: mod.stringkeys.store.grenade1,
                cost: 1000,
                weapon: mod.Gadgets.Throwable_Mini_Frag_Grenade
            }),
            new StoreItemDataGadget({
                id: "grenade_incendiary",
                name: mod.stringkeys.store.grenade2,
                cost: 500,
                weapon: mod.Gadgets.Throwable_Incendiary_Grenade
            }),
            new StoreItemDataGadget({
                id: "grenade_smoke",
                name: mod.stringkeys.store.grenade3,
                cost: 200,
                weapon: mod.Gadgets.Throwable_Smoke_Grenade
            }),
            new StoreItemDataGadget({
                id: "grenade_flash",
                name: mod.stringkeys.store.grenade4,
                cost: 150,
                weapon: mod.Gadgets.Throwable_Flash_Grenade
            }),
        ]
    }, {
        tabName: mod.stringkeys.store.specialstab,
        tabRandomized: false,
        itemDatas: [
            new StoreItemDataWeapon({
                id: "gun_l110",
                name: mod.stringkeys.store.special1,
                cost: 3000,
                weapon: mod.Weapons.LMG_L110,
                weaponPackage: LMGPackage_Basic
            }),
            new StoreItemDataWeapon({
                id: "gun_kts100_mk8",
                name: mod.stringkeys.store.special2,
                cost: 3600,
                weapon: mod.Weapons.LMG_KTS100_MK8,
                weaponPackage: LMGPackage_Basic
            }),
            new StoreItemDataGadget({
                id: "special_rpg7",
                name: mod.stringkeys.store.special4,
                cost: 2000,
                weapon: mod.Gadgets.Launcher_Unguided_Rocket
            }),
            new StoreItemDataGadget({
                id: "special_defibrillator",
                name: mod.stringkeys.store.special5,
                cost: 1000,
                weapon: mod.Gadgets.Misc_Defibrillator
            }),
        ]
    }
];
function getTabIndexForItemData(itemData) {
    for (let i = 0; i < cStoreData.length; i++) {
        for (let j = 0; j < cStoreData[i].itemDatas.length; j++) {
            if (cStoreData[i].itemDatas[j] == itemData)
                return i;
        }
    }
    return -1;
}
//-----------------------------------------------------------------------------------------------//
class Store {
    constructor(jsPlayer, storeData) {
        _Store_instances.add(this);
        _Store_jsPlayer.set(this, void 0);
        _Store_storeData.set(this, void 0);
        _Store_rootWidget.set(this, void 0);
        _Store_storeWidth.set(this, 1200);
        _Store_storeHeight.set(this, 600);
        _Store_headerHeight.set(this, 60);
        _Store_tabHeight.set(this, 50);
        _Store_tabSpacing.set(this, 10);
        _Store_tabNamePrefix.set(this, "__tab");
        _Store_currentTabIndex.set(this, 0);
        _Store_activeTabBgColor.set(this, [0.44, 0.42, 0.4]);
        _Store_inactiveTabBgColor.set(this, [0.34, 0.32, 0.3]);
        _Store_itemSize.set(this, 250);
        _Store_itemSizeH.set(this, 250);
        _Store_itemSizeV.set(this, 166);
        _Store_itemSpacingHorizontal.set(this, 20);
        _Store_itemSpacingVertical.set(this, 20);
        _Store_closeButtonName.set(this, "__close");
        _Store_tabWidgets.set(this, []); // UIWidgets, in order by cStoreData[]
        _Store_itemButtons.set(this, {}); // ItemButton objects, keyed by itemDatas.id
        _Store_isStoreVisible.set(this, false);
        __classPrivateFieldSet(this, _Store_jsPlayer, jsPlayer, "f");
        __classPrivateFieldSet(this, _Store_storeData, storeData, "f");
    }
    open() {
        if (!__classPrivateFieldGet(this, _Store_rootWidget, "f")) {
            console.log("Open shop UI for ", __classPrivateFieldGet(this, _Store_jsPlayer, "f").player, " with ID: ", __classPrivateFieldGet(this, _Store_jsPlayer, "f").playerId);
            __classPrivateFieldGet(this, _Store_instances, "m", _Store_create).call(this);
        }
        if (!__classPrivateFieldGet(this, _Store_rootWidget, "f"))
            return;
        this.refresh();
        mod.EnableUIInputMode(true, __classPrivateFieldGet(this, _Store_jsPlayer, "f").player);
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _Store_rootWidget, "f"), true);
        __classPrivateFieldSet(this, _Store_isStoreVisible, true, "f");
        __classPrivateFieldGet(this, _Store_jsPlayer, "f").updateWalletUI();
    }
    close() {
        mod.EnableUIInputMode(false, __classPrivateFieldGet(this, _Store_jsPlayer, "f").player);
        if (__classPrivateFieldGet(this, _Store_rootWidget, "f")) {
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _Store_rootWidget, "f"), false);
            __classPrivateFieldSet(this, _Store_isStoreVisible, false, "f");
        }
        else {
            console.log("Store not yet opened for this player.");
        }
    }
    isOpen() {
        return __classPrivateFieldGet(this, _Store_isStoreVisible, "f");
    }
    onUIButtonEvent(widget, event) {
        let widgetName = mod.GetUIWidgetName(widget);
        //console.log("Clicked on ", widgetName);
        // click on a tab?
        if (widgetName.slice(0, __classPrivateFieldGet(this, _Store_tabNamePrefix, "f").length) == __classPrivateFieldGet(this, _Store_tabNamePrefix, "f")) {
            //mod.TriggerAudio( mod.SoundEvents2D.ShowObjective, this.#jsPlayer.player);
            let tabIndex = parseInt(widgetName.slice(__classPrivateFieldGet(this, _Store_tabNamePrefix, "f").length));
            this.selectTab(tabIndex);
        }
        // close button?
        if (widgetName == __classPrivateFieldGet(this, _Store_closeButtonName, "f")) {
            //mod.TriggerAudio( mod.SoundEvents2D.ObjectiveCappingStop, this.#jsPlayer.player);
            this.close();
            //tell everyone you closed your store. 
        }
        // click on a store item:
        if (__classPrivateFieldGet(this, _Store_itemButtons, "f").hasOwnProperty(widgetName)) {
            //mod.TriggerAudio( mod.SoundEvents2D.ObjectiveCappingComplete, this.#jsPlayer.player);
            // call the buy callback:
            let itemData = __classPrivateFieldGet(this, _Store_itemButtons, "f")[widgetName].itemData;
            itemData.onBuyCallback?.(__classPrivateFieldGet(this, _Store_jsPlayer, "f"), itemData);
            __classPrivateFieldGet(this, _Store_jsPlayer, "f").itemBuysPerRound[itemData.id] = (__classPrivateFieldGet(this, _Store_jsPlayer, "f").itemBuysPerRound[itemData.id] || 0) + 1;
            this.refresh();
            __classPrivateFieldGet(this, _Store_jsPlayer, "f").player;
            mod.SetScoreboardPlayerValues(__classPrivateFieldGet(this, _Store_jsPlayer, "f").player, __classPrivateFieldGet(this, _Store_jsPlayer, "f").kills, __classPrivateFieldGet(this, _Store_jsPlayer, "f").deaths, __classPrivateFieldGet(this, _Store_jsPlayer, "f").totalCashEarned, __classPrivateFieldGet(this, _Store_jsPlayer, "f").totalCashEarned - __classPrivateFieldGet(this, _Store_jsPlayer, "f").cash + initialCash, 0);
        }
    }
    selectTab(tabIndex) {
        if (tabIndex < 0 || tabIndex >= __classPrivateFieldGet(this, _Store_tabWidgets, "f").length || tabIndex == __classPrivateFieldGet(this, _Store_currentTabIndex, "f")) {
            console.log("TabIndex is invalid ", tabIndex, " There are ", __classPrivateFieldGet(this, _Store_tabWidgets, "f"), " tabs");
            return;
        }
        // turn off the old one:
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _Store_tabWidgets, "f")[__classPrivateFieldGet(this, _Store_currentTabIndex, "f")], false);
        // turn on the new one:
        __classPrivateFieldSet(this, _Store_currentTabIndex, tabIndex, "f");
        mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _Store_tabWidgets, "f")[__classPrivateFieldGet(this, _Store_currentTabIndex, "f")], true);
    }
    refresh() {
        if (__classPrivateFieldGet(this, _Store_rootWidget, "f")) {
            // refresh all store items:
            for (const id in __classPrivateFieldGet(this, _Store_itemButtons, "f")) {
                __classPrivateFieldGet(this, _Store_itemButtons, "f")[id].refresh();
            }
        }
        else {
            console.log("Store not yet opened for this player.");
        }
    }
    rerollTabItems(tabIndex) {
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_deleteTabItems).call(this, tabIndex);
        let tabData = __classPrivateFieldGet(this, _Store_storeData, "f")[tabIndex];
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_createItems).call(this, tabIndex, tabData.itemDatas, tabData.tabRandomized);
    }
    autoBuyRandom() {
        let itemKeys = Object.keys(__classPrivateFieldGet(this, _Store_itemButtons, "f"));
        let rnd = GetRandomInt(itemKeys.length);
        debugger;
        let itemData = __classPrivateFieldGet(this, _Store_itemButtons, "f")[itemKeys[rnd]].itemData;
        itemData.onBuyCallback?.(__classPrivateFieldGet(this, _Store_jsPlayer, "f"), itemData);
    }
}
_Store_jsPlayer = new WeakMap(), _Store_storeData = new WeakMap(), _Store_rootWidget = new WeakMap(), _Store_storeWidth = new WeakMap(), _Store_storeHeight = new WeakMap(), _Store_headerHeight = new WeakMap(), _Store_tabHeight = new WeakMap(), _Store_tabSpacing = new WeakMap(), _Store_tabNamePrefix = new WeakMap(), _Store_currentTabIndex = new WeakMap(), _Store_activeTabBgColor = new WeakMap(), _Store_inactiveTabBgColor = new WeakMap(), _Store_itemSize = new WeakMap(), _Store_itemSizeH = new WeakMap(), _Store_itemSizeV = new WeakMap(), _Store_itemSpacingHorizontal = new WeakMap(), _Store_itemSpacingVertical = new WeakMap(), _Store_closeButtonName = new WeakMap(), _Store_tabWidgets = new WeakMap(), _Store_itemButtons = new WeakMap(), _Store_isStoreVisible = new WeakMap(), _Store_instances = new WeakSet(), _Store_create = function _Store_create() {
    // background:
    __classPrivateFieldSet(this, _Store_rootWidget, ParseUI({
        type: "Container",
        size: [__classPrivateFieldGet(this, _Store_storeWidth, "f"), __classPrivateFieldGet(this, _Store_storeHeight, "f")],
        position: [0, 40],
        anchor: mod.UIAnchor.Center,
        bgFill: mod.UIBgFill.Solid,
        bgColor: __classPrivateFieldGet(this, _Store_activeTabBgColor, "f"),
        bgAlpha: 1,
        playerId: __classPrivateFieldGet(this, _Store_jsPlayer, "f").player,
        children: [{
                type: "Container",
                position: [0, -__classPrivateFieldGet(this, _Store_headerHeight, "f")],
                size: [__classPrivateFieldGet(this, _Store_storeWidth, "f"), __classPrivateFieldGet(this, _Store_headerHeight, "f")],
                anchor: mod.UIAnchor.TopLeft,
                bgFill: mod.UIBgFill.Solid,
                bgColor: [0.1, 0.1, 0.1],
                bgAlpha: 1
            }, {
                // close button:
                type: "Button",
                name: __classPrivateFieldGet(this, _Store_closeButtonName, "f"),
                size: [__classPrivateFieldGet(this, _Store_headerHeight, "f") - 16, __classPrivateFieldGet(this, _Store_headerHeight, "f") - 16],
                position: [8, 8 - __classPrivateFieldGet(this, _Store_headerHeight, "f")],
                anchor: mod.UIAnchor.TopRight,
                bgFill: mod.UIBgFill.Solid,
                bgColor: [1, 0.3, 0.3],
                bgAlpha: 1
            }, {
                // close button X:
                type: "Text",
                parent: __classPrivateFieldGet(this, _Store_closeButtonName, "f"),
                size: [__classPrivateFieldGet(this, _Store_headerHeight, "f") - 16, __classPrivateFieldGet(this, _Store_headerHeight, "f") - 16],
                position: [8, 8 - __classPrivateFieldGet(this, _Store_headerHeight, "f")],
                anchor: mod.UIAnchor.TopRight,
                bgFill: mod.UIBgFill.None,
                textAnchor: mod.UIAnchor.Center,
                textLabel: MakeMessage(mod.stringkeys.store.closeStore),
                textSize: 50
            }]
    }), "f");
    // tabs:
    __classPrivateFieldGet(this, _Store_instances, "m", _Store_createTabs).call(this);
}, _Store_createTabs = function _Store_createTabs() {
    // how many tabs are there?
    let tabDatas = __classPrivateFieldGet(this, _Store_storeData, "f");
    let tabCnt = tabDatas.length;
    // tab size, clamped if there's only a few tabs:
    let widthForTabs = __classPrivateFieldGet(this, _Store_storeWidth, "f") - __classPrivateFieldGet(this, _Store_tabSpacing, "f") * 2 - __classPrivateFieldGet(this, _Store_headerHeight, "f");
    let tabWidth = Math.min(250, widthForTabs / (tabCnt + 1));
    for (let a = 0; a < tabCnt; a++)
        __classPrivateFieldGet(this, _Store_instances, "m", _Store_createTab).call(this, a, tabWidth, tabDatas[a]);
}, _Store_createTab = function _Store_createTab(tabIndex, tabWidth, tabData) {
    //console.log("Create Tab ", tabIndex);
    let headerPosition = [__classPrivateFieldGet(this, _Store_tabSpacing, "f") + tabIndex * tabWidth, -__classPrivateFieldGet(this, _Store_tabHeight, "f")];
    let headerSize = [tabWidth - 10, __classPrivateFieldGet(this, _Store_tabHeight, "f")];
    // tab header bg.  not part of the tab / always shown:
    ParseUI({
        type: "Button",
        name: __classPrivateFieldGet(this, _Store_tabNamePrefix, "f") + tabIndex,
        parent: __classPrivateFieldGet(this, _Store_rootWidget, "f"),
        position: headerPosition,
        size: headerSize,
        anchor: mod.UIAnchor.TopLeft,
        bgFill: mod.UIBgFill.OutlineThick,
        bgColor: __classPrivateFieldGet(this, _Store_inactiveTabBgColor, "f"),
        //bgColor: [1,0,0],
        bgAlpha: 1
    });
    // tab container.  this is the part that turns on and off:
    let tabWidget = ParseUI({
        type: "Container",
        visible: (tabIndex == 0),
        parent: __classPrivateFieldGet(this, _Store_rootWidget, "f"),
        size: [__classPrivateFieldGet(this, _Store_storeWidth, "f"), __classPrivateFieldGet(this, _Store_headerHeight, "f")],
        bgFill: mod.UIBgFill.None,
        children: [
            {
                type: "Container",
                position: headerPosition,
                size: headerSize,
                bgFill: mod.UIBgFill.Solid,
                bgColor: __classPrivateFieldGet(this, _Store_activeTabBgColor, "f"),
                bgAlpha: 0.25
            }
        ]
    });
    if (!tabWidget)
        return;
    __classPrivateFieldGet(this, _Store_tabWidgets, "f").push(tabWidget);
    __classPrivateFieldGet(this, _Store_instances, "m", _Store_createItems).call(this, tabIndex, tabData.itemDatas, tabData.tabRandomized);
    // header label.  not part of the tab / always shown.  after the tab so it gets drawn on top.
    ParseUI({
        type: "Text",
        parent: __classPrivateFieldGet(this, _Store_rootWidget, "f"),
        position: headerPosition,
        size: headerSize,
        bgFill: mod.UIBgFill.None,
        textLabel: tabData.tabName,
        textSize: 30,
        textAnchor: mod.UIAnchor.Center,
        textColor: [1, 0.9, 0.8]
    });
}, _Store_createItems = function _Store_createItems(tabIndex, itemDatas, randomize) {
    let itemCount = itemDatas.length;
    let maxItems = 12;
    let selectedItems = [];
    if (itemCount < maxItems) {
        maxItems = itemCount;
    }
    let isItemFiltered = function (jsPlayer, itemData) {
        if (jsPlayer.isDeployed == false)
            return true;
        try {
            return itemData.hasOwnProperty("filter_weapon") && !mod.HasEquipment(jsPlayer.player, itemData.filter_weapon);
        }
        catch (e) {
            console.log("HasInventory exception: " + e);
            return true;
        }
        return false;
    };
    if (randomize == true) {
        let isItemRandomized = function (itemData) {
            return !itemData.hasOwnProperty("itemRandomized") || itemData.itemRandomized == true;
        };
        // get all the non-randomized items first:
        let nonRandomCount = 0;
        for (let itemIndex = 0; itemIndex < itemCount; ++itemIndex) {
            if (!isItemRandomized(itemDatas[itemIndex])) {
                __classPrivateFieldGet(this, _Store_instances, "m", _Store_createItem).call(this, tabIndex, itemDatas[itemIndex], itemIndex);
                nonRandomCount++;
            }
        }
        // add randomized items:
        for (let itemIndex = nonRandomCount; itemIndex < maxItems; ++itemIndex) {
            let randomItem = Math.floor(Math.random() * itemCount);
            if (selectedItems.includes(randomItem) || !isItemRandomized(itemDatas[randomItem])) {
                itemIndex--;
            }
            else {
                __classPrivateFieldGet(this, _Store_instances, "m", _Store_createItem).call(this, tabIndex, itemDatas[randomItem], itemIndex);
                selectedItems.push(randomItem);
            }
        }
    }
    else {
        //console.log("Create ", itemCount, " non-random items");
        let itemsCreated = 0;
        for (let itemIndex = 0; itemIndex < itemCount; ++itemIndex) {
            __classPrivateFieldGet(this, _Store_instances, "m", _Store_createItem).call(this, tabIndex, itemDatas[itemIndex], itemsCreated++);
            //console.log("Item Created")
        }
    }
}, _Store_createItem = function _Store_createItem(tabIndex, itemData, itemIndex) {
    let yi = Math.floor(itemIndex / 4);
    let xi = Math.floor(itemIndex % 4);
    let x = 50 + (1 + xi) * __classPrivateFieldGet(this, _Store_itemSpacingHorizontal, "f") + xi * __classPrivateFieldGet(this, _Store_itemSizeH, "f");
    let y = (1 + yi) * __classPrivateFieldGet(this, _Store_itemSpacingVertical, "f") + yi * __classPrivateFieldGet(this, _Store_itemSizeV, "f");
    let itemPos = [x, y];
    __classPrivateFieldGet(this, _Store_itemButtons, "f")[itemData.id] = new ItemButton(__classPrivateFieldGet(this, _Store_jsPlayer, "f"), __classPrivateFieldGet(this, _Store_tabWidgets, "f")[tabIndex], tabIndex, itemData, itemPos, __classPrivateFieldGet(this, _Store_itemSize, "f"), __classPrivateFieldGet(this, _Store_itemSizeH, "f"), __classPrivateFieldGet(this, _Store_itemSizeV, "f"));
}, _Store_deleteTabItems = function _Store_deleteTabItems(tabIndex) {
    for (const id in __classPrivateFieldGet(this, _Store_itemButtons, "f")) {
        if (__classPrivateFieldGet(this, _Store_itemButtons, "f")[id].tabIndex == tabIndex) {
            __classPrivateFieldGet(this, _Store_itemButtons, "f")[id].destroy();
            delete __classPrivateFieldGet(this, _Store_itemButtons, "f")[id];
        }
    }
};
//-----------------------------------------------------------------------------------------------//
class ItemButton {
    constructor(jsPlayer, parentWidget, tabIndex, itemData, position, itemSize, itemSizeH, itemSizeV) {
        _ItemButton_jsPlayer.set(this, void 0);
        _ItemButton_itemBgColor.set(this, [0.9, 0.6, 0.4]);
        _ItemButton_isDisabled.set(this, void 0);
        _ItemButton_widget.set(this, void 0);
        _ItemButton_widgetButton.set(this, void 0);
        _ItemButton_widgetCost.set(this, void 0);
        _ItemButton_widgetCostName.set(this, "__cost");
        _ItemButton_widgetDisabled.set(this, void 0);
        _ItemButton_widgetDisabledName.set(this, "__disabled");
        __classPrivateFieldSet(this, _ItemButton_jsPlayer, jsPlayer, "f");
        this.tabIndex = tabIndex;
        this.itemData = itemData;
        let size = [itemSizeH, itemSizeV];
        let disabledMsg = itemData.getDisabledMessageCallback?.(jsPlayer, itemData);
        __classPrivateFieldSet(this, _ItemButton_isDisabled, disabledMsg != null, "f");
        let canAffordIt = this.itemData.canAffordIt(__classPrivateFieldGet(this, _ItemButton_jsPlayer, "f"), this.itemData);
        __classPrivateFieldSet(this, _ItemButton_widget, ParseUI({
            type: "Container",
            parent: parentWidget,
            position: position,
            size: size,
            bgFill: mod.UIBgFill.None,
            playerID: jsPlayer.player,
            children: [
                {
                    type: "Button",
                    name: itemData.id,
                    size: size,
                    bgFill: mod.UIBgFill.Solid,
                    bgColor: __classPrivateFieldGet(this, _ItemButton_itemBgColor, "f"),
                    bgAlpha: 1,
                    buttonEnabled: !__classPrivateFieldGet(this, _ItemButton_isDisabled, "f") && canAffordIt
                }, {
                    type: "Text",
                    size: [itemSize, 100],
                    anchor: mod.UIAnchor.TopCenter,
                    bgFill: mod.UIBgFill.None,
                    textLabel: itemData.name,
                    textAnchor: mod.UIAnchor.TopCenter,
                    textSize: 20,
                }, {
                    type: "Text",
                    name: __classPrivateFieldGet(this, _ItemButton_widgetCostName, "f"),
                    anchor: mod.UIAnchor.BottomRight,
                    bgFill: mod.UIBgFill.None,
                    textLabel: MakeMessage(mod.stringkeys.store.costFmt, itemData.cost),
                    textAnchor: mod.UIAnchor.BottomRight,
                    textColor: canAffordIt ? [1, 1, 1] : [1, 0, 0],
                    textSize: 30,
                }, {
                    type: "Text",
                    name: __classPrivateFieldGet(this, _ItemButton_widgetDisabledName, "f"),
                    visible: __classPrivateFieldGet(this, _ItemButton_isDisabled, "f"),
                    size: size,
                    padding: 10,
                    bgFill: mod.UIBgFill.Solid,
                    bgColor: [0.25, 0.25, 0.25],
                    bgAlpha: 0.8,
                    textLabel: disabledMsg ?? mod.stringkeys.store.disabledMsg.locked,
                    textAnchor: mod.UIAnchor.TopCenter,
                    textSize: 30,
                    textAlpha: 1
                }
            ]
        }), "f");
        if (!__classPrivateFieldGet(this, _ItemButton_widget, "f"))
            return;
        if (itemData instanceof StoreItemDataWeapon) {
            console.log("Create Image for weapon: ", itemData.name);
            mod.AddUIWeaponImage(itemData.name, ZEROVEC, mod.CreateVector(size[0], size[1], 1), mod.UIAnchor.Center, itemData.weapon, __classPrivateFieldGet(this, _ItemButton_widget, "f"));
        }
        else if (itemData instanceof StoreItemDataGadget) {
            console.log("Create Image for Gadget: ", itemData.name);
            mod.AddUIGadgetImage(itemData.name, ZEROVEC, mod.CreateVector(size[0] * 0.7, size[1] * 0.7, 1), mod.UIAnchor.Center, itemData.weapon, __classPrivateFieldGet(this, _ItemButton_widget, "f"));
        }
        __classPrivateFieldSet(this, _ItemButton_widgetButton, mod.FindUIWidgetWithName(itemData.id, __classPrivateFieldGet(this, _ItemButton_widget, "f")), "f");
        __classPrivateFieldSet(this, _ItemButton_widgetCost, mod.FindUIWidgetWithName(__classPrivateFieldGet(this, _ItemButton_widgetCostName, "f"), __classPrivateFieldGet(this, _ItemButton_widget, "f")), "f");
        __classPrivateFieldSet(this, _ItemButton_widgetDisabled, mod.FindUIWidgetWithName(__classPrivateFieldGet(this, _ItemButton_widgetDisabledName, "f"), __classPrivateFieldGet(this, _ItemButton_widget, "f")), "f");
        this.refresh();
    }
    destroy() {
        if (!__classPrivateFieldGet(this, _ItemButton_widget, "f"))
            return;
        mod.DeleteUIWidget(__classPrivateFieldGet(this, _ItemButton_widget, "f"));
    }
    refresh() {
        if (!__classPrivateFieldGet(this, _ItemButton_widgetCost, "f") || !__classPrivateFieldGet(this, _ItemButton_widgetButton, "f") || !__classPrivateFieldGet(this, _ItemButton_widgetDisabled, "f"))
            return;
        // price change ?
        mod.SetUITextLabel(__classPrivateFieldGet(this, _ItemButton_widgetCost, "f"), MakeMessage(mod.stringkeys.store.costFmt, this.itemData.cost));
        // disabled?
        let wasDisabled = __classPrivateFieldGet(this, _ItemButton_isDisabled, "f");
        let disabledMsg = this.itemData.getDisabledMessageCallback?.(__classPrivateFieldGet(this, _ItemButton_jsPlayer, "f"), this.itemData);
        let isDisabled = disabledMsg != null;
        // has it changed?
        if (wasDisabled !== isDisabled) {
            __classPrivateFieldSet(this, _ItemButton_isDisabled, isDisabled, "f");
            mod.SetUIButtonEnabled(__classPrivateFieldGet(this, _ItemButton_widgetButton, "f"), !isDisabled);
            mod.SetUIWidgetVisible(__classPrivateFieldGet(this, _ItemButton_widgetDisabled, "f"), isDisabled);
            if (disabledMsg) {
                if (typeof (disabledMsg) === "string")
                    disabledMsg = MakeMessage(disabledMsg);
                mod.SetUITextLabel(__classPrivateFieldGet(this, _ItemButton_widgetDisabled, "f"), disabledMsg);
            }
        }
        // update if you can afford it?
        let canAffordIt = this.itemData.canAffordIt(__classPrivateFieldGet(this, _ItemButton_jsPlayer, "f"), this.itemData);
        if (!isDisabled)
            mod.SetUIButtonEnabled(__classPrivateFieldGet(this, _ItemButton_widgetButton, "f"), canAffordIt);
        mod.SetUITextColor(__classPrivateFieldGet(this, _ItemButton_widgetCost, "f"), canAffordIt ? mod.CreateVector(1, 1, 1) : mod.CreateVector(1, 0, 0));
    }
}
_ItemButton_jsPlayer = new WeakMap(), _ItemButton_itemBgColor = new WeakMap(), _ItemButton_isDisabled = new WeakMap(), _ItemButton_widget = new WeakMap(), _ItemButton_widgetButton = new WeakMap(), _ItemButton_widgetCost = new WeakMap(), _ItemButton_widgetCostName = new WeakMap(), _ItemButton_widgetDisabled = new WeakMap(), _ItemButton_widgetDisabledName = new WeakMap();
function __asModVector(param) {
    if (Array.isArray(param))
        return mod.CreateVector(param[0], param[1], param.length == 2 ? 0 : param[2]);
    else
        return param;
}
function __asModMessage(param) {
    if (typeof (param) === "string")
        return mod.Message(param);
    return param;
}
function __fillInDefaultArgs(params) {
    if (!params.hasOwnProperty('name'))
        params.name = "";
    if (!params.hasOwnProperty('position'))
        params.position = mod.CreateVector(0, 0, 0);
    if (!params.hasOwnProperty('size'))
        params.size = mod.CreateVector(100, 100, 0);
    if (!params.hasOwnProperty('anchor'))
        params.anchor = mod.UIAnchor.TopLeft;
    if (!params.hasOwnProperty('parent'))
        params.parent = mod.GetUIRoot();
    if (!params.hasOwnProperty('visible'))
        params.visible = true;
    if (!params.hasOwnProperty('padding'))
        params.padding = (params.type == "Container") ? 0 : 8;
    if (!params.hasOwnProperty('bgColor'))
        params.bgColor = mod.CreateVector(0.25, 0.25, 0.25);
    if (!params.hasOwnProperty('bgAlpha'))
        params.bgAlpha = 0.5;
    if (!params.hasOwnProperty('bgFill'))
        params.bgFill = mod.UIBgFill.Solid;
}
function __setNameAndGetWidget(uniqueName, params) {
    let widget = mod.FindUIWidgetWithName(uniqueName);
    mod.SetUIWidgetName(widget, params.name);
    return widget;
}
const __cUniqueName = "----uniquename----";
function __addUIContainer(params) {
    __fillInDefaultArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIContainer(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, restrict);
    }
    else {
        mod.AddUIContainer(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill);
    }
    let widget = __setNameAndGetWidget(__cUniqueName, params);
    if (params.children) {
        params.children.forEach((childParams) => {
            childParams.parent = widget;
            __addUIWidget(childParams);
        });
    }
    return widget;
}
function __fillInDefaultTextArgs(params) {
    if (!params.hasOwnProperty('textLabel'))
        params.textLabel = "";
    if (!params.hasOwnProperty('textSize'))
        params.textSize = 0;
    if (!params.hasOwnProperty('textColor'))
        params.textColor = mod.CreateVector(1, 1, 1);
    if (!params.hasOwnProperty('textAlpha'))
        params.textAlpha = 1;
    if (!params.hasOwnProperty('textAnchor'))
        params.textAnchor = mod.UIAnchor.CenterLeft;
}
function __addUIText(params) {
    __fillInDefaultArgs(params);
    __fillInDefaultTextArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIText(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, __asModMessage(params.textLabel), params.textSize, __asModVector(params.textColor), params.textAlpha, params.textAnchor, restrict);
    }
    else {
        mod.AddUIText(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, __asModMessage(params.textLabel), params.textSize, __asModVector(params.textColor), params.textAlpha, params.textAnchor);
    }
    return __setNameAndGetWidget(__cUniqueName, params);
}
function __fillInDefaultImageArgs(params) {
    if (!params.hasOwnProperty('imageType'))
        params.imageType = mod.UIImageType.None;
    if (!params.hasOwnProperty('imageColor'))
        params.imageColor = mod.CreateVector(1, 1, 1);
    if (!params.hasOwnProperty('imageAlpha'))
        params.imageAlpha = 1;
}
function __addUIImage(params) {
    __fillInDefaultArgs(params);
    __fillInDefaultImageArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIImage(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, params.imageType, __asModVector(params.imageColor), params.imageAlpha, restrict);
    }
    else {
        mod.AddUIImage(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, params.imageType, __asModVector(params.imageColor), params.imageAlpha);
    }
    return __setNameAndGetWidget(__cUniqueName, params);
}
function __fillInDefaultArg(params, argName, defaultValue) {
    if (!params.hasOwnProperty(argName))
        params[argName] = defaultValue;
}
function __fillInDefaultButtonArgs(params) {
    if (!params.hasOwnProperty('buttonEnabled'))
        params.buttonEnabled = true;
    if (!params.hasOwnProperty('buttonColorBase'))
        params.buttonColorBase = mod.CreateVector(0.7, 0.7, 0.7);
    if (!params.hasOwnProperty('buttonAlphaBase'))
        params.buttonAlphaBase = 1;
    if (!params.hasOwnProperty('buttonColorDisabled'))
        params.buttonColorDisabled = mod.CreateVector(0.2, 0.2, 0.2);
    if (!params.hasOwnProperty('buttonAlphaDisabled'))
        params.buttonAlphaDisabled = 0.5;
    if (!params.hasOwnProperty('buttonColorPressed'))
        params.buttonColorPressed = mod.CreateVector(0.25, 0.25, 0.25);
    if (!params.hasOwnProperty('buttonAlphaPressed'))
        params.buttonAlphaPressed = 1;
    if (!params.hasOwnProperty('buttonColorHover'))
        params.buttonColorHover = mod.CreateVector(1, 1, 1);
    if (!params.hasOwnProperty('buttonAlphaHover'))
        params.buttonAlphaHover = 1;
    if (!params.hasOwnProperty('buttonColorFocused'))
        params.buttonColorFocused = mod.CreateVector(1, 1, 1);
    if (!params.hasOwnProperty('buttonAlphaFocused'))
        params.buttonAlphaFocused = 1;
}
function __addUIButton(params) {
    __fillInDefaultArgs(params);
    __fillInDefaultButtonArgs(params);
    let restrict = params.teamId ?? params.playerId;
    if (restrict) {
        mod.AddUIButton(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, params.buttonEnabled, __asModVector(params.buttonColorBase), params.buttonAlphaBase, __asModVector(params.buttonColorDisabled), params.buttonAlphaDisabled, __asModVector(params.buttonColorPressed), params.buttonAlphaPressed, __asModVector(params.buttonColorHover), params.buttonAlphaHover, __asModVector(params.buttonColorFocused), params.buttonAlphaFocused, restrict);
    }
    else {
        mod.AddUIButton(__cUniqueName, __asModVector(params.position), __asModVector(params.size), params.anchor, params.parent, params.visible, params.padding, __asModVector(params.bgColor), params.bgAlpha, params.bgFill, params.buttonEnabled, __asModVector(params.buttonColorBase), params.buttonAlphaBase, __asModVector(params.buttonColorDisabled), params.buttonAlphaDisabled, __asModVector(params.buttonColorPressed), params.buttonAlphaPressed, __asModVector(params.buttonColorHover), params.buttonAlphaHover, __asModVector(params.buttonColorFocused), params.buttonAlphaFocused);
    }
    return __setNameAndGetWidget(__cUniqueName, params);
}
function __addUIWidget(params) {
    if (params == null)
        return undefined;
    if (params.type == "Container")
        return __addUIContainer(params);
    else if (params.type == "Text")
        return __addUIText(params);
    else if (params.type == "Image")
        return __addUIImage(params);
    else if (params.type == "Button")
        return __addUIButton(params);
    return undefined;
}
export function ParseUI(...params) {
    let widget;
    for (let a = 0; a < params.length; a++) {
        widget = __addUIWidget(params[a]);
    }
    return widget;
}
