const Cloud_VFX_ID = 1;
const Cloud_ScreenFX_ID = 2;
const Cloud_SoldierFX_ID = 3;
const ScreenFX_ID = 4;
const SoldierFX_ID = 5;

let vl7cScreenEffect = true;
let vl7cSoldierEffect = true;
let vl7cVisualEffect = true;

let sScreenEffect = false;
let sSoldierEffect = false;

const iconColorVectorTrue = mod.CreateVector(0,1,0);
const iconColorVectorFalse = mod.CreateVector(1,0,0);

export async function OnPlayerDeployed(player: mod.Player) {
    let players = mod.AllPlayers();
    let n = mod.CountOf(players);
    console.log("LOG> OnPlayerDeployed: player: ", mod.GetObjId(player), " Count of Players: ", n);

    if (mod.GetSoldierState(player, mod.SoldierStateBool.IsAISoldier) == false) {
        console.log("LOG> Found a player: ", mod.GetObjId(player));

        mod.AddEquipment(player, mod.Gadgets.Mask_Gas);

        mod.EnableScreenEffect(player, mod.ScreenEffects.VL7, sScreenEffect);
        mod.SetSoldierEffect(player, mod.SoldierEffects.VL7Effect, sSoldierEffect);  
    }
}

export async function OnGameModeStarted() { 
	console.log("Running Mod Script Dated: 2025-02-27 13:28:44.889481");
    console.log("Log> OnGameModeStarted");
    
    mod.SetVL7CloudEffects(mod.GetVL7Cloud(1), vl7cScreenEffect, vl7cSoldierEffect, vl7cVisualEffect);
    mod.SetVL7CloudEffects(mod.GetVL7Cloud(2), vl7cScreenEffect, vl7cSoldierEffect, vl7cVisualEffect);

    mod.SetWorldIconColor(mod.GetWorldIcon(SoldierFX_ID), sSoldierEffect ? iconColorVectorTrue : iconColorVectorFalse);
    mod.SetWorldIconColor(mod.GetWorldIcon(ScreenFX_ID), sScreenEffect ? iconColorVectorTrue : iconColorVectorFalse);
    mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_ScreenFX_ID), vl7cScreenEffect ? iconColorVectorTrue : iconColorVectorFalse);
    mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_SoldierFX_ID), vl7cSoldierEffect ? iconColorVectorTrue : iconColorVectorFalse);
    mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_VFX_ID), vl7cVisualEffect ? iconColorVectorTrue : iconColorVectorFalse);
    
    mod.SetWorldIconText(mod.GetWorldIcon(SoldierFX_ID), mod.Message("Toggle Soldier Effects"));
    mod.SetWorldIconText(mod.GetWorldIcon(ScreenFX_ID), mod.Message("Toggle Screen Effects"));
    mod.SetWorldIconText(mod.GetWorldIcon(Cloud_ScreenFX_ID), mod.Message("Toggle GasCloud Screen Effects"));
    mod.SetWorldIconText(mod.GetWorldIcon(Cloud_SoldierFX_ID), mod.Message("Toggle GasCloud Soldier Effects"));
    mod.SetWorldIconText(mod.GetWorldIcon(Cloud_VFX_ID), mod.Message("Toggle GasCloud Visual Effects"));
}

export function OnPlayerInteract(player: mod.Player, interactPoint: mod.InteractPoint){

    if (mod.GetObjId(interactPoint) == SoldierFX_ID){
        sSoldierEffect = !sSoldierEffect;
        mod.SetWorldIconColor(mod.GetWorldIcon(SoldierFX_ID), sScreenEffect ? iconColorVectorTrue : iconColorVectorFalse);
        mod.SetSoldierEffect(player, mod.SoldierEffects.VL7Effect, sSoldierEffect);  
        return;
    }
    if (mod.GetObjId(interactPoint) == ScreenFX_ID){
        sScreenEffect = !sScreenEffect;
        mod.SetWorldIconColor(mod.GetWorldIcon(ScreenFX_ID), sScreenEffect ? iconColorVectorTrue : iconColorVectorFalse);
        mod.EnableScreenEffect(player, mod.ScreenEffects.VL7, sScreenEffect);
        return;
    }
    if (mod.GetObjId(interactPoint) == Cloud_ScreenFX_ID){
        vl7cScreenEffect = !vl7cScreenEffect;
        mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_ScreenFX_ID), vl7cScreenEffect ? iconColorVectorTrue : iconColorVectorFalse);
    }
    if (mod.GetObjId(interactPoint) == Cloud_SoldierFX_ID){
        vl7cSoldierEffect = !vl7cSoldierEffect;
        mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_SoldierFX_ID), vl7cSoldierEffect ? iconColorVectorTrue : iconColorVectorFalse);
    }
    if (mod.GetObjId(interactPoint) == Cloud_VFX_ID){
        vl7cVisualEffect = !vl7cVisualEffect;
        mod.SetWorldIconColor(mod.GetWorldIcon(Cloud_VFX_ID), vl7cVisualEffect ? iconColorVectorTrue : iconColorVectorFalse);
    }
    mod.SetVL7CloudEffects(mod.GetVL7Cloud(1), vl7cScreenEffect, vl7cSoldierEffect, vl7cVisualEffect);
    mod.SetVL7CloudEffects(mod.GetVL7Cloud(2), vl7cScreenEffect, vl7cSoldierEffect, vl7cVisualEffect);
}

export function OnPlayerEnterVL7Cloud(player: mod.Player, vl7Cloud: mod.VL7Cloud) {
    console.log("Log> Player (", mod.GetObjId(player), ") Entered VL7Cloud (", mod.GetObjId(vl7Cloud), ")");
}

export function OnPlayerExitVL7Cloud(player: mod.Player, vl7Cloud: mod.VL7Cloud) {
    console.log("Log> Player (", mod.GetObjId(player), ") Exited VL7Cloud (", mod.GetObjId(vl7Cloud), ")");
}