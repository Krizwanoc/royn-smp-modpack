// priority: 0
ServerEvents.recipes(event => {

    function ingTag(input) {
        var ing;
        if (input[0] == "#") {
            ing = {tag: input.substring(1)};
        } else {
            ing = {item: input};
        }
        return ing;
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
    function tcCast(fluid, fluidAmt, cast, result, consumeCast) {
        event.custom({
            type: "tconstruct:casting_table",
            cast: {
                tag: `tconstruct:casts/${consumeCast ?  "single_use" : "multi_use"}/${cast}`
            },
            cast_consumed: consumeCast,
            cooling_time: 70,
            fluid: {
                amount: fluidAmt,
                tag: fluid
            },
            result: ingTag(result)
        });
    }
    function tcCastBasin(fluid, result) {
        event.custom({
            type: "tconstruct:casting_basin",
            cooling_time: 190,
            fluid: {
                amount: 810,
                tag: fluid
            },
            result: {
                tag: result
            }
        });
    }

    
    function datagen(modid, mat, temperature) {
        // MATERIAL RECIPES
        event.custom({
            type: "tconstruct:material",
            conditions: [
                {
                type: "mantle:tag_filled",
                tag: `forge:storage_blocks/${mat}`
                }
            ],
            ingredient: {
                tag: `forge:storage_blocks/${mat}`
            },
            leftover: {
                count: 1,
                tag: `forge:ingots/${mat}`
            },
            material: `roynconstruct:${mat}`,
            needed: 1,
            value: 9
        });
        event.custom({
            type: "tconstruct:material",
            conditions: [
                {
                type: "mantle:tag_filled",
                tag: `forge:ingots/${mat}`
                }
            ],
            ingredient: {
                tag: `forge:ingots/${mat}`
            },
            material: `roynconstruct:${mat}`,
            needed: 1,
            value: 1
        });
        event.custom({
            type: "tconstruct:material",
            conditions: [
                {
                type: "mantle:tag_filled",
                tag: `forge:nuggets/${mat}`
                }
            ],
            ingredient: {
                tag: `forge:nuggets/${mat}`
            },
            material: `roynconstruct:${mat}`,
            needed: 1,
            value: 1
        });

        // CASTING AND MELTING
        event.custom({
            type: "tconstruct:material_fluid",
            fluid: {
                amount: 90,
                tag: `forge:molten_${mat}`
            },
            output: `roynconstruct:${mat}`,
            temperature: temperature
        });
        event.custom({
            type: "tconstruct:material_melting",
            input: `roynconstruct:${mat}`,
            result: {
                amount: 90,
                tag: `forge:molten_${mat}`
            },
            temperature: temperature
        });
    }
    function smelteryGen(mat, temperature) {
        // SMELTERY
        tcMelt(`#forge:ingots/${mat}`, `forge:molten_${mat}`, 90, temperature, 30);
        tcMelt(`#forge:nuggets/${mat}`, `forge:molten_${mat}`, 10, temperature, 40);
        tcMelt(`#forge:storage_blocks/${mat}`, `forge:molten_${mat}`, 810, temperature, 60);
        tcCast(`forge:molten_${mat}`, 90, "ingot", `#forge:ingots/${mat}`, true);
        tcCast(`forge:molten_${mat}`, 90, "ingot", `#forge:ingots/${mat}`, false);
        tcCast(`forge:molten_${mat}`, 10, "nugget", `#forge:nuggets/${mat}`, true);
        tcCast(`forge:molten_${mat}`, 10, "nugget", `#forge:nuggets/${mat}`, false);
        tcCastBasin(`forge:molten_${mat}`, `forge:storage_blocks/${mat}`);
    }

    datagen("betterend", "thallasium", 900);
    datagen("betterend", "terminite", 1000);
    datagen("betterend", "aeternium", 1500);
    datagen("enlightened_end", "adamantite", 1500);
    smelteryGen("thallasium", 900);
    smelteryGen("terminite", 1000);
    smelteryGen("aeternium", 1500);
    smelteryGen("soularium", 1500);
    smelteryGen("adamantite", 1500);


    // for materials not part of the smeltery
    function singleMaterialRecipe(item, material) {
        event.custom({
            type: "tconstruct:material",
            ingredient: {
                item: item
            },
            material: material,
            needed: 1,
            value: 1
        });
    }
    singleMaterialRecipe("dimdoors:enduring_fibers", "roynconstruct:enduring");
    singleMaterialRecipe("betterend:dragon_bone_block", "roynconstruct:dragon_bone");
});