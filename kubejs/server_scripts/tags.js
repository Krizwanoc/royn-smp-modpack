ServerEvents.tags("item", event => {
    event.removeAll('twilightforest:portal/activator');
    event.add('twilightforest:portal/activator', 'minecraft:diamond_block');
    event.remove("twilightforest:portal/activator", "minecraft:diamond");
    
    event.add("twilightforest:banned_uncraftables", "minecraft:beacon");

    // event.add("kubejs:oreberry", [
    //     'oreberriesreplanted:iron_oreberry',
    //     'oreberriesreplanted:copper_oreberry',
    //     'oreberriesreplanted:gold_oreberry',
    //     'oreberriesreplanted:uranium_oreberry',
    // ]);
    // event.add("kubejs:oreberry_bushes", [
    //     'oreberriesreplanted:iron_oreberry_bush',
    //     'oreberriesreplanted:copper_oreberry_bush',
    //     'oreberriesreplanted:gold_oreberry_bush',
    //     'oreberriesreplanted:uranium_oreberry_bush',
    // ]);
    event.add("kubejs:sulfur_dusts", [
        'betterend:crystalline_sulphur',
        'alexscaves:sulfur_dust'
    ]);
    event.add("kubejs:amber_blocks", [
        "betterend:amber_block",
        "mtao45086:amber_block",
        // "deeperdarker:crystallized_amber",
        "alexscaves:amber"
    ]);
    
    event.add('forge:dusts/ender_pearl', "betterend:ender_dust");
    // event.remove("forge:gears/iron", 'enderio:iron_gear');
    event.add("forge:dusts/steel", "kubejs:steel_dust");
    event.remove("forge:ingots/iron", "betterend:thallasium_ingot");
    event.remove("c:iron_ingots", "betterend:thallasium_ingot");
    event.remove("dimdoors:iron_ingots", "betterend:thallasium_ingot");
    event.remove("forge:ingots/iron", "betternether:cincinnasite_ingot");
    event.remove("c:iron_ingots", "betternether:cincinnasite_ingot");
    event.remove("dimdoors:iron_ingots", "betternether:cincinnasite_ingot");

    event.add("forge:ingots/thallasium", "betterend:thallasium_ingot");
    event.add("forge:nuggets/thallasium", "betterend:thallasium_nugget");
    event.add("forge:raw_materials/thallasium", "betterend:thallasium_raw");
    event.add("forge:storage_blocks/thallasium", "betterend:thallasium_block");
    event.add("forge:ingots/terminite", "betterend:terminite_ingot");
    event.add("forge:nuggets/terminite", "betterend:terminite_nugget");
    event.add("forge:storage_blocks/terminite", "betterend:terminite_block");
    event.add("forge:ingots/aeternium", "betterend:aeternium_ingot");
    event.add("forge:storage_blocks/aeternium", "betterend:aeternium_block");
    event.add("forge:nuggets/aeternium", "kubejs:aeternium_nugget");
    event.add("forge:nuggets/zirconium", "kubejs:zirconium_nugget");
    event.add("forge:nuggets/hyperboreum", "kubejs:hyperboreum_nugget");

    event.add("forge:ores/uranium", 'alexscaves:radrock_uranium_ore');
    event.add("forge:ores/uranium", 'enlightened_end:irradium_ore');
    event.add("forge:storage_blocks/uranium", 'alexscaves:uranium_block');
    event.add("forge:ingots/uranium", 'alexscaves:uranium');
    
    event.add("forge:dusts/quartz", "mtao45086:quartz_dust");
    let mtao = ["lead", "tungsten", "platinum", "zirconium", "slamtanium", "tin", "hyperboreum"];
    for (var i=0; i<mtao.length; i++) {
        var m = mtao[i];
        console.log(m);
        event.add(`forge:ores/${m}`, `mtao45086:${m}_ore`);
        event.add(`forge:ores/${m}`, `mtao45086:${m}_ore_deep`);
        event.add(`forge:ores/${m}`, `mtao45086:${m}_ore_end`);
        event.add(`forge:raw_materials/${m}`, `mtao45086:${m}_raw`);
        event.add(`forge:raw_materials/${m}`, `mtao45086:raw_${m}`); // SIGMA WHY IS RAW TIN THE ONLY ONE WHOSE ID IS LIKE THIS
        event.add(`forge:ingots/${m}`, `mtao45086:${m}_ingot`);
        event.add(`forge:storage_blocks/${m}`, `mtao45086:${m}_block`);
        event.add(`forge:storage_blocks/raw_${m}`, `mtao45086:raw_${m}_block`);
        event.add(`forge:storage_blocks/raw_${m}`, `mtao45086:${m}_raw_block`);
    }
    
    event.add("forge:heads", [
        "supplementaries:enderman_head",
        "enderio:enderman_head"
    ]);
    event.add("kubejs:enderman_heads", [
        "supplementaries:enderman_head",
        "enderio:enderman_head",
        "tconstruct:enderman_head"
    ]);

    event.add('forge:tools/knives', "enlightend_end:adamantite_knife");
    event.add('farmersdelight:tools/knives', "enlightend_end:adamantite_knife");
    event.add('forge:tools/knives', "#mtao45086:daggers");
    event.add('farmersdelight:tools/knives', "#mtao45086:daggers");
    event.add('farmersdelight:straw_harvesters', "#forge:tools/knives");
    event.add('nethersdelight:tools/hunting_tools', "#forge:tools/knives");

    event.add("forge:storage_blocks/adamantite", 'enlightened_end:adamantite_block');
    event.add("minecraft:beacon_payment_items", 'enlightened_end:adamantite_ingot');

    event.add("kubejs:cherry_flavour", ["mtao45086:cherry_flavor", "mtao45086:black_cherry"]);
    event.add("kubejs:caramel", ["mtao45086:caramel", "alexscaves:caramel"]);
});

ServerEvents.tags("block", event =>{
    event.add("minecraft:mineable/pickaxe", [
        "dimdoors:clod_ore",
        "dimdoors:clod_block",
        "dimdoors:amalgam_ore",
        "dimdoors:amalgam_block",
        "dimdoors:rust",

        "dimdoors:amalgam_slab",
        "dimdoors:amalgam_stairs",
        "dimdoors:amalgam_door",
        "dimdoors:amalgam_trapdoor",
        "dimdoors:deepslate_slab",
        "dimdoors:deepslate_stairs",
        "dimdoors:deepslate_wall",
        "dimdoors:end_stone_slab",
        "dimdoors:end_stone_stairs",
        "dimdoors:end_stone_wall",
        "dimdoors:netherrack_slab",
        "dimdoors:netherrack_stairs",
        "dimdoors:netherrack_wall",
        "dimdoors:netherrack_fence",

        "dimdoors:gritty_stone"
    ]);

    event.add("minecraft:mineable/axe", [
        "dimdoors:driftwood_planks",
        "dimdoors:driftwood_log",
        "dimdoors:driftwood_wood",
        "dimdoors:driftwood_fence",
        "dimdoors:driftwood_gate",
        "dimdoors:driftwood_button",
        "dimdoors:driftwood_slab",
        "dimdoors:driftwood_stairs",
        "dimdoors:driftwood_door",
        "dimdoors:driftwood_trapdoor"
    ]);

    event.removeAll("enlightened_end:extreme_radioactive");
    event.removeAll("enlightened_end:high_radioactive");
    event.removeAll("enlightened_end:medium_radioactive");
    event.removeAll("enlightened_end:low_radioactive");

    event.add("enlightened_end:valid_teleporter_connection", [
        "enlightened_end:malachite_tiles",
        "enlightened_end:polished_malachite",
        "enlightened_end:cracked_malachite_tiles",
        "mtao45086:malachite_block"
    ]);
});

ServerEvents.tags("fluid", event => { 
    event.add("forge:molten_soularium", "kubejs:molten_soularium");
    event.add("tconstruct:molten_soularium", "kubejs:molten_soularium");
    event.add("forge:molten_soularium", "kubejs:molten_soularium");
    event.add("forge:molten_thallasium", "kubejs:molten_thallasium");
    event.add("forge:molten_terminite", "kubejs:molten_terminite");
    event.add("forge:molten_aeternium", "kubejs:molten_aeternium");
    event.add("kubejs:emerald_water", "kubejs:emerald_water");
    event.add("forge:molten_adamantite", "kubejs:molten_adamantite");
    event.add("forge:molten_zirconium", "kubejs:molten_zirconium");
    event.add("forge:molten_hyperboreum", "kubejs:molten_hyperboreum");

    event.add("tconstruct:tooltips/metal", [
        "kubejs:molten_soularium",
        "kubejs:molten_thallasium",
        "kubejs:molten_terminite",
        "kubejs:molten_aeternium",
        "kubejs:molten_adamantite",
        "kubejs:molten_zirconium",
        "kubejs:molten_hyperboreum"
    ]);
    // event.add("tconst")
});

ServerEvents.tags("entity_type", event => {
    event.add("kubejs:ender_mobs", [
        "minecraft:enderman",
        "minecraft:endermite",
        "betterend:end_slime",
        "betterend:dragonfly",
        "betterend:end_fish",
        "betterend:shadow_walker",
        "betterend:cubozoa",
        "betterend:silk_moth",
        "tconstruct:ender_slime",
        "mutantmonsters:mutant_enderman",
        "enlightened_end:floating_elevibloom",
        "enlightened_end:ringling",
        "enlightened_end:fumesplat",
        "enlightened_end:gloop",
        "enlightened_end:bouncer",
        "enlightened_end:stalker",
        "enlightened_end:void_leviathan",
        "minecraft:phantom"
    ]);

    event.add("alexscaves:resists_radiation", "#forge:immune_to_radiation");
    event.add("alexscaves:resists_bubbled", "#enlightened_end:bubble_immune");
});