let thingsToRemove = [
        "betterend:thallasium_sword_blade",
        "betterend:thallasium_sword_handle",
        "betterend:thallasium_pickaxe_head",
        "betterend:thallasium_axe_head",
        "betterend:thallasium_hoe_head",
        "betterend:thallasium_shovel_head",

        "betterend:terminite_sword_blade",
        "betterend:terminite_sword_handle",
        "betterend:terminite_pickaxe_head",
        "betterend:terminite_axe_head",
        "betterend:terminite_hoe_head",
        "betterend:terminite_shovel_head",

        "betterend:aeternium_sword_blade",
        "betterend:aeternium_sword_handle",
        "betterend:aeternium_pickaxe_head",
        "betterend:aeternium_axe_head",
        "betterend:aeternium_hoe_head",
        "betterend:aeternium_shovel_head",

        "betterend:leather_wrapped_stick",
        "betterend:leather_stripe",
        "betterend:end_stone_smelter",

        "betterend:terminite_upgrade_smithing_template",
        "betterend:thallasium_upgrade_smithing_template",
        "betterend:handle_attachment_smithing_template",
        "betterend:leather_handle_attachment_smithing_template",
        "betterend:tool_assembly_smithing_template",

        "enlightened_end:raw_irradium",
        "enlightened_end:irradium_bar",
        "enlightened_end:depleted_irradium_bar"
    ];


ServerEvents.recipes(event => {
    event.remove({id: "betterend:aeternium_ingot"});
    event.remove({id: "betterend:terminite_ingot"});
    event.remove({id: "betterend:terminite_ingot_thallasium"});
    event.remove({id: "betterend:thallasium_ingot_alloy"});
    event.remove({id: "betterend:additional_iron"});
    event.remove({id: "betterend:additional_gold"});
    event.remove({id: "betterend:additional_copper"});
    event.remove({id: "betterend:additional_netherite"});
    for (var i=0; i<thingsToRemove.length; i++) {
        // console.log(thingsToRemove[i]);
        event.remove({input: thingsToRemove[i]});
        event.remove({output: thingsToRemove[i]});
    }
    event.replaceInput({input: "betterend:plate_upgrade_smithing_template"}, "betterend:plate_upgrade_smithing_template", "betterend:aeternium_upgrade_smithing_template");
    event.remove({id: "betterend:copy_plate_upgrade"});

    event.remove({id: "enderio:smelting/enlightened_end/smelt_irradium_ore"});
    event.smelting("alexscaves:uranium", "enlightened_end:irradium_ore", 1, 10);
    event.blasting("alexscaves:uranium", "enlightened_end:irradium_ore", 1, 5);

    let toolTypes = ["sword", "pickaxe", "axe", "shovel", "hoe"];
    function toolRecipeGen(namespace, material, stick) {
        event.shaped(`${namespace}_sword`, [
            "a",
            "a",
            "s"
        ],{
            a: material,
            s: stick
        });
        event.shaped(`${namespace}_pickaxe`, [
            "aaa",
            " s ",
            " s "
        ],{
            a: material,
            s: stick
        });
        event.shaped(`${namespace}_axe`, [
            "aa",
            "sa",
            "s "
        ],{
            a: material,
            s: stick
        });
        event.shaped(`${namespace}_shovel`, [
            "a",
            "s",
            "s"
        ],{
            a: material,
            s: stick
        });
        event.shaped(`${namespace}_hoe`, [
            "aa",
            "s ",
            "s "
        ],{
            a: material,
            s: stick
        });
        for (var i=0; i<toolTypes.length; i++) {
            event.remove({id: `${namespace}_${toolTypes[i]}`});
        }
    }

    toolRecipeGen("betterend:thallasium", "betterend:thallasium_ingot", "minecraft:stick");
    toolRecipeGen("betterend:terminite", "betterend:terminite_ingot", "minecraft:stick");
    for (var i=0; i<toolTypes.length; i ++) {
        event.remove({id: `betterend:aeternium_${toolTypes[i]}`});
        event.smithing(`betterend:aeternium_${toolTypes[i]}`, "betterend:aeternium_upgrade_smithing_template", `betterend:terminite_${toolTypes[i]}`, "betterend:aeternium_ingot");
    }
    event.shaped(`betterend:thallasium_hammer`, [
        "a a",
        "asa",
        " s "
    ],{
        a: "betterend:thallasium_ingot",
        s: "minecraft:stick"
    });
    event.shaped(`betterend:terminite_hammer`, [
        "a a",
        "asa",
        " s "
    ],{
        a: "betterend:terminite_ingot",
        s: "minecraft:stick"
    });
    event.remove({id: "betterend:aeternium_hammer_head"})
    event.smithing(`betterend:aeternium_hammer`, "betterend:aeternium_upgrade_smithing_template", `betterend:terminite_hammer`, "betterend:aeternium_ingot");


    // RITUAL INFUSION CRAFTING
    function ingTag(input) {
        var ing;
        if (input[0] == "#") {
            ing = {tag: input.substring(1)};
        } else {
            ing = {item: input};
        }
        return ing;
    }
    function infusion(center, catalystsFuckMeInTheAssGodDamnIt, output, time) {
        event.custom({
            type: "betterend:infusion",
            catalysts: catalystsFuckMeInTheAssGodDamnIt,
            input: ingTag(center),
            result: ingTag(output)
        });
    }
    infusion("minecraft:diamond", {
        north: ingTag("kubejs:pulsating_alloy_dust"),
        north_east: ingTag("kubejs:pulsating_alloy_dust"),
        east: ingTag("kubejs:pulsating_alloy_dust"),
        south_east: ingTag("kubejs:pulsating_alloy_dust"),
        south: ingTag("kubejs:pulsating_alloy_dust"),
        south_west: ingTag("kubejs:pulsating_alloy_dust"),
        west: ingTag("kubejs:pulsating_alloy_dust"),
        north_west: ingTag("kubejs:pulsating_alloy_dust")
    }, "enderio:pulsating_crystal", 100);
    infusion("minecraft:emerald", {
        north: ingTag("kubejs:vibrant_alloy_dust"),
        north_east: ingTag("kubejs:vibrant_alloy_dust"),
        east: ingTag("kubejs:vibrant_alloy_dust"),
        south_east: ingTag("kubejs:vibrant_alloy_dust"),
        south: ingTag("kubejs:vibrant_alloy_dust"),
        south_west: ingTag("kubejs:vibrant_alloy_dust"),
        west: ingTag("kubejs:vibrant_alloy_dust"),
        north_west: ingTag("kubejs:vibrant_alloy_dust")
    }, "enderio:vibrant_crystal", 100);
    event.remove({id: "enderio:pulsating_crystal"});
    event.remove({id: "enderio:vibrant_crystal"});
    event.remove({output: "enderio:weather_crystal"});
    event.remove({input: "enderio:weather_crystal"});
    event.remove({output: "enderio:enticing_crystal"});
    event.remove({input: "enderio:enticing_crystal"});
    event.remove({id: "enderio:soulbinding/enticing_crystal"});

    event.remove({id: "betterend:crystalite_elytra"});
    infusion("minecraft:elytra", {
        north: ingTag("betterend:amber_gem"),
        north_east: ingTag("betterend:crystal_shards"),
        east: ingTag("betterend:enchanted_membrane"),
        south_east: ingTag("betterend:eternal_crystal"),
        south: ingTag("betterend:enchanted_membrane"),
        south_west: ingTag("betterend:eternal_crystal"),
        west: ingTag("betterend:enchanted_membrane"),
        north_west: ingTag("betterend:crystal_shards")
    }, "betterend:elytra_crystalite", 500);

    event.remove({id: "betterend:crystalite_helmet"});
    infusion("betterend:terminite_helmet", {
        north: ingTag("betterend:amber_gem"),
        north_east: ingTag("#forge:dusts/ender_pearl"),
        east: ingTag("betterend:crystal_shards"),
        south_east: ingTag("#forge:dusts/ender_pearl"),
        south: ingTag("betterend:eternal_crystal"),
        south_west: ingTag("#forge:dusts/ender_pearl"),
        west: ingTag("betterend:crystal_shards"),
        north_west: ingTag("#forge:dusts/ender_pearl")
    }, "betterend:crystalite_helmet", 150);

    event.remove({id: "betterend:crystalite_chestplate"});
    infusion("betterend:terminite_chestplate", {
        north: ingTag("betterend:amber_gem"),
        north_east: ingTag("betterend:crystal_shards"),
        east: ingTag("#forge:dusts/ender_pearl"),
        south_east: ingTag("betterend:eternal_crystal"),
        south: ingTag("#forge:dusts/ender_pearl"),
        south_west: ingTag("betterend:eternal_crystal"),
        west: ingTag("#forge:dusts/ender_pearl"),
        north_west: ingTag("betterend:crystal_shards")
    }, "betterend:crystalite_chestplate", 300);

    event.remove({id: "betterend:crystalite_leggings"});
    infusion("betterend:terminite_leggings", {
        north: ingTag("betterend:amber_gem"),
        north_east: ingTag("#forge:dusts/ender_pearl"),
        east: ingTag("betterend:crystal_shards"),
        south_east: ingTag("#forge:dusts/ender_pearl"),
        south: ingTag("betterend:eternal_crystal"),
        south_west: ingTag("#forge:dusts/ender_pearl"),
        west: ingTag("betterend:crystal_shards"),
        north_west: ingTag("#forge:dusts/ender_pearl")
    }, "betterend:crystalite_leggings", 225);

    event.remove({id: "betterend:crystalite_boots"});
    infusion("betterend:terminite_boots", {
        north: ingTag("betterend:amber_gem"),
        north_east: ingTag("#forge:dusts/ender_pearl"),
        east: ingTag("betterend:crystal_shards"),
        south_east: ingTag("#forge:dusts/ender_pearl"),
        south: ingTag("betterend:eternal_crystal"),
        south_west: ingTag("#forge:dusts/ender_pearl"),
        west: ingTag("betterend:crystal_shards"),
        north_west: ingTag("#forge:dusts/ender_pearl")
    }, "betterend:crystalite_boots", 150);

    event.remove({input:"mtao45086:tung"})
});

LootJS.modifiers(event => {
    event.addLootTableModifier("enlightened_end:blocks/irradium_ore").replaceLoot("enlightened_end:raw_irradium", "alexscaves:uranium");

    for (var i=0; i<thingsToRemove.length; i++) {
        event.addLootTableModifier(/.*end.*/).removeLoot(thingsToRemove[i]);
    }
    event.addLootTableModifier(/.*end.*/).removeLoot("betterend:plate_upgrade_smithing_template");

    // event.addLootTableModifier("betterend:chests/end_village_loot").addLoot("minecraft:diamond");
});
