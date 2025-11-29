// priority: 0

// Visit the wiki for more info - https://kubejs.com/

console.info('Hello, World! (Loaded server scripts)')

ServerEvents.recipes(event => {

    // HELPER FUNCTIONS
    function mergeIngredients(array, tag) {
        for (var i=0; i<array.length; i++) {
            // console.log(array[i]);
            event.replaceInput({input: array[i]}, array[i], tag);
        }
    }
    function ingTag(input) {
        var ing;
        if (input[0] == "#") {
            ing = {tag: input.substring(1)};
        } else {
            ing = {item: input};
        }
        return ing;
    }


    function betterEndAnvil(input, output, anvilLv, toolLv, dmg) {
        event.custom({
            type: "bclib:smithing",
            anvilLevel: anvilLv,
            damage: dmg,
            input: ingTag(input),
            result: {
                item: output
            },
            toolLevel: toolLv
        })
    }


    function tcMelt(input, output, outputAmt, temp, time) {
        event.custom({
            type: "tconstruct:melting",
            ingredient: ingTag(input),
            result: {
                amount: outputAmt,
                tag: output
            },
            temperature: temp,
            time: time*4
        });
    }
    function tcMeltWithByproduct(input, output, outputAmt, byproducts, byproductAmt, temp, time) {
        event.custom({
            type: "tconstruct:melting",
            ingredient: ingTag(input),
            result: {
                amount: outputAmt,
                tag: output
            },
            byproducts: [
                {
                    amount: byproductAmt,
                    tag: byproducts
                }
            ],
            temperature: temp,
            time: time*4
        });
    }

    function tcAlloy(inputs, output, outputAmt, temperature) {
        var ingredients = [];
        for (var i=0; i<inputs.length; i++) {
            // var ingredient = ingTag(inputs[i][0]);
            // Object.defineProperty(ingredient, "amount", inputs[i][1]);
            // console.log(ingredient);
            ingredients.push({
                tag: inputs[i][0],
                amount: inputs[i][1]
            });
        }
        event.custom({
            type: "tconstruct:alloy",
            inputs: ingredients,
            result: {
                amount: outputAmt,
                tag: output
            },
            temperature: temperature
        });
    }

    function tcCast(type, fluid, fluidAmt, cast, result, consumeCast) {
        event.custom({
            type: `tconstruct:casting_${type}`,
            cast: ingTag(cast),
            cast_consumed: consumeCast,
            cooling_time: 70,
            fluid: {
                amount: fluidAmt,
                tag: fluid
            },
            result: ingTag(result)
        });
    }
    

    function eioAlloyer(inputs, output, outputAmt, energy) {
        var ingredients = [];
        for (var i=0; i<inputs.length; i++) {
            ingredients.push({
                count: inputs[i][1],
                ingredient: ingTag(inputs[i][0])
            })
        }
        event.custom({
            type: "enderio:alloy_smelting",
            energy: energy,
            experience: 0.3,
            inputs: ingredients,
            result: {
                count: outputAmt,
                item: output
            }
        });
    }
    function eioSagMill(input, output) {
        event.custom({
            type: "enderio:sag_milling",
            bonus: "none",
            energy: 2400,
            input: {
                item: input
            },
            outputs: [
                {
                chance: 1.0,
                item: {
                    item: output
                },
                optional: false
                }
            ]
        });
    }

    function tesselate(result, pattern, key, time) {
        var newKey = {}
        for (const [k, v] of Object.entries(key)) {
            // console.log(`${k}: ${v}`);
            newKey[k] = ingTag(v);
        }
        // console.log(JSON.stringify(newKey));

        event.custom({
            type: "dimdoors:shaped_tesselating",
            key: newKey,
            pattern: pattern,
            result: ingTag(result),
            weavingtime: time
        });
    }


    // MINECRAFT COMES ALIVE
    event.remove({id: "tconstruct:smeltery/alloys/molten_rose_gold"})
    tcAlloy([["forge:molten_copper", 90], ["forge:molten_gold", 270]], "forge:molten_rose_gold", 360, 550);
    mergeIngredients(["mca:rose_gold_ingot", "tconstruct:rose_gold_ingot"], '#forge:ingots/rose_gold');
    event.remove({id: "mca:rose_gold_dust"})
    event.shapeless(
        Item.of("mca:rose_gold_dust"),
        ["3x enderio:powdered_gold", "enderio:powdered_copper"]
    )
    tcMeltWithByproduct("#mca:babies", "biomesoplenty:blood", 5000, 'forge:molten_manyullyn', 10, 210, 60);
    event.remove({id: "tconstruct:smeltery/entity_melting/villager"});
    event.custom({
        "type": "tconstruct:entity_melting",
        "damage": 5,
        "entity": {
            "tag": "forge:villagers"
        },
        "result": {
            "amount": 12500,
            "fluid": "biomesoplenty:blood"
        }
    });

    // blood recipes. all of them.
    event.custom({
        type: "tconstruct:casting_basin",
        cooling_time: 190,
        fluid: {
            amount: 810,
            tag: "biomesoplenty:blood"
        },
        result: {
            item: "biomesoplenty:flesh"
        }
    });
    tcMelt("biomesoplenty:flesh", "biomesoplenty:blood", 810, 210, 10);
    tcMelt("tconstruct:blood_slime_leaves", "biomesoplenty:blood", 450, 210, 6);
    tcMelt("biomesoplenty:porous_flesh", "biomesoplenty:blood", 450, 210, 6);
    tcMelt("biomesoplenty:flesh_tendons", "biomesoplenty:blood", 250, 210, 3);
    tcMelt("tconstruct:blood_slime_sapling", "biomesoplenty:blood", 250, 210, 3);
    tcMelt("tconstruct:blood_slime_fern", "biomesoplenty:blood", 250, 210, 3);
    tcMelt("tconstruct:blood_slime_tall_grass", "biomesoplenty:blood", 250, 210, 3);
    tcMelt("tconstruct:blood_slime_grass_seeds", "biomesoplenty:blood", 90, 210, 3);
    
    
    // BLAZING BLOOD
    event.remove({id: "tconstruct:smeltery/entity_melting/heads/blaze"});
    tcMelt("minecraft:blaze_rod", "tconstruct:blazing_blood", 100, 1000, 3);
    tcMelt("minecraft:blaze_powder", "tconstruct:blazing_blood", 50, 1000, 1);
    tcMelt("tconstruct:blaze_head", "tconstruct:blazing_blood", 1000, 1000, 15);
    
    // ELYTRA DUPING
    event.remove({id: "quark:tweaks/crafting/elytra_duplication"});
    
    // delete all gun recipes
    // event.remove({output: "tacz:modern_kinetic_gun"})
    event.remove({output: "tacz:gun_smith_table"});
    

    // merging recipes with duped ingredients
    mergeIngredients(["farmersdelight:rope", "supplementaries:rope"], '#supplementaries:ropes');
    mergeIngredients(["betterend:crystalline_sulfur", 'alexscaves:sulfur_dust'], "#kubejs:sulfur_dusts");
    event.remove({id: "alexscaves:gunpowder_from_sulfur"});
    event.remove({id: "tacz:gunpowder"});
    event.replaceInput({id: "betterend:sulphur_gunpowder"}, "betterend:crystalline_sulfur", "#kubejs:sulfur_dusts");
    event.shapeless("minecraft:gunpowder", ["#kubejs:sulfur_dusts", "#minecraft:coals", "minecraft:bone_meal"]);
    mergeIngredients(["betterend:ender_dust", 'enderio:powdered_ender_pearl'], "#forge:dusts/ender_pearl");
    mergeIngredients([
        "supplementaries:enderman_head",
        "enderio:enderman_head",
        "tconstruct:enderman_head"
    ], "#kubejs:enderman_heads");
    tcMelt("#kubejs:enderman_heads", "tconstruct:molten_ender", 500, 477, 29);
    
    mergeIngredients([
        "betterend:amber_block",
        // "deeperdarker:crystallized_amber",
        "alexscaves:amber"
    ], "#kubejs:amber_blocks");
    // event.replaceInput({id: "alexscaves:polymer_plate"}, "minecraft:iron_ingot", "industrialforegoing:plastic");
    mergeIngredients(["mtao45086:caramel", "alexscaves:caramel"], "#kubejs:caramel");


    // fix uranium dupe
    event.remove({id: "tconstruct:smeltery/melting/metal/uranium/raw"});

    // CHAINMAIL MELTING FIX
    event.remove({id: "tconstruct:smeltery/melting/metal/iron/chain_helmet"});
    event.remove({id: "tconstruct:smeltery/melting/metal/iron/chain_chestplate"});
    event.remove({id: "tconstruct:smeltery/melting/metal/iron/chain_leggings"});
    event.remove({id: "tconstruct:smeltery/melting/metal/iron/chain_boots"});


    // MOD THAT ADDS ORES
    mergeIngredients(["mtao45086:quartz_dust", "enederio:powdered_quartz"], "#forge:dusts/quartz")
    betterEndAnvil("minecraft:quartz", "mtao45086:quartz_dust", 2, 3, 8);
    event.shapeless("mtao45086:cement_powder", [
        "2x minecraft:clay_ball",
        "2x minecraft:sandstone"
    ]);
    event.remove({id:"mtao45086:cement_powder_craft"});
    event.replaceOutput({id: "mtao45086:orange_soda_craft"}, "mtao45086:orange_juice", "mtao45086:orange_soda");
    // event.replaceInput({id: "mtao45086:fruit_punch_craft"}, "mtao45086:black_cherry", ["mtao45086:black_cherry", "mtao45086:cherry_flavor"]);
    // event.replaceInput({id: "mtao45086:cherry_limeade_craft"}, "mtao45086:black_cherry", ["mtao45086:black_cherry", "mtao45086:cherry_flavor"]);
    // event.replaceInput({id: "mtao45086:salt_smelt"}, "mtao45086:mineral_water", Item.of('minecraft:potion', '{Potion:"minecraft:water"}'));
    // event.replaceInput({id: "mtao45086:salt_smoke"}, "mtao45086:mineral_water", Item.of('minecraft:potion', '{Potion:"minecraft:water"}'));
    mergeIngredients(["mtao45086:cherry_flavor", "mtao45086:black_cherry"], "#kubejs:cherry_flavour");
    event.shapeless("alexscaves:carmine_froglight", ["minecraft:golden_nugget", "mtao45086:synthetic_froglight", "alexscaves:pewen_sap"]);
    

    // CUSTOM BETTEREND HAMMER RECIPES
    betterEndAnvil("minecraft:coal", "enderio:powdered_coal", 2, 0, 2);
    betterEndAnvil("minecraft:charcoal", "enderio:powdered_coal", 2, 0, 2);
    betterEndAnvil("minecraft:wither_skeleton_skull", "enderio:withering_powder", 2, 4, 8);
    betterEndAnvil("minecraft:raw_iron", "enderio:powdered_iron", 3, 3, 8);
    betterEndAnvil("minecraft:raw_gold", "enderio:powdered_gold", 2, 3, 8);
    betterEndAnvil("minecraft:raw_copper", "enderio:powdered_copper", 2, 3, 8);
    // also change the infusion thing lmao
    event.remove({id: "betterend:infusion_pedestal"});
    event.shaped("betterend:infusion_pedestal", [
        " X ",
        "oAo",
        "ZZZ"
    ], {
        X: "minecraft:ender_eye",
        A: "betterend:aeternium_block",
        o: ["minecraft:ender_pearl", "betterend:ender_shard"],
        Z: '#forge:obsidian'
    })

    // BETTEREND ALLOYS
    tcMelt("betterend:emerald_ice", "kubejs:emerald_water", 90/4, 10, 4);
    tcMelt("betterend:dense_emerald_ice", "kubejs:emerald_water", 90, 10, 5);
    tcMelt("betterend:ancient_emerald_ice", "kubejs:emerald_water", 810, 10, 7);
    tcAlloy([["forge:molten_thallasium", 90], ["tconstruct:molten_ender", 30], ["kubejs:emerald_water", 270]], "forge:molten_terminite", 90, 1000);
    tcAlloy([["forge:molten_terminite", 10], ["tconstruct:molten_debris", 10]], "forge:molten_aeternium", 20, 1500);
    tcMelt("minecraft:shulker_shell", 'enderio:fluid_fuel/staff_of_levity', 50, 1000, 8);
    event.remove({id:"tconstruct:smeltery/entity_melting/shulker"});
    event.custom({
        type: "tconstruct:entity_melting",
        damage: 3,
        entity: {
            type: "minecraft:shulker"
        },
        result: {
            amount: 25,
            fluid: "enderio:vapor_of_levity"
        }
    });

    // DIMDOORS REBALANCE
    event.remove({id: "dimdoors:tesselating/rift_blade"});
    tesselate("dimdoors:rift_blade", [
            "X",
            "X","O"
        ],{
            O: "dimdoors:rift_remover",
            X: "betterend:crystal_shards"
    }, 200);
    event.remove({id: "dimdoors:rift_remover"});
    tesselate("dimdoors:rift_remover", [
            "VOV",
            "OXO",
            "VOV"
        ],{
            O: "enderio:end_steel_nugget",
            V: "enderio:vibrant_alloy_ingot",
            X: "minecraft:ender_pearl"
    }, 200);
    event.remove({id: "dimdoors:rift_signature"});
    tesselate("dimdoors:rift_signature", [
            "VOV",
            "OXO",
            "VOV"
        ],{
            O: "enderio:withering_powder",
            V: "enderio:dark_steel_ingot",
            X: "dimdoors:rift_pearl"
    }, 200);
    event.remove({id: "dimdoors:stabilized_rift_signature"});
    tesselate("dimdoors:stabilized_rift_signature", [
            "VOV",
            "AXA",
            "VOV"
        ],{
            O: "dimdoors:stable_fabric",
            V: "betterend:aeternium_ingot",
            A: "dimdoors:amalgam_lump",
            X: "dimdoors:rift_signature"
    }, 200);
    event.remove({id: "dimdoors:rift_stabilizer"});
    tesselate("dimdoors:rift_stabilizer", [
            "V V",
            " X ",
            "V V"
        ],{
            V: "minecraft:diamond",
            X: "minecraft:ender_pearl"
    }, 200);


    // ENDER STORAGE
    event.remove({id: "enderstorage:ender_chest"});
    event.remove({id: "enderstorage:ender_tank"});
    event.remove({id: "enderstorage:ender_pouch"});
    tcCast("basin", "tconstruct:blazing_blood", 200, "minecraft:ender_chest", "enderstorage:ender_chest", true);
    tcCast("basin", "tconstruct:blazing_blood", 200, "enderio:fluid_tank", "enderstorage:ender_tank", true);
    tcCast("table", "tconstruct:blazing_blood", 200, "#minecraft:shulker_boxes", "enderstorage:ender_pouch", true);


    // LUCKY BLOCKS
    event.replaceInput({id: "lucky:amongus_lucky_block"}, "minecraft:dropper", "lucky:lucky_block");
    event.shaped("lucky:summer_lucky_block", [
        "sss",
        "sls",
        "sss"
    ], {
        s: "minecraft:sunflower",
        l: "lucky:lucky_block"
    });

    // scarecrow crafting
    event.shapeless("dummmmmmy:target_dummy", ["rediscovered:scarecrow", "minecraft:target"]);
    event.remove({id: "dummmmmmy:dummy_crafting"});



    // TECH MOD UNFUCKER
    // event.remove({output: 'industrialforegoing:item_transporter_type'});
    // event.remove({output: 'industrialforegoing:world_transporter_type'});
    // event.remove({output: 'industrialforegoing:fluid_transporter_type'});
    // event.remove({output: 'enderio:primitive_alloy_smelter'});
    // event.remove({output: 'industrialforegoing:mechanical_dirt'});
    // event.remove({output: 'industrialforegoing:mob_duplicator'});
    event.replaceInput({input: '#forge:gears/iron', mod: "enderio"}, '#forge:gears/iron', 'enderio:iron_gear');
    // event.remove({output: 'enderio:vibrant_gear'});
    event.remove({output: 'enderio:dark_bimetal_gear'});
    event.remove({id: 'enderio:soulbinding/sentient_ender'});
    event.remove({id: 'enderio:slicing/ender_resonator'});
    event.remove({id: 'enderio:slicing/guardian_diode'});
    event.remove({id: 'enderio:slicing/skeletal_contractor'});
    event.remove({id: "enderio:soulbinding/soul_engine"})
    event.remove({output: 'enderio:soul_engine'});
    event.remove({output: 'enderio:painting_machine'});
    // event.remove({output: "enderio:enchanter"});
    // event.remove({type: "enderio:enchanting"});
    event.remove({output: "quark:crafter"});
    event.remove({output: "trials:crafter"});
    event.remove({id: "enderio:alloy_smelting/nethercotta"});
    event.remove({id: "enderio:glider_wing"});
    event.remove({id: "enderio:alloy_smelting/clayed_glowstone"});
    event.remove({id: "enderio:alloy_smelting/cake_base"});
    event.remove({id: "enderio:sag_milling/wheat"});
    event.remove({id: "enderio:slicing/zombie_electrode"});
    event.remove({id: "enderio:slicing/z_logic_controller"});
    event.remove({id: "enderio:slice_and_splice"});
    event.remove({id: "enderio:conduit_probe"});
    event.remove({id: "enderio:soulbinding/frank_n_zombie"});
    event.remove({id: "enderio:vibrant_capacitor_bank_upgrade"});
    event.remove({id: "enderio:advanced_capacitor_bank"});
    
    event.smelting("tconstruct:steel_ingot", "kubejs:steel_dust", 0, 200);
    event.blasting("tconstruct:steel_ingot", "kubejs:steel_dust", 0, 100);
    event.smelting("enderio:soularium_ingot", "enderio:soul_powder", 0, 200);
    event.blasting("enderio:soularium_ingot", "enderio:soul_powder", 0, 100);
    tcMelt('#forge:dusts/ender_pearl', "tconstruct:molten_ender", 27, 477, 8);
    tcMelt('betterend:ender_shard', "tconstruct:molten_ender", 90, 477, 12);
    let eioAlloys = ["copper_alloy", "redstone_alloy", "energetic_alloy", "conductive_alloy", "pulsating_alloy", "vibrant_alloy", "end_steel", "dark_steel"];
    for (var i=0; i<eioAlloys.length; i++) {
        event.smelting("enderio:"+eioAlloys[i]+"_ingot", "kubejs:"+eioAlloys[i]+"_dust", 0, 200);
        event.blasting("enderio:"+eioAlloys[i]+"_ingot", "kubejs:"+eioAlloys[i]+"_dust", 0, 100);
        event.remove({id: "enderio:alloy_smelting/"+eioAlloys[i]+"_ingot"});
        eioSagMill("enderio:"+eioAlloys[i]+"_ingot", "kubejs:"+eioAlloys[i]+"_dust");
    }
    event.smelting("betterend:thallasium_ingot", "kubejs:thallasium_dust", 0, 200);
    event.blasting("betterend:thallasium_ingot", "kubejs:thallasium_dust", 0, 100);
    eioSagMill("betterend:thallasium_ingot", "kubejs:thallasium_dust");
    tcMelt("kubejs:thallasium_dust", "forge:molten_thallasium", 90, 900, 20);
    eioSagMill("tconstruct:cobalt_ingot", "enderio:powdered_cobalt");
    event.blasting("tconstruct:cobalt_ingot", "enderio:powdered_cobalt", 0, 100);

    // xp fluid compatibility
    // dissolution([], "enderio:xp_juice", 250, "minecraft:experience_bottle", 1, 5);
    // event.custom({
    //     type: "enderio:tank",
    //     fluid: {
    //         amount: 250,
    //         fluid: "industrialforegoing:essence"
    //     },
    //     input: {
    //         item: "minecraft:glass_bottle"
    //     },
    //     is_emptying: false,
    //     output: {
    //         item: "minecraft:experience_bottle"
    //     }
    // });
    event.custom({
        type: "tconstruct:casting_table",
        cast: {
            item: "minecraft:glass_bottle"
        },
        cast_consumed: true,
        cooling_time: 1,
        fluid: {
            amount: 250,
            tag: "forge:experience"
        },
        result: {item: "minecraft:experience_bottle"}
    });
    event.replaceInput({id: "enderio:enchanter"}, "minecraft:book", "minecraft:enchanting_table");

    // machine frame changes
    event.replaceInput({id: "enderio:void_chassis"}, "#forge:ingots/iron", "tconstruct:steel_ingot");
    event.replaceInput({id: "enderio:ensouled_chassis"}, "minecraft:quartz", "enderio:void_chassis");
    event.replaceInput({id: "enderio:ensouled_chassis"}, "enderio:soul_chain", "dimdoors:liminal_lint");
    

    // ENDERIO ALLOYS REDUX
    event.remove({id: "enderio:primitive_alloy_smelter"});
    event.shaped("enderio:primitive_alloy_smelter", [
        "sbs",
        "sXs",
        "sbs"
    ], {
        s: "tconstruct:steel_ingot",
        X: "enderio:grains_of_infinity",
        b: "minecraft:blast_furnace"
    })

    event.shapeless( // early steel recipe lol
        Item.of("kubejs:steel_dust"),
        ["3x enderio:powdered_iron", "enderio:powdered_coal"]
    )
    eioAlloyer([["enderio:powdered_coal",1], ["enderio:powdered_iron",3]], "kubejs:steel_dust", 4, 3200);
    eioAlloyer([["enderio:powdered_gold",3], ["enderio:powdered_copper",1]], "mca:rose_gold_dust", 4, 3200);
    eioAlloyer([["enderio:powdered_copper",2], ["enderio:silicon",1]], "kubejs:copper_alloy_dust", 2, 3200);
    eioAlloyer([["enderio:powdered_iron",2], ["enderio:silicon",1], ["minecraft:redstone",4]], "kubejs:redstone_alloy_dust", 2, 3200);
    eioAlloyer([["minecraft:redstone",1], ["enderio:powdered_gold",2], ["minecraft:glowstone_dust",1]], "kubejs:energetic_alloy_dust", 2, 4800);

    eioAlloyer([["kubejs:redstone_alloy_dust",2], ["kubejs:steel_dust",1], ["kubejs:copper_alloy_dust",2]], "kubejs:conductive_alloy_dust", 3, 4800);
    eioAlloyer([["kubejs:energetic_alloy_dust",2], ["#forge:dusts/ender_pearl",1], ["kubejs:redstone_alloy_dust",2]], "kubejs:pulsating_alloy_dust", 3, 4800);
    eioAlloyer([["kubejs:pulsating_alloy_dust",2], ["#forge:dusts/ender_pearl",1], ["kubejs:conductive_alloy_dust",2]], "kubejs:vibrant_alloy_dust", 3, 6400);

    eioAlloyer([["kubejs:steel_dust",5], ["kubejs:thallasium_dust",1], ["#forge:dusts/ender_pearl",2]], "kubejs:end_steel_dust", 8, 9600);
    eioAlloyer([["kubejs:steel_dust",3], ["enderio:powdered_obsidian",3], ["#forge:dusts/ender_pearl",2]], "kubejs:dark_steel_dust", 8, 9600);

    event.remove({id: "enderio:alloy_smelting/soularium_ingot"});
    tcAlloy([["forge:molten_gold", 90], ["tconstruct:molten_steel", 90], ["tconstruct:liquid_soul", 3000]], "forge:molten_soularium", 180, 1500);

    // MISC PROGRESSION CHANGES
    event.shaped("enderio:z_logic_controller", [
        "sOs",
        "XHX",
        "sOs"
    ], {
        s: "enderio:silicon",
        X: "enderio:soularium_ingot",
        O: "enderio:redstone_alloy",
        H: "#forge:heads"
    });
    event.replaceInput({id: "enderio:vacuum_chest"}, "#forge:ingots/iron", "tconstruct:steel_ingot");
    event.replaceInput({id: "enderio:xp_vacuum"}, "#forge:ingots/iron", "tconstruct:steel_ingot");
    event.replaceInput({id: "enderio:travel_anchor"}, "#forge:ingots/iron", "tconstruct:steel_ingot");
    event.replaceInput({id: 'enderio:energetic_photovoltaic_module'}, "#forge:ingots/gold", "enderio:energetic_alloy_ingot");
    // event.replaceInput({id: "industrialforegoing:pity_black_hole_tank"}, "minecraft:ender_pearl", "industrialforegoing:common_black_hole_tank");
    // event.replaceInput({id: "industrialforegoing:pity_black_hole_unit"}, "minecraft:ender_pearl", "industrialforegoing:common_black_hole_unit");
    event.replaceInput({id: "enderio:fluid_tank"}, "#forge:ingots/iron", "tconstruct:steel_ingot");
    // event.replaceInput({id: "enderio:fluid_tank"}, "minecraft:iron_bars", '#forge:glass_panes');
    event.replaceInput({id: "enderio:fluid_tank"}, "#forge:glass", 'enderio:void_chassis');
    event.replaceInput({id: "enderio:pressurized_fluid_tank"}, "#enderio:fused_quartz", 'enderio:fluid_tank');
    event.replaceInput({id: "enderio:pressurized_fluid_tank"}, "enderio:dark_steel_bars", "#enderio:fused_quartz");
    event.replaceInput({id: "enderio:alloy_smelter"}, "enderio:iron_gear", "enderio:energized_gear")
    // SOUL MELTING
    event.remove({id: "tconstruct:smeltery/melting/soul/sand"});
    tcMelt("#forge:ground/soul", "tconstruct:liquid_soul", 500, 400, 17);
})