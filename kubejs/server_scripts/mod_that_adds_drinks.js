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
    function cook(inputs, container, output) {
        if (inputs.length > 6) { 
            throw new Error("you can only cook 6 items in a Farmer's Delight pot dumbass!!!");
        }
        var ingredients = [];
        for (var i=0; i<inputs.length; i++) {
            ingredients.push(ingTag(inputs[i]));
        }

        event.custom({
            type: "farmersdelight:cooking",
            container: ingTag(container),
            cookingtime: 200,
            experience: 1.0,
            ingredients: ingredients,
            // recipe_book_tab: "drinks",
            result: ingTag(output)
        });
    }


    // JUICE
    cook(["mtao45086:lime", "mtao45086:lime"], "minecraft:glass_bottle", "mtao45086:lime_juice");
    cook(["mtao45086:lemon", "mtao45086:lemon"], "minecraft:glass_bottle", "mtao45086:lemon_juice");
    cook(["mtao45086:black_cherry", "mtao45086:black_cherry"], "minecraft:glass_bottle", "mtao45086:black_cherry_juice");
    cook(["mtao45086:plum", "mtao45086:plum"], "minecraft:glass_bottle", "mtao45086:plum_juice");
    cook(["mtao45086:pomegranate", "mtao45086:pomegranate"], "minecraft:glass_bottle", "mtao45086:pomegranate_juice");
    cook(["mtao45086:orange", "mtao45086:orange"], "minecraft:glass_bottle", "mtao45086:orange_juice");
    
    // BASE SODAS
    cook(["mtao45086:orange_juice", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "#mtao45086:co_2"], "minecraft:glass_bottle", "mtao45086:orange_soda");
    cook(["mtao45086:lemon_juice", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:lemonade");
    cook(["mtao45086:lime_juice", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:limeade");
    cook(["mtao45086:black_cherry_juice", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "#mtao45086:co_2"], "minecraft:glass_bottle", "mtao45086:cherry_soda");
    cook(["mtao45086:cherry_flavor", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "minecraft:sugar", "#mtao45086:co_2"], "minecraft:glass_bottle", "mtao45086:cherry_soda");

    // FUSION DRINKS 1
    cook(["mtao45086:lemonade", "minecraft:sugar", "minecraft:sweet_berries", "minecraft:sweet_berries", "minecraft:pink_dye"], "minecraft:glass_bottle", "mtao45086:pink_lemonade");
    cook(["mtao45086:limeade", "minecraft:sugar", "minecraft:sugar", "#kubejs:cherry_flavour", "#kubejs:cherry_flavour"], "minecraft:glass_bottle", "mtao45086:cherry_limeade");
    cook(["mtao45086:plum_juice", "minecraft:nether_wart", "minecraft:nether_wart", "minecraft:honey_bottle", "minecraft:honey_bottle"], "minecraft:glass_bottle", "mtao45086:honey_wine");
    cook(["mtao45086:pomegranate_juice", "mtao45086:lemon", "mtao45086:lemon", "minecraft:honey_bottle"], "minecraft:glass_bottle", "mtao45086:granita");
    
    // CHEMICALS
    cook(["minecraft:redstone", "minecraft:redstone", "mtao45086:salt"], "minecraft:glass_bottle", "mtao45086:sodium_hydroxide");
    cook(["minecraft:gunpowder", "minecraft:gunpowder", "minecraft:water_bucket"], "minecraft:glass_bottle", "mtao45086:sulfuric_acid");
    cook(["minecraft:spruce_log", "minecraft:spruce_log", "minecraft:spruce_log", "minecraft:spruce_log"], "minecraft:glass_bottle", "mtao45086:coniferin");
    cook(["#kubejs:caramel", "mtao45086:vanillin", "mtao45086:ethanol"], "minecraft:air", "mtao45086:vanilla_flavor");
    cook(["minecraft:sugar", "minecraft:sugar", "minecraft:nether_wart"], "minecraft:air", "mtao45086:ethanol");
    cook(["minecraft:cocoa_beans", "minecraft:cocoa_beans", "minecraft:nether_wart", "minecraft:nether_wart"], "minecraft:air", "mtao45086:benzaldehyde");

    cook(["mtao45086:benzaldehyde", "mtao45086:acetaldehyde", "mtao45086:ethanol", "mtao45086:malic_acid", "minecraft:red_dye"], "minecraft:air", "mtao45086:cherry_flavor");
    cook(["mtao45086:benzaldehyde", "mtao45086:sodium_hydroxide", "mtao45086:ethanol", "mtao45086:acetaldehyde", "minecraft:orange_dye"], "minecraft:air", "mtao45086:cinnamaldehyde");
    cook(["mtao45086:benzaldehyde", "mtao45086:malic_acid", "mtao45086:ethanol", "mtao45086:vanillin", "minecraft:light_blue_dye"], "minecraft:air", "mtao45086:raspberry_flavor");

    // COMPLEX DRINKS OH GOD
    cook(["mtao45086:vanilla_flavor", "mtao45086:vanilla_flavor", "mtao45086:citric_acid", "mtao45086:citric_acid", "minecraft:sugar", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:cream_soda");
    cook(["mtao45086:vanilla_flavor", "mtao45086:cinnamaldehyde", "mtao45086:citric_acid", "mtao45086:salt", "minecraft:sugar", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:cola");
    cook(["mtao45086:orange", "mtao45086:orange", "mtao45086:orange_cream_soda"], "minecraft:glass_bottle", "mtao45086:orange_cream_soda");
    cook(["#kubejs:cherry_flavour", "#kubejs:cherry_flavour", "mtao45086:cola"], "minecraft:glass_bottle", "mtao45086:cherry_cola");
    cook(["mtao45086:raspberry_flavor", "mtao45086:raspberry_flavor", "#mtao45086:co_2", "minecraft:sugar", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:blue_raspberry_soda");
    cook(["mtao45086:lemon", "mtao45086:lemon", "#mtao45086:co_2", "mtao45086:lime", "mtao45086:lime", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:lemon_lime_soda");
    cook(["mtao45086:citric_acid", "mtao45086:citric_acid", "#mtao45086:co_2", "mtao45086:citric_acid", "mtao45086:citric_acid", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:lemon_lime_soda");
    cook(["mtao45086:spruce_tip", "mtao45086:spruce_tip", "mtao45086:coniferin"], "minecraft:glass_bottle", "mtao45086:spruce_beer");
    cook(["minecraft:birch_log", "minecraft:birch_log", "minecraft:birch_log", "minecraft:birch_log"], "minecraft:glass_bottle", "mtao45086:birch_beer");
    cook(["minecraft:sugar", "minecraft:sugar", "mtao45086:salt", "mtao45086:salt", "mtao45086:citric_acid", "mtao45086:citric_acid"], "minecraft:glass_bottle", "mtao45086:electrolyte_drink");
    cook(["mtao45086:protein_powder", "mtao45086:protein_powder", "mtao45086:salt", "mtao45086:salt", "minecraft:sugar", "minecraft:cocoa_beans"], "minecraft:glass_bottle", "mtao45086:protein_shake");
    cook(["mtao45086:vanilla_flavor", "mtao45086:vanilla_flavor", "mtao45086:cinnamaldehyde", "minecraft:cocoa_beans", "minecraft:cocoa_beans"], "minecraft:glass_bottle", "mtao45086:xocolotl");
    cook(["minecraft:apple", "#kubejs:cherry_flavour", "mtao45086:cinnamaldehyde", "#mtao45086:citrus", "minecraft:sugar"], "minecraft:glass_bottle", "mtao45086:fruit_punch");
    
    // BREWING EXCLUSIVE
    cook(["minecraft:smooth_stone", "minecraft:water_bucket"], "minecraft:glass_bottle", "mtao45086:mineral_water");
    cook(["mtao45086:sodium_hydroxide", "#mtao45086:citrus_juice"], "minecraft:glass_bottle", "mtao45086:calcium_citrate");
    cook(["mtao45086:sufluric_acid", "#mtao45086:coniferin"], "minecraft:glass_bottle", "mtao45086:vanillin");
    cook(["mtao45086:spruce_beer", "mtao45086:amber"], "minecraft:glass_bottle", "mtao45086:spruce_ambeer");
    cook(["mtao45086:birch_beer", "mtao45086:amber"], "minecraft:glass_bottle", "mtao45086:birch_ambeer");
});